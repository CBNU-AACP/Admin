const mysql = require('mysql2');
const env = require('../../env');
const config = require('../../config/index')[env.NODE_ENV];

const poolQuery = ((q)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const pool = mysql.createPool(config).promise();
            const doc = await pool.query(`${q}`);
            resolve(doc);
        } catch (error) {
            reject(error);           
        }
    })
})

module.exports = {poolQuery};