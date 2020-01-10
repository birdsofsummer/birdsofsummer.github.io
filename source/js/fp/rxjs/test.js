import { take, map, combineAll } from 'rxjs/operators';
import { interval } from 'rxjs';
import {gets,say} from "./fetch"
import fetch from "./fetch"

const test=()=>{
    let f=()=>gets(['/a.json',"/b.json"]);
    let g=(i)=>fetch.get(`/${i}.json`)
    let save=async (x)=>{
       let a=await x;
       say('ccc')(a)
    }
        interval(1000)
        .pipe(take(1))
        .pipe(map(x=>[x]))
//        .pipe(map(x=>g(x)))
//         .pipe( map(val => interval(1000).pipe(map(i => i), take(5))))
        .pipe(combineAll())
        .pipe(map(x=>gets(x.map(y=>"/"+y+".json"))))
        .subscribe(save)
}

//        test()
//      let d= await gets(['/a.json',"/b.json"])
//      let d=fetch.get('/a.json')
//      console.log(d)

