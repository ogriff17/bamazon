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
    console.log(colors.cyan("Welcome! You are now connected to the store!"));
    shopping();

});

function shopping(){
    console.log("We're shopping now");
    connection.query('SELECT * FROM products', function (err, res){
        if (err) throw err;
        
        console.table(res);
        inquirer.prompt([
            { 
                type: "number",
                message:"Enter the item ID:".green,
                name: "id"
            },
            { 
                type: "number",
                message:"How many do you want?".green,
                name: "quantity"
            }
        ])
        .then(function(shoppingCart)
        {
            var quantity = shoppingCart.quantity;
            var itemId = shoppingCart.id;
            var price;
            connection.query('SELECT * FROM products WHERE item_id=' + itemId, function (err, selectedItem){
                if (err) throw err;
                price = selectedItem[0].price;

                if(quantity > selectedItem[0].stock_quantity){
                    console.log ("Insufficient quantity!")
                } 
                else {
                   inventoryUpdate(quantity, itemId);
                   totalPurchased(quantity, price);
                    shopping();
                
                }

    
            /* connection.end(); */
        })
    })
})
}

function inventoryUpdate(quantity, itemId){
    connection.query('UPDATE products SET stock_quantity=stock_quantity - ' + quantity + ' WHERE item_id=' + itemId, function(err, Inventory){
        if (err) throw err;
    })
}

function totalPurchased(quantity, price){
    console.log("Your total: $ " + quantity * price);
}























