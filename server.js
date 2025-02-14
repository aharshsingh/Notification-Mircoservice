const express = require('express')
const app = express();
const {PORT} = require('./config/index');

app.listen(()=>{
    console.log(`App is listening to ${PORT}`);
})