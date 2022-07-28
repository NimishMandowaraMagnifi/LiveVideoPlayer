import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ErrorComponent from "./ErrorComponent"
import VideoPlayer from './VideoPlayer';

function IndexComponent() {
  const [error, setError] = useState(false);
  const [broadcasters, setBroadcasters] = useState([]);
  const [showTableData, setShowTableData] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [showBroadcasterName, setShowBroadcasterName] = useState("");
  const [url, setUrl] = useState("");
  
  const OAuthToken = async() => {

    axios.post("http://localhost:5000/auth/token").then(
      (response) => {
          let result = response.data;
          console.log("result from OAuth",result);
          localStorage.setItem("token", JSON.stringify(result.data.token));
          localStorage.setItem("expiresIn", JSON.stringify(result.data.expires_in));

          getSubscriberList()
      },
      (error) => {
          console.log("error at oauth",error);
          setError(true)
      }
    );
  }

  const getSubscriberList = () => {
    let extensionId = "4xbv0wcmq7w91n66b3bh417irlsja1"

    let token = localStorage.getItem("token");

    console.log("token",token);

    if(!token){
      setError(true);
    }else{
  
      axios.get("http://localhost:5000/broadcaster/list/",
      { params: { extensionId }, headers: { Authorization: token }  }).then(
        (response) => {
            let result = response.data;
            console.log("result from get broadcasters",result);

            setBroadcasters([...result.data]);
            setShowTableData(true);
        },
        (error) => {
            console.log("error at get broadcasters",error);
            setError(true);
            setShowTableData(false);
        }
      );
    }
  }

  const getUrlData = async(name) => {

    console.log("calling url Data func");

    let token = localStorage.getItem("token");

    console.log("token",token);

    if(!token){
      setError(true);
    }else{
        console.log("selected name", name)
      axios.get("http://localhost:5000/broadcaster/url",
      { params: { "name" : name }, headers: { Authorization: token }  }).then(
        (response) => {
            let result = response.data;
            console.log("result from get url data",result.url);
            setUrl(result.url);
            setShowVideoPlayer(true);
        },
        (error) => {
            console.log("error at get url data",error);
            setUrl("");
            setShowVideoPlayer(true);
        }
      );
    }
  }
 
  useEffect(() => {
    console.log("Generating OAuth Token");
    OAuthToken();
  }, []);

  const handleRowClick = async(id,name) => {
    console.log("entered in handle row click", id,name);
    setShowBroadcasterName(name);
    getUrlData(name);
  }

  return (
    <div>
      {error ? <ErrorComponent /> : null}
      {showVideoPlayer ? <VideoPlayer url={url}/> : null}
      {showTableData ? 
        <div className="container" style={{marginTop: "20px"}}>
            <h1>List Of Subscribers: </h1>
            <table className="table table-bordered table-striped table-hover">
                <tbody>{
                broadcasters.map((item,index) => (
                    
                    <tr key={item.broadcaster_id} onClick={()=>handleRowClick(item.broadcaster_id,item.broadcaster_name)}>
                        <td>{item.broadcaster_name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    :null}
    </div>
  );
}

export default IndexComponent