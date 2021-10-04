import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
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