/* ===============================
   UI FLOW CONTROLLER (NO FIREBASE)
   Landing → Login → Signup
   =============================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ===== SELECT SECTIONS ===== */
  const landingSection = document.getElementById("landing");
  const loginSection = document.getElementById("loginSection");
  const signupSection = document.getElementById("signupSection");

  const enterBtn = document.getElementById("enterWebsite");
  const goSignup = document.getElementById("goSignup");
  const goLogin = document.getElementById("goLogin");

  /* ===== INITIAL STATE ===== */
  landingSection.style.display = "flex";
  loginSection.style.display = "none";
  signupSection.style.display = "none";

  /* ===== HELPERS ===== */
  function show(section) {
    landingSection.style.display = "none";
    loginSection.style.display = "none";
    signupSection.style.display = "none";

    section.style.display = "flex";
    section.style.animation = "fadeUp 0.8s ease";
  }

  /* ===== EVENTS ===== */
  enterBtn.addEventListener("click", () => {
    show(loginSection);
  });

  goSignup.addEventListener("click", (e) => {
    e.preventDefault();
    show(signupSection);
  });

  goLogin.addEventListener("click", (e) => {
    e.preventDefault();
    show(loginSection);
  });

});
