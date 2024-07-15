#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    name;
    constructor(name) {
        this.name = name;
    }
}
class Person {
    students = [];
    addStudent(obj) {
        this.students.push(obj);
    }
}
const persons = new Person();
const programStart = async (persons) => {
    console.log(chalk.blue("Welcome!"));
    do {
        const ans = await inquirer.prompt({
            name: "select",
            type: "list",
            message: "whom would you like to interact with?",
            choices: ["Staf", "Student", "Exit"]
        });
        if (ans.select == "Staf") {
            console.log(chalk.yellow("You approach the staf room. Please feel free to ask any question."));
        }
        else if (ans.select == "Student") {
            const ans = await inquirer.prompt({
                name: "student",
                type: "input",
                message: "Enter the student name you wish to engage with:"
            });
            const student = persons.students.find(val => val.name == ans.student);
            if (!student) {
                const name = new Student(ans.student);
                persons.addStudent(name);
                console.log(chalk.yellow(`Hello i am ${name.name}. Nice to meet you!\n `));
                console.log(chalk.greenBright("New student added "));
                console.log(chalk.greenBright("Current student list: "));
                console.log(persons.students, "\n");
            }
            else {
                console.log(chalk.magentaBright(`Hello i am ${student.name}. Nice to see you again!\n `));
                console.log(chalk.green("Existing student list: "));
                console.log(persons.students);
            }
        }
        else if (ans.select == "Exit") {
            console.log(chalk.redBright("Exiting the program... "));
            process.exit();
        }
    } while (true);
};
programStart(persons);
