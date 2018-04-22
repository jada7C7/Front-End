DROP DATABASE IF EXISTS bamazonDB;

-- Creates the "bamazonDB" database --
CREATE DATABASE bamazonDB;

-- Makes it so all of the following code will affect bamazonDB --
USE bamazonDB;

-- Creates the table "products" within bamazonDB --
CREATE TABLE products (
    item_id int NOT NULL AUTO_INCREMENT,
    product_name varchar(255) NOT NULL,
    department_name varchar(255) NOT NULL,
    price decimal(10,2) NOT NULL,
    stock_quantity int(10) NOT NULL,
    primary key(item_id)
);

select * from products;

-- Creates new rows containing data in all named columns --
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Three Wolf Moon Shirt","Clothing",12.95,1000),
    ("Tuscan Whole Milk","Grocery",75.00,3),
    ("BIC Cristal For Her Ball Pen","Office Products",10.16,500),
    ("Samsung UN85S9 Framed 85-Inch 4K Ultra HD 3D Smart LED TV","Electronics",19997.99,5),
    ("Hutzler 571 Banana Slicer","Home & Kitchen",5.14,2500),
    ("How to Avoid Huge Ships","Books",12.99,250),
    ("Haribo Gold-Bears Original Flavor Gummi Candy","Grocery",12.15,50),
    ("Horse Head Mask","Accoutrements",14.12,300),
    ("AudioQuest Diamond 2m Braided HDMI Cable","Electronics",1095.95,5),
    ("Blue Raspberry Rock Candy Crystals","Grocery",11.20,25);