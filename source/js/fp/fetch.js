const axios = require("axios");
const cheerio = require('cheerio');
const get=async (url,exp=[],link){
    let d0=await axios(url);
    let $=cheerio.load(d0)
    let d=exp.map((x,i)=>{
        txt:$(x).text(),
        url:$('a').attr('href'),
    })
    return  d;
}
export get

