// Importa readline-sync para recibir datos desde la terminal.
const readline = require('readline-sync');
// Importa todas las funciones desde el archivo barril.
const ejercicios = require('./barrel');

// Muestra un encabezado consistente para cada resultado.
function mostrarTitulo(texto) {
  // Separa visualmente cada operación ejecutada.
  console.log(`\n=== ${texto} ===`);
}

// Ejecuta el ejercicio seleccionado por el usuario.
async function ejecutarOpcion(opcion) {
  // Decide qué función llamar según la opción elegida.
  switch (opcion) {
    case '1': {
      // Ejecuta la consulta de tareas pendientes.
      const resultado = await ejercicios.listarTareasPendientes();
      // Imprime el resultado agrupado por usuario.
      console.dir(resultado, { depth: null, colors: true });
      break;
    }
    case '2': {
      // Solicita el nombre de usuario para buscar.
      const nombre = readline.question('Escribe el username (ejemplo: Bret): ');
      // Ejecuta la consulta de usuario, álbumes y fotos.
      const resultado = await ejercicios.buscarUsuarioConAlbumes(nombre);
      // Informa si la búsqueda no produjo coincidencias.
      console.log(resultado ? JSON.stringify(resultado, null, 2) : 'No se encontró ese usuario.');
      break;
    }
    case '3': {
      // Solicita el nombre visible o username del usuario.
      const nombre = readline.question('Escribe el nombre o username (ejemplo: Leanne Graham): ');
      // Ejecuta la consulta de posts y comentarios.
      const resultado = await ejercicios.obtenerPostsConComentarios(nombre);
      // Informa si no hay publicaciones para ese nombre.
      console.log(resultado.length ? JSON.stringify(resultado, null, 2) : 'No se encontraron posts para ese usuario.');
      break;
    }
    case '4': {
      // Ejecuta la consulta de usuarios reducidos.
      const resultado = await ejercicios.obtenerUsuariosReducidos();
      // Muestra únicamente nombre y teléfono en formato de tabla.
      console.table(resultado);
      break;
    }
    case '5': {
      // Ejecuta la consulta completa de usuarios y relaciones.
      const resultado = await ejercicios.obtenerUsuariosFull();
      // Muestra el objeto completo con todos sus niveles.
      console.log(JSON.stringify(resultado, null, 2));
      break;
    }
    default:
      // Rechaza opciones fuera del menú.
      console.log('Opción inválida. Elige un número del 1 al 5.');
  }
}

// Muestra el menú y mantiene la aplicación activa hasta que se elija salir.
async function iniciarAplicacion() {
  // Controla si el ciclo interactivo debe continuar.
  let continuar = true;
  // Repite el menú hasta que el usuario seleccione 0.
  while (continuar) {
    // Presenta todas las opciones disponibles.
    mostrarTitulo('Evaluación JavaScript - JSONPlaceholder');
    console.log('1. Listar tareas pendientes por usuario');
    console.log('2. Buscar usuario y listar álbumes y fotos');
    console.log('3. Filtrar posts y agregar comentarios');
    console.log('4. Listar nombre y teléfono de usuarios');
    console.log('5. Obtener usuarios completos');
    console.log('0. Salir');
    // Lee la opción y elimina espacios laterales.
    const opcion = readline.question('\nSelecciona una opción: ').trim();
    // Sale sin hacer peticiones cuando corresponde.
    if (opcion === '0') {
      continuar = false;
      console.log('Programa finalizado.');
      continue;
    }
    // Ejecuta la opción dentro de un bloque de manejo de errores.
    try {
      await ejecutarOpcion(opcion);
    } catch (error) {
      // Muestra el error sin cerrar abruptamente el menú.
      console.error(`\nError: ${error.message}`);
    }
  }
}

// Inicia la aplicación únicamente cuando se ejecuta este archivo directamente.
if (require.main === module) iniciarAplicacion();

// Exporta las funciones de interfaz para facilitar pruebas automatizadas.
module.exports = { ejecutarOpcion, iniciarAplicacion };
