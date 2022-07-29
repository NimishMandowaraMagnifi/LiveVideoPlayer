import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import VideoPlayer from './VideoPlayer';

function IndexComponent() {
  const [broadcasters, setBroadcasters] = useState([]);
  const [showTableData, setShowTableData] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [url, setUrl] = useState("");
  const [showBroadcasterName,setShowBroadcasterName] = useState("")

  const navigation = useHistory();

  const getSubscriberList = () => {
    let extensionId = process.env.REACT_APP_EXTENSION_ID

    let token = localStorage.getItem("token");

    console.log("token",token);

    if(!token){
      navigation.push("./error");
    }else{
  
      axios.get(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/broadcaster/list/`,
      { params: { extensionId }, headers: { Authorization: token }  }).then(
        (response) => {
            let result = response.data;
            console.log("result from get broadcasters",result);

            setBroadcasters([...result.data]);
            setShowTableData(true);
        },
        (error) => {
            console.log("error at get broadcasters",error);
            setShowTableData(false);
            navigation.push("./error");
        }
      );
    }
  }

  const getUrlData = async(name) => {

    console.log("calling url Data func");

    let token = localStorage.getItem("token");

    console.log("token",token);

    if(!token){
      navigation.push("./error");
    }else{
        console.log("selected name", name)
        axios.get(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/broadcaster/url`,
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
    getSubscriberList();
  }, []);

  const handleRowClick = async(id,name) => {
    console.log("entered in handle row click", id,name);
    setShowBroadcasterName(name);
    getUrlData(name);
  }

  return (
    <div>
      {/* {error ? <ErrorComponent /> : null} */}
      {showVideoPlayer ? <VideoPlayer url={url} name={showBroadcasterName}/> : null}
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
