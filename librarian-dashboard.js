import { auth, db } from "./firebase.js";
import { collection, addDoc, query, where, getDocs, Timestamp,updateDoc,doc } 
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";


// Logout
window.logout = () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
};

window.addEventListener("DOMContentLoaded", () => {

  document.getElementById("issueBtn").addEventListener("click", async () => {

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
      // Find student UID
      const usersQuery = query(
        collection(db, "students"),
        where("email", "==", studentEmail)
      );
      const snapshot = await getDocs(usersQuery);

      if (snapshot.empty) {
        alert("Student not found in database");
        return;
      }

      let studentId;
      snapshot.forEach(doc => studentId = doc.id);

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

      alert("Book issued successfully!");
      
    } catch (error) {
      alert("Error issuing book: " + error.message);
    }
  });
});
document.getElementById("returnBtn").addEventListener("click", async () => {
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

    snapshot.forEach(async (d) => {
      await updateDoc(doc(db, "issuedBooks", d.id), {
        returned: true,
        returnDate: Timestamp.now()
      });
    });

    alert("Book returned successfully");
  } catch (err) {
    alert(err.message);
  }
});
