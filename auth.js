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

  const firstName = prompt("First Name:");
  const lastName = prompt("Last Name:");
  const phone = prompt("Phone (optional):");

  const socialPlatform = prompt("Social Platform (Instagram, Facebook, etc - optional):");
  const socialHandle = prompt("Social Handle (optional):");

  try {
    const userCred = await auth.createUserWithEmailAndPassword(email, password);

    await db.collection("users").doc(userCred.user.uid).set({
      email,
      firstName,
      lastName,
      phone: phone || "",
      socialPlatform: socialPlatform || "",
      socialHandle: socialHandle || "",
      role: "customer",
      createdAt: new Date()
    });

    routeUser("customer");

  } catch (error) {
    alert(error.message);
  }
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