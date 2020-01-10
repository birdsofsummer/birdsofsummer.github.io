g=console.log

f=a=>b=>c=>d=>g(a,b,c,d)
f=(a)=>(g(a),f)

f=(a)=>(g(a),f)

f(1)(2)(3)(4)

f=fn=>(a)=>(fn(a),f(fn))

f(g)(1)(2)(3)(4)

function *f(x){
    yield g(x)
}
