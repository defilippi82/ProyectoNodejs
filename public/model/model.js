const conn = require('../database/conn');
const { connectDB } = require('../database/db');

const model = {
    //USUARIOS

    getAllUsuariosFromDB: async () => {
        try {
            const connection = await connectDB();
            const [rows] = await connection.execute('SELECT * FROM usuarios');
            return rows;
        } catch (error) {
            console.error('Error al obtener usuarios desde la base de datos:', error);
            throw error;
        }
    },

    getUsuarioPorIDFromDB: async (id) => {
        try {
            const connection = await connectDB();
            const [rows] = await connection.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            console.error('Error al obtener usuario por ID desde la base de datos:', error);
            throw error;
        }
    },

    editUsuarioFromDB: async (id, updatedUsuarioData) => {
        try {
            const connection = await connectDB();
            await connection.execute('UPDATE usuarios SET ? WHERE id = ?', [updatedUsuarioData, id]);
            const updatedUsuario = await model.getUsuarioPorIDFromDB(id);
            return updatedUsuario;
        } catch (error) {
            console.error('Error al actualizar usuario en la base de datos:', error);
            throw error;
        }
    },

    deleteUsuarioFromDB: async (id) => {
        try {
            const connection = await connectDB();
            const deletedUsuario = await model.getUsuarioPorIDFromDB(id);
            await connection.execute('DELETE FROM usuarios WHERE id = ?', [id]);
            return deletedUsuario;
        } catch (error) {
            console.error('Error al eliminar usuario de la base de datos:', error);
            throw error;
        }
    },

    //RESERVAS
    getAllReservasFromDB: async () => {
        try {
            const connection = await connectDB();
            const [rows] = await connection.execute('SELECT * FROM reservas');
            return rows;
        } catch (error) {
            console.error('Error al obtener reservas desde la base de datos:', error);
            throw error;
        }
    },

    getReservaPorIDFromDB: async (id) => {
        try {
            const connection = await connectDB();
            const [rows] = await connection.execute('SELECT * FROM reservas WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            console.error('Error al obtener reserva por ID desde la base de datos:', error);
            throw error;
        }
    },

    editReservaFromDB: async (id, updatedReservaData) => {
        try {
            const connection = await connectDB();
            await connection.execute('UPDATE reservas SET ? WHERE id = ?', [updatedReservaData, id]);
            const updatedReserva = await model.getReservaPorIDFromDB(id);
            return updatedReserva;
        } catch (error) {
            console.error('Error al actualizar reserva en la base de datos:', error);
            throw error;
        }
    },

    deleteReservaFromDB: async (id) => {
        try {
            const connection = await connectDB();
            const deletedReserva = await model.getReservaPorIDFromDB(id);
            await connection.execute('DELETE FROM reservas WHERE id = ?', [id]);
            return deletedReserva;
        } catch (error) {
            console.error('Error al eliminar reserva de la base de datos:', error);
            throw error;
        }
    }
};

module.exports = { model };
/*const conn = require('../database/conn');
const {connectDB}= require('../database/db');
const model = {
    //USUARIOS
    
     getAllUsuariosFromDB : async () => {
    
        try {
            const connection = await connectDB();
            const [rows, fields] = await connection.execute('SELECT * FROM usuarios');
            //console.log('datos de los usuarios de getAllUsuariosFromDB', rows);
            return rows;
        } catch (error) {
            console.error('Error querying MySQL:', error);
            throw error;
        }
    },
    
    // Obtener un usuario por ID desde la base de datos
     getUsuarioPorIDFromDB : async (id) => {
        try {
            const connection = await connectDB();
            const [datos] = await connection.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
            //console.log('datos de los usuariosID de getUsuarioPorIDFromDB', datos[0]);
            return datos[0];
        } catch (error) {
            console.error('Error querying MySQL:', error);
            throw error;
        }
    },
    
      
    // Editar un usuario por ID en la base de datos
    editUsuarioFromDB : async (id, updatedUsuarioData) => {
        console.log('idfromDB', id);
        try {
            const connection = await connectDB();
            await connection.execute('UPDATE usuarios SET ? WHERE id = ?', [updatedUsuarioData, id]);
            const updatedUsuario = await model.getUsuarioPorIDFromDB(id);
            return updatedUsuario;
        } catch (error) {
            console.error('Error updating MySQL:', error);
            throw error;
        }
    },
    
    // Borrar un usuario por ID de la base de datos
     deleteUsuarioFromDB : async (id) => {
        try {
            const connection = await connectDB();
            const deletedUsuario = await model.getUsuarioPorIDFromDB(id);
            await connection.execute('DELETE FROM usuarios WHERE id = ?', [id]);
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
        //console.log('datos de los usuarios de getAllreservasFromDB', rows);
            return rows;
    } catch (error) {
        console.error('Error querying MySQL:', error);
        throw error;
    }
},

// Obtener un Reserva por ID desde la base de datos
getReservaPorIDFromDB : async (id) => {
    try {
        const connection = await connectDB();
        const [datos] = await connection.execute('SELECT * FROM reservas WHERE id = ?', [id]);
        return datos[0];
    } catch (error) {
        console.error('Error querying MySQL:', error);
        throw error;
    }
},

// Editar un Reserva por ID en la base de datos
editReservaFromDB : async (id, updatedReservaData) => {
    try {
        const connection = await connectDB();
        await connection.execute('UPDATE reservas SET ? WHERE id = ?', [updatedReservaData, id]);
        const updatedReserva = await model.getReservaPorIDFromDB(id);
        return updatedReserva;
    } catch (error) {
        console.error('Error updating MySQL:', error);
        throw error;
    }
},

// Borrar un reserva por ID de la base de datos
 deleteReservaFromDB : async (id) => {
    try {
        const connection = await connectDB();
        const deletedReserva = await model.getReservaPorIDFromDB(id);
        await connection.execute('DELETE FROM reservas WHERE id = ?', [id]);
        return deletedReserva;
    } catch (error) {
        console.error('Error deleting from MySQL:', error);
        throw error;
    }
}

};
module.exports = { model};*/
