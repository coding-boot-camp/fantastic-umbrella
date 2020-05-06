# module-13-challenge-orm

> Challenge: Take this working Express API and have it use Sequelize to interact with a SQL database.

## Create the database and the configuration to connect a database using Sequelize

- Use the `schema.sql` file in the `db` folder to create your database using MySQL shell commands.

- Use environment variables to store sensitive data, like your MySQL username, password, and database name.

## Create Database Models

- `Category`

  - `id`
    - Integer
    - Don't allow null values
    - Set as primary key
    - Use auto increment
  - `category_name`
    - String
    - Don't allow null values

- `Product`

  - `id`
    - Integer
    - Don't allow null values
    - Set as primary key
    - Use auto increment
  - `product_name`
    - String
    - Don't allow null values
  - `price`
    - Decimal
    - Don't allow null values
    - Validate that the value is a decimal
  - `stock`
    - Integer
    - Don't allow null values
    - Set a default value of 10
    - Validate that the value is numeric
  - `category_id`
    - Integer
    - Reference the `category` model's `id`

- `Tag`

  - `id`
    - Integer
    - Don't allow null values
    - Set as primary key
    - Use auto increment
  - `tag_name`
    - String

- `ProductTag`
  - `id`
    - Integer
    - Don't allow null values
    - Set as primary key
    - Use auto increment
  - `product_id`
    - Integer
    - Reference the `product` model's `id`
  - `tag_id`
    - Integer
    - Reference the `tag` model's `id`

### Associations

> Execute association methods on our Sequelize models to create the following relationships between them.

- `Product` belongs to `Category`, as a Category can have multiple Products but a Product can only belong to one Category

- `Category` has many `Product`

- `Product` belongs to many `Tag`, using the `ProductTag` through model, allow Products to have multiple Tags and Tags have many Products

- `Tag` belongs to many `Product`

> **HINT:** Make sure you set up foreign key relationships that match the column we created in the respective models!

## Fill out API routes to perform RESTful CRUD operations

- Fill out the unfinished routes in `product-routes.js`, `tag-routes.js`, and `category-routes.js` to perform Create, Read, Update, and Delete operations using your Sequelize models

- The functionality for creating the many-to-many relationship for products is already done for you

> **Hint:** Be sure to look at your module project's code for syntax help and use your model's column definitions to figure out what `req.body` will be for POST and PUT routes!

## Seed Database

After creating the models and routes, run `npm run seed` to seed data to your database so you can test your routes.

## Sync Sequelize to database on server start.

- Create the code needed in server.js to sync our Sequelize models to our SQL database on server start.
