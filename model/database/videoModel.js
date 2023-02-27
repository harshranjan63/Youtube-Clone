const mongoose=require('mongoose');

const videoSchema= new mongoose.Schema({
    publishedDate : Date,
    videoId : String,
    channelId : String,
    videoTitle : String,
    channelTitle : String,
    videoShortDescription : String,
    videothumbnail : String
});

const videoData = mongoose.model('videosData',videoSchema);

module.exports = videoData ;
