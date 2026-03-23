async function loadUsers() {
  const snapshot = await db.collection("users").get();
  const container = document.getElementById("usersList");

  container.innerHTML = "";

  snapshot.forEach(doc => {
    const user = doc.data();

    const div = document.createElement("div");

    div.innerHTML = `
      <p>${user.email}</p>
      <p>Role: ${user.role}</p>

      <select onchange="updateRole('${doc.id}', this.value)">
        <option value="customer">Customer</option>
        <option value="sales">Sales</option>
        <option value="technician">Technician</option>
        <option value="management">Management</option>
        <option value="admin">Admin</option>
        <option value="owner">Owner</option>
      </select>

      <hr>
    `;

    container.appendChild(div);
  });
}

async function updateRole(uid, role) {
  await db.collection("users").doc(uid).update({ role });
}