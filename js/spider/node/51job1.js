var request = require('superagent');
require('superagent-proxy')(request);
require('superagent-charset')(request)

const cheerio = require('cheerio')
const R=require("ramda")
const stream = require('stream');
const fs = require('fs');


//https://github.com/visionmedia/superagent
/*
get=u=>request.get(u).set(HEADERS).charset('gbk').then(( {'_events', 'res', 'req', 'text', 'headers', 'status', 'statusType', 'info', 'ok',)=>text)
const agent = request.agent();
agent.post(searchUrl)....

*/
HEADERS={
	"User-Agent": `Mozilla/5.0 (X11; Linux x86_64; rv:67.0) Gecko/20100101 Firefox/67.0`,
	"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
	"Accept-Language": "en-US,en;q=0.5",
	"Accept-Encoding": "gzip, deflate, br",
    "Content-type":"text/html;charset=utf-8",
	"Referer": "https://search.51job.com/list/040000,000000,0000,00,9,99,%25E5%2590%258E%25E5%258F%25B0%25E5%25BC%2580%25E5%258F%2591,2,1.html?lang=c&stype=1&postchannel=0000&workyear=99&cotype=99&degreefrom=99&jobterm=99&companysize=99&lonlat=0%2C0&radius=-1&ord_field=0&confirmdate=9&fromType=&dibiaoid=0&address=&line=&specialarea=00&from=&welfare=",
	"DNT": "1",
	"Connection": "keep-alive",
/*	"Cookie":
   [ 'guid=12caa0694bb6fe802d6c0cdf5c6d4657; expires=Fri, 30-Apr-2021 07:31:08 GMT; path=/; domain=.51job.com; httponly',
     'search=jobarea%7E%60040000%7C%21; expires=Thu, 30-Apr-2020 07:31:08 GMT; path=/; domain=.51job.com; httponly',
     'nsearch=jobarea%3D%26%7C%26ord_field%3D%26%7C%26recentSearch0%3D%26%7C%26recentSearch1%3D%26%7C%26recentSearch2%3D%26%7C%26recentSearch3%3D%26%7C%26recentSearch4%3D%26%7C%26collapse_expansion%3D; expires=Thu, 30-Apr-2020 07:31:08 GMT; path=/; domain=.51job.com; httponly',
     'search=jobarea%7E%60040000%7C%21ord_field%7E%600%7C%21; expires=Thu, 30-Apr-2020 07:31:08 GMT; path=/; domain=.51job.com; httponly',
     'nsearch=jobarea%3D%26%7C%26ord_field%3D%26%7C%26recentSearch0%3D%26%7C%26recentSearch1%3D%26%7C%26recentSearch2%3D%26%7C%26recentSearch3%3D%26%7C%26recentSearch4%3D%26%7C%26collapse_expansion%3D; expires=Thu, 30-Apr-2020 07:31:08 GMT; path=/; domain=.51job.com; httponly',
     'search=jobarea%7E%60040000%7C%21ord_field%7E%600%7C%21recentSearch0%7E%601%A1%FB%A1%FA040000%2C00%A1%FB%A1%FA000000%A1%FB%A1%FA0000%A1%FB%A1%FA00%A1%FB%A1%FA9%A1%FB%A1%FA99%A1%FB%A1%FA99%A1%FB%A1%FA99%A1%FB%A1%FA99%A1%FB%A1%FA99%A1%FB%A1%FA99%A1%FB%A1%FA%BF%AA%B7%A2%B9%A4%B3%CC%CA%A6%A1%FB%A1%FA2%A1%FB%A1%FA%A1%FB%A1%FA-1%A1%FB%A1%FA1556695868%A1%FB%A1%FA0%A1%FB%A1%FA%A1%FB%A1%FA%7C%21; expires=Thu, 30-Apr-2020 07:31:08 GMT; path=/; domain=.51job.com; httponly',
     'nsearch=jobarea%3D%26%7C%26ord_field%3D%26%7C%26recentSearch0%3D%26%7C%26recentSearch1%3D%26%7C%26recentSearch2%3D%26%7C%26recentSearch3%3D%26%7C%26recentSearch4%3D%26%7C%26collapse_expansion%3D; expires=Thu, 30-Apr-2020 07:31:08 GMT; path=/; domain=.51job.com; httponly' ] ,*/
	"Upgrade-Insecure-Requests": "1",
	"Pragma": "no-cache",
    "Cache-Control": "no-cache",
}


get=u=>request.get(u).set(HEADERS).charset('gbk').buffer(true)
gets=(u=[])=>Promise.all(u.map(get))


const write1=(n='example.txt',s="hello")=>{
    const file = fs.createWriteStream(n);
    file.write(s);
    file.end('');
    console.log(':)')
}
const parse=(d)=>{
      $ = cheerio.load(d),
      tag='[class*="topic-"]'
 return $(tag).map(function(i, el) {
  let
     _t=$(this),
     q=['.media-heading a[title]',".timeago",".info>.user-name",".media-right a",".node"],
     [l,t,user,count,node]=q.map(x=>_t.find(x));
     return  {
         title:l.attr('title'),
         href: "https://ruby-china.org" + l.attr('href'),
         time: t.attr('title'),
         user:user.attr('data-name'),
         count:count ? +count.text():0,
         node:node.text(),
     }
    }).get()
}

const parse_index=(d)=>{
      $ = cheerio.load(d),
      tag=".page-item:nth-last-child(2) a"
      return +$(tag).text()
}


main=(n=500)=>{
    u=`https://search.51job.com/list/040000,000000,0000,00,9,99,%25E5%25BC%2580%25E5%258F%2591%25E5%25B7%25A5%25E7%25A8%258B%25E5%25B8%2588,2,1.html?lang=c&stype=&postchannel=0000&workyear=99&cotype=99&degreefrom=99&jobterm=99&companysize=99&providesalary=99&lonlat=0%2C0&radius=-1&ord_field=0&confirmdate=9&fromType=&dibiaoid=0&address=&line=&specialarea=00&from=&welfare=`
   us=R.range(0,n||100).map((x,i)=>u.replace("@",i))
   p=await gets(us)
   console.log('begin parse')
   r=p.map(parse).flat()
   r1=JSON.stringify(r,null,"\t")
   console.log('begin write json file')
   write1("51.json",r1)

}



