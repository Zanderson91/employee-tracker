const inquirer = require('inquirer');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const express = require('express');
const cTable = require('console.table');
const dotenv = require('dotenv');
const app = express();
const Role = require("./lib/Role.js");


app.use(express.urlencoded({
    extended: false
}));
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

db.connect(function (err) {
    if (err) throw err
    startPrompt();
});

//Command line prompt for viewing DB
async function startPrompt() {
    //const role = new Role();
    const val = await inquirer.prompt([{
        
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
    ])
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
    }

function viewDirectory() {
    db.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ', e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
        function (req, res) {
            console.table(res)
            startPrompt()
        })
}

function viewRoles() {
    db.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
        function (req, res) {
            console.table(res)
            startPrompt()
        })
}

function viewDepartments() {
    db.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
        function (req, res) {
            console.table(res)
            startPrompt()
        })
}

function addRole() {
    db.query("SELECT role.title AS Title, role.salary AS Salary FROM role", function (req, res) {
        inquirer.prompt([{
                name: "Title",
                type: "input",
                message: "What is the new role?"
            },
            {
                name: "Salary",
                type: "input",
                message: "What is the salary of the role?"
            }
        ]).then(function (res) {
            db.query("INSERT INTO role SET ?", {
                    title: res.Title,
                    salary: res.Salary,
                },
                function (err) {
                    if (err) throw err;
                    console.table(res);
                    startPrompt();
                }
            )
        });
    });
}



function chooseRole() {
    let roleChoices = [];
    db.query("SELECT * FROM role", function (req, res) {
        for (var i = 0; i < res.length; i++) {
            roleChoices.push(res[i].title);
        }

    })
    return roleChoices;
}

function updateEmployee() {
    db.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function (req, res) {
        let last = [];
        for (var i = 0; i < res.length; i++) {
            last.push(res[i].last_name);
        }
        inquirer.prompt([
            {
                name:"last",
                type:"list",
                message: "What is the employee's last name?",
                // choices: function() {
                //     let last = [];
                //     for (var i =0; i<res.length; i++) {
                //         last.push(res[i].last_name);
                //     }
                //     return last;
                // },
                choices: last
            },
            {
                name: "role",
                type: "rawlist",
                message: "What is the employee's title?",
                choices: chooseRole()
            },
        ]).then(function(val) {
            console.log(val)
            let roleID = chooseRole().indexOf(val.role)
            roleID ++
            console.log(roleID)
            db.query("UPDATE employee SET role_id = ? WHERE last_name = ?",
            [roleID, val.last],
            // {
            //     last_name: val.last
            // },
            // {
            //     role_id: roleID
            // },
            function (req, res) {
                console.log(req)
                console.log(res)
                console.table(val)
                startPrompt();
            })
            // console.table(val)
            // startPrompt();
        })
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            name: "name",
            type:"input",
            message: "What department are you adding?"
        }
    ]).then (function(res) {
        let query = db.query(
            "INSERT INTO department SET ?",
            {
                name: res.name
            },
            function(err) {
            console.table(res)
            startPrompt();
            }
        )
    })
}








//Original thoughts for different calls....
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