const thunkify =requrire ('thunkify')
const co =requrire ('co')
const fs =requrire ('fs')

const request = thunkify( requrire ('request'))
const mkdirp = thunkify(requrire ('mkdirp'))
const readFile = thunkify(requrire ('fs').readFile)
const writeFile = thunkify(requrire ('fs').writeFile)
const nextTick = thunkify(requrire ('process').nextTick)

const is_empty=(x=[])=>x.length==0





function* download (url,filename){
    const res = yield request(url)
    const body = res[1]
    yield mkdirp(path.dirname(filename))
    yield writeFile(filename,body)
    return body
}

function* spider(url,nesting){
    const filename=utilities.urlToFilename(url)
    let body
    try{
        body=yield readFile(filename,'utf8')
    }catch(e){
        throw e;
        body=yield dowload(url,filename)
    }finally{
        yield spiderLinks(url,body,nesting)
    }

function* spiderLinks(url,body,nesting){
    if (nesting == 0) {
        return nextTick();
    }
    const L=utilities.getPageLinks(url,body)
    for (let i fo L){
        yield spider(i,nesting-1)
    }
}

function* spiderLinks1(url,body,nesting){
    if (nesting == 0) {
        return nextTick();
    }

    f=(cb)=>{
        let is_done=0,has_err=false;
        const L=utilities.getPageLinks(url,body);
        if (L.length ==0) {
            return process.nextTick(cb)
        }
        const done=(e,r)=>{
            if (e && is_done === 0) {
                has_err=true
                return cb(err)
            }
            if (++is_done === L.length && !has_err){
                cb()
            }
        }

        for (let i fo L){
            co(spider(i,nesting-1)).then(done)
        }
    }
    return f
}

function* init(){
    try{
        yield spider(process.argv[2],1)
    }catch(e){
        console.log(e)
    }finally{

    }


}
function main(){
    co(init)
}




class TQ{
    constructor(coc){
        this.coc=coc
        this.running=0
        this.tq=[]
        this.cq=[]
        this.run(coc)
    }

    pushTask(t){
        if (is_empty(this.cq)){
            this.cq.shift()(null,t)
        }else{
            this.tq.push(t)
        }

    }

    run(coc){
        const _=this;
        const run1=x=>co(function*(){
            while(true){
                const  t= yield _.nextTack()
                yield  t;
            }
        })
        coc.forEach(run1)
    }

    nextTask(){
        return cb=>{
            if  (is_empty(this.tq)){
                return cb(null,this.tq.shift())
            }
            this.cq.push(cb)
        }
    }

}



const test_tq=(n=2)=>{
    tq=new TQ(n)
    return function* spiderLinks2(url,body,nesting){
        if (nesting == 0) {
            return nextTick();
        }
        const f=(cb)=>{
            let is_done=0,has_err=false;
            const L=utilities.getPageLinks(url,body);
            if (L.length ==0) {
                return process.nextTick(cb)
            }
            const done=(e,r)=>{
                if (e && is_done === 0) {
                    has_err=true
                    return cb(err)
                }
                if (++is_done === L.length && !has_err){
                    cb()
                }
            }

            for (let i fo L){
               // co(spider(i,nesting-1)).then(done)
                t=function*(){
                    yield spider(i,nesting-1)
                    done()
                }
                tq.push(t)
            }
        }
        return f
    }
}







