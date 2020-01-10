const fs=require("fs")
const path=require('path')

const it=x=>x
const is_function=x=>x.constructor == Function
const read_file=(file,o={})=>(cb=it)=>fs.readFile(file,o,cb)
const file_name=()=>{
    const n=path.basename(__filename)
    const [a,b]=n.split('.')
    const n1=a+"_1"+"."+b
    return [n,n1]
}


const async_flow=(gf)=>{
    const cb=(err,...arg)=>{
        if (err) { return g.throw(err)}
        const a = arg.length > 1 ? arg : arg[0]
        g.next(a)
    }
    const g=gf(cb)
    g.next()
}


const async_flow1=(gf)=>{
    const cb=(err,...arg)=>{
        if (err) { return g.throw(err)}
        const a = arg.length > 1 ? arg : arg[0]
        const t = g.next(a).value
        t && t(cb)
    }
    const g=gf()
    const t=g.next().value
    tt && t(cb)
}


function *clone_self(f=it){
    const [n,n1]=file_name()
    const me=yield fs.readFile(n,'utf8',f)
    yield fs.writeFile(n1,me,f)
}

const readFileThunk=(n,encode='utf8')=>f=>fs.readFile(n,encode,f)
const writeFileThunk=(n,encode='utf8')=>f=>fs.writeFile(n,encode,f)

function *clone_self1(f=it){
    const [n,n1]=file_name()
    const me=yield readFileThunk(n,'utf8')
    yield writeFileThunk(n1,me)
}


//async_flow(clone_self)
//async_flow1(clone_self1)



curry_test=()=>{
    f=(x,y,z)=>console.log(x,y,z)
    g1=x=>y=>z=>f(x,y,z)

    g=curry(f)
    g(1)(2)(3)

}


