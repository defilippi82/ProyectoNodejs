
const mysql= require('mysql2/promise');

const connectDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASE
        });

        console.log('Conectado a la base de datos');
        return connection;
    } catch (error) {
        console.error('Error de conexión a la base de datos:', error);
        throw error;
    }
};

module.exports = { connectDB };
/*
const connection= mysql.createConnection({
    host:process.env.DB_HOST,
    port: process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_DATABASE
});

connection.connect((error)=>{
    if(error){
        console.log('El error de conexión es ' +error);
        return;
    }
        console.log('Conectado a la base de datos');
    
});


module.exports= connection;*/