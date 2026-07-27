// script.js - KaribuStays interactivity

window.addEventListener("DOMContentLoaded", function () {

  // ---------- 1. Welcome Message (Home page only) ----------
  const welcomeBox = document.getElementById("welcomeMsg");
  if (welcomeBox) {
    let name = localStorage.getItem("visitorName");
    if (!name) {
      name = prompt("Karibu! What is your name?");
      if (name) {
        localStorage.setItem("visitorName", name);
      }
    }
    if (name) {
      welcomeBox.textContent = "Karibu, " + name + "! Ready to find your next Kenyan getaway?";
    }
  }

  // ---------- 2. Form Validation (Booking page only) ----------
  const bookingForm = document.getElementById("bookingForm");
  const formMsg = document.getElementById("formMsg");

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
      event.preventDefault(); // stop the page from reloading so we can show messages

      const requiredFields = bookingForm.querySelectorAll("[required]");
      let valid = true;

      requiredFields.forEach(function (field) {
        if (field.value.trim() === "") {
          valid = false;
        }
      });

      if (!valid) {
        formMsg.textContent = "Please fill in all required fields before submitting.";
        formMsg.style.color = "red";
      } else {
        formMsg.textContent = "Thank you! Your booking request has been received.";
        formMsg.style.color = "green";
        bookingForm.reset();
      }
    });
  }

  // ---------- 3a. Dynamic Content: Dark Mode Toggle (all pages) ----------
  const themeBtn = document.getElementById("themeToggleBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");
      themeBtn.textContent = document.body.classList.contains("dark-mode")
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";
    });
  }

  // ---------- 3b. Dynamic Content: Show/Hide Extra Info (Home page) ----------
  const toggleBtn = document.getElementById("toggleInfoBtn");
  const extraInfo = document.getElementById("extraInfo");
  if (toggleBtn && extraInfo) {
    toggleBtn.addEventListener("click", function () {
      const isHidden = extraInfo.style.display === "none" || extraInfo.style.display === "";
      extraInfo.style.display = isHidden ? "block" : "none";
      toggleBtn.textContent = isHidden ? "Show Less" : "Show More";
    });
  }

});