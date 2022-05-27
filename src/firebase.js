import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBEwDxQ3lvid_Fn2Xn2zcezG-nipUlCUqk',
  authDomain: 'aftertaste - images.firebaseapp.com',
  projectId: ' aftertaste - images',
  storageBucket: 'aftertaste-images.appspot.com',
  messagingSenderId: '184989699893',
  appId: '1:184989699893:web:17f2082b0f913c947ac67c',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);