import {zip}  from "/js/fp/q.js"

const drawArcAndLine1=({CMYK,RGB,hex,name,pinyin})=> {
  let canvas = document.createElement('canvas')
      ,context = canvas.getContext('2d')
      ,[w,h]=[50,278]
      ,lineHeight = h-w;
   canvas.width = w;
   canvas.height = h;
   canvas.classList=`${pinyin} color-item`
   canvas.dataset.name=name
   canvas.dataset.pinyin=pinyin
   canvas.dataset.hex=hex
    {
        let ctx = canvas.getContext('2d')
        ctx.beginPath();
        ctx.lineWidth = 10;
        ctx.strokeStyle = hex;
        ctx.moveTo(0,0);
        ctx.lineTo(w,0)
        ctx.stroke();
    }

  CMYK.
  map((v,i)=>{
    let endAngle =  ( v/100)*2 * Math.PI;
    return [14,31.3 * (i+1),9,0,endAngle]
    //arc(x,y,r,start,stop)
  })
  .forEach(function (args, i) {
    {
        let ctx = canvas.getContext('2d')
        ctx.beginPath();
        ctx.strokeStyle = 'grey';
        let [x,y,r]=args
        let c=2*Math.PI
        ctx.arc(x,y,r,0,c);
        ctx.globalAlpha=0.5
        ctx.lineWidth = 6;
        ctx.stroke();
    }
    {
        let ctx = canvas.getContext('2d')
        ctx.beginPath();
        ctx.arc(...args);
        ctx.lineWidth = 6;
        ctx.globalAlpha=0.8
        ctx.strokeStyle = 'white';
        ctx.stroke();
    }
  });

  context.lineWidth = 1;
  let init_point=[18,150]
  let max_height=150 + lineHeight
  RGB
  .map((x,i)=>{
      let [x0,y0]=init_point
      return [ x0 + 3*i , y0 ,150 + lineHeight *(x/255)]
      })
  .map(([x,y,l])=>{
          let ctx = canvas.getContext('2d')
          ctx.beginPath();
          ctx.lineWidth = 0.2;
          ctx.globalAlpha=0.9
          ctx.strokeStyle = 'gray';
          ctx.moveTo(x,y);
          ctx.lineTo(x,max_height)
          ctx.stroke();

          ctx.beginPath();
          ctx.lineWidth = 1;
          ctx.globalAlpha=1
          ctx.strokeStyle = 'white';
          ctx.moveTo(x,y);
          ctx.lineTo(x,l)
          ctx.stroke();
 //     context.moveTo(x,y);
  //    context.lineTo(x,l)
  })
  //context.stroke();

  {
      let ctx = canvas.getContext('2d')
      {
          ctx.font = '1rem Microsoft YaHei, 微软雅黑, Helvetica';
          ctx.globalAlpha=0.9;
          ctx.strokeStyle = hex;
          ctx.fillStyle=hex;
          [...name]
          .map((x,i)=>[x,28, 40+i*20])
          .map(t=>ctx.fillText(...t))
      }

      {
          ctx.font = '0.7rem Microsoft YaHei, 微软雅黑, Helvetica';
          ctx.fillStyle="white";
            let top_y=160;
	        ctx.translate(0, top_y-17);
            ctx.rotate(90 * Math.PI / 180);
            let write=(t,x,n=0)=>ctx.fillText(t.slice(n).toUpperCase(),x, 0)
            write(hex,6,1)
            ctx.fillText(pinyin.toUpperCase(),5,-28)
      }
  }

  return canvas;
}

const drawArcAndLine2=({CMYK,RGB,hex,name,pinyin})=> {
  let canvas = document.createElement('canvas')
      ,context = canvas.getContext('2d')
      ,[w,h]=[60,210]
      ,lineHeight = h-w
      ,ctx = canvas.getContext('2d');
   canvas.width = w;
   canvas.height = h;
   canvas.classList=`${pinyin} color-cmyk`
   canvas.dataset.name=name
   canvas.dataset.pinyin=pinyin
   canvas.dataset.hex=hex

   const  draw_single=([v,title,color],i)=>{
    //      console.log([v,title,color],i)
          ctx.lineWidth = 2;
          ctx.save();
          //ctx.fillStyle = 'rgb(' + (51 * i) + ', ' + (255 - 51 * i) + ', 255)';
          let j=0;
          ctx.translate(10 + j * 50, 10 + i * 50);
    //      ctx.fillRect(0, 0, 25, 25);
        {
            ctx.font = '1.2rem,Microsoft YaHei, 微软雅黑, Helvetica';
            ctx.fillText(title, 0,0)
 //           ctx.fillStyle="#dddd29"
            ctx.strokeStyle=color
            ctx.globalAlpha=1
            ctx.beginPath();
            ctx.arc(25, 25, 18, 0, Math.PI*2);

 //           ctx.closePath();
            ctx.stroke();
        }
        {
            ctx.fillStyle="black"
            ctx.strokeStyle="gray"
            ctx.globalAlpha=0.9
            ctx.font = '1rem,Microsoft YaHei, 微软雅黑, Helvetica';
            ctx.beginPath();
            ctx.arc(25, 25, 18, 0, (v/100)*Math.PI*2 , true);
          //let tw = ctx.measureText(t).width
            ctx.fillText(v, 25/2,30)
            ctx.stroke();
        }
        ctx.restore();
      }
//  for (var i = 0; i < 5; i++) { }
   zip(CMYK,[..."CMYK"],["#0093D3","#CC006B","#FFF10C","#333"])
   .map(draw_single)
   return canvas
}


