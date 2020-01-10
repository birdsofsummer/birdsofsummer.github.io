class Db{
    openDB(){

    }
    getByIndex: async function (table, keyValue, indexCursor) {
        try {
                let db = await this.openDB();
                let store = db
                        .transaction(table.name, 'readonly')
                        .objectStore(table.name);
                let keyRng = IDBKeyRange.only(keyValue);
                let request = store.index(indexCursor).openCursor(keyRng);
                let data = [];
                return new Promise(resolve => {
                        request.onerror =reject;
                        request.onsuccess = function (event) {
                            var cursor = event.target.result;
                            if (cursor) {
                                console.log(cursor.value);
                                data.push(cursor.value);
                                cursor.continue();
                            }
                        };
                        resolve(data);
                })
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

