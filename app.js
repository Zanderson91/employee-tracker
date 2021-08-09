const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    HOST: "localhost",
    PORT: process.env || 3001,
    USERNAME: 'root',
    PASSWORD: '',
    database: "employee_db"
});





function startPrompt() {
    inquirer.prompt([
        {
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
    ])
}