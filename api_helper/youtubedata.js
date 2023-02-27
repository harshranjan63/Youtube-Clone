const { videoSearch, videoHome, videoNextPage } = require('./youtube');

const getVideoData = async (apiKey,maxResults,search)=>{
    let resp
    // console.log(nextPageToken);
    if(search)resp = await videoSearch(apiKey,maxResults,search);
    // if(nextPageToken)resp = await videoNextPage(apiKey,maxResults,nextPageToken)
    else resp = await videoHome(apiKey,maxResults);
    // console.log(resp.data)
    let data=[];
    let publishedDate,videoId,channelId,videoTitle,channelTitle,videoShortDescription,videothumbnail;
    resp?.data?.items?.forEach((o) => {
        publishedDate = o?.snippet?.publishedAt;
        videoId = o?.id?.videoId;
        channelId = o?.snippet?.channelId;
        videoTitle = o?.snippet?.title;
        channelTitle = o?.snippet?.channelTitle;
        videoShortDescription = o?.snippet?.description;
        videothumbnail = o?.snippet?.thumbnails?.medium?.url;
        data.push({
            publishedDate,
            videoId,
            channelId,
            videoTitle,
            channelTitle,videoShortDescription,videothumbnail
        })
    });
    data.push({nextPageToken:resp?.data?.nextPageToken});
    return data;
}
const getVideoDataNextPage = async (apiKey,maxResults,nextPageToken)=>{
    let resp2
    console.log("hi"+nextPageToken);
    if(nextPageToken)resp2 = await videoNextPage(apiKey,maxResults,nextPageToken);
    else return [];
    // console.log(resp.data)
    let data2=[];
    let publishedDate,videoId,channelId,videoTitle,channelTitle,videoShortDescription,videothumbnail;
    resp2?.data?.items?.forEach((o) => {
        publishedDate = o?.snippet?.publishedAt;
        videoId = o?.id?.videoId;
        channelId = o?.snippet?.channelId;
        videoTitle = o?.snippet?.title;
        channelTitle = o?.snippet?.channelTitle;
        videoShortDescription = o?.snippet?.description;
        videothumbnail = o?.snippet?.thumbnails?.medium?.url;
        data2.push({
            publishedDate,
            videoId,
            channelId,
            videoTitle,
            channelTitle,videoShortDescription,videothumbnail
        })
    });
    let tokenid = resp2?.data2?.nextPageToken
    data2.push({nextPageToken: resp2?.data2?.nextPageToken || ''});
    return data2;
}

module.exports = {
    getVideoData,
    getVideoDataNextPage
}