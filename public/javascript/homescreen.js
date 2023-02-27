// const apiKey = process.env.API_KEY;
const fetchURL = `http://localhost:3000`

function formatDate(d)
 {
  date = new Date(d)
  var dd = date.getDate(); 
  var mm = date.getMonth()+1;
  var yyyy = date.getFullYear(); 
  if(dd<10){dd='0'+dd} 
  if(mm<10){mm='0'+mm};
  return d = dd+'/'+mm+'/'+yyyy
}

let elem='',elem2='',page='',i=1,length;
document.getElementById('searchForm').addEventListener('click',async ()=>{
    event.preventDefault();
    search = document.getElementById('search').value;
    console.log(search);
    let result = await (await fetch(`${fetchURL}/search/${search}`)).json();
    console.log(result);
    elem2=null;
    result.forEach((o) => {
        elem2+=`
        <div class="card" style="width: 100rem;">
        <img src="${o.videothumbnail}" class="card-img-top" alt="...">
        <div class="card-body">
        <h3><b>${o.videoTitle}</b></h3>
        <p><b>${o.channelTitle}</b></p>
        <p >${formatDate(o.publishedDate)}</p>
        <p class="card-text" style="white-space: nowrap; 
        width: 100rem; 
        overflow: hidden;
        text-overflow: ellipsis;">${o.videoShortDescription}</p>
        <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
    </div>&nbsp `
    });
    document.getElementById('searched').innerHTML=elem2;
    document.getElementById('default').style.display='none';
    return result;
});

let defaultData = async (pageNo,limit)=>{
    let a = await (await fetch(`${fetchURL}/videos/${pageNo}/${limit}`)).json();
    console.log(a);
    return a;
}
click=0
document.getElementById('next').addEventListener('click',(event)=>{
    event.preventDefault();
    if(length==0) i=i-1
    else i=i+1;
    elem='';
    document.getElementById('default').innerHTML= elem;
    page='';
    elements(i,10);
})
document.getElementById('previous').addEventListener('click',(event)=>{
    event.preventDefault();
    if(i==1){
        i=1;
    }
        else i=i-1;
        elem='';
        document.getElementById('default').innerHTML= elem;
        page=''
    elements(i,10);
})
const elements= async (pageNo,limit)=>{
    let b
        page+=`<li class="page-item"><a class="page-link" href="#">${i}</a></li>`
    // console.log(b);
    b = await defaultData(pageNo,limit)
    console.log(b);
    let len = b.length;
    console.log(len);
    let totalPage = Math.ceil(len/10);
    console.log(totalPage);



        page+=``
        console.log(page);
        document.getElementById("pagination").innerHTML = page;
    b.forEach((o) => {
        console.log(o);
        elem+=`<br>
            <div class="card" style="width: 100rem;">
                <img src="${o.videothumbnail}" class="card-img-top" alt="...">
                <div class="card-body">
                <h3><b>${o.videoTitle}</b></h3>
                <p><b>${o.channelTitle}</b></p>
                <p >${formatDate(o.publishedDate)}</p>
                <p class="card-text" style="white-space: nowrap; 
                width: 50%; 
                overflow: hidden;
                text-overflow: ellipsis;">${o.videoShortDescription}</p>
                <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
            </div> <br>`
    });
    document.getElementById('default').innerHTML= elem;
    length= b.len;
}

elements(1,10);