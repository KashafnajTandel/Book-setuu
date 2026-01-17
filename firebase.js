import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCUK4He3wdG1WFeu6KqIZiPbTQCnCljXnU",
  authDomain: "book-setuu.firebaseapp.com",
  projectId: "book-setuu",
  storageBucket: "book-setuu.firebasestorage.app",
  messagingSenderId: "65045483870",
  appId: "1:65045483870:web:60afff0d994a6e00d93fcf"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
