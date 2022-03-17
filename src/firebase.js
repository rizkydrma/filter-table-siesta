import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyD-VXkVGFYp6zZ0pnkDaSG67mWjM0KQGl4',
  authDomain: 'auth-siesta.firebaseapp.com',
  projectId: 'auth-siesta',
  storageBucket: 'auth-siesta.appspot.com',
  messagingSenderId: '258655909591',
  appId: '1:258655909591:web:03356f56cf37a81974a292',
  measurementId: 'G-LTYDFQ6SXB',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });

      localStorage.setItem('user', user.email);
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
  localStorage.removeItem('user');
};

export { auth, db, signInWithGoogle, logout };
