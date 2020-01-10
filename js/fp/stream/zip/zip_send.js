const fs=require('fs')
const zlib=require('zlib')
const file=process.argv[2]
const R=require('ramda')
const http=require('http')
const path=require('path')

const say=R.curryN(2, console.log)
const name_gen=x=>x+".gz"
const [,,file_name,server]=process.argv
const op={
    host:server,
    port:3000,
    path:'/',
    method:'PUT',
    headers:{
        filename:path.basename(file_name),
        'Content-Type' :"application/octet-stream",
        'Content-Encoding':'gip'

    }
}
const req=http.request(op,say('receive'))

fs.createReadStream(file)
            .pipe(zlib.createGzip())
            .pipe(req)
            .on('finish',say('done'))

