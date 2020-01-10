    const init=async()=>{
        const {
            draw_text,
            log,
            draw1,
            tile,
            video,
            render,
        }= await  import("/js/color/color.js")
        const {
            init_canvas,
        }=await import('/js/color/color-canvas.js')
        const {send_msg,init_color,}=await import("/js/api/api.js")
        let [c1,c2,c3,c4]=await init_color()
        let color0=c1.data
        let color_cn1=c3.data.map(x=>({...x,background:x.hex}))
        let color_jp=(c2.data).map(x=>({...x,background:x.rgb}))
        let color_jp1=(c4.data).map(x=>({...x,background:x.hex}))
        init_canvas(color0)
        let a=document.querySelector('#ttt')
        draw1(a,10)
        //render(a)
        var clipboard = new ClipboardJS('.card')
        let cat=["蓝","青","灰","紫","红","粉","黄","绿","棕","橙","金","all"]

        new Vue({
          el: '#app',
          methods:{
              send(){
                send_msg(this.msg)
              },
              search(x){
                this.search_name=x=="all" ? "" :x
              }
          },
          created() {
           },
          computed: {
                color(){
                    let {k,kv}=this.color0
                    let x=this.search_name
                    let k1=x ? k.filter(kk=>new RegExp(x).test(kk)) : k
                    return k1.map(x=>({...kv[x],background:kv[x].hex}))
                }
          },
          data: {
              search_name: "",
              color0,
              color_jp,
              color_cn1,
              color_jp1,
              cat,
              msg:{
                title:"a",
                content:"",
              },
          }
        })
    }
    init()

const test=async ()=>{
    let a=document.querySelector('#ttt')
    //a.style.backgroundColor="green"
    let color=await init_color()
    log(color)
    let l=color.data.k.length
    let n=sqrt1(l)
    //draw_text(a)
    //draw1(a,5)
    //tile(a)
    //video(a)
    render(a)
}

export {init}
