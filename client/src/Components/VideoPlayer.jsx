import React, { useState, useEffect } from 'react';
import ReactJWPlayer from 'react-jw-player';
import ErrorComponent from "./ErrorComponent"
import "../styles/main.css";

function VideoPlayer(props) {
  const [url, setUrl] = useState("");
  const [error,setError] = useState(false);
  const [showVideoPlayer,setShowVideoPlayer] = useState(true);

  useEffect(() => {
    
    console.log("came to use effet in video player",props.url);
    let token = localStorage.getItem("token");
    console.log("token at video player",token);
  },[]);

  return (
    <div>
        {error ? <ErrorComponent /> : null}
        {showVideoPlayer ? 
            <div>
                <div className="main-wrapper">
                <div className="left"></div>
                <main>
                    <div className="main__video">
                        <div className="main__video-container">
                        <ReactJWPlayer
                            playerId='myElement'
                            playerScript='https://cdn.jwplayer.com/libraries/zCI2rGRk.js'
                            file={props.url}
                        />   
                        </div>
                        <div className="main__description">
                            <p>Video Name</p>
                        </div>
                    </div>
                    <aside className="aside">
                        <a href="#" className="aside__video" >
                            <img  src={"https://img.etimg.com/thumb/msid-66506963,width-300,imgsize-79293,,resizemode-4,quality-100/live-videos-getty.jpg"} />
                        </a>
                        <a href="#" >
                            <img className="aside__video" src={"https://img.etimg.com/thumb/msid-66506963,width-300,imgsize-79293,,resizemode-4,quality-100/live-videos-getty.jpg"} />
                        </a>
                        <div className="aside__more">
                            <a href="#">SHOW MORE</a>
                        </div>
                    </aside>
                </main>
                </div>
            </div>
    :null}
    </div>
  );
}

export default VideoPlayer