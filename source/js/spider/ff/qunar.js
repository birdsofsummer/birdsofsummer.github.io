import {each_v1,find_cb,find_all,is_empty,pipe} from "q.js"

//https://flight.qunar.com/
parse=()=>{
  table=".ul_route_lst li"
  t1=find_all(document)(table)
  if (is_empty(t1)) return []
  td={
          to:[".city",pipe([child,last])],
          price:['.pr',pipe([text,to_num])],
          date:['.date',text],
          city:[".city",child],
          url:['a',attr('href')],
   }
    return t2=t1.map(o=>each_v1(find_cb(o))(td)).filter(x=>x.city).sort(by('price'))
}

a=parse()
