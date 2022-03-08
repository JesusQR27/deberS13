const mysql = require('mysql')
const {promisify} = require('util')
const {database_config} = require('./keys.js') //objeto con config myqsl
//const db_conexion = mysql.createConnection(database)
const pool = mysql.createPool(database_config)
pool.getConnection((err,connection)=>{
    if(err){
        if(err.code =='PROTOCOL_CONNECTION_LOST'){
            console.log('Database cerrada');
        }
        if(err.code =='ER_CON_COUNT_ERROR'){
            console.log('Database comprobar coneccion');
        }
        if(err.code =='ECONNREFUSED'){
            console.log('Database RECHAZADA');
        }
    }
    if(connection) connection.release();
    console.log('DB connect');
    return
})

pool.query = promisify(pool.query)

module.exports = pool 