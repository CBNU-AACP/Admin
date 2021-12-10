const {poolQuery} =  require('../../../../utils/pool')
const {} = require('../../../../errors');
const { createResponse } = require('../../../../utils/response');

const showDatabases = async(req,res,next)=>{
    try {
        const q = `SHOW DATABASES`
        const doc = await poolQuery(q);
        const result = doc[0].map(item=>Object.values(item)[0]);
        return res.json(createResponse(res, result))
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const createDatabase = async(req,res,next)=>{
    const {name} = req.params;
    try {
        const q = `CREATE DATABASE ${name}`;
        const doc = await poolQuery(q);
        return res.json(createResponse(res,doc));
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const dropDatabase = async(req,res,next)=>{
    const {name} = req.params;
    try {
        const q = `DROP DATABASE ${name}`;
        const doc = await poolQuery(q);
        console.log(doc);
        return res.json(createResponse(res,doc));
    } catch (error) {
        console.error(error);
        next(error);   
    }
}

module.exports = {showDatabases, createDatabase, dropDatabase}