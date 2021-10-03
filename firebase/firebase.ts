import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: 'https://social-media-app-f6d3e-default-rtdb.europe-west1.firebasedatabase.app/',
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(config);

const database = getDatabase(app);
const auth = getAuth(app);
const dbRef = ref(getDatabase(app));
const todosRef = ref(database, 'todos');

export {
    database,
    auth,
    dbRef,
    todosRef
}