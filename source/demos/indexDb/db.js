const say=(x="")=>(y="")=>console.log(x,y)
const each=o=>f=>Object.entries(o).map(([k,v])=>f(k)(v))
const says=o=>each(o)(say)
const extend=o1=>o2=>Object.entries(o2).forEach(([k,v])=>o1[k]=v)

const sql=(db)=>{
const tb=({name,...a})=>idx=>{
  if (db.objectStoreNames.contains(name)) return;
    say('kkkkkkkkkkkk')(a)
    let t= db.createObjectStore(name, a)
    say('sssssss')(t)
    idx.forEach(t.createIndex)
    return t
}

const add=(table_name)=>(row)=> {
  let req = db.transaction([table_name], 'readwrite')
                .objectStore(table_name)
                .add(row);
  req.onsuccess = say('数据写入成功')
  req.onerror = say('数据写入失败')
}

const read=(table_name)=>(i)=>{
  let req = db.transaction([table_name],'readonly')
                .objectStore(table_name)
                .get(i);
   req.onerror =say('事务失败')
   req.onsuccess = e=> {
      let r=req.result
      if (r) {
          says(r)
      } else {
         say('未获得数据记录')();
      }
   };
}

const readAll=(table_name)=>{
  let  objectStore = db.transaction(table_name).objectStore(table_name);
   objectStore.openCursor().onsuccess = function (event) {
     var cursor = event.target.result;
     if (cursor) {
         let {key,value}=cursor;
         console.log(key,value)
         says(value)
       cursor.continue();
    } else {
          console.log('没有更多数据了！');
    }
  };
}


const  update=(name)=> (row)=>{
  let  req= db.transaction([name], 'readwrite')
    .objectStore(name)
    .put(row);
     req.onsuccess =say('数据更新成功')
     req.onerror =say('数据更新失败')
}

const remove=(name)=> (row=1)=> {
  let req= db.transaction([name], 'readwrite')
    .objectStore(name)
    .delete(row);
  req.onsuccess = say('数据删除成功')
  };

    return{
        tb,
        add,
        read,
        readAll,
        update,
        remove,
    }
}


const test=()=>{
    let
        n='person',
        row={ id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' },
        row2={ id: 2, name: '张三4', age: 244, email: 'zzhangsan@example.com' },
        row1={ id: 1, name: '李四', age: 35, email: 'lisi@example.com' },
        idx=[
            ['name', 'name', { unique: true }],
            ['email', 'email', { unique: true }],
            ['name', 'age', { unique: false }],
        ]

    f=(n)=>{
        var request = window.indexedDB.open(n, 2);
        request.onerror=e=>{ say('error')('打开失败') }
        request.onsuccess=(e)=> {
            let db=request.result
            say(db)(1);
        }
        request.onupgradeneeded=e=>{
            let db=e.target.result
            say(db)(2)
//            sql(db).tb({name:n,autoIncrement: true })([])
            sql(db).tb({name:n,key:"id"})([])
            sql(db).add(n)(row)
            sql(db).add(n)(row2)
            //sql(db).tb({name:n,key:"id"})(idx)
        }
    }
    f(n);

  // s.read(n)(1)
   // s.readAll(n)
   // s.update(n)(row1)
   // s.read(n)(1)
   // s.readAll(n)
   // s.remove(n)(1)
}

test()
