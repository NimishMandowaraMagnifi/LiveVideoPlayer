const express = require('express');
const router = express.Router();
const axios = require("axios")

router.post("/token/",async(req,res)=>{

    try{

        const headers= {
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        const oAuthBody = {
            client_id : process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            grant_type: process.env.GRANT_TYPE
        }

        axios.post("https://id.twitch.tv/oauth2/token",oAuthBody,headers).then(
        (response) => {
            let result = response.data;
            console.log("result from OAuth",result);

            let tokenData = {
                token: `${result.access_token}`,
                expires_in: result.expires_in
            }

            res.status(200).json({
                status: 200,
                success: true,
                data:tokenData
            });
            return;
        },
        (error) => {
            console.log("error at oauth toekn generation",error);
            res.status(400).json({
                status: 400,
                success: false,
                error:"Bad Request!"
            });
            return;
        }
        );
    }catch(error){
        console.log("error occured at OAuth Generation",error);
        res.status(500).json({
            status: 500,
            success: false,
            error:"Something went wrong!"
        });
        return;
    }
});

module.exports = router;