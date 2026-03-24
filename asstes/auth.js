async function login(){
  const email = prompt("Email");
  const pass = prompt("Password");

  await auth.signInWithEmailAndPassword(email, pass);
  location.reload();
}

async function signUp(){
  const email = prompt("Email");
  const pass = prompt("Password");

  const user = await auth.createUserWithEmailAndPassword(email, pass);

  await db.collection("users").doc(user.user.uid).set({
    email,
    role: "customer"
  });

  location.reload();
}