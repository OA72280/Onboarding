import firebase from 'firebase';

firebase.initializeApp({
    apiKey: "AIzaSyBw6szL5DbKvfBBL_4dWP02M5ebhw4KbYI",
    authDomain: "launch-4119e.firebaseapp.com",
    databaseURL: "https://launch-4119e.firebaseio.com",
    projectId: "launch-4119e",
    storageBucket: "launch-4119e.appspot.com",
    messagingSenderId: "82092361460"
});

export const fireauth = firebase.auth();
// export const database = firebase.database();
export const firestorage = firebase.storage().ref();
export const firestore = firebase.firestore();
// export const storage = firebase.storage();

export default firebase;