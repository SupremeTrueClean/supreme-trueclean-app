async function addLead() {
  const name = document.getElementById("leadName").value;
  const phone = document.getElementById("leadPhone").value;
  const address = document.getElementById("leadAddress").value;

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

async function loadLeads() {
  const snapshot = await db.collection("leads").get();
  const container = document.getElementById("leadsList");

  container.innerHTML = "";

  snapshot.forEach(doc => {
    const lead = doc.data();

    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${lead.name}</h3>
      <p>${lead.phone}</p>

      <select onchange="updateStatus('${doc.id}', this.value)">
        <option value="new">🟢 New</option>
        <option value="contacted">🟡 Contacted</option>
        <option value="qualified">🔵 Qualified</option>
        <option value="won">🟣 Won</option>
        <option value="lost">🔴 Lost</option>
      </select>
    `;

    container.appendChild(div);
  });
}

async function updateStatus(id, status) {
  await db.collection("leads").doc(id).update({ status });
}
