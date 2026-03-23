async function loadAdminEmails() {
  const doc = await db.collection("adminSettings").doc("emails").get();

  if (!doc.exists) return;

  const emails = doc.data().emails || [];
  const container = document.getElementById("adminList");

  container.innerHTML = "";

  emails.forEach(email => {
    const div = document.createElement("div");
    div.innerHTML = `
      ${email}
      <button onclick="removeAdmin('${email}')">Remove</button>
    `;
    container.appendChild(div);
  });
}

async function addAdmin() {
  const email = document.getElementById("newAdmin").value;

  const ref = db.collection("adminSettings").doc("emails");
  const doc = await ref.get();

  let emails = doc.exists ? doc.data().emails : [];

  emails.push(email);

  await ref.set({ emails });

  loadAdminEmails();
}

async function removeAdmin(email) {
  const ref = db.collection("adminSettings").doc("emails");
  const doc = await ref.get();

  let emails = doc.data().emails.filter(e => e !== email);

  await ref.set({ emails });

  loadAdminEmails();
}
async function loadUsers() {
  const snapshot = await db.collection("users").get();
  const container = document.getElementById("usersList");

  container.innerHTML = "";

  snapshot.forEach(doc => {
    const user = doc.data();

    const div = document.createElement("div");

    div.innerHTML = `
      <p><b>${user.email}</b></p>
      <p>Role: ${user.role}</p>

      <select onchange="updateRole('${doc.id}', this.value)">
        <option value="customer">Customer</option>
        <option value="sales">Sales Rep</option>
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

async function updateRole(userId, newRole) {
  await db.collection("users").doc(userId).update({
    role: newRole
  });

  alert("Role updated!");
}