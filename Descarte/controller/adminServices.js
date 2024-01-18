async function obtenerUsuarios() {
  console.log("hizo click");
    try {
      // Petición HTTP usando fetch()
      const response = await fetch('/usuarios');
      
      // Manejo de errores
      if (!response.ok) {
        throw new Error('No se pudo obtener los usuarios');
      }
      console.log("Terminio fetcheo de usuarios");
      // Convertir la respuesta a formato JSON
      const data = await response.json();
      
      // TODO - mostrar usuarios en pantalla (actualmente muestra en la consola)
      console.log(data);
    } catch (error) {
      console.log(error);
      alert('Error obteniendo usuarios');
    }
    return data;
  }
  