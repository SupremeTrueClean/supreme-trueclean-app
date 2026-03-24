// LEADS SYSTEM

async function addLead(){
  const name = prompt("Lead Name");
  const phone = prompt("Phone");
  const address = prompt("Address");

  await db.collection("leads").add({
    name,
    phone,
    address,
    status: "new",
    createdAt: new Date(),
    history: []
  });

  loadLeads();
}

async function loadLeads(){
  const snapshot = await db.collection("leads").get();

  let html = `<h2>Leads</h2>`;

  snapshot.forEach(doc=>{
    const lead = doc.data();

    html += `
      <div class="stat-card">
        <strong>${lead.name}</strong><br>
        ${lead.phone}<br>

        <select onchange="updateLeadStatus('${doc.id}', this.value)">
          <option value="new">🟢 New</option>
          <option value="contacted">🟡 Contacted</option>
          <option value="quoted">🔵 Quoted</option>
          <option value="won">🟣 Won</option>
          <option value="lost">🔴 Lost</option>
        </select>
      </div>
    `;
  });

  document.getElementById("app").innerHTML = html;
}

async function updateLeadStatus(id, status){
  await db.collection("leads").doc(id).update({
    status
  });
}