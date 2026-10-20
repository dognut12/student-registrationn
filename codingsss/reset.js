function saveAdminAccount(admin) {
    localStorage.setItem(
        "adminAccount",
        JSON.stringify(admin)
    );
}


function generateOTP() {
    return Math.floor(
        100000 + Math.random() * 900000
    ).toString();
}


function showUserNotFoundError() {

    const input =
        document.getElementById("resetUsername");

    const errText =
        document.getElementById("notFoundError");

    const card =
        document.getElementById("resetCard");

    if (input) {
        input.classList.add("input-error");
    }

    if (errText) {
        errText.classList.remove("hidden");
    }

    if (card) {

        card.classList.add("shake-effect");

        setTimeout(function () {
            card.classList.remove("shake-effect");
        }, 400);
    }
}


function hideUserNotFoundError() {

    const input =
        document.getElementById("resetUsername");

    const errText =
        document.getElementById("notFoundError");

    if (input) {
        input.classList.remove("input-error");
    }

    if (errText) {
        errText.classList.add("hidden");
    }
}


function setupResetPassword() {

    const otpStep1 =
        document.getElementById("otpStep1");

    const otpStep2 =
        document.getElementById("otpStep2");

    if (!otpStep1 || !otpStep2) {
        return;
    }


    const urlParams =
        new URLSearchParams(window.location.search);

    if (urlParams.get("notfound") === "true") {
        showUserNotFoundError();
    }


    otpStep1.addEventListener("submit", function (event) {

        event.preventDefault();

        const username =
            document
                .getElementById("resetUsername")
                .value
                .trim();

        if (!username) {
            return;
        }

        hideUserNotFoundError();

        const students = getStudents();
        const admin = getAdminAccount();

        const student =
            students.find(function (student) {

                return (
                    student.username.toLowerCase() ===
                    username.toLowerCase()
                );

            });


        const isAdmin =
            admin.username.toLowerCase() ===
            username.toLowerCase();


        if (!student && !isAdmin) {

            showUserNotFoundError();

            return;
        }


        const otp = generateOTP();

        localStorage.setItem(
            "resetOTP",
            JSON.stringify({
                username: username,
                otp: otp,
                expires: Date.now() + 5 * 60 * 1000
            })
        );


        triggerLoading(function () {

            alert(
                "Your OTP code is: " +
                otp +
                "\n\nThis demo OTP is valid for 5 minutes."
            );

            otpStep1.classList.add("hidden");

            otpStep2.classList.remove("hidden");

            const otpInput =
                document.getElementById("resetOtp");

            if (otpInput) {
                otpInput.focus();
            }

        }, 1000, "Sending OTP...");

    });


    otpStep2.addEventListener("submit", function (event) {

        event.preventDefault();

        const username =
            document
                .getElementById("resetUsername")
                .value
                .trim();

        const otp =
            document
                .getElementById("resetOtp")
                .value
                .trim();

        const newPassword =
            document
                .getElementById("newPassword")
                .value;

        const confirmPassword =
            document
                .getElementById("confirmNewPassword")
                .value;


        if (newPassword.length < 6) {

            alert(
                "New password must be at least 6 characters."
            );

            return;
        }


        if (newPassword !== confirmPassword) {

            alert(
                "New passwords do not match."
            );

            return;
        }


        let resetData = null;

        try {

            resetData =
                JSON.parse(
                    localStorage.getItem("resetOTP")
                );

        } catch (error) {

            resetData = null;
        }


        if (!resetData) {

            alert(
                "OTP session not found. Please request a new OTP."
            );

            return;
        }


        if (
            resetData.username.toLowerCase() !==
            username.toLowerCase()
        ) {

            alert(
                "Invalid reset session."
            );

            return;
        }


        if (Date.now() > resetData.expires) {

            localStorage.removeItem("resetOTP");

            alert(
                "OTP has expired. Please request a new OTP."
            );

            window.location.reload();

            return;
        }


        if (otp !== resetData.otp) {

            alert(
                "Invalid OTP code."
            );

            return;
        }


        triggerLoading(function () {

            let students = getStudents();

            const studentIndex =
                students.findIndex(function (student) {

                    return (
                        student.username.toLowerCase() ===
                        username.toLowerCase()
                    );

                });


            if (studentIndex !== -1) {

                students[studentIndex].password =
                    newPassword;

                saveStudents(students);

            } else {

                const admin =
                    getAdminAccount();

                if (
                    admin.username.toLowerCase() ===
                    username.toLowerCase()
                ) {

                    admin.password =
                        newPassword;

                    saveAdminAccount(admin);

                } else {

                    alert(
                        "Account could not be found."
                    );

                    return;
                }
            }


            localStorage.removeItem("resetOTP");

            localStorage.removeItem("currentUser");


            alert(
                "Password successfully updated! Redirecting to login page..."
            );


            window.location.href =
                "login.html";

        }, 1000, "Updating password...");

    });

}


document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupResetPassword();

    }
);