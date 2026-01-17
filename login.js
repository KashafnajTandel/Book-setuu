import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import { auth, db } from "./firebase.js";

// Ensure DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById("loginBtn");

  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      // Sign in user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user is librarian
      const librarianRef = doc(db, "librarians", user.uid);
      const librarianSnap = await getDoc(librarianRef);

      if (librarianSnap.exists()) {
        // Redirect to librarian dashboard
        window.location.href = "librarian-dashboard.html";
      } else {
        // Redirect to student dashboard
        window.location.href = "student-dashboard.html";
      }

    } catch (error) {
      alert("Login failed: " + (error.code || error.message));
      console.error(error);
    }
  });
});
