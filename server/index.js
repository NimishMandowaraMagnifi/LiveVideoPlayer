require('dotenv').config();
const express = require('express');
const app = express();
let cors = require('cors');
let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

const Auth = require('./Auth');
const Broadcasters = require("./Broadcasters")

app.use('/auth/',Auth); //Auth file where OAuth token is generated
app.use('/broadcaster/',Broadcasters);

app.listen(parseInt(process.env.APPPORT), () => {
    console.log(`Server started and listening on port ${process.env.APPPORT} !`);
});

module.exports = app;