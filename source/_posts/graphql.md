---
title: nodejs graphql
date: 2019-07-19 18:05:54
tags:
- nodejs
- graphql
categories:
- [ nodejs ]

---

### DataLoader 

https://www.npmjs.com/package/dataloader
https://github.com/graphql/dataloader

```javascript
    var DataLoader = require('dataloader')

    const say=x=>y=>console.log(x,y)
    superagent=require('superagent')
    get=u=>superagent.get(u).then(x=>({id:u,content:x.text}))
    gets=us=>Promise.all(us.map(get))
    const {promisify} = require('util');
    const each=(f)=>(o={})=> Object.entries(o).forEach(f)
    const promisifyAll=(c)=>{
        let f=([k,v])=>c.__proto__["_"+k]=promisify(v).bind(c)
        each(f)(c.__proto__)
        return c
    }        
    conn=()=>{
        var redis = require('redis');
        var client = redis.createClient();
        promisifyAll(client)
        return client
    }
 

    const test_db=async ()=>{
        const users=[
          { id: 2, name: 'San Francisco' },
          { id: 9, name: 'Chicago' },
          { id: 1, name: 'New York' },
          { id: 'A', name: 'N' },
          { id: 'B', name: 'NYork' },
        ]
        cdns=Array(100).fill(0).map((x,i)=>({id:i,name:"ccc"+i}))
        stories=Array(100).fill(0).map((x,i)=>({id:i,name:"sss"+i}))
        const nulls=xs=>xs.map(x=>({id:x,name:""})) 
        genUsers=(authToken, ids)=> authToken !== 0 ? nulls(ids) : users.filter(x=>ids.includes(x.id))
        genCdnUrls=(authToken, ids)=> authToken !== 0 ? nulls(ids) : cdns.filter(x=>ids.includes(x.id))
        genStories=(authToken, ids)=> authToken !== 0 ? nulls(ids): stories.filter(x=>ids.includes(x.id))

        createLoaders=(authToken)=>({
            user: new DataLoader(async ids => genUsers(authToken, ids),{ cache: true}),
            cdn: new DataLoader(async rawUrls => genCdnUrls(authToken, rawUrls)),
            stories: new DataLoader(async keys => genStories(authToken, keys)),
        })

        authToken=0 
        loaders = createLoaders(authToken)
        let {user,cdn,stories:s}=loaders
        {
             u = await user.load(2);
             let {id,name}=u
             user.prime(name, u);
             user.prime(id , u);
             c=await cdn.load(id)
             s=await s.load(id)
             console.log({u,c,s})
        }

        uuu=async ()=>{
            a=await user.load(1)
            user.clear(1).prime(1,{id:1,name:"zzz"})
            a1=user.prime(1)._promiseCache.get(1)
            b=await user.loadMany([1,2,9])
            c=await user.loadMany([9,1,2])
            console.log(a,a1,b,c)
           //user.clearAll()
        }

    }

    const test_http=async ()=>{
        u='https://www.douban.com/group/blabla/discussion?start='
        douban = new DataLoader((ids)=>gets(ids.map(x=>u+x)));
        a=await douban.load(1)
        b=await douban.loadMany([1,2,9])
        console.log(a,b)
    }

    const test_redis=async()=>{
        c=conn()
        redisLoader = new DataLoader(client._mget);
        a=await redisLoader.load('foo')
        let [x,y]=await redisLoader.loadMany(["foo","foo"])
        let t=await redisLoader.loadMany(["foo","foo1"])
        console.log({a,x,y,t})
        //{ a: 'zzz', x: 'zzz', y: 'zzz', t: [ 'zzz', null ] }
        //redisLoader._promiseCache.get('foo')
    }

```


```javascript

var { makeExecutableSchema } = require('graphql-tools');
var typeDefs = [`
type Query {
  hello: String
}

schema {
  query: Query
}`];

var resolvers = {
  Query: {
    hello(root) {
      return 'world';
    }
  }
};

var schema = makeExecutableSchema({typeDefs, resolvers});



```


### sql

```javascript
var DataLoader = require('dataloader');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./db.sql');

// Dispatch a WHERE-IN query, ensuring response has rows in correct order.
var userLoader = new DataLoader(ids => {
  var params = ids.map(id => '?' ).join();
  var query = `SELECT * FROM users WHERE id IN (${params})`;
  return queryLoader.load([query, ids]).then(
    rows => ids.map(
      id => rows.find(row => row.id === id) || new Error(`Row not found: ${id}`)
    )
  );
});

// Parallelize all queries, but do not cache.
var queryLoader = new DataLoader(queries => new Promise(resolve => {
  var waitingOn = queries.length;
  var results = [];
  db.parallelize(() => {
    queries.forEach((query, index) => {
      db.all.apply(db, query.concat((error, result) => {
        results[index] = error || result;
        if (--waitingOn === 0) {
          resolve(results);
        }
      }));
    });
  });
}), { cache: false });

// Usage

var promise1 = userLoader.load('1234');
var promise2 = userLoader.load('5678');

Promise.all([ promise1, promise2 ]).then(([ user1, user2]) => {
  console.log(user1, user2);
});

```


```javascript
const test_couch=async ()=>{
    var DataLoader = require('dataloader');
    var nano = require('nano');
    var couch = nano('http://localhost:5984');
    var userDB = couch.use('users');
    var userLoader = new DataLoader(keys => new Promise((resolve, reject) => {
      userDB.fetch({ keys: keys }, (error, docs) => {
        if (error) {
          return reject(error);
        }
        resolve(docs.rows.map(row => row.error ? new Error(row.error) : row.doc));
      });
    }));
    var promise1 = userLoader.load('8fce1902834ac6458e9886fa7f89c0ef');
    var promise2 = userLoader.load('00a271787f89c0ef2e10e88a0c00048b');
    Promise.all([ promise1, promise2 ]).then(([ user1, user2]) => {
      console.log(user1, user2);
    });
}

```
