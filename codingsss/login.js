"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (!loginForm) return;

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("loginUsername").value.trim();
        const password = document.getElementById("loginPassword").value;
        const overlay = document.getElementById("loadingOverlay");
        const loaderMsg = document.getElementById("loaderMsg");

        if (!username || !password) {
            alert("Please enter your username and password.");
            return;
        }

        let admin = null;
        let students = [];

        try {
            admin = JSON.parse(localStorage.getItem("adminAccount") || "null");
            students = JSON.parse(localStorage.getItem("students") || "[]");

            if (!Array.isArray(students)) students = [];
        } catch (error) {
            alert("Unable to read saved accounts. Please check your registration data.");
            console.error(error);
            return;
        }

        if (!admin || !admin.username || !admin.password) {
            admin = {
                username: "admin",
                password: "admin123"
            };

            localStorage.setItem("adminAccount", JSON.stringify(admin));
        }

        if (username === admin.username && password === admin.password) {
            localStorage.setItem("currentUser", JSON.stringify({
                username: admin.username,
                role: "admin"
            }));

            if (overlay) overlay.classList.remove("hidden");
            if (loaderMsg) loaderMsg.textContent = "Opening Admin Portal...";

            window.location.href = "admin_portal.html";
            return;
        }

        const student = students.find(function (item) {
            return item.username === username &&
                item.password === password;
        });

        if (student) {
            localStorage.setItem("currentUser", JSON.stringify({
                ...student,
                username: student.username,
                role: "student"
            }));

            localStorage.setItem("loggedInStudent", JSON.stringify({
                username: student.username
            }));

            if (overlay) overlay.classList.remove("hidden");
            if (loaderMsg) loaderMsg.textContent = "Opening Student Portal...";

            window.location.href = "portal.html";
            return;
        }

        alert("Invalid username or password. Check your registered account.");
    });
});


document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;
    const loadingOverlay = document.getElementById("loadingOverlay");
    const loaderMsg = document.getElementById("loaderMsg");

    let users = [];

    try {
        users = JSON.parse(localStorage.getItem("students") || "[]");

        if (!Array.isArray(users)) {
            users = [];
        }
    } catch (error) {
        users = [];
    }

    const user = users.find(function (student) {
        return student.username === username &&
            student.password === password;
    });

    if (user) {
        loadingOverlay.classList.remove("hidden");
        loaderMsg.textContent = "Login successful! Opening portal...";

        localStorage.setItem("loggedInStudent", JSON.stringify({
            username: user.username
        }));

        window.location.href = "portal.html";
    } else {
        alert("Invalid username or password. Please try again.");
    }
});

function getStudents() {
    try {
        const students = JSON.parse(localStorage.getItem("students"));

        if (Array.isArray(students)) {
            return students;
        }

        return [];
    } catch (error) {
        return [];
    }
}

function saveStudents(students) {
    localStorage.setItem("students", JSON.stringify(students));
}

function getAdminAccount() {
    const defaultAdmin = {
        username: "admin",
        password: "admin123"
    };

    try {
        const admin = JSON.parse(localStorage.getItem("adminAccount"));

        if (admin && admin.username && admin.password) {
            return admin;
        }

        localStorage.setItem("adminAccount", JSON.stringify(defaultAdmin));
        return defaultAdmin;

    } catch (error) {
        localStorage.setItem("adminAccount", JSON.stringify(defaultAdmin));
        return defaultAdmin;
    }
}

function showLoading(message = "Verifying credentials...") {
    const overlay = document.getElementById("loadingOverlay");
    const loaderMsg = document.getElementById("loaderMsg");

    if (loaderMsg) {
        loaderMsg.textContent = message;
    }

    if (overlay) {
        overlay.classList.remove("hidden");
    }
}

function hideLoading() {
    const overlay = document.getElementById("loadingOverlay");

    if (overlay) {
        overlay.classList.add("hidden");
    }
}

function triggerLoading(callback, delay = 1000, message = "Verifying credentials...") {
    showLoading(message);

    setTimeout(() => {
        hideLoading();

        if (typeof callback === "function") {
            callback();
        }
    }, delay);
}

document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    if (!loginForm) {
        return;
    }

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const usernameInput = document.getElementById("loginUsername");
        const passwordInput = document.getElementById("loginPassword");

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        if (!username || !password) {
            alert("Please enter your username and password.");
            return;
        }

        const adminAccount = getAdminAccount();
        const students = getStudents();

        triggerLoading(function () {

            if (
                username === adminAccount.username &&
                password === adminAccount.password
            ) {

                const currentUser = {
                    username: username,
                    role: "admin",
                    fullName: "System Administrator"
                };

                localStorage.setItem(
                    "currentUser",
                    JSON.stringify(currentUser)
                );

                window.location.href = "admin_portal.html";

                return;
            }

            const foundStudent = students.find(function (student) {

                return (
                    student.username === username &&
                    student.password === password
                );

            });

            if (foundStudent) {

                const currentUser = {
                    ...foundStudent,
                    role: "student"
                };

                localStorage.setItem(
                    "currentUser",
                    JSON.stringify(currentUser)
                );

                window.location.href = "student_portal.html";

                return;
            }

            alert("Invalid username or password.");

        }, 1000, "Verifying credentials...");

    });

});
