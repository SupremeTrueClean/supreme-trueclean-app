const firebaseConfig = {
  apiKey: "AIzaSyDvh1cQJMMUm4IP-xvMgTweaxlWsdxV1Bs",
  authDomain: "supreme-trueclean.firebaseapp.com",
  projectId: "supreme-trueclean"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();