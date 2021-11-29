require('dotenv').config();

module.exports = {
  ...process.env,
  IS_DEV: process.env.NODE_ENV === 'development'
};