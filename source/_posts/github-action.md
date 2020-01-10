---
title: github-action
date: 2020-01-10 13:41:39
tags:
---


## github自带ci

[doc](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/about-github-actions "")

[示例](https://github.com/marketplace/actions/deploy-to-github-pages "")

### 少量密码
+ 新建Secrets就行

### 多个密码

[creating-and-using-encrypted-secrets](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets "")

+ 密码保存在一个文本文件
+ gpg加密  记住秘钥
+ 上传密文
+ 在网页新建环境变量 LARGE_SECRET_PASSPHRASE="秘钥"
+ shell读取 $LARGE_SECRET_PASSPHRASE 用它解密密文
+ 读取明文



### 自动发布到npm示例

```yaml

name: Node CI

on: [push]

jobs:
  publish:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [13.x]

    steps:
    - uses: actions/checkout@v1
    - name: Decrypt large secret
      env:
          LARGE_SECRET_PASSPHRASE: ${{ secrets.LARGE_SECRET_PASSPHRASE }}           
      run: |          
           ./scripts/decrypt_secret.sh
    - name: Test printing your secret (Remove this step in production)
      run: |          
           cat $HOME/secrets/my_secret.json               
           . $HOME/secrets/my_secret.sh  #密码配置文件      
           echo "ccc" ${x}                   
           echo "ccc" ${y}           
           cat $HOME/secrets/my_secret.json 
    - name: publish
      env:
        CI: true
        NPM_TOKEN: ${{ secrets.NPM_TOKEN}}
      run: |
        echo $CI
        echo export NPM_TOKEN=${NPM_TOKEN} >> ~/.profile
        echo //registry.npmjs.org/:_authToken=$NPM_TOKEN >> ~/.npmrc
        source ~/.profile
        npm publish
        #npm ci
        #npm run build --if-present
        #npm test
```

###  自动发布hexo博客示例

.github/workflows/main.yml

```yaml
#https://github.com/marketplace/actions/deploy-to-github-pages
name: GitHub Actions Build and Deploy Demo
on:
  push:
    branches:
      - dev
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master    
    - name: Checkout
      run: |
        echo 123
        mkdir public
        ls

    - name: Build and Deploy
      uses: JamesIves/github-pages-deploy-action@master 
      env:
        ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
        GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}
        BASE_BRANCH: dev
        BRANCH: master # gh-pages
        FOLDER: public  #build|dist|public ...
        #TARGET_FOLDER: public
        CLEAN: 'true'
        CLEAN_EXCLUDE: '[]'
        BUILD_SCRIPT: npm install hexo-cli -g &&  npm install && hexo g && ls
```
