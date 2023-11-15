
function reservaGet(req, res) {
    const login = req.session.loggedin || false;
    const name = req.session.nombre || 'Debe iniciar sesión';
    const userId = req.session.userId || null;

    res.render('reserva', {
        login,
        name,
        userId
    });
};

function reservaPost(req, res) {
    const {
        fecha,
        hora,
        cancha
    } = req.body;
    const userIdFromSession = req.session.userId;

    if (!fecha || !hora || !cancha) {
        return res.render('reserva', {
            userId: userIdFromSession,
            alert: true,
            alertTitle: "Advertencia!",
            alertMessage: "Datos de reserva incompletos.",
            alertIcon: "warning",
            showConfirmButton: true,
            timer: false,
            ruta: 'reserva'
        });
    }

    const fechaYHora = `${fecha} ${hora}:00:00`;
    const hora_inicio = new Date(fechaYHora);

    if (!hora_inicio || isNaN(hora_inicio.getTime())) {
        return res.render('reserva', {
            userId: userIdFromSession,
            alert: true,
            alertTitle: "Advertencia!",
            alertMessage: "Hora de inicio no válida.",
            alertIcon: "warning",
            showConfirmButton: true,
            timer: false,
            ruta: 'reserva'
        });
    }
    //Verificar que la hora de inicio sea en intervalos de 30 minutos
    if (hora_inicio.getMinutes() % 30 !== 0) {
        return res.render('reserva', {
            userId: userIdFromSession,
            alert: true,
            alertTitle: "Advertencia!",
            alertMessage: "Por favor, seleccione una hora válida en intervalos de 30 minutos.",
            alertIcon: "warning",
            showConfirmButton: true,
            timer: false,
            ruta: 'reserva'
        });
    }
    // Verifica si la cancha es de noche
    const horaDeReferencia = new Date();
    horaDeReferencia.setHours(20, 0, 0, 0); // Establecer la hora de referencia a las 20:00:00

    const esDeNoche = hora_inicio.getHours() >= 20;

    const hora_fin = new Date(hora_inicio);
    hora_fin.setMinutes(hora_inicio.getMinutes() + 59); // Incrementa 60 minutos para una franja horaria de 1 hora


    // Verifica si la cancha está ocupada en el intervalo de tiempo de hora_inicio a hora_fin
    const queryString = 'SELECT COUNT(*) AS count FROM reservas WHERE id_cancha = ? AND fecha = ? AND ((hora_inicio = ?) OR (hora_inicio < ? AND hora_fin > ?))';

    connection.query(queryString, [cancha, fecha, hora_inicio, hora_fin, hora_inicio], (error, results) => {
        if (error) {
            return res.render('reserva', {
                userId: userIdFromSession,
                alert: true,
                alertTitle: "Advertencia!",
                alertMessage: "Error al verificar disponibilidad.",
                alertIcon: "warning",
                showConfirmButton: true,
                timer: false,
                ruta: 'reserva'
            });
        }

        if (results[0].count > 0) {
            return res.render('reserva', {
                userId: userIdFromSession,
                alert: true,
                alertTitle: "Advertencia!",
                alertMessage: "La cancha ya está reservada en ese horario.",
                alertIcon: "warning",
                showConfirmButton: true,
                timer: false,
                ruta: 'reserva'
            });
        }

        // Verifica si la cancha está ocupada en el intervalo de tiempo de hora_inicio a hora_inicio + 59 minutos
        const queryString2 = 'SELECT COUNT(*) AS count FROM reservas WHERE id_cancha = ? AND fecha = ? AND ((hora_inicio <= ? AND hora_fin >= ?) OR (hora_inicio <= ? AND hora_fin >= ?))';

        const hora_fin_59 = new Date(hora_inicio);
        hora_fin_59.setMinutes(hora_inicio.getMinutes() + 59);

        connection.query(queryString2, [cancha, fecha, hora_inicio, hora_inicio, hora_inicio, hora_fin_59], (error, results) => {
            if (error) {
                return res.render('reserva', {
                    userId: userIdFromSession,
                    alert: true,
                    alertTitle: "Advertencia!",
                    alertMessage: "Error al verificar disponibilidad.",
                    alertIcon: "warning",
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'reserva'
                });
            }

            if (results[0].count > 0) {
                return res.render('reserva', {
                    userId: userIdFromSession,
                    alert: true,
                    alertTitle: "Advertencia!",
                    alertMessage: "La cancha ya está reservada en ese horario.",
                    alertIcon: "warning",
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'reserva'
                });
            }


            const insertString = 'INSERT INTO reservas (id_usuario, id_cancha, fecha, hora_inicio, hora_fin, estado) VALUES (?, ?, ?, ?, ?, ?)';
            // Calcular la hora de finalización como 30 minutos después de la hora de inicio
            const hora_fin = new Date(hora_inicio);
            hora_fin.setMinutes(hora_inicio.getMinutes() + 29);
            const estado = 'Pendiente';
            let mensaje = 'Reserva exitosa. La cancha está reservada.';
            if (esDeNoche) {
                mensaje += ' Se cobrará la ficha de luz.';
            }

            connection.query(insertString, [userIdFromSession, cancha, fecha, hora_inicio, hora_fin, estado], (error) => {
                if (error) {
                    return res.render('reserva', {
                        userId: userIdFromSession,
                        alert: true,
                        alertTitle: "Advertencia!",
                        alertMessage: "Error al registrar la reserva.",
                        alertIcon: "warning",
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'reserva'
                    });
                }
                // Inserta la segunda reserva (30 minutos después)
                const segundaHoraInicio = new Date(hora_inicio);
                segundaHoraInicio.setMinutes(hora_inicio.getMinutes() + 30);
                const segundaHoraFin = new Date(segundaHoraInicio);
                segundaHoraFin.setMinutes(segundaHoraInicio.getMinutes() + 29);

                connection.query(insertString, [userIdFromSession, cancha, fecha, segundaHoraInicio, segundaHoraFin, estado], (error) => {
                    if (error) {
                        return res.render('reserva', {
                            userId: userIdFromSession,
                            alert: true,
                            alertTitle: "Advertencia!",
                            alertMessage: "Error al registrar la segunda reserva.",
                            alertIcon: "warning",
                            showConfirmButton: true,
                            timer: false,
                            ruta: 'reserva'
                        });
                    }


                    return res.render('reserva', {
                        userId: userIdFromSession,
                        alert: true,
                        alertTitle: "Reserva exitosa.",
                        alertMessage: mensaje,
                        alertIcon: "success",
                        showConfirmButton: true,
                        timer: 1500,
                        ruta: 'reserva'
                    });
                });
            });
        });
    });
};
import FullCalendar from '@fullcalendar/core';
document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        // Configuración del calendario
        initialView: 'dayGridMonth', // Puedes cambiar la vista predeterminada
        events: [
            // Aquí puedes proporcionar eventos desde tu base de datos
            // Ejemplo:
            {
                title: 'Reserva 1',
                start: '2023-11-01T10:00:00',
                end: '2023-11-01T12:00:00',
                // Otros datos personalizados
            },
            // Más eventos
        ],
        // Otras opciones de configuración
    });
    calendar.render(); // Dibuja el calendario
});
document.addEventListener('DOMContentLoaded', function () {
    const reservaForm = document.getElementById('reservaForm');
    const mensajeDiv = document.getElementById('mensaje');

    reservaForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Obtener datos del formulario
        const formData = new FormData(reservaForm);

        // Enviar una solicitud POST al servidor
        fetch('/reservar', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                // Mostrar el mensaje al usuario
                mensajeDiv.textContent = data.message;
            })
            .catch(error => {
                console.error('Error al procesar la reserva:', error);
                mensajeDiv.textContent = 'Error al procesar la reserva.';
            });
    });
});