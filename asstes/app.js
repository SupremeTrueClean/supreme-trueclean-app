document.addEventListener("DOMContentLoaded", () => {
  const roleButtons = document.querySelectorAll(".stc-role-card");

  roleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const role = btn.dataset.role;

      switch (role) {
        case "admin":
          window.location.href = "admin.html"; // or app.html?role=admin
          break;
        case "customer":
          window.location.href = "customer.html"; // create this if needed
          break;
        case "cleaner":
          window.location.href = "cleaner.html";
          break;
        case "leadgen":
          window.location.href = "leads.html"; // you already have leads.js
          break;
        default:
          console.warn("Unknown role:", role);
      }
    });
  });
});
