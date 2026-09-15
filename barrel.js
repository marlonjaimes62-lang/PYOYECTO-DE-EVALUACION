// Importa el ejercicio 1 desde su módulo independiente.
const { listarTareasPendientes } = require('./ejercicios/tarea');
// Importa el ejercicio 2 desde su módulo independiente.
const { buscarUsuarioConAlbumes } = require('./ejercicios/usuarioAlbumes');
// Importa el ejercicio 3 desde su módulo independiente.
const { obtenerPostsConComentarios } = require('./ejercicios/postComentarios');
// Importa el ejercicio 4 desde su módulo independiente.
const { obtenerUsuariosReducidos } = require('./ejercicios/usuariosReducidos');
// Importa el ejercicio 5 desde su módulo independiente.
const { obtenerUsuariosFull } = require('./ejercicios/usuariosFull');

// Exporta todas las funciones en un único objeto público.
module.exports = {
  listarTareasPendientes,
  buscarUsuarioConAlbumes,
  obtenerPostsConComentarios,
  obtenerUsuariosReducidos,
  obtenerUsuariosFull
};
