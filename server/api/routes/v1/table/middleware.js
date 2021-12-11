const {poolQuery} =  require('../../../../utils/pool')
const {FK_NOT_DEFINED, COLUMN_EXISTED, PK_EXISTED} = require('../../../../errors');
const {MYSQL_DATABASE} = require('../../../../env');

const makeEachColumnQueries = (tableName, col) =>{
    return new Promise(async(resolve, reject)=>{
        try {
            let query = "\n";
            query += ` ${col.columnName}`;
            
            // column 예외처리
            const c0 = await poolQuery(`SELECT COUNT(*) AS COUNT FROM Information_schema.tables
            WHERE table_schema = '${MYSQL_DATABASE}' AND table_name = '${tableName}'
            `)
            if(c0[0][0].COUNT != 0){
                const c1 = await poolQuery(`SELECT * FROM ${MYSQL_DATABASE}.${tableName}`);
                const e1 = c1[0].find(item=>item.Field == col.columnName);        
                if(e1 != undefined) reject(COLUMN_EXISTED);
            }

            // dataType, constraint , default
            query += ` ${col.dataType}`;
            query += (col.constraint == 'false') ? '' : ' ' + col.constraint;
            //query += ` DEFAULT ${col.default}`;
    
            //PK 예외처리
            if(c0[0][0].COUNT != 0){
                const c2 = await poolQuery(`SELECT * FROM ${MYSQL_DATABASE}.${tableName}`);
                const e2 = c2[0].find(item=>item.Key == 'PRI');        
                if(e2 != undefined) reject(PK_EXISTED);
            }
            query += (col.PK == 'false') ? '' : 'primary key';
            
            // FK 예외처리
            if(col.FK != 'false'){
                query += ',';
                const doc = await poolQuery(`desc ${MYSQL_DATABASE}.${col.FK}`);
                const t = doc[0].find(item=>item.Key == 'PRI');
                if(t == undefined) reject(FK_NOT_DEFINED);
                query += ` FOREIGN KEY (${col.columnName}) REFERENCES ${col.FK}(${t.Field}) on delete cascade`;
            }
            resolve(query);
        } catch (error) {
            console.error(error);
            reject(error);
        }
    })
}

module.exports = {makeEachColumnQueries}