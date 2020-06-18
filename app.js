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


//Empty array to store added team members
let team = [];

//basic employee questions that repeat regardless of team member's role
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

//function to add more team members or finish building team
function createTeam() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Choose either Add to Team to add more team members or Finish Team to create your team.",
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

//switch case sets up role specific questions to be asked based on role
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

//adds manager to team and asks the necessary role specific question
function addManager(data) {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please enter manager's office number:",
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

//adds engineer to team and asks the necessary role specific question
function addEngineer(data) {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please enter engineer's GitHub username:",
                name: "username"
            }

        ])
        .then(res => {
            const engineer = new Engineer(data.name, data.id, data.email, res.username);
            team.push(engineer);
            createTeam();

        });
};

//adds intern to team and asks the necessary role specific question
function addIntern(data) {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please enter intern's school:",
                name: "school"
            }
        ])
        .then(res => {
            const intern = new Intern(data.name, data.id, data.email, res.school);
            team.push(intern);
            createTeam();
        });
};

//outputs to HTML
function buildTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(team), "utf-8");
};

askQuestions();