const drawArcAndLine3=({CMYK,RGB,hex,name,pinyin})=> {
  let canvas = document.createElement('canvas')
      ,context = canvas.getContext('2d')
      ,[w,h]=[60,160]
      ,lineHeight = h-w
      ,ctx = canvas.getContext('2d');
   canvas.width = w;
   canvas.height = h;
   canvas.classList=`${pinyin} color-rgb`
   canvas.dataset.name=name
   canvas.dataset.pinyin=pinyin
   canvas.dataset.hex=hex

   const  draw_single=([v,title,color],i)=>{
    //      console.log([v,title,color],i)
          ctx.lineWidth = 2;
          ctx.save();
          //ctx.fillStyle = 'rgb(' + (51 * i) + ', ' + (255 - 51 * i) + ', 255)';
          let j=0;
          ctx.translate(10 + j * 50, 10 + i * 50);
    //      ctx.fillRect(0, 0, 25, 25);
        {
            ctx.font = '1.2rem,Microsoft YaHei, 微软雅黑, Helvetica';
            ctx.fillText(title, 0,0)
            ctx.fillStyle="#dddd29"
            ctx.strokeStyle=color
            ctx.globalAlpha=0.9
            ctx.beginPath();
            ctx.arc(25, 25, 18, 0, Math.PI*2 , true);

 //           ctx.closePath();
            ctx.stroke();
        }
        {
            ctx.fillStyle="black"
            ctx.strokeStyle="gray"
            ctx.globalAlpha=0.9
            ctx.font = '1.1rem,Microsoft YaHei, 微软雅黑, Helvetica';
            ctx.beginPath();
            ctx.arc(25, 25, 18, 0, (v/255)*Math.PI*2 , true);
          //let tw = ctx.measureText(t).width
            ctx.fillText(v, 25/2,30)
            ctx.stroke();
        }
        ctx.restore();
      }
//  for (var i = 0; i < 5; i++) { }
   zip(RGB,[..."RGB"],["#ed3321","#1ba784","#1c1b1b"])
   .map(draw_single)
   return canvas
}

const change_rgb=(c)=>{
    let cc=document.querySelector('#rgb-container');
    [...cc.children].map(x=>cc.removeChild(x));
    let d=drawArcAndLine3(c)
    cc.appendChild(d)
}


const change_cmyk=(c)=>{
    let cc=document.querySelector('#cmyk-container');
    [...cc.children].map(x=>cc.removeChild(x));
    let d=drawArcAndLine2(c)
    cc.appendChild(d)
}

const change_color=(c)=>{
    let {name,pinyin,hex}=c
    document.querySelector('.color-wrapper').style.background=hex;
    document.querySelector('#current_color').innerText=name;
    document.querySelector('#current_pinyin').innerText=pinyin;
    document.querySelector('#current_hex').innerText=hex;

    change_cmyk(c)
    change_rgb(c)
}

const init_canvas=({k,kv})=>{
    let color=k.map(x=>({...kv[x],background:kv[x].hex}))
    let cc=document.querySelector('#color-container');
    [...cc.children].map(x=>cc.removeChild(x));
    color
    .map(drawArcAndLine1)
    .map(x=>cc.appendChild(x));
     [...document.querySelectorAll('.color-item')]
     .map(x=>x.addEventListener('click',e=>{
            let name=e.target.dataset.name
            change_color(kv[name])
     }
))
    let current=0;
    let c=color[current]
    change_color(c)
}

export {
    drawArcAndLine1,
    drawArcAndLine2,
    drawArcAndLine3,
    init_canvas,
}
