import React from 'react'
import { connect } from 'react-redux';
import Router from 'next/router';
import Head from "next/head"
import dynamic from 'next/dynamic'
import { I18nextProvider } from 'react-i18next';
import * as actions from '../store/actions/general';
import NProgress from 'nprogress'
import App from 'next/app'
import {wrapper} from "../store/index";
import {registerI18n, i18n} from '../i18n'
import config from "../config";
import socketOpen from "socket.io-client";

const MiniPlayer = dynamic(() => import("../containers/Video/MiniPlayer"), {
    ssr: false,
});
const AudioPlayer = dynamic(() => import("../containers/Audio/Player"), {
    ssr: false,
});
const ChatMessages = dynamic(() => import("../containers/Messages/Chat"), {
    ssr: false,
});
const socket = socketOpen(config.actualPath,{path:`${config.basePath}socket.io`});

registerI18n(Router)
/* debug to log how the store is being used */

class MyApp extends App {
	constructor(props){
		super(props)
		this.state = {
			chats:[]
		}
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
	}
    static getInitialProps = wrapper.getInitialAppProps(store => async ({Component, ctx}) => {
		// Recompile pre-existing pageProps
		let pageProps = {};
		ctx.store = store
		if (Component.getInitialProps)
			pageProps = await Component.getInitialProps(ctx);
		// Initiate vars to return
		const { req } = ctx;
		let initialI18nStore = {};
		let initialLanguage = null;
		let currentPageUrl = null
		// Load translations to serialize if we're serverside
		if(req){
			currentPageUrl = req.originalUrl
		}
		if (req && req.i18n) {
			[initialLanguage] = req.i18n.languages;
			i18n.language = initialLanguage;			
			initialI18nStore = req.i18n.store.data;
		} else {
			// Load newly-required translations if changing route clientside
			await Promise.all(
				i18n.nsFromReactTree
					.filter(ns => !i18n.hasResourceBundle(i18n.languages[0], ns))
					.map(ns => new Promise(resolve => i18n.loadNamespaces(ns, () => resolve())))
			);
			initialI18nStore = i18n.store.data;
			initialLanguage = i18n.language;
		}
		let userAgent;
		if (req) { // if you are on the server and you get a 'req' property from your context
			userAgent = req.headers['user-agent'] // get the user-agent from the headers
		} else {
			userAgent = navigator.userAgent // if you are on the client you can access the navigator from the window object
		}

		let isMobile = false 
		if(userAgent){
			isMobile = Boolean(userAgent.match(
				/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
		  	))
		}
		// `pageProps` will get serialized automatically by NextJs
		return {
			pageProps: {
				...pageProps,
				isMobile:isMobile,
				initialI18nStore,
				initialLanguage,
				currentPageUrl:currentPageUrl
			},
		};
	})
	onRouteChangeStart = () => {
		NProgress.start()
	};
	onRouteChangeComplete = () => {
		NProgress.done()
		$("body").removeClass("modal-open");
		$("body").css("overflow",'auto');
	};
	onRouteChangeError = () => {
		NProgress.done()
	};
	closeChat = (message_id) => {
		let chats = [...this.state.chats]
		let index = this.getItemIndex(message_id)
		if(index > -1){
			chats.splice(index, 1);
			this.setState({localUpdate:true,chats:chats});
		}
	}
	minimizeChat = (message_id) => {
		let chats = [...this.state.chats]
		let index = this.getItemIndex(message_id)
		if(index > -1){
			if(!chats[index].minimize || chats[index].minimize == 0)
				chats[index].minimize = 1;
			else
				chats[index].minimize = 0
			this.setState({localUpdate:true,chats:chats});
		}
	}
	updateWindowDimensions() {
        let width = window.innerWidth
		let chats = [...this.state.chats];
		if(chats.length > 0){
			if(width < 700){
				if (chats.length > 2){
					chats.shift()
					chats.shift()
				}else if (chats.length > 1){
					chats.shift()
				}
			}else if(width < 1060){
				if (chats.length > 2){
					chats.shift()
				}
			}
		}
		this.setState({"width": window.innerWidth,chats:chats});
    }
	componentDidMount() {
		window.addEventListener('resize', this.updateWindowDimensions);
		this.updateWindowDimensions();
		Router.events.on("routeChangeStart", this.onRouteChangeStart);
		Router.events.on("routeChangeComplete", this.onRouteChangeComplete);
		Router.events.on("routeChangeError", this.onRouteChangeError);
		//open chats
		socket.on('chatOpen', data => {
			let chats = [...this.state.chats]
			let index = this.getItemIndex(data.message_id)
			if(index > -1){
				return
			}
			if(this.state.width < 700){
				chats.shift();
			}else if(this.state.width < 1060){
				if(chats.length == 2){
					chats.shift();
				}
			}else{
				if(chats.length == 3){
					chats.shift();
				}
			}
			chats.push(data)
			this.setState({localUpdate:true,chats:chats})
		})
		socket.on('chatMessageCreate', data => {
			let chat = data.chat
			let chats = [...this.state.chats]
			let index = this.getItemIndex(chat.message_id)
			if(index > -1){
				return
			}
			if(this.state.width < 700){
				chats.shift();
			}else if(this.state.width < 1060){
				if(chats.length == 2){
					chats.shift();
				}
			}else{
				if(chats.length == 3){
					chats.shift();
				}
			}
			chats.push(chat)
			this.setState({localUpdate:true,chats:chats})
		})
		socket.on('chatDelete', data => {
            let id = data.message_id
            const itemIndex = this.getItemIndex(id)
            if (itemIndex > -1) {
                const messages = [...this.state.chats]
                messages.splice(itemIndex, 1);
                this.setState({localUpdate:true, chats: messages})
            }
        })

	}
	
