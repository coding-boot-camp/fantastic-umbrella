-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

CREATE TABLE Category(
    id: INTEGER NOT NULL primary key auto_increment,
    category_name: VARCHAR(255) NOT NULL
);

CREATE TABLE Product(
    id: INTEGER NOT NULL primary key auto_increment,
    product_name: VARCHAR(255) NOT NULL,
    price: DECIMAL(10, 2) NOT NULL,
    stock: INTEGER NOT NULL,
    default(10),
    category_id: INTEGER
);

CREATE TABLE Tag(
    id: INTEGER NOT NULL primary key auto_increment,
    tag_name: VARCHAR(255)
);

CREATE TABLE ProductTag(
    id: INTEGER NOT NULL primary key auto_increment,
    product_id: INTEGER,
    tag_id: INTEGER
);

-- Category id Integer Doesn 't allow null values
-- Set as primary key
-- Uses auto increment
-- category_name
-- String
-- Doesn' t allow null
-- values
-- Product id Integer Doesn 't allow null values
-- Set as primary key
-- Uses auto increment
-- product_name
-- String
-- Doesn' t allow null
-- values price Decimal Doesn 't allow null values
-- Validates that the value is a decimal
-- stock
-- Integer
-- Doesn' t allow null
-- values
-- Set a default value of 10 Validates that the value is numeric category_id Integer References the category model 's id
-- Tag
-- id
-- Integer
-- Doesn't allow null
-- values
-- Set
--     as primary key Uses auto increment tag_name String ProductTag id Integer Doesn 't allow null values
-- Set as primary key
-- Uses auto increment
-- product_id
-- Integer
-- References the product model' s id tag_id Integer References the tag model 's id