firebase.auth().onAuthStateChanged(async user => {

  if(!user){
    document.getElementById("app").innerHTML = `
      <h2>Welcome</h2>
      <button onclick="login()">Login</button>
      <button onclick="signUp()">Sign Up</button>
    `;
    return;
  }

  loadDashboard();
});

async function loadDashboard(){

  const leads = await db.collection("leads").get();

  document.getElementById("app").innerHTML = `
    <div class="app-header">Dashboard</div>

    <div class="stat-card">Leads: ${leads.size}</div>

    <button onclick="addLead()">+ Add Lead</button>
    <button onclick="loadLeads()">View Leads</button>
    <button onclick="loadUsers()">Admin Panel</button>
    <button onclick="connectWallet()">Connect Wallet</button>
  `;
}

function loadJobs(){
  document.getElementById("app").innerHTML = "<h2>Jobs coming soon</h2>";
}
