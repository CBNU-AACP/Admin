const {poolQuery} =  require('../../../../utils/pool');
const {TABLE_NOT_EXISTED} = require('../../../../errors');
const { createResponse } = require('../../../../utils/response');
const {MYSQL_DATABASE} = require('../../../../env');

const showRows = async(req,res,next)=>{
  const {tableName} = req.params;
    try {
        let q = `SELECT * FROM ${tableName};`
        let doc = await poolQuery(q);
        return res.json(createResponse(res,doc[0]));
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const createRows = async(req,res,next)=>{
  const body = req.body;
  try {
    let qArray = [];
    const columns = await poolQuery(`SELECT column_name FROM Information_schema.columns
    WHERE table_schema = '${MYSQL_DATABASE}' AND table_name = '${body.tableName}'
    `);
    let existCreatedAt = existUpdatedAt = false; 
    await columns[0].map(async(column) => {
      if(Object.values(column) == "createdAt")
        existCreatedAt = true;
      else if(Object.values(column) == "updatedAt")
        existUpdatedAt = true;
    });

    await body.rows.map(async(e)=> {
      let q = `INSERT INTO ${body.tableName} (`;
      let str1 = str2 = "";
      for(const key of Object.keys(e)) {
        str1 += `${key}, `;
      }
      
      if(existCreatedAt)
        str1 += 'createdAt, ';
      if(existUpdatedAt)
        str1 += 'updatedAt, ';

      q += str1.slice(0, -2);
      q += ') VALUES (';

      for(const value of Object.values(e)) {
        if(typeof(value) == "string")
          str2 += `"${value}", `;
        else
          str2 += `${value}, `;
      }

      if(existCreatedAt)
        str2 += 'NOW(), ';
      if(existUpdatedAt)
        str2 += 'NOW(), ';

      q += str2.slice(0, -2);
      q += ');';
      qArray.push(q);
    });

    for (const query of qArray) {
      await poolQuery(query);
    }

    return res.json(createResponse(res));
  } catch (error) {
      console.error(error);
      next(error);
  }
};

const updateRows = async(req,res,next) => {
  const body = req.body;
  try {
    let qArray = [];
    const columns = await poolQuery(`SELECT column_name FROM Information_schema.columns
    WHERE table_schema = '${MYSQL_DATABASE}' AND table_name = '${body.tableName}';
    `);

    const columnsPK = await poolQuery(`SELECT column_name FROM Information_schema.columns
    WHERE table_schema = '${MYSQL_DATABASE}' AND table_name = '${body.tableName}' AND column_key = 'PRI';
    `);

    let existUpdatedAt = false; 
    await columns[0].map(async(column) => {
      if(Object.values(column) == "updatedAt")
        existUpdatedAt = true;
    });

    await body.rows.map(async(e)=> {
      let q = `UPDATE ${body.tableName} SET `;
      for(let i = 1; i<Object.keys(e).length; i++) {
        if(typeof(Object.values(e)[i]) == "string")
          q += `${Object.keys(e)[i]} = "${Object.values(e)[i]}", `;
        else
        q += `${Object.keys(e)[i]} = ${Object.values(e)[i]}, `;
      }
      if(existUpdatedAt)
        q  += 'updatedAt = NOW(), '
      q = q.slice(0, -2);
      if(typeof(e[`${Object.values(columnsPK[0][0])}`]) == "string")
        q += ` WHERE ${Object.values(columnsPK[0][0])} = "${e[`${Object.values(columnsPK[0][0])}`]}";`;
      else
        q += ` WHERE ${Object.values(columnsPK[0][0])} = ${e[`${Object.values(columnsPK[0][0])}`]};`;
      qArray.push(q);
    });

    for (const query of qArray) {
      console.log(query);
      await poolQuery(query);
    }

    return res.json(createResponse(res));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteRow = async(req,res,next) => {
  const body = req.body;
  try {
    const columnsPK = await poolQuery(`SELECT column_name FROM Information_schema.columns
    WHERE table_schema = '${MYSQL_DATABASE}' AND table_name = '${body.tableName}' AND column_key = 'PRI';
    `);
    let q = `DELETE FROM ${body.tableName} WHERE ${Object.values(columnsPK[0][0])} = ${body[`${Object.values(columnsPK[0][0])}`]}`;
    await poolQuery(q);
    return res.json(createResponse(res));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getPKs = async(req,res,next) => {
  const body = req.body;
  try {
    let PKs = [];
    for(const FK of Object.values(body)[0]) {
      let referencedTable = await poolQuery(`SELECT referenced_table_name FROM information_schema.key_column_usage WHERE table_name = '${Object.keys(body)[0]}' AND table_schema = '${MYSQL_DATABASE}' and column_name = '${FK}';`);
      let temp = {};
      let tempArr = [];
      console.log(referencedTable[0]);
      if(referencedTable[0].length == 0)
        return next(TABLE_NOT_EXISTED);
      
      let columnsPK = await poolQuery(`SELECT column_name FROM Information_schema.columns
      WHERE table_schema = '${MYSQL_DATABASE}' AND table_name = '${referencedTable[0][0]["REFERENCED_TABLE_NAME"]}' AND column_key = 'PRI';
      `);

      let values = await poolQuery(`SELECT ${Object.values(columnsPK[0][0])} FROM ${referencedTable[0][0]["REFERENCED_TABLE_NAME"]};`);

      for(const i of values[0]) {
        tempArr.push(Object.values(i)[0]);
      }
      
      temp[`${Object.values(columnsPK[0][0])}`] = tempArr;
      PKs.push(temp);        
    }
    return res.json(createResponse(res, PKs));
  } catch (error) {
    console.error(error);
  }
};

module.exports = {showRows, createRows, updateRows, deleteRow, getPKs};