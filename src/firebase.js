import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";

export function initFirebase() {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyBvRrg3x7Xj6961bnzaH5IVmt0D1Gjoe5Y",
        authDomain: "todo-list-a7ac0.firebaseapp.com",
        databaseURL: "https://todo-list-a7ac0-default-rtdb.firebaseio.com",
        projectId: "todo-list-a7ac0",
        storageBucket: "todo-list-a7ac0.appspot.com",
        messagingSenderId: "600032509193",
        appId: "1:600032509193:web:8e681cdaead784808067d8",
        measurementId: "G-QCT0P5B5ZP"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    return firebase;
}

