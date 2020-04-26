var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");
var table = require("cli-table");

console.log("haha it works");

var connection = mysql.createConnection(
    { host: "localhost",
    port:3306;
    user:"root",
    password:"",
    database: "bamazon",
});