say=(x="")=>(y="")=>console.log(x,y)

var db;


window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;


var DBOpenRequest = window.indexedDB.open("toDoList", 4);
// var request = window.indexedDB.open("toDoList", {version: 4, storage: "temporary"});
DBOpenRequest.onerror = say('db open err')
DBOpenRequest.onsuccess = function(event) {
    db = DBOpenRequest.result;
    displayData();
};

DBOpenRequest.onupgradeneeded = function(event) {
    var db = event.target.result;
    db.onerror = say('db')
    var objectStore = db.createObjectStore("toDoList", { keyPath: "taskTitle" });
    objectStore.createIndex("hours", "hours", { unique: false });
    objectStore.createIndex("minutes", "minutes", { unique: false });
    objectStore.createIndex("day", "day", { unique: false });
    objectStore.createIndex("month", "month", { unique: false });
    objectStore.createIndex("year", "year", { unique: false });
    objectStore.createIndex("notified", "notified", { unique: false });
};

function displayData() {
var objectStore = db.transaction('toDoList').objectStore('toDoList');
objectStore.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
console.log(cursor)
    //  cursor.value.day
    if(cursor) {
      var listItem = document.createElement('li');

      deleteButton.onclick = function(event) {
        deleteItem(event);
      }
      cursor.continue();
    } else {
    }
  }
}

taskForm.addEventListener('submit',addData,false);

function addData(e) {
e.preventDefault();

if(title.value == '' || hours.value == null || minutes.value == null || day.value == '' || month.value == '' || year.value == null) {
  note.innerHTML += '<li>Data not submitted — form incomplete.</li>';
  return;
} else {
  var newItem = [
        { taskTitle: title.value, hours: hours.value, minutes: minutes.value, day: day.value, month: month.value, year: year.value, notified: "no" }
  ];
  var transaction = db.transaction(["toDoList"], "readwrite");

  transaction.oncomplete = function() {
        displayData();
  };

  transaction.onerror =say(transaction.error)

  var objectStore = transaction.objectStore("toDoList");
  let { indexNames, keyPath, name, transaction, autoIncrement, }= objectStore
    var newItem = [
      { taskTitle: "", hours: 0, minutes: 0, day: 0, month: "", year: 0, notified: "no" }
    ];
  var objectStoreRequest = objectStore.add(newItem[0]);
    objectStoreRequest.onsuccess = say('ok')

  };

};

function deleteItem(event) {
// retrieve the name of the task we want to delete
var dataTask = event.target.getAttribute('data-task');

// open a database transaction and delete the task, finding it by the name we retrieved above
var transaction = db.transaction(["toDoList"], "readwrite");
var request = transaction.objectStore("toDoList").delete(dataTask);

// report that the data item has been deleted
transaction.oncomplete = function() {
  // delete the parent of the button, which is the list item, so it no longer is displayed
  event.target.parentNode.parentNode.removeChild(event.target.parentNode);
  note.innerHTML += '<li>Task \"' + dataTask + '\" deleted.</li>';
};
};

function checkDeadlines() {

var objectStore = db.transaction(['toDoList'], "readwrite").objectStore('toDoList');
objectStore.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;

}

}

function createNotification(title) {
if (Notification.permission === "granted") {
      var img = '/to-do-notifications/img/icon-128.png';
      var text = 'HEY! Your task "' + title + '" is now overdue.';
      var notification = new Notification('To do list', { body: text, icon: img });
      window.navigator.vibrate(500);
}
else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        if(!('permission' in Notification)) {
          Notification.permission = permission;
        }
        if (permission === "granted") {
          var img = '/to-do-notifications/img/icon-128.png';
          var text = 'HEY! Your task "' + title + '" is now overdue.';
          var notification = new Notification('To do list', { body: text, icon: img });

          window.navigator.vibrate(500);
        }
      });
}

var objectStore = db.transaction(['toDoList'], "readwrite").objectStore('toDoList');
var objectStoreTitleRequest = objectStore.get(title);
objectStoreTitleRequest.onsuccess = function() {
      var data = objectStoreTitleRequest.result;
      data.notified = "yes";
      var updateTitleRequest = objectStore.put(data);
      updateTitleRequest.onsuccess = displayData
}
}

setInterval(checkDeadlines, 1000);

