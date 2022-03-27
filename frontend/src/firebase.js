import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCIw4SmfKElttCo3NkOAvyjwJortO8UBXQ",
    authDomain: "team-hawks.firebaseapp.com",
    projectId: "team-hawks",
    storageBucket: "team-hawks.appspot.com",
    messagingSenderId: "940747741666",
    appId: "1:940747741666:web:a59eedf57a3fc1eb3c41bb",
    measurementId: "G-GXX83D1WSQ"
};

const fire = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export { fire, auth }