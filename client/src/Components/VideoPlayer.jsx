import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import ReactJWPlayer from 'react-jw-player';
import "../styles/main.css";

function VideoPlayer(props) {

  const [showVideoPlayer,setShowVideoPlayer] = useState(true);

  const navigation = useHistory();

  useEffect(() => {
    
    console.log("came to use effet in video player",props.url);
    let token = localStorage.getItem("token");
    console.log("token at video player",token);
    if(!token){
        setShowVideoPlayer(false);
        navigation.push("./error");
    }
  },[]);

  return (
    <div>
    
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
                            <p>Broadcaster: <strong>{props.name}</strong></p>
                        </div>
                    </div>
                    <aside className="aside">
                        <a href="#" className="aside__video" >
                            <img  src={"https://img.etimg.com/thumb/msid-66506963,width-300,imgsize-79293,,resizemode-4,quality-100/live-videos-getty.jpg"} alt="video-2"/>
                        </a>
                        <a href="#" >
                            <img className="aside__video" src={"https://img.etimg.com/thumb/msid-66506963,width-300,imgsize-79293,,resizemode-4,quality-100/live-videos-getty.jpg"} alt="video-2" />
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