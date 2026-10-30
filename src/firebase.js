import { initializeApp,} from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDR6reVL4zcendfP3k-eUY6YYaNgNkLdbw",
  authDomain: "fire-f810a.firebaseapp.com",
  projectId: "fire-f810a",
  storageBucket: "fire-f810a.firebasestorage.app",
  messagingSenderId: "449695721518",
  appId: "1:449695721518:web:b8707e08ac6e6b30a197bf",
  measurementId: "G-JQGWE6HZH6"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const todosCol = collection(db, 'todos');
export const auth = getAuth(app);
