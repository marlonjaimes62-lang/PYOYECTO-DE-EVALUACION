// Define la URL base de JSONPlaceholder.
const API_URL = 'https://jsonplaceholder.typicode.com';

// Consulta usuarios y devuelve solo los campos solicitados.
async function obtenerUsuariosReducidos() {
  try {
    // Solicita la colección completa de usuarios.
    const response = await fetch(`${API_URL}/users`);
    // Rechaza respuestas HTTP que no sean exitosas.
    if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
    // Convierte la respuesta en datos JavaScript.
    const usuarios = await response.json();
    // Proyecta cada usuario a un objeto nuevo e inmutable.
    return usuarios
      .map(({ name, phone }) => ({ name, phone }))
      .sort((primerUsuario, segundoUsuario) => primerUsuario.name.localeCompare(segundoUsuario.name));
  } catch (error) {
    // Devuelve al llamador un mensaje útil para la interfaz.
    throw new Error(`No se pudieron obtener los usuarios: ${error.message}`);
  }
}

// Expone la función pública del ejercicio 4.
module.exports = { obtenerUsuariosReducidos };
