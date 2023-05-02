// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBkp1eIotRRFUbFbw3Lwv_NR2etxBxF1lI",
    authDomain: "taylor-version.firebaseapp.com",
    projectId: "taylor-version",
    storageBucket: "taylor-version.appspot.com",
    messagingSenderId: "727181457892",
    appId: "1:727181457892:web:98985d2fe1997753afeff1"
};

//Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();
const storage = firebase.storage();

export {
    storage, firestore as default
}
