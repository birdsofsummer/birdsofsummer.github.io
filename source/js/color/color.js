const log=console.log
const say=x=>y=>console.log(x,y)

const draw_text=(p=document.body)=>{
    var app = new PIXI.Application(800, 600, {backgroundColor: 0x1099bb});
    p.appendChild(app.view);
    var basicText = new PIXI.Text('Basic text in pixi');
    basicText.x = 30;
    basicText.y = 90;
    app.stage.addChild(basicText);
    var style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440
    });
    var richText = new PIXI.Text('Rich text with a lot of options and across multiple lines', style);
    richText.x = 30;
    app.stage.addChild(richText);
}

const tile=(p=document.body)=>{
    var app = new PIXI.Application();
    p.appendChild(app.view);
    var texture = PIXI.Texture.fromImage('/images/2.svg');
    var tilingSprite = new PIXI.extras.TilingSprite(
        texture,
        app.screen.width,
        app.screen.height
    );
    app.stage.addChild(tilingSprite);
    var count = 0;
    app.ticker.add(function() {
        count += 0.005;
        tilingSprite.tileScale.x = 2 + Math.sin(count);
        tilingSprite.tileScale.y = 2 + Math.cos(count);
        tilingSprite.tilePosition.x += 1;
        tilingSprite.tilePosition.y += 1;
    });
}

const draw1=(p,n=0)=>{
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    let [w,h]=[1000,1000]
    let o={
        transparent: true,
     //   backgroundColor : 0x1099bb,
    }
    var app = new PIXI.Application(o);
    p.appendChild(app.view);
    var container = new PIXI.Container();
    app.stage.addChild(container);
    const bunny_factory=(i,n)=>{
        let size=50
        var texture = PIXI.Texture.fromImage('/images/2.svg');
        var bunny = new PIXI.Sprite(texture);
        bunny.scale.set(0.8 + Math.random() * 0.3);
        bunny.anchor.set(0.5);
        bunny.x = (i % n) * size;
        bunny.y = Math.floor(i / n) * size ;
        bunny.data={x:123,y:i}
        return bunny
    }
    const bs=d3.range(n*n).map((i)=>bunny_factory(i,n))
    bs.map(x=>container.addChild(x))

    container.x = (app.screen.width - container.width) / 2;
    container.y = (app.screen.height - container.height) / 2;
 //   container.pivot.x = container.width / 2;
 //   container.pivot.y = container.height / 2;
    app.ticker.add((delta) => {
       const rotate=x=>x.rotation +=d3.randomNormal(10)(0.001 * delta);
     //  bs.forEach(rotate)
    //   container.rotation -=0.01*delta
    });

    bs.forEach(x=>{
        x.interactive = true;
        x.buttonMode = true;
        const zoom=(step=0.5)=>(x)=>{
            x.scale.x *= step;
            x.scale.y *= step;
        }
//        rnd=()=>d3.randomNormal(10)(n)
//        x.rotation=rnd()
        x.on('pointerdown', (e)=>{
            zoom(1.25)(x)
            console.log(e,x)
        })
    })

}


const video=(p=document.body,u="/mp4/video.mp4")=>{
    var app = new PIXI.Application(800, 600, { transparent: true });
    p.appendChild(app.view);
    var button = new PIXI.Graphics()
        .beginFill(0x0, 0.5)
        .drawRoundedRect(0, 0, 100, 100, 10)
        .endFill()
        .beginFill(0xffffff)
        .moveTo(36, 30)
        .lineTo(36, 70)
        .lineTo(70, 50);
    button.x = (app.screen.width - button.width) / 2;
    button.y = (app.screen.height - button.height) / 2;
    button.interactive = true;
    button.buttonMode = true;
    app.stage.addChild(button);
    button.on('pointertap', onPlayVideo);
    function onPlayVideo() {
        button.destroy();
        var texture = PIXI.Texture.fromVideo(u);
        var videoSprite = new PIXI.Sprite(texture);
        videoSprite.width = app.screen.width;
        videoSprite.height = app.screen.height;
        app.stage.addChild(videoSprite);
    }

}

const render=(p=document.body)=>{
    var app = new PIXI.Application({
     //   backgroundColor : 0x1099bb,
        transparent: true,
    });
    p.appendChild(app.view);
    var container = new PIXI.Container();
    app.stage.addChild(container);
    var texture = PIXI.Texture.fromImage('/images/1.svg');

    for (var i = 0; i < 25; i++) {
        var bunny = new PIXI.Sprite(texture);
        bunny.x = (i % 5) * 30;
        bunny.y = Math.floor(i / 5) * 30;
        bunny.rotation = Math.random() * (Math.PI * 2)
 //       bunny.scale.set(0.1 + Math.random() * 0.2);
        container.addChild(bunny);
    }


    var brt = new PIXI.BaseRenderTexture(300, 300, PIXI.SCALE_MODES.LINEAR, 1);
    var rt = new PIXI.RenderTexture(brt);
    var sprite = new PIXI.Sprite(rt);
    sprite.x = 450;
    sprite.y = 60;
    app.stage.addChild(sprite);

    container.x = 100;
    container.y = 60;
    app.ticker.add(function() {
        app.renderer.render(container, rt);
    });
}


export {
    draw_text,
    log,
    draw_text,
    draw1,
    tile,
    video,
    render,
}

/*
x=>{
    x.alpha=1
    x.blendMode=0
    x.children=
    x.filterArea=null
    x.filters=null
    x.indices=0,1,2,0,2,3
    x.isSprite=true
    x.parent=[object Object]
    x.pluginName=batch
    x.renderable=true
    x.shader=null
    x.size=4
    x.sortDirty=false
    x.sortableChildren=false
    x.start=0
    x.tempDisplayObjectParent=null
    x.transform={
            worldTransform:[object Object],
            localTransform:[object Object],
            position:[object Object],
            scale:[object Object],
            pivot:[object Object],
            skew:[object Object],
            _rotation:8.726646259971648,
            _cx:-0.7660444431189783,
            _sx:0.642787609686539,
            _cy:-0.642787609686539,
            _sy:-0.7660444431189783,
            _localID:3,
            _currentLocalID:3,
            _worldID:4,
            _parentID:1,
    }
    x.uvs=0,0,1,0,1,1,0,1
    x.vertexData=362.5548095703125,231.95220947265625,324.2525939941406,264.0915832519531,276.04351806640625,206.6382598876953,314.3457336425781,174.49887084960938
    x.vertexTrimmedData=null
    x.visible=true
    x.worldAlpha=1

    x._anchor=
    x._bounds=
    x._boundsID=
    x._boundsRect=
    x._cachedTint=
    x._destroyed=
    x._enabledFilters=
    x._events=
    x._eventsCount=
    x._height=
    x._lastBoundsID=
    x._lastSortedIndex=
    x._localBoundsRect=
    x._mask=
    x._roundPixels=
    x._texture=
    x._textureID=
    x._textureTrimmedID=
    x._tint=
    x._tintRGB=
    x._transformID=
    x._transformTrimmedID=
    x._width=
    x._zIndex=
}
*/
