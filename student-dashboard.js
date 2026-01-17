import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

// Function to logout
window.logout = () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
};

// Show student issued books after login
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const table = document.getElementById("bookTable");
  table.innerHTML = ""; // Clear table

  try {
    const q = query(
      collection(db, "issuedBooks"),
      where("studentId", "==", user.uid),
      where("returned", "==", false)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
  table.innerHTML = `<tr><td colspan="5">No books issued yet.</td></tr>`;
  return;
}

    snapshot.forEach(doc => {
      const data = doc.data();
      const BOOKId = doc.id;

      const issueDate = data.issueDate.toDate();
      const dueDate = data.dueDate.toDate();
      const today = new Date();

      // Calculate fine: ₹2 per day after due date
      let fine = 0;
      if (today > dueDate) {
        const daysLate = Math.ceil((today - dueDate) / (1000*60*60*24));
        fine = daysLate * 2;
      }

      const row = `
        <tr>
          <td>${data.bookName}</td>
          <td>${data.bookId}</td> 
          <td>${issueDate.toDateString()}</td>
          <td>${dueDate.toDateString()}</td>
          <td>₹${fine}</td>
        
        </tr>
      `;
      table.innerHTML += row;
    });

  } catch (error) {
    alert("Error fetching books: " + error.message);
  }
});
