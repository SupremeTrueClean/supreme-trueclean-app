const firebaseConfig = {
  apiKey: "AIzaSyDvh1cQJMMUm4IP-xvMgTweaxlWsdxV1Bs",
  authDomain: "supreme-trueclean.firebaseapp.com",
  projectId: "supreme-trueclean",
  storageBucket: "supreme-trueclean.firebasestorage.app",
  messagingSenderId: "387669088255",
  appId: "1:387669088255:web:6d1c169967d6c1926579ca"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();