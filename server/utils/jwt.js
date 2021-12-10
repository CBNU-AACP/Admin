const jwt = require('jsonwebtoken');
const { readFileSync } = require('fs');
const { join } = require('path');
const { ROOT_DIR, JWT_SECRET_KEY_FILE } = require('../env');


const verifyToken = (token) => {
  // const JWT_SECRET_KEY = readFileSync(join(ROOT_DIR, 'keys', JWT_SECRET_KEY_FILE));
  try {
    return jwt.verify(token, JWT_SECRET_KEY_FILE);
  } catch (error) {
    if(error.name == "TokenExpiredError") return null;
    if(error.name == "JsonWebTokenError") return null;
    return null;
  }
};

module.exports = { verifyToken };