const inquirer = require('inquirer');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const express = require('express');
const dotenv = require('dotenv');
const app = express();


app.use(express.urlencoded({extended: false}));
app.use(express.json());


require('dotenv').config();
const db = mysql.createConnection({
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 3306,
        user: process.env.USER || 'root',
        password: process.env.PASSWORD || '',
        database: process.env.DATABASE || "employee_db"
    },
    console.log(`Connected to the employee_db database.`)
);


//Command line prompt for viewing DB
function startPrompt() {
    inquirer.prompt([{
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                "View employee directory",
                "View directory by role",
                "View directory by department",
                "Update Employee",
                "Add Role",
                "Add Department"
            ]
        }
        //functions to view directory/role/department/update employee/add role/add department
    ]).then(function (val) {
        switch (val.choice) {
            case "View employee directory":
                viewDirectory();
                break;


            case "View directory by role":
                viewRoles();
                break;

            case "View directory by department":
                viewDepartments();
                break;

            case "Update Employee":
                updateEmployee();
                break;

            case "Add Role":
                addRole();
                break;

            case "Add Department":
                addDepartment();
                break
        }
    })
}

function viewDirectory() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ', e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
        function (req, res) {
            if (err) throw (err)
            startPrompt()
        })
}










/*
//Action to see all employees/view the directory
app.get('/api/role', (req, res) => {
    // Query database
    db.query('SELECT * FROM employee', function (err, results) {
        console.log(results);
        res.json(results);
    });
});

//Action to update employee
app.put('/api/update-employee/:id', (req, res) => {
    const {
        movie_name
    } = req.body;

    const query = `
    UPDATE employee
    SET employee = ?
    WHERE role_id = ?
    `;
    const q = db.query(
        query,
        [first_name, last_name, req.params.role_id],
        function (err, results) {
            res.json(results);
        }
    );
    console.log(q.sql);
});

//Route to add new role
app.post('/api/add-role', (req, res) => {
    const {
        role,
    } = req.body;

    const query = `
    INSERT INTO role (role)
    VALUES (?)
    `;
    db.query(query, role, function (err, results) {
        res.json(results);
    });
});

//Route to add new department
app.post('/api/add-department', (req, res) => {
    const {
        department,
    } = req.body;

    const query = `
    INSERT INTO department (department)
    VALUES (?)
    `;
    db.query(query, department, function (err, results) {
        res.json(results);
    });
});
*/