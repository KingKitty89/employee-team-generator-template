const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { type } = require("os");

let team = [];

const questions = [
    {
        type: "input",
        message: "Please enter employee's full name:",
        name: "name",
    },
    {
        type: "input",
        message: "Please enter employee's id number:",
        name: "id",
    },
    {
        type: "input",
        message: "Please enter employee's email address:",
        name: "email",
    },
    {
        type: "list",
        message: "Select employee's role:",
        choices: ["Manager", "Engineer", "Intern"],
        name: "role"
    }
];

function createTeam() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Choose either build team to add team members or create team template:",
                choices: ["Add to Team", "Finish Team"],
                name: "teamMode"
            }
        ])
        .then(res => {
            switch (res.teamMode) {
                case "Finish Team":

                    buildTeam();
                    break;
                case "Add to Team":
                    askQuestions();
            };
        });
};

function askQuestions() {
    inquirer
        .prompt(questions)
        .then(res => {
            switch (res.role) {
                case "Manager":
                    addManager(res);
                    break;
                case "Engineer":
                    addEngineer(res);
                    break;
                case "Intern":
                    addIntern(res);
                    break;

            };
        });
};

function addManager(data) {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your office number?",
                name: "officeNumber"
            }
        ])
        .then(res => {

            const manager = new Manager(data.name, data.id, data.email, res.officeNumber);
            team.push(manager);
            // createTeam ();
            createTeam();
        });

};

function addEngineer(data) {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your GitHub username?",
                name: "username"
            }

        ])
        .then(res => {
            const engineer = new Engineer(data.name, data.id, data.email, res.username);
            team.push(engineer);
            createTeam();

        });
};

function addIntern(data) {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of the school you attend?",
                name: "school"
            }
        ])
        .then(res => {
            const intern = new Intern(data.name, data.id, data.email, res.school);
            team.push(intern);
            createTeam();
        });
};

// function createTeam {

// }
function buildTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(team), "utf-8");
};

askQuestions();



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
