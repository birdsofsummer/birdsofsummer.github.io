import { normalize, schema, denormalize} from 'normalizr';
import {Map} from 'immutable'

export const keyby=schema=>d=>normalize(d,schema)
export const restore=schema=>({result,entities})=> denormalize(result, schema, entities);

const orders_schema=[new schema.Entity('data', {}, { idAttribute: 'id' })];
const goods_schema=[new schema.Entity('data', {}, { idAttribute: 'id' })];

export const keyby_orders=keyby(orders_schema)
export const keyby_goods=keyby(goods_schema)

export const update_row=(d=[])=>(row={})=>{
    if (d.length==0) return [row];
    const myschema=[new schema.Entity('data', {}, { idAttribute: 'id' })]
    let {result,entities:{data}}=keyby(myschema)(d)
    let {id}=row;
    let d1={
            result,
            entities:{data: Map(data).mergeDeep(Map({[id]:row})).toJS() }
        }
    return restore(myschema)(d1)
}
export const  del_row=(d=[])=>(row={})=>{
    if (d.length==0) return [];
    let {id}=row;
    return d.filter(x=>x.id!=id);
}

export const  add_row=(d=[])=>(row={})=>{
    if (Object.keys(row).length==0) return d;
    return [...d,row]
}

export const filter_row=(s=[])=>([first,...rest])=>{
    if (s.length == 0 ) return [];
    if (first) {
       let [k,v]=first;
//       let c=x=>x[k] == v;
       let c=x=>new RegExp(v).test(x[k]);
       return  filter_row(s.filter(c))(rest)
    }else {
       return s;
    }
}




/*
const f=()=>{
const myArray = new schema.Array(
    {
      "delivery": new schema.Entity('delivery', {}, { idAttribute: 'id' }),
      "undelivery":new schema.Entity('undelivery', {}, { idAttribute: 'id' })
    },
(input, parent, key) =>input["delivery"]? "delivery" : "undelivery");
const myschema=[new schema.Entity('orders', {}, { idAttribute: 'id' })]
}

*/
