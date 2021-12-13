require('dotenv').config();
const env = process.env;

const development = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: env.MYSQL_DIALECT,
  waitForConnections : true,
  connectionLimit : 10,
  queueLimit : 0,
  port: env.MYSQL_PORT
};

const production = {
  username: env.REMOTE_MYSQL_USERNAME,
  password: env.REMOTE_MYSQL_PASSWORD,
  database: env.REMOTE_MYSQL_DATABASE,
  host: env.REMOTE_MYSQL_HOST,
  dialect: env.REMOTE_MYSQL_DIALECT,
  port: env.REMOTE_MYSQL_PORT
};

const test = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE_TEST,
  host: env.MYSQL_HOST,
  dialect: env.MYSQL_DIALECT,
  port: env.MYSQL_PORT
};

module.exports = { development, production, test };