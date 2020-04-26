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
        var table = new Table (
         {
            head: ["Product_name".cyan.bold, "Item_id".cyan.bold, "Department_name".cyan.bold, "Price".cyan.bold, "Stock_quantity".cyan.bold],
            colWidths: [12, 12, 12, 12, 12],
           
         });
         
         for (i=0; i < res.length; i++){
             table.push([res[i].Product_name, res[i].Item_id, res[i].Department_name, res[i].Price, res[i].Stock_quantity]);
         }
         console.log(table);
 
        

    

         
         console.log("res =" + res); 
        
    })
}



















//console.log("haha it works");

