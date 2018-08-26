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
  // connection.end();
});

function showProducts() {
  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;
    console.log('Items Avalable:');
    console.log('----------------------------------------------');
    for (var i = 0; i < res.length; i++) {
      console.log('Item ID: ' + res[i].item_id);

      console.log('Product Name: ' + res[i].product_name);

      console.log('Price: ' + res[i].price);
      console.log('----------------------------------------------');
    }
    askUser();
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
    .then(function(purchase) {
      console.log('Lets Check if We have enough items for you');
      var item = purchase.itemToBuy;
      var quantity = purchase.howMuch;

      var querystr = 'SELECT * FROM products WHERE ?';

      connection.query(querystr, { item_id: item }, function(err, res) {
        if (err) throw err;

        if (res.length === 0) {
          console.log('ERROR: Invalid Item ID: Please select a valid ITEM ID');
          showProducts();
        } else {
          var productInfo = res[0];
          console.log('I wonder what' + res[0]);
          if (quantity <= productInfo.stock_quantity) {
            console.log(
              productInfo.product_name + ' Is in stock! Placing Order'
            );
            console.log('\n');

            var updateDb =
              'UPDATE products SET stock_quantity = ' +
              (productInfo.stock_quantity - quantity);

            connection.query(updateDb, function(err, data) {
              if (err) throw err;

              console.log('Your order has been placed');
              console.log('Your total is $' + productInfo.price * quantity);
              console.log('Thank you for shopping with us');
              console.log(
                "To shop again, please input 'node bmazonCustomer.js' into the command line"
              );

              connection.end();
            });
          } else {
            console.log(
              'Sorry, there is not enough ' +
                productInfo.product_name +
                ' in stock'
            );
            console.log('Insufficient quantity!');

            setTimeout(function() {
              showProducts();
            }, 3000);
          }
        }
      });
    });
}
