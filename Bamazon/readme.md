# Bamazon
An Amazon-like storefront using Node.js and MySQL. The app will take in orders from customers and deplete stock from the store's inventory.

NPM packages used: MySQL and Inquirer

## What Each File Should Do

**`BamazonCustomer.js`**

* Prints the products in the store.
* Prompts customer which product they would like to purchase by ID number.
* Asks customer how many they would like to purchase. If there is a sufficient amount in stock, it will return the total for that purchase. If there is not enough of the product in stock, it will tell the user that there isn't enough of the productis insufficient inventory.
* If the purchase is successful, the quantity will be reflected in the database.

[View Demo](https://youtu.be/vuShT-wX6o0)

**`BamazonManager.js`**

* This app will start with a menu asking the manager to: view products for sale, view all low inventory, add to inventory or add a new product to the database
* **View Products for Sale:** list of all of the products including department and price for sale.
* **View Low Inventory:** list of all the products with less than five items in stock.
* **Add to Inventory:** allows the manager to select a product and add inventory.
* **Add New Product:** allows the manager to add a new product to the database.

[View Demo](https://youtu.be/yEPDZ8uU9D8)

### Project Built With

JavaScript | Node.js | MySQL