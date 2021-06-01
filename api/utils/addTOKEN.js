const jwt = require("jsonwebtoken");
const config = require("../../config");

// create json web token
const maxAge = 24 * 60 * 60; // one day
const createToken = (id) => {
  return jwt.sign({ id }, config.JWT_SECRET_KEY, {
    expiresIn: maxAge,
  });
};

module.exports = {
  createToken,
};
