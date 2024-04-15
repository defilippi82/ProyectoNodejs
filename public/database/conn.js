const dotenv = require('dotenv');

dotenv.config({
    path: './src/env/.env'
});

//const { createPool }= require('mysql2/promise');

const mysql= require('mysql');
const conn= mysql.createConnection({
    host:process.env.DB_HOST,
    port: process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_DATABASE
});

conn.connect((error)=>{
    if(error){
        console.log('El error de conexión es ' +error);
        return;
    }
        console.log('Conectado a la base de datos con Conn');
    
});
    
module.exports=  conn ;