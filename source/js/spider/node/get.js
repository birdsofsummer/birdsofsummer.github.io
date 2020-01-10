const http=require('https');
const fetch=require('node-fetch')
const axios=require('axios')
const iconv = require('iconv-lite')

get=(u)=>new Promise((resolve)=>{
     o={
      headers:HEADERS,
    }
    http.get(u,o,function(res){
        var length=0;
        var arr=[];
        res.on("data",function(chunk){
            arr.push(chunk);
            length+=chunk.length;
        });
        res.on("end",function(){
          var data=Buffer.concat(arr,length);
          let a=iconv.decode(data,'gb2312').toString()
          let {statusCode,statusMessage,headers}=res
          console.log({u,statusCode,statusMessage})
            if (statusMessage != "OK") {
               reject(res)
            }else{
 //           console.log(res.headers['set-cookie'])
               resolve(a)
            }
        })
    })
})


