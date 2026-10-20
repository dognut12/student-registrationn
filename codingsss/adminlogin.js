"use strict";

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;
    const overlay = document.getElementById("loadingOverlay");
    const loaderMsg = document.getElementById("loaderMsg");

    let account;

    try {
        account = JSON.parse(localStorage.getItem("adminAccount"));
    } catch (error) {
        account = null;
    }

    if (!account || !account.username || !account.password) {
        account = {
            username: "admin",
            password: "admin123"
        };

        localStorage.setItem("adminAccount", JSON.stringify(account));
    }

    if (
        username === account.username &&
        password === account.password
    ) {
        localStorage.setItem("currentUser", JSON.stringify({
            username: account.username,
            role: "admin"
        }));

        if (overlay) {
            overlay.classList.remove("hidden");
        }

        if (loaderMsg) {
            loaderMsg.textContent = "Login successful. Opening admin portal...";
        }

        window.location.href = "admin_portal.html";
    } else {
        alert("Incorrect admin username or password.");

        if (overlay) {
            overlay.classList.add("hidden");
        }
    }
});