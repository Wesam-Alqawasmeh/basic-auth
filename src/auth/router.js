"use strict";

const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");

const basicAuth = require('./basicAuth');


const { User } = require("../models/index");

// Sign UP
authRouter.post("/signup", signUp);

// Sign In
authRouter.post("/signin", basicAuth, (req, res) => {});


// signUp function
async function signUp(req, res) {
  //  parse the data from the body req
  try {
    // hash the password within the req body
    req.body.password = await bcrypt.hash(req.body.password, 5);

    // create the new user Record
    const record = await User.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(403).send("Error occurred");
  }
}




module.exports = authRouter;
