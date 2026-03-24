firebase.auth().onAuthStateChanged(async user => {

  if (!user) {
    showRoleSelection();
    return;
  }

  const doc = await db.collection("users").doc(user.uid).get();
  const data = doc.data();

  if (!data.approved && data.role !== "customer") {
    document.getElementById("app").innerHTML = `
      <div class="card">
        <h2>Pending Approval</h2>
        <p>Your account is waiting for admin approval.</p>
      </div>
    `;
    return;
  }

  loadDashboard(data.role);
});

function showRoleSelection(){
  document.getElementById("app").innerHTML = `
    <div class="hero-app">

      <h1>Supreme True Clean</h1>
      <p>Select your role</p>

      <button class="btn" onclick="signUp('customer')">Customer</button>
      <button class="btn" onclick="signUp('sales')">Sales Rep</button>
      <button class="btn" onclick="signUp('technician')">Technician</button>
      <button class="btn" onclick="signUp('admin')">Admin</button>
      <button class="btn" onclick="signUp('owner')">Owner</button>

      <br><br>

      <button class="btn" onclick="login()">Login</button>

    </div>
  `;
}

async function signUp(role){
  const email = prompt("Email");
  const pass = prompt("Password");

  const user = await auth.createUserWithEmailAndPassword(email, pass);

  await db.collection("users").doc(user.user.uid).set({
    email,
    role,
    approved: role === "customer" ? true : false,
    createdAt: new Date()
  });

  alert(role === "customer" ? "Account created!" : "Waiting for approval");
  location.reload();
}

async function loadDashboard(role){

  document.getElementById("app").innerHTML = `
    <div class="header">${role.toUpperCase()} DASHBOARD</div>

    <div class="dashboard">

      <div class="card">
        <h3>Welcome</h3>
        <p>You are logged in as ${role}</p>
      </div>

      ${role === "owner" || role === "admin" ? `
        <div class="card">
          <h3>Admin Controls</h3>
          <button class="btn" onclick="loadUsers()">Manage Users</button>
        </div>
      ` : ""}

      ${role === "sales" ? `
        <div class="card">
          <button class="btn" onclick="addLead()">Add Lead</button>
          <button class="btn" onclick="loadLeads()">View Leads</button>
        </div>
      ` : ""}

      ${role === "technician" ? `
        <div class="card">
          <h3>Jobs</h3>
          <p>Coming soon</p>
        </div>
      ` : ""}

    </div>
  `;
}