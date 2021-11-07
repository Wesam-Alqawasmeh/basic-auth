"use strict";

require('dotenv').config();

const DATABASE_URL = process.env.NODE_ENV = 'test' ? 'sqlite:memory' : process.env.DATABASE_URL;

const {Sequelize, DataTypes} = require('sequelize');

const User = require('./user.model');

const sequelizeOptions = process.env.NODE_ENV = 'production' ? {
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        }
      }
} : {};

let sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);


module.exports = {
    db: sequelize,
    User: User(sequelize, DataTypes)
};