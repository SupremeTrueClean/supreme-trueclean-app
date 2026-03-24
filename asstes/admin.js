async function loadUsers(){
  const snapshot = await db.collection("users").get();

  let html = `<div class="header">User Approval</div><div class="dashboard">`;

  snapshot.forEach(doc=>{
    const user = doc.data();

    html += `
      <div class="card">
        ${user.email} (${user.role})<br>

        ${!user.approved ? `
          <button class="btn" onclick="approveUser('${doc.id}')">Approve</button>
        ` : "Approved"}
      </div>
    `;
  });

  html += "</div>";

  document.getElementById("app").innerHTML = html;
}

async function approveUser(uid){
  await db.collection("users").doc(uid).update({
    approved: true
  });

  loadUsers();
}