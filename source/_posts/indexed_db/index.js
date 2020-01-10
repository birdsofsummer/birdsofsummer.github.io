TEST_U='https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/wp-content/themes/Hax/img/dino.svg'
TEST_DB= {
    db_name:"test",
    table_name:"test",
    dbVersion:1,
}

say=(x='')=>(y="")=>console.log(x,y);
show_img=(imgFile)=>{
        var imgURL = URL.createObjectURL(imgFile);
        dom=document.getElementById("elephant")
        dom.setAttribute("src", imgURL);
        URL.revokeObjectURL(imgURL);
}

find_img=({db,table_name})=>{
    var transaction = db.transaction([table_name], IDBTransaction.READ_WRITE);
    transaction.objectStore(table_name).get("image").onsuccess = function (event) {
        var imgFile = event.target.result;
        console.log("Got elephant!" + imgFile);
    }
}

// insert
save_img = function ({db,table_name},blob) {
    console.log("saving",blob);
    var transaction = db.transaction([table_name], 'readwrite');
    // IDBTransaction.READ_WRITE
    var put = transaction.objectStore(table_name).put(blob, "image");
}
// get
get_img=(u)=>fetch(u).then(x=>x.blob())
save_img1=async(a,u)=>save_img(a,await get_img(u))

insert=({db,table_name},d={})=>{
  var request = db.transaction([table_name], 'readwrite')
    .objectStore(table_name)
    .add(d);
  request.onsuccess = say('insert success')
  request.onerror = say('insert fail')
}
find_by_index=({db,table_name},query={"name":"ccc"})=>{
    var transaction = db.transaction([table_name], 'readonly');
    var store = transaction.objectStore(table_name);
    let [k,v]=Object.entries(query)
    var index = store.index(k)
    var request = index.get(v)
    request.onsuccess = function (e) {
      var result = e.target.result;
        console.log(result)
    }
}

find= ({db,table_name},id=1)=> {
   var transaction = db.transaction(table_name);
   var objectStore = transaction.objectStore(table_name);
   var request = objectStore.get(id);
   request.onerror = say('err');
   request.onsuccess = function( event) {
       let r=request.result ||{}
       console.log(r)
   };
}

find_all=({db,table_name})=> {
  var objectStore = db.transaction(table_name).objectStore(table_name);
       objectStore.openCursor().onsuccess = function (event) {
             var cursor = event.target.result;
               let r=[]
             if (cursor) {
                 console.log(cursor)
                 r.push(cursor)
                 cursor.continue();
            } else {
              console.log('没有更多数据了！');
            }
            console.log(r)
      }
}

remove=({db,table_name},id)=> {
     var request = db.transaction([table_name], 'readwrite')
    .objectStore(table_name)
    .delete(id);
    request.onsuccess = say('removed')
}

update= ({db,table_name},d={ id: 1, name: '李四', age: 35, email: 'lisi@example.com' })=> {
      var request = db.transaction([table_name], 'readwrite')
        .objectStore(table_name)
        .put(d);
      request.onsuccess = say('updated')
      request.onerror = say('update failed')
}




// (TEST_U)
run=(fn=save_img1,...arg)=>{
    config=TEST_DB
    let { db_name,table_name,dbVersion,cb }=config
    var request = indexedDB.open(db_name, dbVersion);
    request.onsuccess = function (event) {
        db = request.result;
        db.onerror = say('fail open')
        fn({...config,db},...arg)
    }
    request.onupgradeneeded = function (event) {
        db=event.target.result
        if ( !db.objectStoreNames.contains(table_name) ){
                let o={
                     keyPath: 'id',
                     autoIncrement: true ,
                }
                var objectStore = db.createObjectStore(table_name,o)
                objectStore.createIndex('name', 'name', { unique: false });
        }
    }
    request.onerror =say('error')
}

run(insert,{x:1,y:2,z:3})
