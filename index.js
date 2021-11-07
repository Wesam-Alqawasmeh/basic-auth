"use strict";

const { start } = require("./src/server");

const { db } = require("./src/models/index");

db.sync()
  .then(() => {
    start();
  })
  .catch((e) => {
    console.error("Could not start server", e.message);
  });
