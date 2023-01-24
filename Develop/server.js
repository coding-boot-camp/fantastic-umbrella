const express = require('express');
const routes = require('./routes');
const sequelize = require(`./config/connection`);
const dotenv = require('dotenv').config();
console.log(process.env)

// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize
.sync({ force: false })
.then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}!`));
});