	getItemIndex(item_id) {
        const chats = [...this.state.chats];
        const itemIndex = chats.findIndex(p => p["message_id"] == item_id);
        return itemIndex;
    }
	static getDerivedStateFromProps(nextProps, prevState){
		if (prevState.localUpdate){
            return {...prevState,localUpdate:false}
        }else if(nextProps.pageProps.pageData && nextProps.pageProps.pageData.hideSmallMenu){
			nextProps.setPageInfoData(nextProps.pageProps.pageData,true)
		}else if(nextProps.pageProps.pageData){
			nextProps.setPageInfoData(nextProps.pageProps.pageData)
		}
		return null;
	}

	translateT = (fn) => {
		this.setState({localUpdate:true,t:fn});
	}
	render() {
		const { Component, pageProps } = this.props
		let { initialLanguage, initialI18nStore,isMobile } = pageProps;
		i18n.store.data = initialI18nStore
		if(!i18n.language){
			i18n.language = initialLanguage
			i18n.translator.changeLanguage(initialLanguage);
		}
		let pathname = true
		if(typeof window != "undefined"){
			if(Router.pathname == "/messanger"){
				pathname = false
			}
		}
		return (
			<React.Fragment>
				<I18nextProvider
					i18n={i18n}
					initialLanguage={initialLanguage}
					initialI18nStore={initialI18nStore}
				>
					<Head>
						<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"></meta>
					</Head>
					<Component {...pageProps} appViewWidth={this.state.width} translateT={this.translateT} isMobile={isMobile ? 992 : 993} socket={socket} />	
					<MiniPlayer {...pageProps} appViewWidth={this.state.width} isMobile={isMobile ? 992 : 993} socket={socket} />
					<AudioPlayer {...pageProps} appViewWidth={this.state.width} isMobile={isMobile ? 992 : 993} socket={socket} />
					{
						this.state.chats.length > 0 && pathname ?
						<div className="chat-containers">
						{
							this.state.chats.map((chat,index) => {
								return (
									<ChatMessages appViewWidth={this.state.width} fromSmallChat={true} chatIndex={index} minimize={chat.minimize} minimizeChat={this.minimizeChat} closeChat={this.closeChat} key={chat.message_id} {...this.props} {...this.state.t} socket={socket} messageId={chat.message_id} message={chat} chats={[]} />
								)
							})
						}
						</div>
						: null
					}
				</I18nextProvider>
			</React.Fragment>
		)
	}
}
const mapDispatchToProps = dispatch => {
    return {
		setPageInfoData: (data,menuOpen) => dispatch(actions.setPageInfoData(data,menuOpen)),
		setMenuOpen: (status) => dispatch(actions.setMenuOpen(status)),
    };
};
export default wrapper.withRedux(connect(null,mapDispatchToProps)(MyApp))