const fs=require('fs')
const zlib=require('zlib')
const file=process.argv[2]
const R=require('ramda')


const say=R.curryN(2, console.log)
const name_gen=x=>x+".gz"
fs.createReadStream(file)
            .pipe(zlib.createGzip())
            .pipe(fs.WriteStream(name_gen(file)))
            .on('finish',say('done'))


