---
title: nodejs mongodb
tags:
- nodejs
- mongodb
categories:
- [ db,mongo]

---



```javascript
const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

const conn=async ({table,db,db_url,}=process.env)=>{
    const mc = await mongoClient.connect(db_url,{useNewUrlParser: true})
    return mc.db(db).collection(table)
}

const test=async ()=>{
   c=await conn()
   r=await c._findAndModify()
   r=await c.aggregate()
   r=await c.bulkWrite()
   r=await c.collectionName()
   r=await c.count()
   r=await c.countDocuments()
   r=await c.createIndex()
   r=await c.createIndexes()
   r=await c.dbName()
   r=await c.deleteMany()
   r=await c.deleteOne()
   r=await c.distinct()
   r=await c.drop()
   r=await c.dropAllIndexes()
   r=await c.dropIndex()
   r=await c.dropIndexes()
   r=await c.ensureIndex()
   r=await c.estimatedDocumentCount()
   r=await c.find()
   r=await c.findAndModify()
   r=await c.findAndRemove()
   r=await c.findOne()
   r=await c.findOneAndDelete()
   r=await c.findOneAndReplace()
   r=await c.findOneAndUpdate()
   r=await c.geoHaystackSearch()
   r=await c.getLogger()
   r=await c.group()
   r=await c.hint()
   r=await c.indexExists()
   r=await c.indexInformation()
   r=await c.indexes()
   r=await c.initializeOrderedBulkOp()
   r=await c.initializeUnorderedBulkOp()
   r=await c.insert()
   r=await c.insertMany()
   r=await c.insertOne()
   r=await c.isCapped()
   r=await c.listIndexes()
   r=await c.mapReduce()
   r=await c.namespace()
   r=await c.options()
   r=await c.parallelCollectionScan()
   r=await c.reIndex()
   r=await c.readConcern()
   r=await c.remove()
   r=await c.removeMany()
   r=await c.removeOne()
   r=await c.rename()
   r=await c.replaceOne()
   r=await c.save()
   r=await c.stats()
   r=await c.update()
   r=await c.updateMany()
   r=await c.updateOne()
   r=await c.watch()
   r=await c.writeConcern()
}

```
