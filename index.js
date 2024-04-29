const express = require('express');
const {connection} = require('./connect')
const urlRoute = require('./routes/url')
const app = express();
const PORT = 8001;

connection('mongodb://127.0.0.1:27017/url-shortener-database').then(()=>{
    console.log("mongodb connection established")
})

app.use('/url', urlRoute);

app.listen(PORT, ()=>{
    console.log(`server is started at PORT ${PORT}`)
})
