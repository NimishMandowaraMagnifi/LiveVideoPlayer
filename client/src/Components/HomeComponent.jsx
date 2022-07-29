import React from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

function HomeComponent() {
    const navigation = useHistory();

    const OAuthToken = async() => {

        const headers= {
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        console.log("env var",process.env.REACT_APP_CLIENT_ID)

        const oAuthBody = {
            client_id : process.env.REACT_APP_CLIENT_ID,
            client_secret: process.env.REACT_APP_CLIENT_SECRET,
            grant_type: process.env.REACT_APP_GRANT_TYPE
        }

        axios.post("https://id.twitch.tv/oauth2/token",oAuthBody,headers).then(
        (response) => {
            let result = response.data;
            console.log("result from OAuth",result);
            localStorage.setItem("token", JSON.stringify(result.access_token));
            localStorage.setItem("expiresIn", JSON.stringify(result.expires_in));

            navigation.push("../broadcaster",{ replace: true });
        },
        (error) => {
            console.log("error at oauth toekn generation",error);
            navigation.push("./error");
        });
    }

    return (
        <div style={{textAlign:"center",marginTop:"30px"}}>
          <h1>Generate Auth Token</h1>
          <button className = "btn btn-outline-secondary" onClick={() => OAuthToken()}>
            Get Token
          </button>
        </div>
      );
}

export default HomeComponent;