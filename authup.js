import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore, doc, setDoc } 
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCUK4He3wdG1WFeu6KqIZiPbTQCnCljXnU",
  authDomain: "book-setuu.firebaseapp.com",
  projectId: "book-setuu",
  storageBucket: "book-setuu.firebasestorage.app",
  messagingSenderId: "65045483870",
  appId: "1:65045483870:web:60afff0d994a6e00d93fcf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Wait for page load
window.addEventListener("DOMContentLoaded", () => {

  const signupBtn = document.getElementById("signupBtn");

  signupBtn.addEventListener("click", async () => {

    const email = document
  .getElementById("email")
  .value
  .toLowerCase()
  .trim();

    const password = document.getElementById("password").value.trim();
    const enrollment = document.getElementById("enrollment").value.trim();
    const name = document.getElementById("name").value.trim();

    if (!email || !password || !enrollment || !name) {
      alert("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
     
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

     
      await setDoc(doc(db, "students", user.uid), {
        name: name,
        email: email.toLowerCase().trim(),
      
enrollmentNo: enrollment,
        role: "student",
        createdAt: new Date()
      });

      alert("Registered successfully!");
      window.location.href = "login.html";

    } catch (error) {
      alert("Error: " + error.message);
    }
  });
});
