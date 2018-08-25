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
  showProducts();
  connection.end();
  askUser();
});

function showProducts() {
  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;
    console.log('Items Avalable:');
    for (var i = 0; i < res.length; i++) {
      console.log('Item ID: ' + res[i].item_id);
      console.log('Product Name: ' + res[i].product_name);
      console.log('Price: ' + res[i].price);
    }
  });
}
function validateItem(name) {
  var reg = /^\d+$/;
  return reg.test(name) || 'ID should be a number!';
}
function validateUnits(name) {
  var reg = /^\d+$/;
  return reg.test(name) || 'Units should be a number!';
}

function askUser() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'itemToBuy',
        message:
          'What item would you like to buy, please type in the ID number',
        validate: validateItem
      },
      {
        type: 'input',
        name: 'howMuch',
        message: 'How much units would you like?',
        validate: validateUnits
      }
    ])
    .then(function(answers) {
      console.log('finished');
    });
}
