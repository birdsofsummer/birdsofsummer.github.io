import {say} from "./fp"
import {api} from "./fetch"

const test=()=>{
 const f2=async (oo)=>{
     let d={id:1,x:1,y:2}
        let a=[
            oo.list(),
            oo.read(d),
            oo.creat(d),
            oo.del(d),
            oo.update(d),
            oo.post('/ccc')(d),
            oo.delete('/ccc')(d),
        ]
        let b=await queque(a)
        say(name)(b)
    }
    say('api')(api)
    f2(api.orders)
}
test();
