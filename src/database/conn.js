const dotenv = require('dotenv');

dotenv.config({
    path: './src/env/.env'
});

const { createPool }= require('mysql2/promise');

const conn  =  createPool({
    host:process.env.DB_HOST,
    port: process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_DATABASE
});
// Prueba de conexión
conn.getConnection()
    .then(connection => {
        console.log('Connected to MySQL database');
        connection.release();
    })
    .catch(err => {
        console.error('Error connecting to MySQL:', err);
    });
    
module.exports=  conn ;