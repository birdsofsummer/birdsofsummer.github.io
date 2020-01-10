---
title: color
date: 2019-07-11 21:09:14
tags: 
- color
- design
categories:
- [ design,color]

---


{% raw %}

<link href="/css/color.css" type="text/css" rel="stylesheet">
<style>

</style>

<section class="color-wrapper grid">
    <figure id="rgb-container"> </figure>
    <figure id="color-name-container" class="grid">
        <span id="current_color" class="color-name"></span> 
        <span id="current_pinyin" class="color-name"></span> 
        <span id="current_hex" class="color-name"></span> 
    </figure>
    <figure id="cmyk-container"> </figure>
    <figure id="color-container"> </figure>
</section>



<section id="app">
  <v-layout row wrap>
      <v-flex xs12 sm4 md4>
      
  <ul class="grid-7 search-list">
    <li v-for="c in cat" @click="search(c)" class='color-name search'>{{c}}</li>
  </ul>
      </v-flex>
  </v-layout>
  <ul class="grid-7 color-list">
    <li v-for="c in color" class="card cp" :title="c.name"  :data-clipboard-text="JSON.stringify(c)">
                <dl class="front" :style="[c]">
                    <dt><img src=""  alt=""/></dt>
                    <dd class="color-name">
                          {{ c.name}}
                    </dd>
                </dl>
                <div class="back">
                </div>
    </li>
  </ul>

  <v-divider></v-divider>
  <ul class="grid-7 color-list">
    <li v-for="c in color_cn1" class="card cp" :title="c.name"  :data-clipboard-text="JSON.stringify(c)">
                <dl class="front" :style="[c]">
                    <dt><img src=""  alt=""/></dt>
                    <dd class="color-name">
                          {{ c.name}}
                    </dd>
                </dl>
                <div class="back">
                </div>
    </li>
  </ul>

  <v-divider></v-divider>
  <ul class="grid-7 color-list">
    <li v-for="c in color_jp" class="card cp" :title="c.name"  :data-clipboard-text="JSON.stringify(c)">
                <dl class="front" :style="[c]">
                    <dt><img src=""  alt=""/></dt>
                    <dd class="color-name">
                          {{ c.name}}
                    </dd>
                </dl>
                <div class="back">
                </div>
    </li>
  </ul>
  <v-divider></v-divider>
  <v-divider></v-divider>
  <ul class="grid-7 color-list">
    <li v-for="c in color_jp1" class="card cp" :title="c.name"  :data-clipboard-text="JSON.stringify(c)">
                <dl class="front" :style="[c]">
                    <dt><img src=""  alt=""/></dt>
                    <dd class="color-name">
                          {{ c.name}}
                    </dd>
                </dl>
                <div class="back">
                </div>
    </li>
  </ul>
  <v-divider></v-divider>

    <v-form>
      <v-divider></v-divider>
      <v-text-field  v-model="msg.title" label="Subject" value="" single-line full-width hide-details ></v-text-field> 
      <v-divider></v-divider>
      <v-textarea v-model="msg.content" label="Message" counter maxlength="500" full-width single-line ></v-textarea>
      <v-btn outlined color="amber" @click="send">submit</v-btn>
    </v-form>
  <v-divider></v-divider>
</section>

<section id="ttt" > </section>
<!--script src="/js/color.js"  ></script-->
<script src="/js/color/color-index.js"  type="module"></script>
<script > </script >


{% endraw %}



+   [nipponcolors][1]
+   [中国色][2] 
+   [中国色1][3]

[1]: http://nipponcolors.com/        "nipponcolors"
[2]: http://zhongguose.com/  "中国色"
[3]: https://color.uisdc.com/  "中国色"

