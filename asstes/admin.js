async function loadUsers(){
  const snapshot = await db.collection("users").get();

  let html = `
    <div class="header">Admin Panel</div>
    <div class="dashboard">
  `;

  snapshot.forEach(doc=>{
    const user = doc.data();

    html += `
      <div class="card">
        <strong>${user.email}</strong>

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

  html += "</div>";

  document.getElementById("app").innerHTML = html;
}