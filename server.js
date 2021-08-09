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