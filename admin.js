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