firebase.auth().onAuthStateChanged(async user => {

  if (!user) {
    showRoleUI();
    return;
  }

  const doc = await db.collection("users").doc(user.uid).get();
  const data = doc.data();

  if (!data.approved && data.role !== "customer") {
    document.getElementById("app").innerHTML = `
      <div class="header">Pending Approval</div>
      <div class="subtext">Waiting for admin approval</div>
    `;
    return;
  }

  loadDashboard(data.role);
});

/* ROLE SCREEN */
function showRoleUI(){
  document.getElementById("app").innerHTML = `
    <div class="header">Supreme True Clean</div>
    <div class="subtext">Select your role</div>

    ${roleCard("Admin","🛡","Dashboard & management","admin")}
    ${roleCard("Customer","👤","Services & subscriptions","customer")}
    ${roleCard("Technician","🧼","Jobs & operations","technician")}
    ${roleCard("Sales Rep","🎯","Leads & outreach","sales")}
    ${roleCard("Owner","👑","Full access","owner")}

    <button class="btn" onclick="login()">Login</button>
  `;
}

function roleCard(title,icon,desc,role){
  return `
    <div class="role-btn" onclick="signUp('${role}')">
      <div>
        <div><strong>${title}</strong></div>
        <small>${desc}</small>
      </div>
      <div class="icon">${icon}</div>
    </div>
  `;
}

/* SIGN UP */
async function signUp(role){
  const email = prompt("Email");
  const pass = prompt("Password");

  const user = await auth.createUserWithEmailAndPassword(email, pass);

  await db.collection("users").doc(user.user.uid).set({
    email,
    role,
    approved: role === "customer",
    createdAt: new Date()
  });

  alert(role === "customer" ? "Account created!" : "Waiting for approval");
  location.reload();
}

/* DASHBOARD */
async function loadDashboard(role){

  const leads = await db.collection("leads").get();

  document.getElementById("app").innerHTML = `
    <div class="header">${role.toUpperCase()}</div>
    <div class="subtext">Dashboard</div>

    <div class="grid">
      <div class="stat">
        <h3>${leads.size}</h3>
        <p>Leads</p>
      </div>

      <div class="stat">
        <h3>$0</h3>
        <p>Revenue</p>
      </div>
    </div>

    <div class="card">
      <h3>Quick Actions</h3>

      ${role === "sales" ? `
        <button class="btn" onclick="addLead()">Add Lead</button>
        <button class="btn" onclick="loadLeads()">View Leads</button>
      ` : ""}

      ${role === "admin" || role === "owner" ? `
        <button class="btn" onclick="loadUsers()">Manage Users</button>
      ` : ""}

      <button class="btn" onclick="connectWallet()">Connect Wallet</button>
    </div>
  `;
}