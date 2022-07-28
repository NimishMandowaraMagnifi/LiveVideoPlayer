const express = require('express');
const Subscriber = express.Router();
const router = express.Router();
const axios = require("axios");
const twitch = require("twitch-m3u8");

router.get("/list/",async(req,res)=>{

    try{

        console.log("came at susb");

        const {extensionId} = req.query
        let token = req.headers.authorization;

        token = token.replace(/^"(.*)"$/, '$1');

        console.log(token,extensionId)

        if(!extensionId || !token){
            res.status(400).json({
                status: 400,
                success: false,
                error:"Bad Request!"
            });
            return;
        }

        let broadcasterList = [];

        const headers = {
            "Client-Id" : process.env.CLIENT_ID,
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        console.log("headers",headers)

        await axios.get(`https://api.twitch.tv/helix/extensions/live?extension_id=4xbv0wcmq7w91n66b3bh417irlsja1`,
        {headers: headers}).then(
        (response) => {
            let result = response.data;
            console.log("result from subs data",result);

            broadcasterList = [...result.data]

            res.status(200).json({
                status: 200,
                success: true,
                data:broadcasterList
            });
            return;
        },
        (error) => {
            console.log("error at broadcaster list",error);
            res.status(400).json({
                status: 400,
                success: false,
                error:"Bad Request!"
            });
            return;
        }
        );

    }catch(error){
        console.log("error occured at broadcaster list",error);
        res.status(500).json({
            status: 500,
            success: false,
            error:"Something went wrong!"
        });
        return;
    }
});

router.get("/url/",async(req,res)=>{

    try{

        console.log("came at susb for url");

        const name = req.query.name
        let token = req.headers.authorization;

        //replacing "" from token if any
        token = token.replace(/^"(.*)"$/, '$1');

        console.log(token,name)

        if(!token || !name){
            res.status(400).json({
                status: 400,
                success: false,
                error:"Bad Request!"
            });
            return;
        }

        //calling twitch api function
        twitch.getStream(name, true)
        .then(data => {console.log("url", data);
            let urlRegex = /(https?:\/\/[^ ]*?m3u8)/;
            //Fetching Video Url from the payload
            let url = `${data}`.match(urlRegex);
            //since there are 2 url in the payload, only first one works
            res.status(200).json({
                status: 200,
                success: true,
                url:url[0]
            });
            return;
        })
        .catch(error => {
            console.log("error at broadcaster url",error);
            res.status(400).json({
                status: 400,
                success: false,
                error:"Bad Request!"
            });
            return;
        });

    }catch(error){
        console.log("error occured at broadcaster url",error);
        res.status(500).json({
            status: 500,
            success: false,
            error:"Something went wrong!"
        });
        return;
    }
});

module.exports = router;