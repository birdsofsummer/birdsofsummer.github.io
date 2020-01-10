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
