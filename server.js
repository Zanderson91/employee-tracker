const inquirer = require('inquirer');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const connection = mysql.createConnection({
    HOST: "localhost",
    PORT: process.env || 3001,
    USERNAME: 'root',
    PASSWORD: '',
    database: "employee_db"
},
console.log(`Connected to the employee_db database.`)
);


//Need connection for server

//Command line prompt for viewing DB
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



//Action to see all employees/view the directory
