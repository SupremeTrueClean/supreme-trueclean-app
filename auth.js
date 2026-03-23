async function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const userCred = await auth.createUserWithEmailAndPassword(email, password);

  await db.collection("users").doc(userCred.user.uid).set({
    email,
    role: "customer",
    createdAt: new Date()
  });

  routeUser("customer");
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const userCred = await auth.signInWithEmailAndPassword(email, password);

  const doc = await db.collection("users").doc(userCred.user.uid).get();
  routeUser(doc.data().role);
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