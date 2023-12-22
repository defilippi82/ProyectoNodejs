const {connectDB} = require('../database/db');

const model = {
    //USUARIOS
    
     getAllUsuariosFromDB : async () => {
    
        try {
            const connection = await connectDB();
           // const datos = await connection.query('SELECT * FROM usuarios WHERE id = ? AND nombre = ? AND email = ? AND manzana = ? AND lote = ? AND isla = ? AND telefono = ? AND rol = ?');
            const [rows, fields] = await connection.execute('SELECT * FROM usuarios');
            console.log('datos de los usuarios de getAllUsuariosFromDB', rows);
            return rows;
        } catch (error) {
            console.error('Error querying MySQL:', error);
            throw error;
        }
    },
    
    // Obtener un usuario por ID desde la base de datos
     getUsuarioPorIDFromDB : async (id) => {
        try {
            const [datos] = await connection.query('SELECT * FROM usuarios WHERE id = ?', [id]);
            return datos;
        } catch (error) {
            console.error('Error querying MySQL:', error);
            throw error;
        }
    },
    
      
    // Editar un usuario por ID en la base de datos
    editUsuarioFromDB : async (id, updatedUsuarioData) => {
        try {
            await connection.query('UPDATE usuarios SET ? WHERE id = ?', [updatedUsuarioData, id]);
            const updatedUsuario = await getUsuarioPorIDFromDB(id);
            return updatedUsuario;
        } catch (error) {
            console.error('Error updating MySQL:', error);
            throw error;
        }
    },
    
    // Borrar un usuario por ID de la base de datos
     deleteUsuarioFromDB : async (id) => {
        try {
            const deletedUsuario = await getUsuarioPorIDFromDB(id);
            await connection.query('DELETE FROM usuarios WHERE id = ?', [id]);
            return deletedUsuario;
        } catch (error) {
            console.error('Error deleting from MySQL:', error);
            throw error;
        }
    },
    //RESERVAS
    // Obtener todos los reservas desde la base de datos
    getAllReservasFromDB : async () => {
    try {
        const connection = await connectDB();
        const [rows, fields] = await connection.execute('SELECT * FROM reservas');
        console.log('datos de los usuarios de getAllreservasFromDB', rows);
            return rows;
    } catch (error) {
        console.error('Error querying MySQL:', error);
        throw error;
    }
},

// Obtener un Reserva por ID desde la base de datos
getReservaPorIDFromDB : async (id) => {
    try {
        const [datos] = await connection.query('SELECT * FROM reservas WHERE id = ?', [id]);
        return datos;
    } catch (error) {
        console.error('Error querying MySQL:', error);
        throw error;
    }
},

// Editar un Reserva por ID en la base de datos
editReservaFromDB : async (id, updatedReservaData) => {
    try {
        await connection.query('UPDATE reservas SET ? WHERE id = ?', [updatedReservaData, id]);
        const updatedReserva = await getReservaPorIDFromDB(id);
        return updatedReserva;
    } catch (error) {
        console.error('Error updating MySQL:', error);
        throw error;
    }
},

// Borrar un reserva por ID de la base de datos
 deleteReservaFromDB : async (id) => {
    try {
        const deletedReserva = await getReservaPorIDFromDB(id);
        await connection.query('DELETE FROM reservas WHERE id = ?', [id]);
        return deletedReserva;
    } catch (error) {
        console.error('Error deleting from MySQL:', error);
        throw error;
    }
}

};
module.exports = { model};
