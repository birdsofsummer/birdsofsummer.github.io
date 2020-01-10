import {
    attr,
    //attr,
    child,
    child1,
    dataset1,
    dataset2,
    find,
    find1,
    find2,
    find_all,
    find_cb,
    finds_cb,
    html,
    html2text,
    link,
    src,
    text,
    text2dom,
} from "./dom.js"


//http://www.ochirly.com.cn/Clothing/Dresses/list.shtml

cover=(sku,x)=>`http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/ochirly/2019/b/${sku}/${sku}_list_${x+1}.jpg`
mid=(sku,x)=>`http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/ochirly/2019/b/${sku}/${sku}_m_${x+1}.jpg"`
big=(sku,x)=>`http://img1.ochirly.com.cn/wcsstore/TrendyCatalogAssetStore/images/trendy/ochirly/2019/b/${sku}/${sku}_b_8.jpg`

parse=(d)=>{
  table="#list li"
  t1=find2(d)(table)
  if (is_empty(t1)) return []
  sku2img=(f,n)=>({sku})=>range(n).map(x=>f(sku,x))
  s1=sku2img(cover,2)
  s2=sku2img(mid,8)
  s3=sku2img(big,1)
  td={
          name:['.desc a',text],
          //cover:['.pic img',src],
          cover:['.addbag',pipe([dataset1,s1])],
 //         mid:['.addbag',pipe([dataset1,s2])],
 //         big:['.addbag',pipe([dataset1,s3])],
          info:['.pic img',dataset1],
          url:['a',link],
          bag:['.addbag',dataset1],
          price:['.price',dataset1],
          price1:['.price',pipe([child1,map(to_num)])]
   }
   t2=t1.map(o=>each_v1(find_cb(o))(td))
   return t2
}

parse1=(d)=>{
  table=".main"
  t1=find2(d)(table)
  if (is_empty(t1)) return []
  td={ img:['.content li img[data-src]',pipe([dataset2('src'),x=>`http:${x}`])]}
  return { img:finds_cb(t1[0])(td['img'])}
}

main=async ()=>{
   u=`http://www.ochirly.com.cn/Clothing/Dresses/list-@-40-listedDate%20desc-0-0-0-0-0.shtml`;
   u1=range(12).map(x=>u.replace('@',x+1))
 //  d=await gets(us)
   d1=d.map(parse).flat()
   return d1
}
main()
