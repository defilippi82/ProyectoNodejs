document.addEventListener('DOMContentLoaded', () => {
  const usuariosButton = document.getElementById('usuariosButton');
  const reservasButton = document.getElementById('reservasButton');
  const contenidoUsuarios = document.getElementById('contenidoUsuarios');
  const contenidoReservas = document.getElementById('contenidoReservas');

  usuariosButton.addEventListener('click', async () => {
    const response = await fetch('/usuarios');
    const data = await response.json();
    mostrarUsuarios(data);
  });

  reservasButton.addEventListener('click', async () => {
    const response = await fetch('/reservas');
    const data = await response.json();
    mostrarReservas(data);
  });

  function mostrarUsuarios(data) {
    contenidoUsuarios.style.display = 'block';
    contenidoReservas.style.display = 'none';
    // Aquí puedes actualizar el contenido en contenidoUsuarios con los datos recibidos
  }

  function mostrarReservas(data) {
    contenidoReservas.style.display = 'block';
    contenidoUsuarios.style.display = 'none';
    // Aquí puedes actualizar el contenido en contenidoReservas con los datos recibidos
  }
});
