import {List,Map} from "immutable"
import  moment from 'moment';
import 'moment/locale/zh-tw'

const  cart2table1=({cart,cart_info:{amount,unit,qty},dict,price,price_1})=>Object.entries(cart)
    .filter(([k,v])=>v>0)
    .map(([k,v])=>[...dict[k],v])
    .map(([color,size,qty])=>({color,size,qty,price_1,unit,sum:unit*qty}));

const getprice=(arr)=>(key1="qty",key2="value")=>(n)=>{
    if (n==0) return List(arr).maxBy(x=>x[key2])[key2];
    let a= List(arr).sortBy(x=>x[key1]).takeWhile(x=>x[key1]<=n),
        b=a.last(),
        c=b[key2];
    return c;
}
const each1=fn=>(a={})=>Map(a).map(fn);
const init_current_pack=(n=1)=>Array(n).fill(0).map(()=>({color:0,size:0}))
const current_pack_gen=(i=0,n=1,unit=999,price=[])=>{
       const current_pack=init_current_pack(n);
       return {
            content:current_pack,
            cart_info:{
                qty:1,
                qty1:i,
                unit,
                amount:unit,
                discount:0,
                price:price[i],
            }
        }
}

const current_pack_decode=({color,size,packs,current_pack:{content,cart_info}})=>{

    let {qty}=cart_info;
    let s=content.length;
    let q=s*qty;
    let c2={...cart_info,qty:q};

    const parse_color_size=(x)=>({color:color[x.color],size:size[x.size],i:[x.color,x.size].join("_"),qty});
    const c1=content.map(parse_color_size)
    //return {"content":c1,cart_info}
    return {"content":c1,cart_info:c2}
}
const place_order1=({content,cart_info,address1,dress,place_order})=>{
   let dns=window.location.href;
   let dress1=drop(dress)("content");
   let o={product_id:dress.id,dns,cart_info,content,...address1,product:dress1};
    place_order(o)

}
export {
    init_current_pack,current_pack_gen,current_pack_decode,
    place_order1,

}
