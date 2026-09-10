// ==========================
// LOGIN
// ==========================

function login() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {

        document.getElementById("loginPage").classList.add("hidden");
        document.getElementById("dashboard").classList.remove("hidden");

        updateDashboard();

    } else {

        document.getElementById("loginError").innerText =
            "Invalid username or password";

    }
}


// ==========================
// LOGOUT
// ==========================

function logout() {

    document.getElementById("dashboard").classList.add("hidden");

    document.getElementById("loginPage").classList.remove("hidden");

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}


// ==========================
// SHOW SECTIONS
// ==========================

function showSection(sectionName) {

    let sections = document.querySelectorAll(".section");

    sections.forEach(function(section) {
        section.classList.add("hidden");
    });

    document.getElementById(sectionName).classList.remove("hidden");

    updateDashboard();
}


// ==========================
// STUDENTS
// ==========================

let students =
    JSON.parse(localStorage.getItem("students")) || [];


function addStudent() {

    let name = document.getElementById("studentName").value;
    let course = document.getElementById("studentCourse").value;
    let phone = document.getElementById("studentPhone").value;

    if (name === "" || course === "" || phone === "") {

        alert("Please fill all fields");

        return;
    }

    let student = {

        id: students.length + 1,
        name: name,
        course: course,
        phone: phone

    };

    students.push(student);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    document.getElementById("studentName").value = "";
    document.getElementById("studentCourse").value = "";
    document.getElementById("studentPhone").value = "";

    displayStudents();
    updateDashboard();
}


function displayStudents() {

    let table = document.getElementById("studentTable");

    table.innerHTML = "";

    students.forEach(function(student) {

        let row = `
            <tr>

                <td>${student.id}</td>

                <td>${student.name}</td>

                <td>${student.course}</td>

                <td>${student.phone}</td>

                <td>
                    <button onclick="deleteStudent(${student.id})">
                        Delete
                    </button>
                </td>

            </tr>
        `;

        table.innerHTML += row;

    });
}


function deleteStudent(id) {

    students = students.filter(function(student) {

        return student.id !== id;

    });

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    displayStudents();

    updateDashboard();
}


// ==========================
// FEES
// ==========================

let fees =
    JSON.parse(localStorage.getItem("fees")) || [];


function addFee() {

    let student =
        document.getElementById("feeStudent").value;

    let amount =
        document.getElementById("feeAmount").value;

    if (student === "" || amount === "") {

        alert("Please fill all fields");

        return;
    }

    let fee = {

        id: fees.length + 1,

        student: student,

        amount: Number(amount),

        date: new Date().toLocaleDateString()

    };

    fees.push(fee);

    localStorage.setItem(
        "fees",
        JSON.stringify(fees)
    );

    document.getElementById("feeStudent").value = "";
    document.getElementById("feeAmount").value = "";

    displayFees();

    updateDashboard();
}


function displayFees() {

    let table =
        document.getElementById("feeTable");

    table.innerHTML = "";

    fees.forEach(function(fee) {

        let row = `
            <tr>

                <td>${fee.id}</td>

                <td>${fee.student}</td>

                <td>₹${fee.amount}</td>

                <td>${fee.date}</td>

            </tr>
        `;

        table.innerHTML += row;

    });
}


// ==========================
// ATTENDANCE
// ==========================

let attendance =
    JSON.parse(localStorage.getItem("attendance")) || [];


function addAttendance() {

    let student =
        document.getElementById("attendanceStudent").value;

    let status =
        document.getElementById("attendanceStatus").value;

    if (student === "") {

        alert("Enter student name");

        return;
    }

    let record = {

        id: attendance.length + 1,

        student: student,

        status: status,

        date: new Date().toLocaleDateString()

    };

    attendance.push(record);

    localStorage.setItem(
        "attendance",
        JSON.stringify(attendance)
    );

    document.getElementById("attendanceStudent").value = "";

    displayAttendance();

    updateDashboard();
}


function displayAttendance() {

    let table =
        document.getElementById("attendanceTable");

    table.innerHTML = "";

    attendance.forEach(function(record) {

        let row = `
            <tr>

                <td>${record.id}</td>

                <td>${record.student}</td>

                <td>${record.status}</td>

                <td>${record.date}</td>

            </tr>
        `;

        table.innerHTML += row;

    });
}


// ==========================
// DASHBOARD
// ==========================

function updateDashboard() {

    document.getElementById("totalStudents").innerText =
        students.length;


    let total =
        fees.reduce(function(sum, fee) {

            return sum + fee.amount;

        }, 0);


    document.getElementById("totalFees").innerText =
        "₹" + total;


    let today =
        new Date().toLocaleDateString();


    let present =
        attendance.filter(function(record) {

            return record.date === today &&
                   record.status === "Present";

        });


    document.getElementById("presentToday").innerText =
        present.length;
}


// ==========================
// LOAD DATA
// ==========================

displayStudents();
displayFees();
displayAttendance();
updateDashboard();
