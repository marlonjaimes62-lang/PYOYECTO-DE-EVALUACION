// Define la URL base de los recursos de JSONPlaceholder.
const API_URL = 'https://jsonplaceholder.typicode.com';

// Valida el nombre usado para filtrar publicaciones.
function validarNombre(nombre) {
  // Rechaza entradas que no sean textos con contenido.
  if (typeof nombre !== 'string' || nombre.trim() === '') {
    throw new TypeError('El nombre debe ser un texto no vacío.');
  }
  // Devuelve el texto limpio para las comparaciones.
  return nombre.trim();
}

// Filtra publicaciones por nombre de usuario y agrega comentarios.
async function obtenerPostsConComentarios(nombre) {
  try {
    // Normaliza el nombre para comparar sin diferencias de mayúsculas.
    const nombreNormalizado = validarNombre(nombre).toLowerCase();
    // Solicita usuarios, publicaciones y comentarios al mismo tiempo.
    const respuestas = await Promise.all([
      fetch(`${API_URL}/users`),
      fetch(`${API_URL}/posts`),
      fetch(`${API_URL}/comments`)
    ]);
    // Detiene el flujo si algún recurso no respondió correctamente.
    respuestas.forEach((response) => {
      if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
    });
    // Convierte las respuestas en arreglos de objetos.
    const [usuarios, posts, comentarios] = await Promise.all(respuestas.map((response) => response.json()));
    // Busca al usuario por su nombre visible o nombre de usuario.
    const usuario = usuarios.find((item) => item.name.toLowerCase() === nombreNormalizado || item.username.toLowerCase() === nombreNormalizado);
    // Devuelve un arreglo vacío si no se encuentra el nombre solicitado.
    if (!usuario) return [];
    // Agrega únicamente los comentarios relacionados con cada publicación.
    return posts.filter((post) => post.userId === usuario.id).map((post) => ({
      ...post,
      comments: comentarios.filter((comentario) => comentario.postId === post.id)
    }));
  } catch (error) {
    // Entrega un error contextualizado al menú principal.
    throw new Error(`No se pudieron obtener posts y comentarios: ${error.message}`);
  }
}

// Exporta la función principal y su validador.
module.exports = { obtenerPostsConComentarios, validarNombre };
