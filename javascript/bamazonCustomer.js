var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");
var Table = require("cli-table");



var connection = mysql.createConnection(
    { host: "localhost",
    port:3306,
    user:"root",
    password:"",
    database: "bamazon",
}); 

connection.connect(function(err)
{  
    if (err) throw err;
    console.log(colors.cyan("Welcome! You are now connected to the store, peasant."));
    shopping();

});

function shopping(){
    console.log("We're shopping now");
    connection.query('SELECT * FROM products', function (err, res){
        if (err) throw err;
        console.log("res.length=" + res.length);
        console.log("res[0]=" + res [0]);
        console.log(res);
        for(i=0; i <res.length; i++){
        console.log(res[i].item_id + " " + res[i].product_name + " " + res[i].department_name + " " + res[i].price + " " + res[i].stock_quantity);
        }
    })
}





















