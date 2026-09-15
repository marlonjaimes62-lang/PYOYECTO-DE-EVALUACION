// Define la URL base de la API.
const API_URL = 'https://jsonplaceholder.typicode.com';

// Valida y normaliza el nombre de usuario recibido desde teclado.
function validarNombreUsuario(nombreUsuario) {
  // Exige un texto no vacío para evitar consultas ambiguas.
  if (typeof nombreUsuario !== 'string' || nombreUsuario.trim() === '') {
    throw new TypeError('El nombre de usuario debe ser un texto no vacío.');
  }
  // Elimina espacios accidentales en los extremos.
  return nombreUsuario.trim();
}

// Busca un usuario por nombre y adjunta sus álbumes y fotos.
async function buscarUsuarioConAlbumes(nombreUsuario) {
  try {
    // Normaliza la entrada antes de comparar datos.
    const nombreNormalizado = validarNombreUsuario(nombreUsuario).toLowerCase();
    // Solicita usuarios, álbumes y fotos en paralelo.
    const respuestas = await Promise.all([
      fetch(`${API_URL}/users`),
      fetch(`${API_URL}/albums`),
      fetch(`${API_URL}/photos`)
    ]);
    // Comprueba todas las respuestas HTTP antes de leerlas.
    respuestas.forEach((response) => {
      if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
    });
    // Convierte las tres respuestas en arreglos.
    const [usuarios, albumes, fotos] = await Promise.all(respuestas.map((response) => response.json()));
    // Localiza al usuario sin distinguir mayúsculas de minúsculas.
    const usuario = usuarios.find((item) => item.username.toLowerCase() === nombreNormalizado);
    // Informa claramente cuando no existe coincidencia.
    if (!usuario) return null;
    // Selecciona los álbumes pertenecientes al usuario.
    const albumesDelUsuario = albumes.filter((album) => album.userId === usuario.id);
    // Devuelve un objeto nuevo con fotos dentro de cada álbum.
    return {
      ...usuario,
      albums: albumesDelUsuario.map((album) => ({
        ...album,
        photos: fotos.filter((foto) => foto.albumId === album.id)
      }))
    };
  } catch (error) {
    // Conserva el motivo original dentro de un error de dominio.
    throw new Error(`No se pudo consultar el usuario y sus álbumes: ${error.message}`);
  }
}

// Exporta la función y la validación para facilitar pruebas unitarias.
module.exports = { buscarUsuarioConAlbumes, validarNombreUsuario };
