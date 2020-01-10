const fs=require('fs')
const zlib=require('zlib')
const file=process.argv[2]
const R=require('ramda')
const http=require('http')
const path=require('path')

const say=R.curryN(2, console.log)
const name_gen=x=>x+".gz"


const zip=(file)=>{
    fs.createReadStream(file)
                .pipe(zlib.createGzip())
                .pipe(fs.WriteStream(name_gen(file)))
                .on('finish',say('done'))
}

const s= http.createServer(
    (req,res)=>{
            console.log(req)
           // const n=req.headers.filename
            console.log(req.headers)
            const n="./ccc"
            req
            .pipe(zlib.createGunzip())
            .pipe(fs.WriteStream(n))
            .on('finish',()=>{
                res.writeHead(201,{})
                res.end(':)\n')
            })
        }
)
s.listen(3000,say('start'))

