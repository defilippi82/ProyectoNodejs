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
   // Ordenar alfabéticamente
   const usuariosOrdenados = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
   // Dividir en grupos de 20 para la paginación
   const paginas = dividirEnPaginas(usuariosOrdenados, 20);

   // Muestra la primera página
   mostrarPagina(1, paginas, contenidoUsuarios);
 };

  function mostrarReservas(data) {
   // Ordenar alfabéticamente
   const reservasOrdenados = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
   // Dividir en grupos de 20 para la paginación
   const paginas = dividirEnPaginas(usuariosOrdenados, 20);

   // Muestra la primera página
   mostrarPagina(1, paginas, contenidoReservas);
 };
 function dividirEnPaginas(array, pageSize) {
  return array.reduce((result, value, index, array) => {
    if (index % pageSize === 0) {
      result.push(array.slice(index, index + pageSize));
    }
    return result;
  }, []);
}
function mostrarPagina(pageNumber, pages, container) {
  const currentPage = pages[pageNumber - 1];
  // Muestra los usuarios de la página actual en el contenedor especificado
  container.innerHTML = currentPage.map(usuario => {
    return `<div>${usuario.nombre}</div>`; // Aquí puedes mostrar otros detalles del usuario
  }).join('');
}
});
