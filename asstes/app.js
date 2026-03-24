firebase.auth().onAuthStateChanged(async user => {

  if (!user) {
    document.getElementById("app").innerHTML = `
      <div class="header">Supreme True Clean</div>

      <div class="dashboard">
        <div class="card">
          <h2>Welcome</h2>
          <button class="btn" onclick="login()">Login</button>
          <button class="btn" onclick="signUp()">Sign Up</button>
        </div>
      </div>
    `;
    return;
  }

  loadDashboard();
});

async function loadDashboard(){

  const leads = await db.collection("leads").get();

  document.getElementById("app").innerHTML = `
    <div class="header">Dashboard</div>

    <div class="dashboard">

      <div class="grid">
        <div class="card">
          <h3>Leads</h3>
          <p>${leads.size}</p>
        </div>

        <div class="card">
          <h3>Revenue</h3>
          <p>$0</p>
        </div>
      </div>

      <div class="card">
        <h3>Quick Actions</h3>
        <button class="btn" onclick="addLead()">+ Add Lead</button>
        <button class="btn" onclick="loadLeads()">View Leads</button>
        <button class="btn" onclick="loadUsers()">Admin Panel</button>
        <button class="btn" onclick="connectWallet()">Connect Wallet</button>
      </div>

    </div>
  `;
}