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

        localStorage.setItem(
            "adminAccount",
            JSON.stringify(defaultAdmin)
        );

        return defaultAdmin;

    } catch (error) {

        localStorage.setItem(
            "adminAccount",
            JSON.stringify(defaultAdmin)
        );

        return defaultAdmin;
    }
}

function showLoading(message = "Processing...") {

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

function triggerLoading(callback, delay = 1000, message = "Processing...") {

    showLoading(message);

    setTimeout(function () {

        hideLoading();

        if (typeof callback === "function") {
            callback();
        }

    }, delay);
}


document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const username =
                document.getElementById("loginUsername").value.trim();

            const password =
                document.getElementById("loginPassword").value;

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

    }


    const signupForm = document.getElementById("signupForm");

    if (signupForm) {

        const courseSelect = document.getElementById("regSchool");
        const majorGroup = document.getElementById("majorGroup");
        const majorSelect = document.getElementById("regMajor");

        courseSelect.addEventListener("change", function () {

            const course = this.value;

            majorSelect.innerHTML =
                '<option value="" disabled selected>Select Major</option>';

            if (course === "BS in Business Administration") {

                majorGroup.classList.remove("hidden");
                majorSelect.required = true;

                const majors = [
                    "Major in Financial Management",
                    "Major in HRDM"
                ];

                majors.forEach(function (major) {

                    const option = document.createElement("option");

                    option.value = major;
                    option.textContent = major;

                    majorSelect.appendChild(option);

                });

            } else if (course === "BS Education") {

                majorGroup.classList.remove("hidden");
                majorSelect.required = true;

                const majors = [
                    "Major in Mathematics",
                    "Major in Science",
                    "Major in English"
                ];

                majors.forEach(function (major) {

                    const option = document.createElement("option");

                    option.value = major;
                    option.textContent = major;

                    majorSelect.appendChild(option);

                });

            } else {

                majorGroup.classList.add("hidden");
                majorSelect.required = false;
                majorSelect.value = "";

            }

        });


        signupForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const fullName =
                document.getElementById("regFullName").value.trim();

            const email =
                document.getElementById("regEmail").value.trim();

            const username =
                document.getElementById("regUsername").value.trim();

            const password =
                document.getElementById("regPassword").value;

            const age =
                document.getElementById("regAge").value;

            const dob =
                document.getElementById("regDob").value;

            const pob =
                document.getElementById("regPob").value.trim();

            const father =
                document.getElementById("regFather").value.trim();

            const mother =
                document.getElementById("regMother").value.trim();

            const address =
                document.getElementById("regAddress").value.trim();

            const course =
                document.getElementById("regSchool").value;

            const major =
                document.getElementById("regMajor").value;

            const phone =
                document.getElementById("regPhone").value.trim();


            let students = getStudents();


            const usernameExists = students.some(function (student) {

                return (
                    student.username.toLowerCase() ===
                    username.toLowerCase()
                );

            });

            if (usernameExists) {

                alert("Username already exists. Please choose another username.");
                return;

            }


            const emailExists = students.some(function (student) {

                return (
                    student.email.toLowerCase() ===
                    email.toLowerCase()
                );

            });

            if (emailExists) {

                alert("Email address is already registered.");
                return;

            }


            let fullCourse = course;

            if (
                (
                    course === "BS in Business Administration" ||
                    course === "BS Education"
                ) &&
                major
            ) {

                fullCourse += " (" + major + ")";

            }


            const newStudent = {

                id: Date.now(),

                fullName: fullName,

                email: email,

                username: username,

                password: password,

                age: age,

                dob: dob,

                pob: pob,

                father: father,

                mother: mother,

                address: address,

                course: fullCourse,

                phone: phone,

                warnings: [],

                avatar: ""

            };


            triggerLoading(function () {

                students.push(newStudent);

                saveStudents(students);

                alert(
                    "Account created successfully! Returning to login."
                );

                window.location.href = "login.html";

            }, 1000, "Creating your account...");

        });

    }

});