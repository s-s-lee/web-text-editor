import { openDB } from 'idb';

const initdb = async () =>
  // creating db called 'jate' and on version 1
  openDB('jate', 1, {
    // add our db schema if it hasn't been initialized yet
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // creating new object store for the data
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error('putDb not implemented');
  // create a connection to the db and version needed
  const jateDb = await openDB('jate', 1);
  // create a new transaction. then specify the db and data privileges
  const tx = jateDb.transction('jate', 'readwrite');
  // open up desired object store
  const store = tx.objectStore('jate');
  // use .put() method on store and pass in the content
  const request = store.put({ id: 1, value: content });
  // get request confirmation
  const result = await result;
  console.log('Nice! Data was saved', result);
};
// add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('getDb not implemented');
  // create a connection to the db and version needed
  const jateDb = await openDB('jate', 1);
  // create a new transaction. then specify the db and data privileges
  const tx = jateDb.transction('jate', 'readonly');
  // open up desired object store
  const store = tx.objectStore('jate');
  // use .getAll() method on store and pass in the content
  const request = store.getAll();
  // get request confirmation
  const result = await result;
  console.log('result.value', result);
  return result;
};

initdb();