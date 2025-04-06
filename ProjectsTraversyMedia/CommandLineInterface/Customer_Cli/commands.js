#!/usr/bin/env node
const { program } = require("commander");
const inquirer = require("inquirer");

const {
  addCustomer,
  findCustomer,
  updateCustomer,
  removeCustomer,
  listCustomers,
} = require("./index");

//Customer questions
const questions = [
  {
    type: "input",
    name: "firstName",
    message: "Customer First Name",
  },
  {
    type: "input",
    name: "lastName",
    message: "Customer last Name",
  },
  {
    type: "input",
    name: "phone",
    message: "Customer Phone Number",
  },
  {
    type: "input",
    name: "email",
    message: "Customer Email Address",
  },
];

program.version("1.0.0").description("Client Management system");

// program
//     .command('add <firstname> <lastname> <phone> <email>')
//     .alias('a')
//     .description('Add a customer')
//     .action((firstname, lastname, phone, email)=>{
//         addCustomer({firstName: firstname, lastName: lastname, phone, email});
//     })

program
  .command("add")
  .alias("a")
  .description("Add a customer")
  .action(() => {
    inquirer.prompt(questions).then((answers) => addCustomer(answers));
  });

program
  .command("find <name>")
  .alias("f")
  .description("Find a customer")
  .action((name) => findCustomer(name));

//Update command
program
  .command("update <_id>")
  .alias("u")
  .description("Update a customer")
  .action((_id) => {
    inquirer.prompt(questions).then((answers) => updateCustomer(_id, answers));
  });

//Remove command
program
  .command("remove <_id>")
  .alias("r")
  .description("Remove a customer")
  .action((_id) => removeCustomer(_id));


//List command
program
  .command("list")
  .alias("l")
  .description("List all customers")
  .action(() => listCustomers());


program.parse(process.argv);
