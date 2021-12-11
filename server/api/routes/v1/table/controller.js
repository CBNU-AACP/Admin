const {poolQuery} =  require('../../../../utils/pool');
const {makeEachColumnQueries} = require('./middleware');
const {} = require('../../../../errors');
const { createResponse } = require('../../../../utils/response');

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

module.exports = {createTable}