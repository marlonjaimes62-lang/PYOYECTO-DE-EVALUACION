// Define la URL base de los recursos públicos de JSONPlaceholder.
const API_URL = 'https://jsonplaceholder.typicode.com';

// Obtiene las tareas pendientes agrupadas por el identificador del usuario.
async function listarTareasPendientes() {
  try {
    // Solicita todas las tareas al servicio remoto.
    const response = await fetch(`${API_URL}/todos`);
    // Comprueba que el servidor haya respondido correctamente.
    if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
    // Convierte la respuesta JSON en un arreglo de objetos.
    const tareas = await response.json();
    // Conserva únicamente las tareas que todavía no están completadas.
    const pendientes = tareas.filter((tarea) => tarea.completed === false);
    // Crea un objeto nuevo sin modificar la respuesta original.
    return pendientes.reduce((porUsuario, tarea) => {
      // Inicializa el arreglo del usuario cuando aparece por primera vez.
      if (!porUsuario[tarea.userId]) porUsuario[tarea.userId] = [];
      // Agrega una copia de la tarea al grupo correspondiente.
      porUsuario[tarea.userId].push({ ...tarea });
      // Devuelve el acumulador para continuar el ciclo.
      return porUsuario;
    }, {});
  } catch (error) {
    // Propaga un error descriptivo para que la interfaz decida cómo mostrarlo.
    throw new Error(`No se pudieron listar las tareas pendientes: ${error.message}`);
  }
}

// Exporta la función para usarla desde el barril y desde las pruebas.
module.exports = { listarTareasPendientes };
