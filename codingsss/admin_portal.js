"use strict";

const ADMIN_STORAGE = {
    students: "students",
    announcements: "announcements",
    activities: "activities",
    schedules: "schedules",
    grades: "grades",
    account: "adminAccount"
};

const COURSES = [
    "BS Computer Science",
    "BS Criminology",
    "BS Accountancy",
    "BS Education",
    "BS Business Administration"
];

const MAJORS = {
    "BS Education": [
        "English",
        "Mathematics",
        "Science",
        "Filipino",
        "Social Studies"
    ],
    "BS Business Administration": [
        "Marketing Management",
        "Financial Management",
        "Human Resource Management"
    ]
};

const translations = {
    en: {
        adminPanel: "Admin Panel",
        studentsNav: "Students",
        announcementsNav: "Announcements",
        activities: "Activities",
        schedule: "Schedules",
        grades: "Grades",
        settings: "Settings",
        logout: "Logout",
        adminPortalTitle: "Admin Management Portal",
        registeredStudentsTitle: "Registered Student Accounts",
        editStudentTitle: "Edit Student Account & Credentials",
        usernameLabel: "Username",
        passwordLabel: "Password",
        fullNameLabel: "Full Name",
        emailLabel: "Email",
        ageLabel: "Age",
        dobLabel: "Date of Birth",
        pobLabel: "Place of Birth",
        fatherLabel: "Father's Name",
        motherLabel: "Mother's Name",
        addressLabel: "Address",
        courseLabel: "Course",
        majorLabel: "Major",
        phoneLabel: "Phone",
        updateAccountBtn: "Update Account",
        cancelBtn: "Cancel",
        postAnnounceTitle: "Post Announcement",
        targetCourseLabel: "Target Course",
        postAnnounceBtn: "Post Announcement",
        createActivityTitle: "Create Course Activity",
        addActivityBtn: "Add Activity",
        manageSchedTitle: "Manage Schedules",
        saveSchedBtn: "Save Schedule",
        manageGradesTitle: "Manage Grades",
        recordGradeBtn: "Record Grade",
        adminCredsTitle: "Admin Credentials & Settings",
        languageLabel: "Language / Wika",
        adminUsernameLabel: "Admin Username",
        currPassLabel: "Current Password",
        newPassLabel: "New Password",
        updateAdminBtn: "Update Admin Credentials"
    },
    tl: {
        adminPanel: "Panel ng Admin",
        studentsNav: "Mga Estudyante",
        announcementsNav: "Mga Anunsyo",
        activities: "Mga Aktibidad",
        schedule: "Mga Iskedyul",
        grades: "Mga Marka",
        settings: "Mga Setting",
        logout: "Mag-logout",
        adminPortalTitle: "Portal ng Pamamahala",
        registeredStudentsTitle: "Mga Rehistradong Estudyante",
        editStudentTitle: "I-edit ang Account ng Estudyante",
        usernameLabel: "Username",
        passwordLabel: "Password",
        fullNameLabel: "Buong Pangalan",
        emailLabel: "Email",
        ageLabel: "Edad",
        dobLabel: "Petsa ng Kapanganakan",
        pobLabel: "Lugar ng Kapanganakan",
        fatherLabel: "Pangalan ng Ama",
        motherLabel: "Pangalan ng Ina",
        addressLabel: "Address",
        courseLabel: "Kurso",
        majorLabel: "Major",
        phoneLabel: "Telepono",
        updateAccountBtn: "I-update ang Account",
        cancelBtn: "Kanselahin",
        postAnnounceTitle: "Mag-post ng Anunsyo",
        targetCourseLabel: "Kursong Tatanggap",
        postAnnounceBtn: "I-post ang Anunsyo",
        createActivityTitle: "Gumawa ng Aktibidad",
        addActivityBtn: "Idagdag ang Aktibidad",
        manageSchedTitle: "Pamahalaan ang mga Iskedyul",
        saveSchedBtn: "I-save ang Iskedyul",
        manageGradesTitle: "Pamahalaan ang mga Marka",
        recordGradeBtn: "I-record ang Marka",
        adminCredsTitle: "Mga Setting at Account ng Admin",
        languageLabel: "Wika",
        adminUsernameLabel: "Username ng Admin",
        currPassLabel: "Kasalukuyang Password",
        newPassLabel: "Bagong Password",
        updateAdminBtn: "I-update ang Account ng Admin"
    }
};

