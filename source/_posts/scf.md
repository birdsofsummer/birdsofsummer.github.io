---
title: scf
date: 2019-07-24 10:16:17
tags:
---


#SCF

https://cloud.tencent.com/document/product/583

## SCF CLI 

### install
  ```bash
    pip3 install scf  
    scf --version
  ```

### init
```bash
    scf init
    scf init --runtime python2.7 --name testproject --output-dir /Users/xxx/code/scf/
    scf init --runtime python2.7 --name hello 
    scf init --runtime nodejs6.10 --name hello 
    scf init --runtime nodejs8.9 --name hello 
    scf init --runtime python3.6 --name hello 
    scf init --runtime php5 --name hello 
    scf init --runtime php7 --name hello 
    scf init --runtime go1 --name hello 
    scf init --runtime nodejs 8.9 --name hello  --location http://..  --output-dir ./hello
```
### test
```bash
    scf local generate-event cos post
    scf local generate-event cos put
    scf local generate-event cos delete
    scf local generate-event timer timeup
    scf local generate-event apigateway proxy
    scf local generate-event apigateway proxy > event.json

    scf native invoke --template template.yaml --event event.json
    scf native generate-event cos post| scf native invoke --template template.yaml
    scf local  invoke --template template.yaml --event event.json
    scf local generate-event cos post | scf local invoke --template template.yaml
    scf local generate-event cos post | scf local invoke -t template.yaml testfunction
```
### deploy
```bash
   scf deploy
   scf deploy --cos-bucket temp-code-1253970226
   scf deploy -t deploy.yaml -f -c temp-code-1253970226 -n test-func -ns ccc -r ap-hongkong --skip-event
```


