// ADMIN SYSTEM

async function loadUsers(){
  const snapshot = await db.collection("users").get();

  let html = "<h2>User Management</h2>";

  snapshot.forEach(doc=>{
    const user = doc.data();

    html += `
      <div class="stat-card">
        <strong>${user.email}</strong><br>

        <select onchange="updateRole('${doc.id}', this.value)">
          <option value="customer">Customer</option>
          <option value="sales">Sales</option>
          <option value="technician">Technician</option>
          <option value="admin">Admin</option>
          <option value="owner">Owner</option>
        </select>
      </div>
    `;
  });

  document.getElementById("app").innerHTML = html;
}

async function updateRole(uid, role){
  await db.collection("users").doc(uid).update({ role });
}
