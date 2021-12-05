const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];
const {readdirSync} = require('fs');
const {join} = require('path');

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

const db = {};
db.sequelize = sequelize;

readdirSync(join(__dirname, 'schemas'))
    .filter(file => /\.js/.test(file))
    .forEach(file => {
        const fileName = file.replace(/\.js/, '').replace(/^[a-z]/, letter => letter.toUpperCase());
        const schema = require(join(__dirname, 'schemas', file));
        db[fileName] = schema;
        schema.init(sequelize);
    });

Object.keys(db).forEach( (key) => {
    if(key != 'sequelize') db[key].associate(db);
});

module.exports = db;