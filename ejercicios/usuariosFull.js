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
    // Indexa cada relación una sola vez para evitar filtros repetidos.
    const postsPorUsuario = new Map();
    const comentariosPorPost = new Map();
    const albumesPorUsuario = new Map();
    const fotosPorAlbum = new Map();
    // Agrupa publicaciones por el usuario propietario.
    posts.forEach((post) => {
      if (!postsPorUsuario.has(post.userId)) postsPorUsuario.set(post.userId, []);
      postsPorUsuario.get(post.userId).push(post);
    });
    // Agrupa comentarios por publicación.
    comentarios.forEach((comentario) => {
      if (!comentariosPorPost.has(comentario.postId)) comentariosPorPost.set(comentario.postId, []);
      comentariosPorPost.get(comentario.postId).push(comentario);
    });
    // Agrupa álbumes por usuario.
    albumes.forEach((album) => {
      if (!albumesPorUsuario.has(album.userId)) albumesPorUsuario.set(album.userId, []);
      albumesPorUsuario.get(album.userId).push(album);
    });
    // Agrupa fotos por álbum.
    fotos.forEach((foto) => {
      if (!fotosPorAlbum.has(foto.albumId)) fotosPorAlbum.set(foto.albumId, []);
      fotosPorAlbum.get(foto.albumId).push(foto);
    });
    // Construye una copia enriquecida de cada usuario.
    return usuarios.map((usuario) => ({
      ...usuario,
      posts: (postsPorUsuario.get(usuario.id) || []).map((post) => ({
        ...post,
        comments: comentariosPorPost.get(post.id) || []
      })),
      albums: (albumesPorUsuario.get(usuario.id) || []).map((album) => ({
        ...album,
        photos: fotosPorAlbum.get(album.id) || []
      }))
    }));
  } catch (error) {
    // Propaga el fallo con contexto suficiente para diagnosticarlo.
    throw new Error(`No se pudieron obtener los usuarios completos: ${error.message}`);
  }
}

// Exporta la función pública del ejercicio 5.
module.exports = { obtenerUsuariosFull };