function readData(key) {
    try {
        const value = JSON.parse(localStorage.getItem(key) || "[]");
        return Array.isArray(value) ? value : [];
    } catch (error) {
        console.error("Unable to read " + key, error);
        return [];
    }
}

function writeData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        alert("Hindi ma-save ang data. Maaaring puno na ang browser storage.");
        console.error(error);
        return false;
    }
}

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, function (char) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[char];
    });
}

function showLoading(message = "Loading Admin Panel...") {
    const overlay = document.getElementById("loadingOverlay");
    const label = document.getElementById("loaderMsg");

    if (label) label.textContent = message;
    if (overlay) overlay.classList.remove("hidden");
}

function hideLoading() {
    const overlay = document.getElementById("loadingOverlay");
    if (overlay) overlay.classList.add("hidden");
}

function getAdminAccount() {
    const defaultAdmin = {
        username: "admin",
        password: "admin123"
    };

    try {
        const account = JSON.parse(
            localStorage.getItem(ADMIN_STORAGE.account)
        );

        if (account && account.username && account.password) {
            return account;
        }
    } catch (error) {
        console.error("Unable to read admin account.", error);
    }

    localStorage.setItem(
        ADMIN_STORAGE.account,
        JSON.stringify(defaultAdmin)
    );

    return defaultAdmin;
}

function getStudents() {
    return readData(ADMIN_STORAGE.students);
}

function saveStudents(students) {
    return writeData(ADMIN_STORAGE.students, students);
}

function getField(student, fields) {
    for (const field of fields) {
        if (student[field] !== undefined && student[field] !== null) {
            return student[field];
        }
    }

    return "";
}

