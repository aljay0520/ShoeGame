function openProduct(name, price, img) {
    const product = { name, price, img };
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "product.html";
}

document.addEventListener("DOMContentLoaded", function () {

  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const user = {
        fullName: document.getElementById("regName").value,
        email: document.getElementById("regEmail").value,
        pass: document.getElementById("regPass").value,
      };

      if (document.getElementById("regPass").value !== document.getElementById("regPass2").value) {
          alert("Passwords do not match");
          return;
      }

      localStorage.setItem("currentUser", JSON.stringify(user));

      alert("Registered successfully!");
      window.location.href = "index.html";
    });
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const saved = JSON.parse(localStorage.getItem("currentUser"));

      if (!saved) {
        alert("No registered user found!");
        return;
      }

      if (saved.email === document.getElementById("logEmail").value &&
          saved.pass === document.getElementById("logPass").value) {

        alert("Login successful!");
        window.location.href = "index.html";

      } else {
        alert("Incorrect email or password!");
      }
    });
  }
});

let history = JSON.parse(localStorage.getItem("purchaseHistory")) || [];

function addPurchase(name, price, size) {

  const user = JSON.parse(localStorage.getItem("currentUser"));

  const data = {
    name,
    price,
    size,
    customer: user ? user.fullName : "Guest",
    date: new Date().toLocaleString()
  };

  history.push(data);
  localStorage.setItem("purchaseHistory", JSON.stringify(history));

  alert("Purchase saved!");
  window.location.href = "history.html";
}

function loadHistory() {
  const container = document.getElementById("history");
  const list = JSON.parse(localStorage.getItem("purchaseHistory")) || [];

  if (list.length === 0) {
    container.innerHTML = "<p>No transactions yet.</p>";
    return;
  }

  list.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p><b>Customer:</b> ${item.customer}</p>
      <p>Price: ${item.price}</p>
      <p>Size: ${item.size}</p>
      <p>Date: ${item.date}</p>
    `;
    container.appendChild(div);
  });



}