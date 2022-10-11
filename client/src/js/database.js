import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id,content) => {
  const open = await openDB("jate", 1);
  const write = open.transaction('jate', 'readwrite');
  const store = write.objectStore('jate');
  const put = store.put( {id: id, jate:content })
  const result = await put;
  console.log('result.value', result)
  return result;
}
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async (content) => {
  const open = await openDB("jate", 1);
  const write = open.transaction('jate', 'readwrite');
  const store = write.objectStore('jate');
  const all = await store.getAll('jate')
  const result = await all;
  console.log('result.value', result)
  return result;
}

initdb();
