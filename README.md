# Node.js & MySQL

## Instructions

### Challenge #1: Customer View (Minimum Requirement)

1. Create a MySQL Database called `bamazon`.

2. Then create a Table inside of that database called `products`.

3. The products table should have each of the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * price (cost to customer)

4. Populate this database with around 10 different products. 

5. Then create a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.


![Image 1](https://github.com/AbdulSaid/bamazon/blob/master/images/Screen%20Shot%202018-08-29%20at%206.14.18%20PM.png)

- - -

6. The app should then prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.


- - -

7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.


- - -

8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.
   
   

![Image 2](https://github.com/AbdulSaid/bamazon/blob/master/images/Screen%20Shot%202018-08-29%20at%206.14.48%20PM.png)

- - -


### Challenge #2: Manager View (Next Level)
* Create a new Node application called `bamazonManager.js`. Running this application will:

  * List a set of menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

![Image 3](https://github.com/AbdulSaid/bamazon/blob/master/images/image3.png)
- - -

  * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

  ![Image 4](https://github.com/AbdulSaid/bamazon/blob/master/images/image4.png)

- - -

  * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

  ![Image 5](https://github.com/AbdulSaid/bamazon/blob/master/images/image5.png)

- - -

  * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

  ![Image 6](https://github.com/AbdulSaid/bamazon/blob/master/images/image6.png)


- - -

  * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

  ![Image 7](https://github.com/AbdulSaid/bamazon/blob/master/images/image7.1.png)
   ![Image 7](https://github.com/AbdulSaid/bamazon/blob/master/images/image7.2.png)

- - -

* If a manager selects `End Connection`, it should allow the manager to exit the Node application.
![Image 8](https://github.com/AbdulSaid/bamazon/blob/master/images/image8.png)


## Built With
- Node.js (packages: mysql, inquirer)


## Portfolio Link 

https://abdulsaid.github.io/



- - -
