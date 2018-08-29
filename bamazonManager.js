var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'bamazon'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  askManager();
  // connection.end();
});

function askManager() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View Products for Sale',
        'View Low Inventory',
        'Add to Inventory',
        'Add New Product',
        'End Connection'
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case 'View Products for Sale':
          showProducts();
          break;

        case 'View Low Inventory':
          lowInventory();
          break;

        case 'Add to Inventory':
          addInventory();
          break;

        case 'Add New Product':
          addProduct();
          break;

        case 'End Connection':
          connection.end();
          break;
      }
    });
}

function showProducts() {
  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;
    console.log('Items Avalable:');
    console.log('----------------------------------------------');
    for (var i = 0; i < res.length; i++) {
      console.log('Item ID: ' + res[i].item_id);

      console.log('Product Name: ' + res[i].product_name);

      console.log('Price: ' + res[i].price);
      console.log('Quantity: ' + res[i].stock_quantity);
      console.log('----------------------------------------------');
    }
    askManager();
  });
}

function lowInventory() {
  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      var data = res[i];
      if (data.stock_quantity < 5) {
        console.log('Items with Low Inventory');
        console.log('Item Id' + data.item_id);
        console.log('Product Name:' + data.product_name);
        console.log('Quantity: ' + data.stock_quantity);
        console.log('Try adding more inventory');
      } else {
        //repeats multiple times
        console.log('No items have low inventory');
      }
    }
    askManager();
  });
}

function addInventory() {}

function addProduct() {}
