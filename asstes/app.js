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

    <button onclick="addLead()">Add Lead</button>
    <button onclick="connectWallet()">Connect Wallet</button>
  `;
}

async function addLead(){
  const name = prompt("Lead Name");

  await db.collection("leads").add({
    name,
    createdAt: new Date()
  });

  loadDashboard();
}

async function loadLeads(){
  const snapshot = await db.collection("leads").get();

  let html = "<h2>Leads</h2>";

  snapshot.forEach(doc=>{
    html += `<div class="stat-card">${doc.data().name}</div>`;
  });

  document.getElementById("app").innerHTML = html;
}

function loadJobs(){
  document.getElementById("app").innerHTML = "<h2>Jobs coming soon</h2>";
}