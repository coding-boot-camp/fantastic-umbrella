DROP DATABASE IF EXISTS ecommerce_db;
CREATE DATABASE ecommerce_db;

USE ecommerce_db;

CREATE TABLE category (
  id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
  category_name VARCHAR(30) NOT NULL
);

CREATE TABLE product(
  id INTEGER AUTO_INCREMENT,
  product_name VARCHAR(30) NOT NULL,
  price DECIMAL NOT NULL,
  stock INTEGER NOT NULL DEFAULT '10',
  category_id INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (category_id) REFERENCES category(id)
);
CREATE TABLE tag(
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  tag_name VARCHAR(30)
);
CREATE TABLE productTag(
  id INTEGER NOT NULL AUTO_INCREMENT,
  product_id INTEGER, 
  tag_id INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES product(id),
  FOREIGN KEY (tag_id) REFERENCES tag(id) 
);
