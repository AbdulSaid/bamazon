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
          endConnection();
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
    console.log('Items with Low Inventory');
    for (var i = 0; i < res.length; i++) {
      var data = res[i];

      if (data.stock_quantity < 5) {
        console.log('----------------------------');
        console.log('Item Id: ' + data.item_id);
        console.log('Product Name: ' + data.product_name);
        console.log('Quantity: ' + data.stock_quantity);
        console.log('----------------------------\n');
      }
    }
    console.log('Try adding more inventory\n');
    askManager();
  });
}

function addInventory() {
  inquirer
    .prompt([
      {
        name: 'addInventory',
        type: 'input',
        message: 'What item would you like to add more, please list ID number?',
        validate: validateItem
      },
      {
        name: 'numberInventory',
        type: 'input',
        message: 'How much total units would you like to add?',
        validate: validateUnits
      }
    ])
    .then(function(answer) {
      var itemtoUpdate = answer.addInventory;
      var numbertoUpdate = answer.numberInventory;

      connection.query(
        'Update products Set ? WHERE ?',
        [
          {
            stock_quantity: numbertoUpdate
          },
          {
            item_id: itemtoUpdate
          }
        ],
        function(err, data) {
          if (err) throw err;
          console.log('\nData Base Updated, new updated list below');
        }
      );
      showProducts();
      askManager();
    });
}

function addProduct() {
  inquirer
    .prompt([
      {
        name: 'addProduct',
        type: 'input',
        message: 'What item would you like to add ?'
      },
      {
        name: 'addDepartment',
        type: 'input',
        message: 'What department does it belong into?'
      },
      {
        name: 'quantProduct',
        type: 'input',
        message: 'How much of the item do you have in stock?',
        validate: validateUnits
      },
      {
        name: 'priceProduct',
        type: 'input',
        message: 'What is the price of this item?',
        validate: validatePrice
      }
    ])
    .then(function(answer) {
      var productAdd = answer.addProduct;
      var departmentAdd = answer.addDepartment;
      var quantityproduct = answer.quantProduct;
      var priceproduct = answer.priceProduct;

      connection.query(
        'INSERT INTO products SET ?',
        {
          product_name: productAdd,
          department_name: departmentAdd,
          price: priceproduct,
          stock_quantity: quantityproduct
        },
        function(err, data) {
          if (err) throw err;
          console.log('\nData Base Updated, new updated list below');
        }
      );
      showProducts();
      askManager();
    });
}

function endConnection() {
  connection.end();
}

function validateItem(name) {
  var reg = /^\d+$/;
  return reg.test(name) || 'ID should be a number!';
}

function validatePrice(name) {
  var reg = /^\d+$/;
  return reg.test(name) || 'Price should be a number!';
}

function validateUnits(name) {
  var reg = /^\d+$/;
  return reg.test(name) || 'Units should be a number!';
}
