const fetch=require('node-fetch')
const cheerio = require('cheerio')
const R=require("ramda")
const stream = require('stream');
const fs = require('fs');


const headers_parser=x=>Object.fromEntries(x.replace(/--compressed /,"").replace(/'/g,"").split(` -H `).splice(1).map(y=>y.split(": ")))


const duokan_header=()=>({
  "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:67.0) Gecko/20100101 Firefox/67.0",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
  "Referer": "http://www.duokan.com/list/327-3-1",
  "DNT": "1",
  "Connection": "keep-alive",
//  "Cookie": "device_id=D900GQTDMN877RWP; app_id=web; bdshare_firstime=1556157805488; channel=49PXVQ; Hm_lvt_1c932f22da573f2870e8ab565f4ff9cb=1556157809; wx_open_id=oEwaN0VYDH3BhuvmvHRyRvqNWWUM; user_id=1000037785742; token=5DJMnr_Cp_yfSgF-4_A_8t7hzD_myugOHhQIOhD1dbb_j-9uNelb3MqKleN2bUQZ; userId=5DJMnr_Cp_yfSgF-4_A_8t7hzD_myugOHhQIOhD1dbb_j-9uNelb3MqKleN2bUQZ; last_uid=5DJMnr_Cp_yfSgF-4_A_8t7hzD_myugOHhQIOhD1dbb_j-9uNelb3MqKleN2bUQZ; last_user=1000037785742; reader_preference=horizontal; Hm_lpvt_1c932f22da573f2870e8ab565f4ff9cb=1556168655; store_noob=check",
  "Upgrade-Insecure-Requests": "1",
  "Pragma": "no-cache",
  "Cache-Control": "no-cache"
})

const get_option=(o={})=>({
    method: 'GET',
    body: null,
    headers: {},
    redirect: 'follow',
    signal: null,
    follow: 20,
    timeout: 0,
    compress: true,
    size: 0,
    agent: null,
    ...o,
})

 let HOME="http://www.duokan.com"
parse_detail=(d,catagory="")=>{
 let
      $ = cheerio.load(d),
     tag='li[data-id]';
 return $(tag).map(function(i, el) {
  let
        _t=$(this),
        ll=['a.title','p.desc','.u-author span','span.num','.cover img'],
        id=_t.attr('data-id'),
        link=_t.find(ll[0]),
        href=HOME + link.attr('href'),
        [name,desc,author,rate1,cover1]=ll.map(x=>_t.find(x).text()),
         cover=_t.find(R.last(ll)).attr('src'),
        rate=+rate1.match(/\d+/)[0];
        return { id, name, href, desc, author, rate, cover,catagory }
    }).get()
}

parse_index=(d)=>{
     let  $ = cheerio.load(d),
         tag='li.level1 a';
     return  list=$(tag).map(function(i,el){
           let _t=$(this),
            url=HOME+_t.attr('href'),
            [,name,qty1]=_t.text().split('\n'),
             qty=+qty1,
            pages=Math.ceil(qty/14);
            links=Array(pages).fill(0).map((x,i)=>url.slice(0,-1)+(i+1));
            return{name,url,qty,pages,links}
        }).get()
}

const get=(u)=>fetch(u,get_option({headers:duokan_header()})).then(x=>x.text())

const gets=(u=[])=>Promise.all(u.map(get))
const get_a_page=async ({links,name,...u})=>{
          console.log(name,"start")
          book1=await gets(links)
          book=book1.map(x=>parse_detail(x,name))
                    .flat()
                    .sort((b,a)=>a.rate-b.rate)
          console.log(name,"done")
          return {name,...u,book}
}

const write1=(n='example.txt',s="hello")=>{
    const file = fs.createWriteStream(n);
    file.write(s);
    file.end('');
    console.log(':)')
}



main=async(u=`http://www.duokan.com/list/1-3-1`,file_name="book.json")=>{
        u
        d=await get(u)
        urls=parse_index(d)
        books=[]
        for await (let i of urls.map(get_a_page)){
            books.push(i)
        }
        console.log('done')
        write1(file_name,JSON.stringify(books, undefined, '\t'))
}
//main()
main("http://www.duokan.com/list/327-3-1","it.json")



curl_gen=(a,b)=>`curl 'http://www.duokan.com/list/${a}-${b}' -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:67.0) Gecko/20100101 Firefox/67.0' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' -H 'Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2' --compressed -H 'Referer: http://www.duokan.com/list/327-3-1' -H 'DNT: 1' -H 'Connection: keep-alive' -H 'Cookie: device_id=D900GQTDMN877RWP; app_id=web; bdshare_firstime=1556157805488; channel=49PXVQ; Hm_lvt_1c932f22da573f2870e8ab565f4ff9cb=1556157809; wx_open_id=oEwaN0VYDH3BhuvmvHRyRvqNWWUM; user_id=1000037785742; token=5DJMnr_Cp_yfSgF-4_A_8t7hzD_myugOHhQIOhD1dbb_j-9uNelb3MqKleN2bUQZ; userId=5DJMnr_Cp_yfSgF-4_A_8t7hzD_myugOHhQIOhD1dbb_j-9uNelb3MqKleN2bUQZ; last_uid=5DJMnr_Cp_yfSgF-4_A_8t7hzD_myugOHhQIOhD1dbb_j-9uNelb3MqKleN2bUQZ; last_user=1000037785742; reader_preference=horizontal; Hm_lpvt_1c932f22da573f2870e8ab565f4ff9cb=1556168655; store_noob=check' -H 'Upgrade-Insecure-Requests: 1' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache'`

