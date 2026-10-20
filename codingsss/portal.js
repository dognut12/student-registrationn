const translations = {
    en: {
        dashboard: "Dashboard",
        profile: "My Profile",
        announcements: "Announcements",
        activities: "Activities",
        schedule: "Schedule",
        grades: "Grades",
        messages: "Messages",
        settings: "Settings",
        logout: "Logout",
        studentPortalTitle: "Student Portal",
        whatsOnYourMind: "What's on your mind?",
        mediaBtn: "Media",
        postBtn: "POST",
        editProfileBtn: "Edit Profile",
        editProfileTitle: "Edit Profile Information",
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
        saveChangesBtn: "Save Changes",
        myPostsTitle: "My Posts",
        courseActivitiesTitle: "Course Activities",
        classScheduleTitle: "Class Schedule",
        academicGradesTitle: "Academic Grades",
        conversationsTitle: "Conversations",
        selectUserTitle: "Select a user",
        typeMessagePlaceholder: "Type message...",
        sendBtn: "Send",
        accountSettingsTitle: "Account Settings",
        languageLabel: "Language / Wika",
        currPassLabel: "Current Password",
        newPassLabel: "New Password",
        confirmPassLabel: "Confirm New Password",
        changePassBtn: "Change Password"
    },

    tl: {
        dashboard: "Dashboard",
        profile: "Aking Profile",
        announcements: "Mga Anunsyo",
        activities: "Mga Aktibidad",
        schedule: "Iskedyul",
        grades: "Mga Marka",
        messages: "Mga Mensahe",
        settings: "Settings",
        logout: "Mag-logout",
        studentPortalTitle: "Student Portal",
        whatsOnYourMind: "Ano ang nasa isip mo?",
        mediaBtn: "Media",
        postBtn: "I-POST",
        editProfileBtn: "I-edit ang Profile",
        editProfileTitle: "I-edit ang Impormasyon",
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
        saveChangesBtn: "I-save ang Changes",
        myPostsTitle: "Aking mga Post",
        courseActivitiesTitle: "Mga Aktibidad sa Kurso",
        classScheduleTitle: "Iskedyul ng Klase",
        academicGradesTitle: "Mga Marka",
        conversationsTitle: "Mga Conversation",
        selectUserTitle: "Pumili ng User",
        typeMessagePlaceholder: "Mag-type ng mensahe...",
        sendBtn: "Ipadala",
        accountSettingsTitle: "Account Settings",
        languageLabel: "Language / Wika",
        currPassLabel: "Kasalukuyang Password",
        newPassLabel: "Bagong Password",
        confirmPassLabel: "Kumpirmahin ang Bagong Password",
        changePassBtn: "Palitan ang Password"
    }
};


function getStudents() {
    try {
        const students = JSON.parse(localStorage.getItem("students"));

        return Array.isArray(students) ? students : [];
    } catch (error) {
        return [];
    }
}


function saveStudents(students) {
    localStorage.setItem("students", JSON.stringify(students));
}


function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem("currentUser"));
    } catch (error) {
        return null;
    }
}


function saveCurrentUser(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
}


function getPosts() {
    try {
        const posts = JSON.parse(localStorage.getItem("studentPosts"));

        return Array.isArray(posts) ? posts : [];
    } catch (error) {
        return [];
    }
}


function savePosts(posts) {
    localStorage.setItem("studentPosts", JSON.stringify(posts));
}


function getAnnouncements() {
    try {
        const data = JSON.parse(localStorage.getItem("announcements"));

        return Array.isArray(data) ? data : [];
    } catch (error) {
        return [];
    }
}


function getActivities() {
    try {
        const data = JSON.parse(localStorage.getItem("activities"));

        return Array.isArray(data) ? data : [];
    } catch (error) {
        return [];
    }
}


function getSchedules() {
    try {
        const data = JSON.parse(localStorage.getItem("schedules"));

        return Array.isArray(data) ? data : [];
    } catch (error) {
        return [];
    }
}


