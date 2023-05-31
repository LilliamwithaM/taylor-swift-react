import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkp1eIotRRFUbFbw3Lwv_NR2etxBxF1lI",
  authDomain: "taylor-version.firebaseapp.com",
  projectId: "taylor-version",
  storageBucket: "taylor-version.appspot.com",
  messagingSenderId: "727181457892",
  appId: "1:727181457892:web:98985d2fe1997753afeff1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth, provider};