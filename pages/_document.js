import React from 'react'
import Document, { Head, Main, NextScript,Html } from 'next/document'

export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	  }	
	
	render() {
		let cdnURL = ""
		let isRTL = 0
		let languages = false
		let file_cache = "21983923"
		let player_type = ""
		if(this.props.__NEXT_DATA__.props && this.props.__NEXT_DATA__.props.pageProps.pageData && this.props.__NEXT_DATA__.props.pageProps.pageData.languages){
			languages = true
		}
		if(this.props.__NEXT_DATA__.props && this.props.__NEXT_DATA__.props.pageProps.pageData && this.props.__NEXT_DATA__.props.pageProps.pageData.isRTL){
			isRTL = this.props.__NEXT_DATA__.props.pageProps.pageData.isRTL
		}
		if(this.props.__NEXT_DATA__.props && this.props.__NEXT_DATA__.props.pageProps.pageData && this.props.__NEXT_DATA__.props.pageProps.pageData.CDN_URL_FOR_STATIC_RESOURCES){
			cdnURL = this.props.__NEXT_DATA__.props.pageProps.pageData.CDN_URL_FOR_STATIC_RESOURCES
		}
		let favicon = false
		if(this.props.__NEXT_DATA__.props && this.props.__NEXT_DATA__.props.pageProps.pageData && this.props.__NEXT_DATA__.props.pageProps.pageData.appSettings.favicon){
			favicon = this.props.__NEXT_DATA__.props.pageProps.pageData.imageSuffix + this.props.__NEXT_DATA__.props.pageProps.pageData.appSettings['favicon'] 
		}
		if(this.props.__NEXT_DATA__.props && this.props.__NEXT_DATA__.props.pageProps.pageData && this.props.__NEXT_DATA__.props.pageProps.pageData.appSettings.file_cache){
			file_cache =  this.props.__NEXT_DATA__.props.pageProps.pageData.appSettings['file_cache'] 
		}
		if(this.props.__NEXT_DATA__.props && this.props.__NEXT_DATA__.props.pageProps.pageData && this.props.__NEXT_DATA__.props.pageProps.pageData.appSettings.player_type){
			player_type = this.props.__NEXT_DATA__.props.pageProps.pageData.appSettings['player_type'] 
		}
		
		let subFolder = "/"

		if(this.props.__NEXT_DATA__.props && this.props.__NEXT_DATA__.props.pageProps.pageData){
			subFolder = this.props.__NEXT_DATA__.props.pageProps.pageData.subFolder 
		}
		cdnURL = cdnURL + subFolder
		return (

			<Html lang={this.props.__NEXT_DATA__.props ? this.props.__NEXT_DATA__.props.pageProps.initialLanguage : "en"} subfolder={subFolder} dir={this.props.__NEXT_DATA__.props && this.props.__NEXT_DATA__.props.pageProps.pageData && this.props.__NEXT_DATA__.props.pageProps.pageData.isRTL ? "rtl" : "ltr"}>
				<Head>
					{
						favicon ? 
							<link rel="icon" href={favicon+`?v=${file_cache}`}/>
						: null
					}
					<link href={`https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css`} rel="stylesheet" /> 
					<link href={`https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css`} rel="stylesheet" /> 
					<link id="bootstrap-link" href={`https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css`} rel="stylesheet" /> 
					{
						isRTL == 1 ?
							<link id="bootstrap-link-rtl" href={`https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.rtl.min.css`} rel="stylesheet" />
						: null
					}
					<link href={`${cdnURL ? cdnURL : ""}static/css/fontawesome/css/all.min.css?v=${file_cache}`} rel="stylesheet" />
					<link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" rel="stylesheet" />
					{
						languages ? 
							<link href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.1.0/css/flag-icon.min.css" rel="stylesheet" />
					: null
					}
					<link href={`${cdnURL ? cdnURL : ""}static/css/style.css?v=${file_cache}`} rel="stylesheet" />
					<link href={`${cdnURL ? cdnURL : ""}static/css/messanger.css?v=${file_cache}`} rel="stylesheet" />
					
					<link id="custom-responsive-link" href={`${cdnURL ? cdnURL : ""}static/css/responsive.css?v=${file_cache}`} rel="stylesheet" />
					{
						isRTL == 1 ?
							<link id="custom-rtl-link" href={`${cdnURL ? cdnURL : ""}static/css/rtl.style.css?v=${file_cache}`} rel="stylesheet" />
						: null
					}
					{
						player_type == "element" ? 
							<link rel="stylesheet" href={`${cdnURL ? cdnURL : ""}static/scripts/mediaelement/mediaelement.min.css?v=${file_cache}`} />
						: null
					}
					{
						player_type == "element" ? 
						<link rel="stylesheet" href={`${cdnURL ? cdnURL : ""}static/scripts/mediaelement/speed/speed.min.css?v=${file_cache}`} />
						: null
					}
					{
						player_type == "element" ? 
						<link rel="stylesheet" href={`${cdnURL ? cdnURL : ""}static/scripts/mediaelement/jump-forward/jump-forward.min.css?v=${file_cache}`} />
						: null
					}
					{
						player_type == "element" ? 
						<link rel="stylesheet" href={`${cdnURL ? cdnURL : ""}static/scripts/mediaelement/ads/ads.min.css?v=${file_cache}`} />
							: null
					}
					{
						player_type == "element" ? 
						<link rel="stylesheet" href={`${cdnURL ? cdnURL : ""}static/scripts/mediaelement/quality/quality.min.css?v=${file_cache}`} />
						: null
					}
					{
						player_type == "element" ? 
						<script src={`${cdnURL ? cdnURL : ""}static/scripts/mediaelement/mediaelement.min.js?v=${file_cache}`}></script>
						: null
					}
					{
						player_type == "element" ? 
						<script src={`${cdnURL ? cdnURL : ""}static/scripts/mediaelement/speed/speed.min.js?v=${file_cache}`}></script>
						: null
					}
					{
						player_type == "element" ? 
						<script src={`${cdnURL ? cdnURL : ""}static/scripts/mediaelement/speed/speed-i18n.js?v=${file_cache}`}></script>
						: null
					}
					{
						player_type == "element" ? 
						<script src={`${cdnURL ? cdnURL : ""}static/scripts/mediaelement/jump-forward/jump-forward.min.js?v=${file_cache}`}></script>						
						: null
					}
					{
						player_type == "element" ? 
						<script src={`${cdnURL ? cdnURL : ""}static/scripts/mediaelement/ads/ads.js?v=${file_cache}`}></script>
						: null
					}
					{
						player_type == "element" ? 
						<script src={`${cdnURL ? cdnURL : ""}static/scripts/mediaelement/ads/ads-i18n.js?v=${file_cache}`}></script>
						: null
					}
					{
						player_type == "element" ? 
						<script src={`${cdnURL ? cdnURL : ""}static/scripts/mediaelement/ads-vast-vpaid/ads-vast-vpaid.js?v=${file_cache}`}></script>
						: null
					}
					{
						player_type == "element" ? 
						<script src={`${cdnURL ? cdnURL : ""}static/scripts/mediaelement/quality/quality.min.js?v=${file_cache}`}></script>
						: null
					}
					<link href={`${cdnURL ? cdnURL : ""}static/custom/header.css?v=${file_cache}`} rel="stylesheet" />
					<script src={`${cdnURL ? cdnURL : ""}static/scripts/jquery-3.4.1.min.js?v=${file_cache}`}></script>
					<script src={`https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js`}></script>
					<script src={`${cdnURL ? cdnURL : ""}static/scripts/jQuery-1.9.1.js?v=${file_cache}`}></script>
					<script src={`${cdnURL ? cdnURL : ""}static/custom/header.js?v=${file_cache}`}></script>						
					<link href={`${cdnURL ? cdnURL : ""}static/css/variable_white.css?v=${file_cache}`} rel="stylesheet" />
					{
						this.props.__NEXT_DATA__.props && this.props.__NEXT_DATA__.props.pageProps.pageData && this.props.__NEXT_DATA__.props.pageProps.pageData.appSettings &&  this.props.__NEXT_DATA__.props.pageProps.pageData.appSettings['google_analytics_code'] ? 
							<script dangerouslySetInnerHTML={{__html: `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
							(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
							m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
							})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
							ga('create', "${this.props.__NEXT_DATA__.props.pageProps.pageData.appSettings['google_analytics_code']}", 'auto');
							ga('send', 'pageview');`}} />
						: null
					}
				</Head>
				<body>
					<main>
						<Main />
						<NextScript />
					</main>
				</body>
			</Html>
		)
	}
}
