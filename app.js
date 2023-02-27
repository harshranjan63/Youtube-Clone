require('dotenv').config();
const express=require("express");
const mongoose=require('mongoose');
const videoData = require('./model/database/videoModel');

const app=express();
const port=process.env.PORT || 8080;
const path=require("path")
// const apiKey=process.env.API_KEY;
const apiKey=process.env.API_KEY;
const youtubeApis=require('./api_helper/youtubedata');
const { default: axios } = require('axios');
const { response, json } = require('express');
const server = require('http').createServer(app);

mongoose.connect('mongodb://127.0.0.1:27017/YoutubeData').then(()=>{console.log("Datebase Connected!!")}).catch((err)=>{handleError(err);console.log('error in Mondodb connection: '+ err);console.error('error in Mondodb connection: ' + err);});

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/public/html/index.html'));
})


//for test
app.get('/videos/:page/:limit',async(req,res)=>{
    // let maxresults = req.params.maxresults;
    // console.log(maxresults);
    let  page = req.params.page;
    let  limit = req.params.limit;
    console.log("call!");
    await  videoData.find({}, function (err, users) {
        // console.log(users);
        res.send(users);
    }).limit(limit *1).skip((page-1)*limit).catch(function(err){ console.log(err)});
})

app.get('/search/:search',async(req,res)=>{
    let serachTXT = req.params.search
    console.log("call!")
    data = await youtubeApis.getVideoData(apiKey,20,serachTXT);
    // console.log(data);
    res.send(data);
})

app.post('/save3',async (req,res)=>{
    const data=new videoData(req.body);
    await data.save();
    console.log('Data Saved!');
    res.send("Data Saved!");
})
// app.listen(port,async (err)=>{
//     if (err) console.log("Error in server setup");
//     console.log(`App is listioning at http://localhost:${8080}`);
//     let data = await youtubeApis.videoSearch(apiKey);
// });
let call=5;
let saveData = async (token)=>{
    console.log(token);
    console.log(call++)
    let data 
    if(token) data = await youtubeApis.getVideoDataNextPage(apiKey,50,token);
    else data = await youtubeApis.getVideoData(apiKey,50)
    data = Object.entries(data).map((e) => ( { [e[0]]: e[1] } ));
    console.log(typeof(data));
    let nextPageToken = data.pop();
    nextPageToken = Object.values(nextPageToken)[0]?.nextPageToken;
    // console.log(nextPageToken);
    let responseData
    let count=0
    data.forEach(o => {
        // console.log(typeof(o))
        // console.log(Object.values(o)[0])
        responseData = new videoData(Object.values(o)[0]);
        responseData.save();
    });
    // console.log(responseData);
    // responseData.save().then((res)=>{});
    console.log("Data Saved!")
    // console.log(data);
    if(nextPageToken) {
        console.log('hi')
        // console.log(nextPageToken);
        saveData(nextPageToken)
    }
}

const deleteAllData = async () => {
    try {
      await videoData.deleteMany();
      console.log('All Data successfully deleted');
    } catch (err) {
      console.log(err);
    }
  };
server.listen(port, async (req, res) => {
    console.log("🚀 backend app running on port", port);
    setInterval(()=>{deleteAllData();saveData();}, 1000*60*30);
    deleteAllData();
    saveData();
  });