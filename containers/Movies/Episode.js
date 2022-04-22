import React from "react"
import Link from "../../components/Link/index";
import CensorWord from "../CensoredWords/Index"
import Image from "../Image/Index"
import { renderToString } from 'react-dom/server'
import Date from "../Date"

const Episode = (props) => {
    let item = props.episode
    let date = <Date {...props} creation_date={item.release_date} initialLanguage={props.initialLanguage} format={'DD MMMM YYYY'} defaultTimezone={props.pageInfoData.defaultTimezone} />
    let html = <React.Fragment>
         <div className="ThumbBox-coverImg">
            <span>
                <Image title={renderToString(<CensorWord {...props} text={item.title} />)} image={item.image} imageSuffix={props.pageInfoData.imageSuffix} />
            </span>
        </div>
        {
            item.duration ?
                <div className="VdoDuration show-gradient">{item.duration}</div>
                : null
        }
        <div className="ThumbBox-Title hide-on-expand">
            <div className="PlayIcon">
                <span className="material-icons-outlined">
                    play_arrow
                </span>
            </div>
            <div className="title ellipsize2Line">
                <h4 className="m-0">{`S${props.season_id} E${item.episode_number}`}{" "} <span className="material-icons">fiber_manual_record</span> {" "} {`${renderToString(date)}`}</h4>
            </div>
        </div>
        <div className="ItemDetails">
            <div className="d-flex align-items-center VideoTitle ">
            {
                <React.Fragment>
                    <div className="PlayIcon">
                        <span className="material-icons-outlined">
                            play_arrow
                        </span>
                    </div>
                    <div className="title ellipsize2Line">
                        <h4 className="m-0">{`S${props.season_id} E${item.episode_number}`}{" "} <span className="material-icons">fiber_manual_record</span> {" "} {`${renderToString(date)}`}</h4>
                    </div>
                </React.Fragment>
            }
            </div>
            <div className="Vdoinfo d-flex flex-column">
                <span className="videoViewDate">                                         
                    <p>{<CensorWord {...props} text={item.title} />}</p>
                </span>
            </div>
        </div>
    </React.Fragment>
    return (
        <div key={item.episode_id} className="gridColumn">
            <div className="ThumbBox-wrap episode-container">
                {
                item.type == "external" ? 
                    <a href={item.code} target="_blank">
                        {html}
                    </a>
                :
                <Link href="/watch" customParam={`videoId=${props.movie_id}&seasonId=${props.season_id}&episodeId=${item.episode_number}`} as={`/watch/${props.movie_id}/season/${props.season_id}/episode/${item.episode_number}`}>
                    <a className="ThumbBox-link">
                       {html}
                    </a>
                </Link>
            }
            </div> 
        </div>
    )
}

export default Episode