import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

import { signOut } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

/* ================= LOGOUT ================= */
window.logout = () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
};

/* ================= PAGE LOAD ================= */
window.addEventListener("DOMContentLoaded", () => {

  const issueBtn = document.getElementById("issueBtn");
  const returnBtn = document.getElementById("returnBtn");

  /* ===== ISSUE BOOK ===== */
  issueBtn.addEventListener("click", async () => {

    const studentName = document.getElementById("studentName").value.trim();
    const enrollmentNo = document.getElementById("enrollmentNo").value.trim();
    const studentEmail = document
      .getElementById("studentEmail")
      .value
      .toLowerCase()
      .trim();

    const bookName = document.getElementById("bookName").value.trim();
    const bookId = document.getElementById("bookId").value.trim();

    if (!studentName || !enrollmentNo || !studentEmail || !bookName || !bookId) {
      alert("Please fill all fields");
      return;
    }

    try {
      // Find student
      const q = query(
        collection(db, "students"),
        where("email", "==", studentEmail)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        alert("Student not found in database");
        return;
      }

      const studentId = snapshot.docs[0].id;

      const issueDate = new Date();
      const dueDate = new Date(issueDate);
      dueDate.setDate(issueDate.getDate() + 30);

      const reminderDate = new Date(issueDate);
      reminderDate.setDate(issueDate.getDate() + 29);

      await addDoc(collection(db, "issuedBooks"), {
        studentId,
        studentName,
        enrollmentNo,
        studentEmail,
        bookName,
        bookId,
        issueDate: Timestamp.fromDate(issueDate),
        dueDate: Timestamp.fromDate(dueDate),
        reminderDate: Timestamp.fromDate(reminderDate),
        returned: false
      });

      alert("✅ Book issued successfully!");

    } catch (error) {
      alert("Error issuing book: " + error.message);
    }
  });

  /* ===== RETURN BOOK ===== */
  returnBtn.addEventListener("click", async () => {

    const bookId = document.getElementById("bookId").value.trim();

    if (!bookId) {
      alert("Please enter Book ID");
      return;
    }

    try {
      const q = query(
        collection(db, "issuedBooks"),
        where("bookId", "==", bookId),
        where("returned", "==", false)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        alert("Book not found or already returned");
        return;
      }

      await updateDoc(snapshot.docs[0].ref, {
        returned: true,
        returnDate: Timestamp.now()
      });

      alert("📘 Book returned successfully");

    } catch (err) {
      alert("Error returning book: " + err.message);
    }
  });

});
