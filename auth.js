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

async function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const userCred = await auth.createUserWithEmailAndPassword(email, password);

  await db.collection("users").doc(userCred.user.uid).set({
    email: email,
    role: "customer"
  });

  routeUser("customer");
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const userCred = await auth.signInWithEmailAndPassword(email, password);

  const doc = await db.collection("users").doc(userCred.user.uid).get();
  const role = doc.data().role;

  routeUser(role);
}

function routeUser(role) {
  document.querySelectorAll(".tab").forEach(t => t.style.display = "none");

  if (role === "admin") showTab("admin");
  else if (role === "sales") showTab("sales");
  else if (role === "technician") showTab("tech");
  else if (role === "management") showTab("mgmt");
  else if (role === "owner") showTab("owner");
  else showTab("customer");
}

function showTab(id) {
  document.getElementById(id).style.display = "block";
}