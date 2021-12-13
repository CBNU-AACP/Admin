const {poolQuery} =  require('../../../../utils/pool');
const {makeEachColumnQueries} = require('./middleware');
const {TABLE_NOT_EXISTED} = require('../../../../errors');
const { createResponse } = require('../../../../utils/response');
const {MYSQL_DATABASE} = require('../../../../env');

const showTables = async(req,res,next)=>{
    try {
        let q = `SHOW TABLES;`
        let doc = await poolQuery(q);
        doc = doc[0].map(item=>Object.values(item)[0]);
        console.log(doc);
        return res.json(createResponse(res,doc));
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const descTable = async(req,res,next)=>{
    const {name} = req.params;
    try {
        const q = `DESC ${name}`;
        let doc = await poolQuery(q);
        doc = doc[0].map(item=>{
            delete item.Extra
            return item;
        });
        return res.json(createResponse(res,doc));
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const createTable = async(req,res,next)=>{
    const body = req.body;
    try {
        let q = `CREATE TABLE ${body.tableName} (`;
        await Promise.all(body.column.map(async(e)=>{
            let str = await makeEachColumnQueries(body.tableName, e);
            q += (str + ',');
        }));
        q = q.slice(0,-1);
        q += ');';
        const doc = await poolQuery(q);
        return res.json(createResponse(res, doc))
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const dropTable = async(req,res,next)=>{
    const {name}= req.params;
    try {
        const table = await poolQuery(`SELECT COUNT(*) AS COUNT FROM Information_schema.tables
        WHERE table_schema = '${MYSQL_DATABASE}' AND table_name = '${name}'
        `)
        if(table[0][0].COUNT == 0) return next(TABLE_NOT_EXISTED);
        let q = `DROP TABLE ${name}`;        
        const doc = await poolQuery(q);
        return res.json(createResponse(res,doc));
    } catch (error) {
        console.error(error);
        next(error);
    }
}
module.exports = {showTables, createTable, dropTable, descTable};