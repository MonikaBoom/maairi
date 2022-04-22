import React from "react"
import Link from "../../components/Link"
 
const index = (props) => {
    return (
        <React.Fragment>
            {
             props.pageData.levelPermissions["livestreaming.create"] == 1 && props.pageData.liveStreamingEnable ?
            <li>
                <Link href="create-livestreaming" as="/live-streaming">
                    <a className="dropdown-item iconmenu">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><circle cx="24" cy="24" r="6" fill="#f44336"/><path fill="#f44336" d="M17.09,16.789L14.321,13.9C11.663,16.448,10,20.027,10,24s1.663,7.552,4.321,10.1l2.769-2.889 C15.19,29.389,14,26.833,14,24C14,21.167,15.19,18.61,17.09,16.789z"/><path fill="#f44336" d="M33.679,13.9l-2.769,2.889C32.81,18.611,34,21.167,34,24c0,2.833-1.19,5.389-3.09,7.211l2.769,2.889 C36.337,31.552,38,27.973,38,24S36.337,16.448,33.679,13.9z"/><g><path fill="#f44336" d="M11.561,11.021l-2.779-2.9C4.605,12.125,2,17.757,2,24s2.605,11.875,6.782,15.879l2.779-2.9 C8.142,33.701,6,29.1,6,24S8.142,14.299,11.561,11.021z"/><path fill="#f44336" d="M39.218,8.121l-2.779,2.9C39.858,14.299,42,18.9,42,24s-2.142,9.701-5.561,12.979l2.779,2.9 C43.395,35.875,46,30.243,46,24S43.395,12.125,39.218,8.121z"/></g></svg>
                        {props.t("Go Live")}
                    </a>
                </Link>
            </li>    
            : null
            }
            {
             props.pageData.levelPermissions["video.create"] == 1 ?
            <li>
                <Link href="/create-video">
                    <a className="dropdown-item iconmenu">
                        <span className="material-icons" data-icon="videocam"></span>
                        {props.t("Create Video")}
                    </a>
                </Link>
            </li>    
            : null
            }      
            {
             props.pageData.levelPermissions["audio.create"] == 1 && props.pageData.appSettings["enable_audio"] == 1 ?
            <li>
                <Link href="/create-audio">
                    <a className="dropdown-item iconmenu">
                        <span className="material-icons" data-icon="audiotrack"></span>
                        {props.t("Create Audio")}
                    </a>
                </Link>
            </li>    
            : null
            }    
            {
             props.pageData.levelPermissions["movie.create"] == 1 && props.pageData.appSettings["enable_movie"] == 1 ?
            <React.Fragment>
                <li>
                        <Link href="/create-movie">
                            <a className="dropdown-item iconmenu">
                                <span className="material-icons" data-icon="movie"></span>
                                {props.t("Create Movie")}
                            </a>
                        </Link>
                    </li>    
                    <li>
                        <Link href="/create-series">
                            <a className="dropdown-item iconmenu">
                                <span className="material-icons" data-icon="live_tv"></span>
                                {props.t("Create Series")}
                            </a>
                        </Link>
                    </li>    
            </React.Fragment>
            : null
            }

            {
             props.pageData.levelPermissions["series.create"] == 1 && props.pageData.appSettings["enable_series"] == 1 ?
            <li>
                <Link href="/create-series">
                    <a className="dropdown-item iconmenu">
                        <span className="material-icons" data-icon="live_tv"></span>
                        {props.t("Create Series")}
                    </a>
                </Link>
            </li>    
            : null
            }

            {
            (props.pageData.levelPermissions["channel.create"] == 1) && props.pageData.appSettings["enable_channel"] == 1 ? 
            <li>
                <Link href="/create-channel">
                    <a className="dropdown-item iconmenu">
                        <span className="material-icons" data-icon="add"></span>
                        {props.t("Create Channel")}
                    </a>
                </Link>
            </li> 
            : null 
            }
            {
                (props.pageData.levelPermissions["blog.create"] == 1) && props.pageData.appSettings["enable_blog"] == 1 ? 
            <li>
                <Link href="/create-blog">
                    <a className="dropdown-item iconmenu"> 
                        <span className="material-icons" data-icon="rss_feed"></span>
                        {props.t("Create Blog")}
                    </a>
                </Link>
            </li>
            : null 
            }    
            {
                (props.pageData.levelPermissions["member.ads"] == 1) && props.pageData.appSettings["enable_ads"] == 1 && (props.pageData.appSettings['video_ffmpeg_path'] || props.pageData.loggedInUserDetails.level_id == 1) ? 
            <li>
                <Link href="/create-ad">
                    <a className="dropdown-item iconmenu">
                    <span className="material-icons" data-icon="subtitles"></span>
                        {props.t("Create Advertisement")}
                    </a>
                </Link>
            </li> 
            : null 
            }
        </React.Fragment>
    )
}
 export default  index