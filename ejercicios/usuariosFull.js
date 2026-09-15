// Define la URL base de la API remota.
const API_URL = 'https://jsonplaceholder.typicode.com';

// Solicita todos los usuarios con sus relaciones completas.
async function obtenerUsuariosFull() {
  try {
    // Solicita los cinco recursos en paralelo para reducir el tiempo total.
    const nombresRecursos = ['users', 'posts', 'comments', 'albums', 'photos'];
    // Ejecuta una petición fetch por cada recurso.
    const respuestas = await Promise.all(nombresRecursos.map((recurso) => fetch(`${API_URL}/${recurso}`)));
    // Comprueba el estado HTTP de cada respuesta.
    respuestas.forEach((response) => {
      if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
    });
    // Convierte todas las respuestas en arreglos JSON.
    const [usuarios, posts, comentarios, albumes, fotos] = await Promise.all(respuestas.map((response) => response.json()));
    // Construye una copia enriquecida de cada usuario.
    return usuarios.map((usuario) => ({
      ...usuario,
      posts: posts.filter((post) => post.userId === usuario.id).map((post) => ({
        ...post,
        comments: comentarios.filter((comentario) => comentario.postId === post.id)
      })),
      albums: albumes.filter((album) => album.userId === usuario.id).map((album) => ({
        ...album,
        photos: fotos.filter((foto) => foto.albumId === album.id)
      }))
    }));
  } catch (error) {
    // Propaga el fallo con contexto suficiente para diagnosticarlo.
    throw new Error(`No se pudieron obtener los usuarios completos: ${error.message}`);
  }
}

// Exporta la función pública del ejercicio 5.
module.exports = { obtenerUsuariosFull };