function switchSection(sectionId, navId) {
    const sectionIds = [
        "usersSection",
        "announceSection",
        "adminActivitiesSection",
        "subjectsSection",
        "adminSchedSection",
        "adminGradesSection",
        "adminSettingsSection"
    ];

    sectionIds.forEach(function (id) {
        const section = document.getElementById(id);

        if (section) {
            section.classList.toggle("hidden", id !== sectionId);
        }
    });

    document.querySelectorAll("#userPanel .menu-items a").forEach(
        function (link) {
            link.classList.remove("active");
        }
    );

    const activeLink = document.getElementById(navId);

    if (activeLink) {
        activeLink.classList.add("active");
    }

    const sidebar = document.getElementById("userPanel");

    if (sidebar && window.innerWidth <= 768) {
        sidebar.classList.remove("expanded");
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById("userPanel");

    if (sidebar) {
        sidebar.classList.toggle("collapsed");
        sidebar.classList.toggle("expanded");
    }
}

function toggleTheme() {
    const dark = document.body.classList.toggle("dark-mode");

    localStorage.setItem("adminTheme", dark ? "dark" : "light");

    const themeText = document.getElementById("themeText");

    if (themeText) {
        themeText.textContent = dark ? "Light Mode" : "Dark Mode";
    }
}

function applySavedTheme() {
    const dark = localStorage.getItem("adminTheme") === "dark";

    document.body.classList.toggle("dark-mode", dark);

    const themeText = document.getElementById("themeText");

    if (themeText) {
        themeText.textContent = dark ? "Light Mode" : "Dark Mode";
    }
}

function setLanguage(language) {
    if (!translations[language]) return;

    localStorage.setItem("adminLanguage", language);

    document.querySelectorAll("[data-key]").forEach(function (element) {
        const key = element.dataset.key;
        const translated = translations[language][key];

        if (!translated) return;

        if (
            element.tagName === "INPUT" ||
            element.tagName === "TEXTAREA"
        ) {
            if (element.hasAttribute("placeholder")) {
                element.placeholder = translated;
            }
        } else {
            element.textContent = translated;
        }
    });
}

function handleCourseSelectChange(course, groupId, selectId) {
    const group = document.getElementById(groupId);
    const select = document.getElementById(selectId);

    if (!group || !select) return;

    const majors = MAJORS[course] || [];

    select.innerHTML = "";

    majors.forEach(function (major) {
        const option = document.createElement("option");
        option.value = major;
        option.textContent = major;
        select.appendChild(option);
    });

    group.classList.toggle("hidden", majors.length === 0);
    select.required = majors.length > 0;
}

function studentValue(student, field) {
    const fields = {
        username: ["username", "userName"],
        fullName: ["fullName", "fullname", "name"],
        email: ["email"],
        course: ["course", "program"],
        major: ["major"],
        age: ["age"],
        phone: ["phone", "contactNumber"],
        address: ["address"]
    };

    return getField(student, fields[field] || [field]);
}

function renderStudents() {
    const container = document.getElementById("studentsTableContainer");
    if (!container) return;

    const students = getStudents();

    if (!students.length) {
        container.innerHTML = "<p>No student accounts found.</p>";
        return;
    }

    container.innerHTML = `
        <div class="table-responsive">
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Course</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${students.map(function (student, index) {
        return `
                            <tr>
                                <td>${escapeHTML(studentValue(student, "username"))}</td>
                                <td>${escapeHTML(studentValue(student, "fullName"))}</td>
                                <td>${escapeHTML(studentValue(student, "email"))}</td>
                                <td>${escapeHTML(studentValue(student, "course"))}</td>
                                <td>
                                    <button type="button" class="main-btn"
                                        onclick="editStudent(${index})">Edit</button>
                                    <button type="button" class="main-btn btn-danger"
                                        onclick="deleteStudent(${index})">Delete</button>
                                </td>
                            </tr>
                        `;
    }).join("")}
                </tbody>
            </table>
        </div>
    `;
}

function editStudent(index) {
    const students = getStudents();
    const student = students[index];

    if (!student) return;

    const fields = {
        aStudentOriginalUsername: ["username", "userName"],
        aStudentUsername: ["username", "userName"],
        aStudentPassword: ["password"],
        aStudentFullName: ["fullName", "fullname", "name"],
        aStudentEmail: ["email"],
        aStudentAge: ["age"],
        aStudentDob: ["dob", "dateOfBirth"],
        aStudentPob: ["pob", "placeOfBirth"],
        aStudentFather: ["father", "fatherName"],
        aStudentMother: ["mother", "motherName"],
        aStudentAddress: ["address"],
        aStudentCourse: ["course", "program"],
        aStudentMajor: ["major"],
        aStudentPhone: ["phone", "contactNumber"]
    };

    Object.entries(fields).forEach(function ([id, keys]) {
        const element = document.getElementById(id);
        if (element) element.value = getField(student, keys);
    });

    const course = document.getElementById("aStudentCourse");

    if (course) {
        handleCourseSelectChange(
            course.value,
            "aStudentMajorGroup",
            "aStudentMajor"
        );

        const major = document.getElementById("aStudentMajor");

        if (major) {
            major.value = getField(student, ["major"]);
        }
    }

    const card = document.getElementById("adminEditStudentCard");

    if (card) {
        card.classList.remove("hidden");
        card.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function saveStudentEditsByAdmin(event) {
    event.preventDefault();

    const students = getStudents();

    const originalUsername = document.getElementById(
        "aStudentOriginalUsername"
    ).value;

    const newUsername = document.getElementById("aStudentUsername").value.trim();

    const index = students.findIndex(function (student) {
        return getField(student, ["username", "userName"]) === originalUsername;
    });

    if (index < 0) {
        alert("Student account not found.");
        return;
    }

    const duplicate = students.some(function (student, i) {
        return i !== index &&
            getField(student, ["username", "userName"]) === newUsername;
    });

    if (duplicate) {
        alert("This username is already in use.");
        return;
    }

    const student = students[index];

    const updates = {
        username: newUsername,
        password: document.getElementById("aStudentPassword").value,
        fullName: document.getElementById("aStudentFullName").value.trim(),
        email: document.getElementById("aStudentEmail").value.trim(),
        age: document.getElementById("aStudentAge").value,
        dob: document.getElementById("aStudentDob").value,
        pob: document.getElementById("aStudentPob").value.trim(),
        father: document.getElementById("aStudentFather").value.trim(),
        mother: document.getElementById("aStudentMother").value.trim(),
        address: document.getElementById("aStudentAddress").value.trim(),
        course: document.getElementById("aStudentCourse").value,
        major: document.getElementById("aStudentMajor").value,
        phone: document.getElementById("aStudentPhone").value.trim()
    };

    Object.assign(student, updates);

    if (student.userName !== undefined) {
        student.userName = newUsername;
    }

    if (student.fullname !== undefined) {
        student.fullname = updates.fullName;
    }

    if (student.name !== undefined) {
        student.name = updates.fullName;
    }

    if (student.program !== undefined) {
        student.program = updates.course;
    }

    if (student.dateOfBirth !== undefined) {
        student.dateOfBirth = updates.dob;
    }

    if (student.placeOfBirth !== undefined) {
        student.placeOfBirth = updates.pob;
    }

    if (student.fatherName !== undefined) {
        student.fatherName = updates.father;
    }

    if (student.motherName !== undefined) {
        student.motherName = updates.mother;
    }

    if (student.contactNumber !== undefined) {
        student.contactNumber = updates.phone;
    }

    if (!saveStudents(students)) return;

    const card = document.getElementById("adminEditStudentCard");
    if (card) card.classList.add("hidden");

    renderStudents();
    alert("Student account updated successfully.");
}

function deleteStudent(index) {
    const students = getStudents();
    const student = students[index];

    if (!student) return;

    const username = getField(student, ["username", "userName"]);

    if (!confirm("Delete student account " + username + "?")) return;

    students.splice(index, 1);

    if (saveStudents(students)) {
        renderStudents();
        alert("Student account deleted.");
    }
}

function handleRemove(key, index, renderFunction, label) {
    const items = readData(key);

    if (!items[index]) return;

    if (!confirm("Delete this " + label + "?")) return;

    items.splice(index, 1);

    if (writeData(key, items)) {
        renderFunction();
    }
}

function postAnnouncement() {
    const title = document.getElementById("annTitle").value.trim();
    const content = document.getElementById("annContent").value.trim();

    if (!title || !content) {
        alert("Please enter an announcement title and content.");
        return;
    }

    const course = document.getElementById("annCourse").value;
    const major = document.getElementById("annMajor").value;

    const items = readData(ADMIN_STORAGE.announcements);

    items.unshift({
        id: Date.now(),
        title: title,
        content: content,
        course: course,
        major: MAJORS[course] ? major : "",
        date: new Date().toLocaleString(),
        createdBy: "admin"
    });

    if (!writeData(ADMIN_STORAGE.announcements, items)) return;

    document.getElementById("annTitle").value = "";
    document.getElementById("annContent").value = "";

    renderAnnouncements();
    alert("Announcement posted successfully.");
}

function renderAnnouncements() {
    const container = document.getElementById("announcementsList");
    if (!container) return;

    const items = readData(ADMIN_STORAGE.announcements);

    if (!items.length) {
        container.innerHTML = "<div class='card'><p>No announcements yet.</p></div>";
        return;
    }

    container.innerHTML = items.map(function (item, index) {
        return `
            <div class="card">
                <h3>${escapeHTML(item.title)}</h3>
                <p>${escapeHTML(item.content)}</p>
                <p><strong>Course:</strong> ${escapeHTML(item.course || "All")}</p>
                ${item.major ? `<p><strong>Major:</strong> ${escapeHTML(item.major)}</p>` : ""}
                <small>${escapeHTML(item.date || "")}</small>
                <div>
                    <button type="button" class="main-btn btn-danger"
                        onclick="handleRemove('announcements', ${index}, renderAnnouncements, 'announcement')">
                        Delete
                    </button>
                </div>
            </div>
        `;
    }).join("");
}

function addActivity() {
    const title = document.getElementById("actTitle").value.trim();
    const link = document.getElementById("actLink").value.trim();
    const description = document.getElementById("actDesc").value.trim();
    const course = document.getElementById("actCourse").value;
    const major = document.getElementById("actMajor").value;
    const fileInput = document.getElementById("actFile");
    const file = fileInput.files[0];

    if (!title || (!description && !link && !file)) {
        alert("Enter an activity title and a description, resource link, or file.");
        return;
    }

    if (file && file.size > 2 * 1024 * 1024) {
        alert("The selected file is larger than 2 MB. Please choose a smaller file.");
        return;
    }

    function saveActivity(fileData = "") {
        const items = readData(ADMIN_STORAGE.activities);

        items.unshift({
            id: Date.now(),
            title: title,
            link: link,
            description: description,
            course: course,
            major: MAJORS[course] ? major : "",
            fileName: file ? file.name : "",
            fileData: fileData,
            date: new Date().toLocaleString()
        });

        if (!writeData(ADMIN_STORAGE.activities, items)) return;

        document.getElementById("actTitle").value = "";
        document.getElementById("actLink").value = "";
        document.getElementById("actDesc").value = "";
        fileInput.value = "";

        renderActivities();
        alert("Activity added successfully.");
    }

    if (file) {
        const reader = new FileReader();

        reader.onload = function () {
            saveActivity(String(reader.result));
        };

        reader.onerror = function () {
            alert("Unable to read the selected file.");
        };

        reader.readAsDataURL(file);
    } else {
        saveActivity();
    }
}

function renderActivities() {
    const container = document.getElementById("adminActivitiesList");
    if (!container) return;

    const items = readData(ADMIN_STORAGE.activities);

    if (!items.length) {
        container.innerHTML = "<div class='card'><p>No activities yet.</p></div>";
        return;
    }

    container.innerHTML = items.map(function (item, index) {
        return `
            <div class="card">
                <h3>${escapeHTML(item.title)}</h3>
                <p>${escapeHTML(item.description || "")}</p>
                <p><strong>Course:</strong> ${escapeHTML(item.course || "")}</p>
                ${item.major ? `<p><strong>Major:</strong> ${escapeHTML(item.major)}</p>` : ""}
                ${item.link ? `<p><a href="${escapeHTML(item.link)}" target="_blank" rel="noopener noreferrer">Open Resource</a></p>` : ""}
                ${item.fileName ? `<p>File: ${escapeHTML(item.fileName)}</p>` : ""}
                ${item.fileData ? `<a href="${escapeHTML(item.fileData)}" download="${escapeHTML(item.fileName || "activity-file")}">Download File</a>` : ""}
                <p><small>${escapeHTML(item.date || "")}</small></p>
                <button type="button" class="main-btn btn-danger"
                    onclick="handleRemove('activities', ${index}, renderActivities, 'activity')">
                    Delete
                </button>
            </div>
        `;
    }).join("");
}

function addSchedule() {
    const subject = document.getElementById("schSubject").value.trim();
    const day = document.getElementById("schDay").value.trim();
    const course = document.getElementById("schCourse").value;
    const major = document.getElementById("schMajor").value;

    if (!subject || !day) {
        alert("Please enter the subject and day/time.");
        return;
    }

    const items = readData(ADMIN_STORAGE.schedules);

    items.push({
        id: Date.now(),
        subject: subject,
        day: day,
        course: course,
        major: MAJORS[course] ? major : ""
    });

    if (!writeData(ADMIN_STORAGE.schedules, items)) return;

    document.getElementById("schSubject").value = "";
    document.getElementById("schDay").value = "";

    renderSchedules();
    alert("Schedule saved successfully.");
}

function renderSchedules() {
    const container = document.getElementById("adminSchedList");
    if (!container) return;

    const items = readData(ADMIN_STORAGE.schedules);

    if (!items.length) {
        container.innerHTML = "<div class='card'><p>No schedules yet.</p></div>";
        return;
    }

    container.innerHTML = `
        <div class="card table-responsive">
            <table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Day & Time</th>
                        <th>Course</th>
                        <th>Major</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${items.map(function (item, index) {
        return `
                            <tr>
                                <td>${escapeHTML(item.subject)}</td>
                                <td>${escapeHTML(item.day)}</td>
                                <td>${escapeHTML(item.course)}</td>
                                <td>${escapeHTML(item.major || "-")}</td>
                                <td>
                                    <button type="button" class="main-btn btn-danger"
                                        onclick="handleRemove('schedules', ${index}, renderSchedules, 'schedule')">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        `;
    }).join("")}
                </tbody>
            </table>
        </div>
    `;
}

function saveGrade() {
    const username = document.getElementById("grStudentUser").value.trim();
    const subject = document.getElementById("grSubject").value.trim();
    const grade = document.getElementById("grValue").value.trim();

    if (!username || !subject || !grade) {
        alert("Please enter the student's username, subject, and grade.");
        return;
    }

    const students = getStudents();

    const studentExists = students.some(function (student) {
        return getField(student, ["username", "userName"]) === username;
    });

    if (!studentExists) {
        alert("Student username not found. Check the registered student accounts.");
        return;
    }

    const items = readData(ADMIN_STORAGE.grades);

    items.push({
        id: Date.now(),
        username: username,
        subject: subject,
        grade: grade,
        date: new Date().toLocaleDateString()
    });

    if (!writeData(ADMIN_STORAGE.grades, items)) return;

    document.getElementById("grStudentUser").value = "";
    document.getElementById("grSubject").value = "";
    document.getElementById("grValue").value = "";

    renderGrades();
    alert("Grade recorded successfully.");
}

function renderGrades() {
    const container = document.getElementById("adminGradesList");
    if (!container) return;

    const items = readData(ADMIN_STORAGE.grades);

    if (!items.length) {
        container.innerHTML = "<div class='card'><p>No grades recorded yet.</p></div>";
        return;
    }

    container.innerHTML = `
        <div class="card table-responsive">
            <table>
                <thead>
                    <tr>
                        <th>Student Username</th>
                        <th>Subject</th>
                        <th>Grade</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${items.map(function (item, index) {
        return `
                            <tr>
                                <td>${escapeHTML(item.username)}</td>
                                <td>${escapeHTML(item.subject)}</td>
                                <td>${escapeHTML(item.grade)}</td>
                                <td>${escapeHTML(item.date || "")}</td>
                                <td>
                                    <button type="button" class="main-btn btn-danger"
                                        onclick="handleRemove('grades', ${index}, renderGrades, 'grade')">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        `;
    }).join("")}
                </tbody>
            </table>
        </div>
    `;
}

function changeAdminPassword(event) {
    event.preventDefault();

    const username = document.getElementById("admUsername").value.trim();
    const currentPassword = document.getElementById("admCurrPass").value;
    const newPassword = document.getElementById("admNewPass").value;

    const account = getAdminAccount();

    if (
        account.username !== username ||
        account.password !== currentPassword
    ) {
        alert("Your current admin username or password is incorrect.");
        return;
    }

    if (newPassword.length < 6) {
        alert("The new password must contain at least 6 characters.");
        return;
    }

    const newUsername = username;

    const updatedAccount = {
        username: newUsername,
        password: newPassword
    };

    try {
        localStorage.setItem(
            ADMIN_STORAGE.account,
            JSON.stringify(updatedAccount)
        );

        const currentUser = JSON.parse(
            localStorage.getItem("currentUser") || "null"
        );

        if (currentUser && currentUser.role === "admin") {
            currentUser.username = newUsername;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        }

        document.getElementById("admCurrPass").value = "";
        document.getElementById("admNewPass").value = "";

        alert("Admin password updated successfully. Use your new password next time you log in.");
    } catch (error) {
        alert("Unable to save the updated admin account.");
        console.error(error);
    }
}

function logout() {
    if (!confirm("Are you sure you want to log out?")) return;

    localStorage.removeItem("currentUser");
    localStorage.removeItem("loggedInStudent");

    window.location.href = "login.html";
}

function initializeAdmin() {
    showLoading("Loading Admin Panel...");

    getAdminAccount();

    const language = localStorage.getItem("adminLanguage") || "en";
    const languageSelect = document.getElementById("langSelect");

    if (languageSelect) {
        languageSelect.value = language;
    }

    applySavedTheme();
    setLanguage(language);

    const admin = getAdminAccount();
    const adminUsername = document.getElementById("admUsername");

    if (adminUsername) {
        adminUsername.value = admin.username;
    }

    const defaultCourses = [
        ["aStudentCourse", "aStudentMajorGroup", "aStudentMajor"],
        ["annCourse", "annMajorGroup", "annMajor"],
        ["actCourse", "actMajorGroup", "actMajor"],
        ["schCourse", "schMajorGroup", "schMajor"]
    ];

    defaultCourses.forEach(function (ids) {
        const courseSelect = document.getElementById(ids[0]);

        if (courseSelect) {
            handleCourseSelectChange(
                courseSelect.value,
                ids[1],
                ids[2]
            );
        }
    });

    renderStudents();
    renderAnnouncements();
    renderActivities();
    renderSchedules();
    renderGrades();

    switchSection("usersSection", "aNavUsers");

    hideLoading();
}

document.addEventListener("DOMContentLoaded", initializeAdmin);

function getSubjects() {
    try {
        const data = JSON.parse(localStorage.getItem("subjects") || "[]");
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Unable to load subjects:", error);
        return [];
    }
}

function saveSubjects(subjects) {
    localStorage.setItem("subjects", JSON.stringify(subjects));
}

function addSubject() {
    const nameInput = document.getElementById("subjectName");
    const codeInput = document.getElementById("subjectCode");
    const courseInput = document.getElementById("subjectCourse");
    const unitsInput = document.getElementById("subjectUnits");

    const name = nameInput.value.trim();
    const code = codeInput.value.trim();
    const course = courseInput.value;
    const units = Number(unitsInput.value);

    if (!name || !code || !course || !unitsInput.value ||
        !Number.isInteger(units) || units < 1 || units > 10) {
        alert("Please complete all fields correctly.");
        return;
    }

    const subjects = getSubjects();

    const duplicate = subjects.some(subject =>
        subject.code.toLowerCase() === code.toLowerCase() &&
        subject.course === course
    );

    if (duplicate) {
        alert("This subject code already exists for this course.");
        return;
    }

    subjects.push({
        id: Date.now().toString(),
        name,
        code,
        course,
        units
    });

    saveSubjects(subjects);

    nameInput.value = "";
    codeInput.value = "";
    courseInput.value = "";
    unitsInput.value = "";

    renderAdminSubjects();
    alert("Subject added successfully!");
}

function renderAdminSubjects() {
    const container = document.getElementById("adminSubjectsList");

    if (!container) return;

    const subjects = getSubjects();

    if (subjects.length === 0) {
        container.innerHTML = "<p>No subjects added yet.</p>";
        return;
    }

    container.replaceChildren();

    subjects.forEach(subject => {
        const card = document.createElement("div");
        card.className = "subject-card";

        const title = document.createElement("h4");
        title.textContent = subject.name;

        const code = document.createElement("p");
        code.textContent = "Code: " + subject.code;

        const course = document.createElement("p");
        course.textContent = "Course: " + subject.course;

        const units = document.createElement("p");
        units.textContent = "Units: " + subject.units;

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "main-btn btn-danger";
        removeButton.textContent = "Delete";
        removeButton.addEventListener("click", function () {
            deleteSubject(subject.id);
        });

        card.append(title, code, course, units, removeButton);
        container.appendChild(card);
    });
}

function deleteSubject(id) {
    if (!confirm("Are you sure you want to delete this subject?")) {
        return;
    }

    const subjects = getSubjects().filter(subject =>
        subject.id !== id
    );

    saveSubjects(subjects);
    renderAdminSubjects();
}

document.addEventListener("DOMContentLoaded", function () {
    renderAdminSubjects();
});