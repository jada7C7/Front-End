//require mysql and inquirer
var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306, //8889

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazonDB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Products for Sale":
        viewProducts();
        break;

      case "View Low Inventory":
        viewLowInventory();
        break;

      case "Add to Inventory":
        addInventory();
        break;

      case "Add New Product":
        addProduct();
        break;
      }
    });
}

function viewProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    console.log("PRODUCTS FOR SALE" + "\n" + "====================================================");
    for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].item_id + " || " + "Product: " + res[i].product_name + " || " + "Price: $" + res[i].price + " || " + "Quantity: " + res[i].stock_quantity);
    }
    console.log("---------------------------------------------------");
    runSearch();
  });
}

function viewLowInventory() {
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
    console.log("LOW INVENTORY" + "\n" + "====================================================");
    for (var i = 0; i < res.length; i++) {
      console.log("Product: " + res[i].product_name + " || " + "Quantity: " + res[i].stock_quantity);
    }
    console.log("---------------------------------------------------");
    runSearch();
  });
}

function addInventory() {
  // query the database for all products
  connection.query("SELECT * FROM products", function(error, results) {
    if (error) throw error;
    // once you have the product, prompt the manager for which they'd like to add inventory to
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "What product would you like to add inventory to?"
        },
        {
          name: "amt",
          type: "input",
          message: "How much would you like to add?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i].stock_quantity;
          }
        }
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: chosenItem + parseInt(answer.amt)
            },
            {
              product_name: answer.choice
            }
          ],
          function(error) {
            if (error) throw err;
            console.log("---------------------------------------------------");
            console.log("Inventory updated successfully!");
            console.log("---------------------------------------------------");
            runSearch();
          }
        );
      });
  });
}

function addProduct() {
  // prompt for info about the item being added
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the item you would like to input?"
      },
      {
        name: "category",
        type: "input",
        message: "What category would you like to place your item in?"
      },
      {
        name: "price",
        type: "input",
        message: "What is the price of the item?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "How many?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.item,
          department_name: answer.category,
          price: answer.price,
          stock_quantity: answer.quantity
        },
        function(err) {
          if (err) throw err;
          console.log("---------------------------------------------------");
          console.log("Your product was added successfully!");
          console.log("---------------------------------------------------");
          runSearch();
        }
      );
    });
}