function getGrades() {
    try {
        const data = JSON.parse(localStorage.getItem("grades"));

        return Array.isArray(data) ? data : [];
    } catch (error) {
        return [];
    }
}


function getMessages() {
    try {
        const data = JSON.parse(localStorage.getItem("messages"));

        return Array.isArray(data) ? data : [];
    } catch (error) {
        return [];
    }
}


function showLoading(message = "Loading...") {
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


function triggerLoading(callback, delay = 700, message = "Loading...") {
    showLoading(message);

    setTimeout(function () {
        hideLoading();

        if (typeof callback === "function") {
            callback();
        }
    }, delay);
}


function toggleSidebar() {
    const panel = document.getElementById("userPanel");

    if (panel) {
        panel.classList.toggle("collapsed");
    }
}


function switchSection(sectionId, navId) {
    const sections = [
        "feedSection",
        "profileSection",
        "announcementsSection",
        "activitiesSection",
        "scheduleSection",
        "gradesSection",
        "messagesSection",
        "settingsSection"
    ];

    sections.forEach(function (id) {
        const section = document.getElementById(id);

        if (section) {
            section.classList.add("hidden");
        }
    });

    const selectedSection = document.getElementById(sectionId);

    if (selectedSection) {
        selectedSection.classList.remove("hidden");
    }

    const navItems = document.querySelectorAll(".menu-items li a");

    navItems.forEach(function (item) {
        item.classList.remove("active");
    });

    const selectedNav = document.getElementById(navId);

    if (selectedNav) {
        selectedNav.classList.add("active");
    }

    if (sectionId === "profileSection") {
        loadProfile();
        loadMyPosts();
    }

    if (sectionId === "announcementsSection") {
        loadAnnouncements();
    }

    if (sectionId === "activitiesSection") {
        loadActivities();
    }

    if (sectionId === "scheduleSection") {
        loadSchedule();
    }

    if (sectionId === "gradesSection") {
        loadGrades();
    }

    if (sectionId === "messagesSection") {
        loadChatUsers();
    }

    if (sectionId === "feedSection") {
        loadFeed();
    }
}


function toggleTheme() {
    document.body.classList.toggle("light-mode");

    const lightMode = document.body.classList.contains("light-mode");

    localStorage.setItem("theme", lightMode ? "light" : "dark");

    const themeText = document.getElementById("themeText");

    if (themeText) {
        themeText.textContent = lightMode ? "Light Mode" : "Dark Mode";
    }
}


function loadTheme() {
    const theme = localStorage.getItem("theme");

    if (theme === "light") {
        document.body.classList.add("light-mode");

        const themeText = document.getElementById("themeText");

        if (themeText) {
            themeText.textContent = "Light Mode";
        }
    }
}


function logout() {
    const confirmed = confirm("Are you sure you want to logout?");

    if (!confirmed) {
        return;
    }

    localStorage.removeItem("currentUser");

    window.location.href = "login.html";
}


function loadProfile() {
    const currentUser = getCurrentUser();

    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    const fullName = currentUser.fullName || "Student";
    const course = currentUser.course || "No course";

    const nameElement = document.getElementById("pFullName");
    const courseElement = document.getElementById("pCourse");
    const avatarElement = document.getElementById("profileAvatarDisplay");

    if (nameElement) {
        nameElement.textContent = fullName;
    }

    if (courseElement) {
        courseElement.textContent = course;
    }

    if (avatarElement) {

        if (currentUser.avatar) {
            avatarElement.innerHTML =
                `<img src="${currentUser.avatar}" style="width:100%;height:100%;object-fit:cover;">`;
        } else {
            avatarElement.textContent =
                fullName.charAt(0).toUpperCase();
        }
    }

    const fields = {
        editFullName: currentUser.fullName || "",
        editEmail: currentUser.email || "",
        editAge: currentUser.age || "",
        editDob: currentUser.dob || "",
        editPob: currentUser.pob || "",
        editFather: currentUser.father || "",
        editMother: currentUser.mother || "",
        editAddress: currentUser.address || "",
        editPhone: currentUser.phone || ""
    };

    Object.keys(fields).forEach(function (id) {

        const element = document.getElementById(id);

        if (element) {
            element.value = fields[id];
        }
    });

    const editCourse = document.getElementById("editCourse");

    if (editCourse && currentUser.course) {

        let baseCourse = currentUser.course;

        const majorMatch = baseCourse.match(/\((.*?)\)/);

        if (majorMatch) {
            baseCourse = baseCourse.replace(/\s*\(.*?\)/, "");
        }

        if (baseCourse === "BS in Business Administration") {
            baseCourse = "BS Business Administration";
        }

        editCourse.value = baseCourse;

        handleCourseSelectChange(
            editCourse.value,
            "editMajorGroup",
            "editMajor"
        );

        if (majorMatch) {
            const majorSelect = document.getElementById("editMajor");

            if (majorSelect) {
                majorSelect.value = majorMatch[1];
            }
        }
    }

    const warningNotice = document.getElementById("warningNotice");

    if (warningNotice) {

        if (currentUser.warnings && currentUser.warnings.length > 0) {

            warningNotice.classList.remove("hidden");

            warningNotice.innerHTML = `
                <div style="
                    padding:10px;
                    border-radius:8px;
                    background:rgba(255,0,0,0.1);
                    color:var(--error-red);
                ">
                    <strong>Warning</strong>
                    <br>
                    ${currentUser.warnings.map(w => `<div>${escapeHtml(w)}</div>`).join("")}
                </div>
            `;

        } else {
            warningNotice.classList.add("hidden");
        }
    }
}


function toggleEditProfileForm() {
    const card = document.getElementById("editProfileCard");

    if (card) {
        card.classList.toggle("hidden");
    }
}


function handleCourseSelectChange(course, groupId, selectId) {
    const group = document.getElementById(groupId);
    const select = document.getElementById(selectId);

    if (!group || !select) {
        return;
    }

    select.innerHTML = "";

    if (
        course === "BS Business Administration" ||
        course === "BS in Business Administration"
    ) {

        group.classList.remove("hidden");
        select.required = true;

        const majors = [
            "Major in Financial Management",
            "Major in HRDM"
        ];

        majors.forEach(function (major) {

            const option = document.createElement("option");

            option.value = major;
            option.textContent = major;

            select.appendChild(option);
        });

    } else if (course === "BS Education") {

        group.classList.remove("hidden");
        select.required = true;

        const majors = [
            "Major in Mathematics",
            "Major in Science",
            "Major in English"
        ];

        majors.forEach(function (major) {

            const option = document.createElement("option");

            option.value = major;
            option.textContent = major;

            select.appendChild(option);
        });

    } else {

        group.classList.add("hidden");
        select.required = false;
        select.value = "";
    }
}


function saveProfileEdits(event) {
    event.preventDefault();

    const currentUser = getCurrentUser();

    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    const students = getStudents();

    const studentIndex = students.findIndex(function (student) {
        return student.id === currentUser.id;
    });

    if (studentIndex === -1) {
        alert("Student account not found.");
        return;
    }

    const newEmail =
        document.getElementById("editEmail").value.trim();

    const emailUsed = students.some(function (student, index) {

        return (
            index !== studentIndex &&
            student.email.toLowerCase() === newEmail.toLowerCase()
        );

    });

    if (emailUsed) {
        alert("Email address is already being used.");
        return;
    }

    let course =
        document.getElementById("editCourse").value;

    const major =
        document.getElementById("editMajor").value;

    if (
        (
            course === "BS Education" ||
            course === "BS Business Administration"
        ) &&
        major
    ) {
        course += " (" + major + ")";
    }

    const updatedStudent = {
        ...students[studentIndex],

        fullName:
            document.getElementById("editFullName").value.trim(),

        email: newEmail,

        age:
            document.getElementById("editAge").value,

        dob:
            document.getElementById("editDob").value,

        pob:
            document.getElementById("editPob").value.trim(),

        father:
            document.getElementById("editFather").value.trim(),

        mother:
            document.getElementById("editMother").value.trim(),

        address:
            document.getElementById("editAddress").value.trim(),

        course: course,

        phone:
            document.getElementById("editPhone").value.trim()
    };

    const avatarInput =
        document.getElementById("editAvatar");

    if (
        avatarInput &&
        avatarInput.files &&
        avatarInput.files.length > 0
    ) {

        const file = avatarInput.files[0];

        const reader = new FileReader();

        reader.onload = function () {

            updatedStudent.avatar = reader.result;

            students[studentIndex] = updatedStudent;

            saveStudents(students);

            saveCurrentUser({
                ...updatedStudent,
                role: "student"
            });

            alert("Profile updated successfully.");

            loadProfile();

            toggleEditProfileForm();
        };

        reader.readAsDataURL(file);

    } else {

        students[studentIndex] = updatedStudent;

        saveStudents(students);

        saveCurrentUser({
            ...updatedStudent,
            role: "student"
        });

        alert("Profile updated successfully.");

        loadProfile();

        toggleEditProfileForm();
    }
}


function submitStudentPost() {
    const currentUser = getCurrentUser();

    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    const textElement = document.getElementById("postText");
    const fileElement = document.getElementById("postMediaFile");

    const text = textElement.value.trim();

    if (!text && (!fileElement.files || fileElement.files.length === 0)) {
        alert("Please write something or select a media file.");
        return;
    }

    const posts = getPosts();

    const post = {
        id: Date.now(),
        studentId: currentUser.id,
        username: currentUser.username,
        fullName: currentUser.fullName,
        text: text,
        media: "",
        mediaType: "",
        date: new Date().toLocaleString()
    };

    if (fileElement.files && fileElement.files.length > 0) {

        const file = fileElement.files[0];

        if (file.size > 5 * 1024 * 1024) {
            alert("Please select a file smaller than 5MB.");
            return;
        }

        const reader = new FileReader();

        reader.onload = function () {

            post.media = reader.result;
            post.mediaType = file.type;

            posts.unshift(post);

            savePosts(posts);

            textElement.value = "";
            fileElement.value = "";

            const mediaName = document.getElementById("mediaName");

            if (mediaName) {
                mediaName.textContent = "";
            }

            loadFeed();
        };

        reader.readAsDataURL(file);

    } else {

        posts.unshift(post);

        savePosts(posts);

        textElement.value = "";

        loadFeed();
    }
}


function loadFeed() {
    const container = document.getElementById("feedStream");

    if (!container) {
        return;
    }

    const posts = getPosts();

    if (posts.length === 0) {

        container.innerHTML = `
            <div class="card">
                <p>No posts yet.</p>
            </div>
        `;

        return;
    }

    container.innerHTML = posts.map(function (post) {

        let mediaHtml = "";

        if (post.media) {

            if (post.mediaType.startsWith("image/")) {

                mediaHtml = `
                    <img
                        src="${post.media}"
                        style="width:100%;max-height:400px;object-fit:contain;margin-top:10px;border-radius:10px;"
                    >
                `;

            } else if (post.mediaType.startsWith("video/")) {

                mediaHtml = `
                    <video
                        controls
                        style="width:100%;max-height:400px;margin-top:10px;border-radius:10px;"
                    >
                        <source src="${post.media}" type="${post.mediaType}">
                    </video>
                `;
            }
        }

        return `
            <div class="card">
                <h4>${escapeHtml(post.fullName || post.username)}</h4>
                <small>${escapeHtml(post.date || "")}</small>

                ${post.text
                ? `<p style="margin-top:10px;">${escapeHtml(post.text)}</p>`
                : ""
            }

                ${mediaHtml}
            </div>
        `;

    }).join("");
}


function loadMyPosts() {
    const container = document.getElementById("myPostsStream");

    if (!container) {
        return;
    }

    const currentUser = getCurrentUser();

    if (!currentUser) {
        return;
    }

    const posts = getPosts().filter(function (post) {
        return post.studentId === currentUser.id;
    });

    if (posts.length === 0) {

        container.innerHTML = `
            <div class="card">
                <p>You have no posts yet.</p>
            </div>
        `;

        return;
    }

    container.innerHTML = posts.map(function (post) {

        return `
            <div class="card">
                <small>${escapeHtml(post.date || "")}</small>

                ${post.text
                ? `<p style="margin-top:10px;">${escapeHtml(post.text)}</p>`
                : ""
            }

                ${post.media
                ? `<img src="${post.media}" style="width:100%;max-height:350px;object-fit:contain;margin-top:10px;border-radius:10px;">`
                : ""
            }
            </div>
        `;

    }).join("");
}


function updateMediaFileName(input) {
    const mediaName = document.getElementById("mediaName");

    if (!mediaName) {
        return;
    }

    if (input.files && input.files.length > 0) {
        mediaName.textContent = input.files[0].name;
    } else {
        mediaName.textContent = "";
    }
}


function loadAnnouncements() {
    const container =
        document.getElementById("studentAnnouncementsList");

    if (!container) {
        return;
    }

    const announcements = getAnnouncements();

    if (announcements.length === 0) {

        container.innerHTML = `
            <p>No announcements available.</p>
        `;

        return;
    }

    container.innerHTML = announcements.map(function (item) {

        return `
            <div class="card" style="margin-bottom:10px;">
                <h4>${escapeHtml(item.title || "Announcement")}</h4>
                <p>${escapeHtml(item.content || item.text || "")}</p>
                <small>${escapeHtml(item.date || "")}</small>
            </div>
        `;

    }).join("");
}


function loadActivities() {
    const container =
        document.getElementById("activitiesList");

    if (!container) {
        return;
    }

    const currentUser = getCurrentUser();
    const activities = getActivities();

    let filtered = activities;

    if (currentUser && currentUser.course) {

        filtered = activities.filter(function (activity) {

            return (
                !activity.course ||
                activity.course === currentUser.course
            );

        });
    }

    if (filtered.length === 0) {

        container.innerHTML = `
            <p>No activities available.</p>
        `;

        return;
    }

    container.innerHTML = filtered.map(function (activity) {

        return `
            <div class="card" style="margin-bottom:10px;">
                <h4>${escapeHtml(activity.title || "Activity")}</h4>
                <p>${escapeHtml(activity.description || activity.content || "")}</p>
                <small>Due: ${escapeHtml(activity.dueDate || "No deadline")}</small>
            </div>
        `;

    }).join("");
}


function loadSchedule() {
    const container =
        document.getElementById("scheduleDisplay");

    if (!container) {
        return;
    }

    const currentUser = getCurrentUser();
    const schedules = getSchedules();

    let filtered = schedules;

    if (currentUser && currentUser.course) {

        filtered = schedules.filter(function (schedule) {

            return (
                !schedule.course ||
                schedule.course === currentUser.course
            );

        });
    }

    if (filtered.length === 0) {

        container.innerHTML = `
            <p>No class schedule available.</p>
        `;

        return;
    }

    container.innerHTML = filtered.map(function (item) {

        return `
            <div class="card" style="margin-bottom:10px;">
                <h4>${escapeHtml(item.subject || item.title || "Class")}</h4>
                <p>
                    ${escapeHtml(item.day || "")}
                    ${escapeHtml(item.time || "")}
                </p>
                <p>Room: ${escapeHtml(item.room || "TBA")}</p>
            </div>
        `;

    }).join("");
}


function loadGrades() {
    const container =
        document.getElementById("gradesDisplay");

    if (!container) {
        return;
    }

    const currentUser = getCurrentUser();
    const grades = getGrades();

    const studentGrades = grades.filter(function (grade) {

        if (!currentUser) {
            return false;
        }

        return (
            grade.studentId === currentUser.id ||
            grade.username === currentUser.username
        );

    });

    if (studentGrades.length === 0) {

        container.innerHTML = `
            <p>No grades available yet.</p>
        `;

        return;
    }

    container.innerHTML = studentGrades.map(function (grade) {

        return `
            <div class="card" style="margin-bottom:10px;">
                <h4>${escapeHtml(grade.subject || "Subject")}</h4>
                <p>Grade: <strong>${escapeHtml(String(grade.grade ?? "N/A"))}</strong></p>
            </div>
        `;

    }).join("");
}


function loadChatUsers() {
    const container =
        document.getElementById("chatUsersList");

    if (!container) {
        return;
    }

    const currentUser = getCurrentUser();

    if (!currentUser) {
        return;
    }

    const students = getStudents().filter(function (student) {

        return student.id !== currentUser.id;

    });

    if (students.length === 0) {

        container.innerHTML = `
            <p>No other students available.</p>
        `;

        return;
    }

    container.innerHTML = students.map(function (student) {

        return `
            <div
                onclick="openChat(${student.id})"
                style="
                    padding:10px;
                    cursor:pointer;
                    border-radius:8px;
                    margin-bottom:5px;
                "
            >
                ${escapeHtml(student.fullName || student.username)}
            </div>
        `;

    }).join("");
}


let activeChatUserId = null;


function openChat(userId) {
    activeChatUserId = userId;

    const students = getStudents();

    const user = students.find(function (student) {
        return student.id === userId;
    });

    if (!user) {
        return;
    }

    const title = document.getElementById("activeChatTitle");

    if (title) {
        title.textContent = user.fullName || user.username;
    }

    loadChatMessages();
}


function loadChatMessages() {
    const container =
        document.getElementById("chatBox");

    if (!container) {
        return;
    }

    const currentUser = getCurrentUser();

    if (!currentUser || !activeChatUserId) {
        container.innerHTML = "";
        return;
    }

    const messages = getMessages();

    const chatMessages = messages.filter(function (message) {

        return (
            (
                message.fromId === currentUser.id &&
                message.toId === activeChatUserId
            ) ||
            (
                message.fromId === activeChatUserId &&
                message.toId === currentUser.id
            )
        );

    });

    container.innerHTML = chatMessages.map(function (message) {

        const mine =
            message.fromId === currentUser.id;

        return `
            <div style="
                text-align:${mine ? "right" : "left"};
                margin:8px 0;
            ">
                <span style="
                    display:inline-block;
                    padding:8px 12px;
                    border-radius:12px;
                    background:${mine ? "var(--neon-pink)" : "var(--input-bg)"};
                ">
                    ${escapeHtml(message.text)}
                </span>
            </div>
        `;

    }).join("");

    container.scrollTop = container.scrollHeight;
}


function sendChatMessage() {
    const input =
        document.getElementById("chatMsgInput");

    const currentUser = getCurrentUser();

    if (!currentUser) {
        return;
    }

    if (!activeChatUserId) {
        alert("Please select a user first.");
        return;
    }

    const text = input.value.trim();

    if (!text) {
        return;
    }

    const messages = getMessages();

    messages.push({
        id: Date.now(),
        fromId: currentUser.id,
        toId: activeChatUserId,
        text: text,
        date: new Date().toLocaleString()
    });

    localStorage.setItem(
        "messages",
        JSON.stringify(messages)
    );

    input.value = "";

    loadChatMessages();
}


function setLanguage(language) {
    localStorage.setItem("language", language);

    const dictionary =
        translations[language] || translations.en;

    document.querySelectorAll("[data-key]").forEach(function (element) {

        const key = element.getAttribute("data-key");

        if (!dictionary[key]) {
            return;
        }

        if (element.tagName === "INPUT" && element.hasAttribute("placeholder")) {
            element.placeholder = dictionary[key];
        } else if (element.tagName === "TEXTAREA") {
            element.placeholder = dictionary[key];
        } else {
            element.textContent = dictionary[key];
        }
    });
}


function loadLanguage() {
    const language =
        localStorage.getItem("language") || "en";

    const select =
        document.getElementById("langSelect");

    if (select) {
        select.value = language;
    }

    setLanguage(language);
}


function changeStudentPassword(event) {
    event.preventDefault();

    const currentUser = getCurrentUser();

    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    const currentPassword =
        document.getElementById("currPass").value;

    const newPassword =
        document.getElementById("newPass").value;

    const confirmPassword =
        document.getElementById("confirmNewPass").value;

    if (currentPassword !== currentUser.password) {
        alert("Current password is incorrect.");
        return;
    }

    if (newPassword.length < 6) {
        alert("New password must be at least 6 characters.");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("New passwords do not match.");
        return;
    }

    const students = getStudents();

    const index = students.findIndex(function (student) {
        return student.id === currentUser.id;
    });

    if (index === -1) {
        alert("Student account not found.");
        return;
    }

    students[index].password = newPassword;

    saveStudents(students);

    const updatedUser = {
        ...currentUser,
        password: newPassword
    };

    saveCurrentUser(updatedUser);

    document.getElementById("currPass").value = "";
    document.getElementById("newPass").value = "";
    document.getElementById("confirmNewPass").value = "";

    alert("Password changed successfully.");
}


function toggleSearchModal() {
    const modal =
        document.getElementById("searchModal");

    if (!modal) {
        return;
    }

    modal.classList.remove("hidden");

    const input =
        document.getElementById("searchInput");

    if (input) {
        input.focus();
    }

    loadSearchHistory();
}


function closeSearchModal() {
    const modal =
        document.getElementById("searchModal");

    if (modal) {
        modal.classList.add("hidden");
    }
}


function handleSearchKey(event) {

    if (event.key === "Enter") {
        performSearch();
        return;
    }

    performSearch();
}


function performSearch() {
    const input =
        document.getElementById("searchInput");

    const results =
        document.getElementById("searchResultsList");

    if (!input || !results) {
        return;
    }

    const query =
        input.value.trim().toLowerCase();

    if (!query) {
        results.innerHTML = "";
        return;
    }

    const students = getStudents();

    const posts = getPosts();

    const studentResults = students.filter(function (student) {

        return (
            (student.fullName || "").toLowerCase().includes(query) ||
            (student.username || "").toLowerCase().includes(query) ||
            (student.course || "").toLowerCase().includes(query)
        );

    });

    const postResults = posts.filter(function (post) {

        return (
            (post.text || "").toLowerCase().includes(query) ||
            (post.fullName || "").toLowerCase().includes(query)
        );

    });

    let html = "";

    studentResults.forEach(function (student) {

        html += `
            <div class="card" style="margin-bottom:8px;">
                <strong>${escapeHtml(student.fullName)}</strong>
                <p>${escapeHtml(student.course || "")}</p>
            </div>
        `;

    });

    postResults.forEach(function (post) {

        html += `
            <div class="card" style="margin-bottom:8px;">
                <strong>${escapeHtml(post.fullName)}</strong>
                <p>${escapeHtml(post.text || "")}</p>
            </div>
        `;

    });

    if (!html) {
        html = `
            <div class="card">
                <p>No results found.</p>
            </div>
        `;
    }

    results.innerHTML = html;

    saveSearchHistory(query);
}


function saveSearchHistory(query) {
    if (!query) {
        return;
    }

    let history = [];

    try {
        history =
            JSON.parse(localStorage.getItem("searchHistory")) || [];
    } catch (error) {
        history = [];
    }

    history = history.filter(function (item) {
        return item !== query;
    });

    history.unshift(query);

    history = history.slice(0, 5);

    localStorage.setItem(
        "searchHistory",
        JSON.stringify(history)
    );

    loadSearchHistory();
}


function loadSearchHistory() {
    const container =
        document.getElementById("searchHistoryList");

    if (!container) {
        return;
    }

    let history = [];

    try {
        history =
            JSON.parse(localStorage.getItem("searchHistory")) || [];
    } catch (error) {
        history = [];
    }

    container.innerHTML = history.map(function (item) {

        return `
            <div
                onclick="useSearchHistory('${escapeAttribute(item)}')"
                style="
                    cursor:pointer;
                    padding:5px 0;
                "
            >
                <i class="fas fa-history"></i>
                ${escapeHtml(item)}
            </div>
        `;

    }).join("");
}


function useSearchHistory(value) {
    const input =
        document.getElementById("searchInput");

    if (!input) {
        return;
    }

    input.value = value;

    performSearch();
}


function escapeHtml(value) {
    const div = document.createElement("div");

    div.textContent = String(value ?? "");

    return div.innerHTML;
}


function escapeAttribute(value) {
    return String(value ?? "")
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'");
}


document.addEventListener("DOMContentLoaded", function () {

    const currentUser = getCurrentUser();

    const isStudentPortal =
        document.getElementById("feedSection") ||
        document.getElementById("profileSection");

    if (isStudentPortal) {

        if (!currentUser || currentUser.role !== "student") {
            window.location.href = "login.html";
            return;
        }

        loadTheme();
        loadLanguage();
        loadProfile();
        loadFeed();
        loadAnnouncements();
        loadActivities();
        loadSchedule();
        loadGrades();
        loadChatUsers();
    }

    const loginForm =
        document.getElementById("loginForm");

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

            const students = getStudents();
            const admin = getAdminAccount();

            triggerLoading(function () {

                if (
                    username === admin.username &&
                    password === admin.password
                ) {

                    saveCurrentUser({
                        username: username,
                        role: "admin",
                        fullName: "System Administrator"
                    });

                    window.location.href = "admin_portal.html";
                    return;
                }

                const student = students.find(function (item) {

                    return (
                        item.username === username &&
                        item.password === password
                    );

                });

                if (!student) {
                    alert("Invalid username or password.");
                    return;
                }

                saveCurrentUser({
                    ...student,
                    role: "student"
                });

                window.location.href = "student_portal.html";

            }, 1000, "Verifying credentials...");
        });
    }


    const signupForm =
        document.getElementById("signupForm");

    if (signupForm) {

        const courseSelect =
            document.getElementById("regSchool");

        const majorGroup =
            document.getElementById("majorGroup");

        const majorSelect =
            document.getElementById("regMajor");

        if (courseSelect) {

            courseSelect.addEventListener("change", function () {

                const course = this.value;

                majorSelect.innerHTML =
                    '<option value="" disabled selected>Select Major</option>';

                if (course === "BS in Business Administration") {

                    majorGroup.classList.remove("hidden");

                    majorSelect.required = true;

                    [
                        "Major in Financial Management",
                        "Major in HRDM"
                    ].forEach(function (major) {

                        const option =
                            document.createElement("option");

                        option.value = major;
                        option.textContent = major;

                        majorSelect.appendChild(option);
                    });

                } else if (course === "BS Education") {

                    majorGroup.classList.remove("hidden");

                    majorSelect.required = true;

                    [
                        "Major in Mathematics",
                        "Major in Science",
                        "Major in English"
                    ].forEach(function (major) {

                        const option =
                            document.createElement("option");

                        option.value = major;
                        option.textContent = major;

                        majorSelect.appendChild(option);
                    });

                } else {

                    majorGroup.classList.add("hidden");
                    majorSelect.required = false;
                }
            });
        }


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
                alert("Username already exists.");
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


