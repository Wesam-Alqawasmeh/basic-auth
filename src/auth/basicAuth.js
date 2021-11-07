'use strict';

const base64 = require("base-64");
const bcrypt = require('bcrypt');
const { User } = require("../models/index");

async function basicAuth(req, res, next){
        let basicHeaderParts = req.headers.authorization.split(" ");
        let encodedString = basicHeaderParts.pop();
        let decodedString = base64.decode(encodedString);
        let [username, password] = decodedString.split(":");
      
        try {
          const user = await User.findOne({ where: { username: username } });
          const valid = await bcrypt.compare(password, user.password);
          if (valid) {
            res.status(200).json(user);
          } else {
            throw new Error("Invalid User");
          }
        } catch (error) {
          res.status(403).send("Invalid Login");
        }

        next();
};

module.exports = basicAuth;