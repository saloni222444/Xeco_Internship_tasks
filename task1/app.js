document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("userForm");

  // ---------- FORM PAGE ----------
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const country = document.getElementById("country").value;

      const user = { name, email, phone, country };

      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));

      alert("User saved!");
      form.reset();
    });
  }

  // ---------- DISPLAY PAGE ----------
  const userTableBody = document.getElementById("userTableBody");
  const paginationDiv = document.getElementById("pagination");

  if (userTableBody && paginationDiv) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const usersPerPage = 5;
    let currentPage = 1;

    function renderTable(page) {
      users = JSON.parse(localStorage.getItem("users")) || [];
      const totalPages = Math.ceil(users.length / usersPerPage);
      const start = (page - 1) * usersPerPage;
      const end = start + usersPerPage;
      const usersToShow = users.slice(start, end);

      userTableBody.innerHTML = "";
      usersToShow.forEach((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.phone}</td>
          <td>${user.country}</td>
          <td>
            <button class="edit-btn" onclick="editUser(${start + index})">Edit</button>
            <button class="delete-btn" onclick="deleteUser(${start + index})">Delete</button>
          </td>`;
        userTableBody.appendChild(row);
      });

      paginationDiv.innerHTML = `
        <button ${page === 1 ? "disabled" : ""} onclick="changePage(${page - 1})">Previous</button>
        <span>Page ${page}</span>
        <button ${page >= totalPages ? "disabled" : ""} onclick="changePage(${page + 1})">Next</button>
      `;
    }

    window.changePage = function (page) {
      currentPage = page;
      renderTable(currentPage);
    };

    window.deleteUser = function (index) {
      users.splice(index, 1);
      localStorage.setItem("users", JSON.stringify(users));
      renderTable(1);
    };

    window.editUser = function (index) {
      const user = users[index];
      const newName = prompt("New Name:", user.name);
      const newEmail = prompt("New Email:", user.email);
      const newPhone = prompt("New Phone:", user.phone);
      const newCountry = prompt("New Country:", user.country);

      if (newName && newEmail && newPhone && newCountry) {
        users[index] = {
          name: newName,
          email: newEmail,
          phone: newPhone,
          country: newCountry
        };
        localStorage.setItem("users", JSON.stringify(users));
        renderTable(currentPage);
      }
    };

    renderTable(currentPage);
  }
});
