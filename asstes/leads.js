async function loadLeads(){
  const snapshot = await db.collection("leads").get();

  let html = `
    <div class="header">Leads</div>
    <div class="dashboard">
  `;

  snapshot.forEach(doc=>{
    const lead = doc.data();

    html += `
      <div class="card">
        <strong>${lead.name}</strong><br>
        ${lead.phone || ""}<br>

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

  html += "</div>";

  document.getElementById("app").innerHTML = html;
}