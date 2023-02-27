require('dotenv').config();
const { default: axios } = require("axios");

// $(document).ready(function(){
//     let apiKey = "##yourapikey##"
 
//     $("form").submit((e) => {
//         e.preventDefault()
//         let search = $("#search").val()
//         videoSearch(apiKey,search,10)
//     })
// })

let call=0;
async function videoHome(apiKey,maxResults){
    console.log(call++);
    let response= await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&key=${apiKey}&maxResults=${maxResults}&order=date`)
    // console.log(response);
    return response;
}

async function videoSearch(apiKey,maxResults,search){
    console.log(call++*100);
    let response= await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&key=${apiKey}&maxResults=${maxResults}&order=date&q=${search}`)
    // console.log(response);
    return response;
}

async function videoNextPage(apiKey,maxResults,nextPageToken){
    try{
        console.log(call++);
    let response= await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&key=${apiKey}&maxResults=${maxResults}&order=date&pageToken=${nextPageToken}`);
    // console.log(response);
    return response;
    }
    catch(err){
        console.log("error")
    }
}


module.exports = {
    videoHome,
    videoSearch,
    videoNextPage
}