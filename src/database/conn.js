const mysql2= require('mysql2');
const conn= mysql2.createConnection({
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
        console.log('Conectado a la base de datos');
    
});
module.exports=  {conn: pool.promise() };