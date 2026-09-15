# Documento técnico de evaluación

## 1. Propósito del proyecto

La aplicación demuestra consumo de una API REST con Node.js, uso de `fetch`, programación asíncrona con `async/await`, manejo de errores, validación de entradas, transformación de arreglos y composición de relaciones entre recursos. La fuente de datos es JSONPlaceholder.

## 2. Propósito de variables y funciones

### `ejercicios/tarea.js`

- `API_URL`: texto constante con la dirección base de la API.
- `listarTareasPendientes()`: función asíncrona sin parámetros que retorna un objeto cuyas claves son `userId` y cuyos valores son arreglos de tareas con `completed: false`.
- `response`: respuesta HTTP de `fetch`.
- `tareas`: arreglo recibido desde `/todos`.
- `pendientes`: arreglo filtrado de tareas incompletas.
- `porUsuario`: acumulador creado por `reduce`.

### `ejercicios/usuarioAlbumes.js`

- `API_URL`: dirección base del servicio.
- `validarNombreUsuario(nombreUsuario)`: valida que el parámetro sea texto no vacío y retorna el texto sin espacios exteriores.
- `buscarUsuarioConAlbumes(nombreUsuario)`: función asíncrona que retorna un usuario con `albums` y `photos`, o `null` si no existe.
- `nombreNormalizado`: texto usado para comparación sin diferenciar mayúsculas.
- `respuestas`: arreglo de respuestas HTTP para usuarios, álbumes y fotos.
- `albumesDelUsuario`: álbumes cuyo `userId` coincide con el usuario encontrado.

### `ejercicios/postComentarios.js`

- `validarNombre(nombre)`: valida y limpia el nombre de búsqueda.
- `obtenerPostsConComentarios(nombre)`: función asíncrona que retorna posts del usuario, cada uno con su arreglo `comments`; retorna `[]` si no existe.
- `usuarios`, `posts`, `comentarios`: arreglos deserializados de la API.
- `usuario`: usuario cuyo `name` o `username` coincide.

### `ejercicios/usuariosReducidos.js`

- `obtenerUsuariosReducidos()`: función asíncrona sin parámetros que retorna un arreglo de `{ name, phone }`.
- `usuarios`: arreglo original de usuarios.
- `name`, `phone`: propiedades seleccionadas mediante desestructuración.

### `ejercicios/usuariosFull.js`

- `nombresRecursos`: arreglo con los cinco endpoints requeridos.
- `respuestas`: respuestas HTTP obtenidas con `Promise.all`.
- `obtenerUsuariosFull()`: función asíncrona sin parámetros que retorna usuarios con `posts`, `comments`, `albums` y `photos` anidados.
- `usuarios`, `posts`, `comentarios`, `albumes`, `fotos`: colecciones deserializadas.

### Archivos de integración

- `barrel.js`: importa y exporta las cinco funciones en un objeto único llamado implícitamente por `module.exports`.
- `app.js`: `mostrarTitulo` imprime encabezados; `ejecutarOpcion` selecciona un ejercicio; `iniciarAplicacion` controla el ciclo del menú.
- `readline`: instancia de `readline-sync` para leer opciones y nombres.
- `continuar`: booleano que controla la repetición del menú.

## 3. Tipos de datos y validaciones

- `API_URL`, nombres y mensajes: `string`.
- Respuestas, usuarios, tareas, posts, comentarios, álbumes y fotos: `object` dentro de arreglos.
- `completed`: `boolean`.
- Identificadores (`id`, `userId`, `postId`, `albumId`): `number`.
- `continuar`: `boolean`.
- `validarNombre` y `validarNombreUsuario` rechazan valores que no sean `string` o que estén vacíos.
- Las funciones verifican `response.ok`; ante un estado HTTP no exitoso lanzan un error contextualizado.
- La búsqueda sin coincidencias devuelve `null` (ejercicio 2) o `[]` (ejercicio 3), valores definidos y fáciles de consumir.

## 4. Procesos, condicionales, ciclos y funciones

1. `fetch` realiza solicitudes HTTP.
2. `await response.json()` deserializa cada respuesta.
3. `Promise.all` ejecuta peticiones independientes en paralelo.
4. `filter` selecciona tareas pendientes, álbumes, posts, comentarios y fotos relacionados.
5. `map` proyecta usuarios reducidos y construye objetos enriquecidos.
6. `reduce` agrupa tareas por usuario.
7. `find` localiza un usuario por nombre.
8. `if` valida respuestas, entradas y resultados vacíos.
9. `switch` selecciona una opción del menú.
10. `while` mantiene el menú hasta seleccionar `0`.
11. `try/catch` maneja errores de red, HTTP y validación.

## 5. Mutabilidad e inmutabilidad

Los arreglos devueltos por la API no se modifican directamente. `filter`, `map` y `reduce` producen estructuras nuevas; el operador spread (`...`) copia usuarios, posts y álbumes antes de agregar relaciones. `push` aparece únicamente sobre el acumulador nuevo de `reduce`, nunca sobre el arreglo original recibido. Las constantes de configuración se declaran con `const`.

## 6. Parámetros y tipos de retorno

| Función | Parámetros | Retorno exitoso | Retorno alternativo |
| --- | --- | --- | --- |
| `listarTareasPendientes` | ninguno | `Promise<Object>` | `Promise` rechazada con `Error` |
| `buscarUsuarioConAlbumes` | `nombreUsuario: string` | `Promise<Object>` | `Promise<null>` o `Error` |
| `obtenerPostsConComentarios` | `nombre: string` | `Promise<Array<Object>>` | `Promise<Array>` vacía o `Error` |
| `obtenerUsuariosReducidos` | ninguno | `Promise<Array<Object>>` | `Promise` rechazada con `Error` |
| `obtenerUsuariosFull` | ninguno | `Promise<Array<Object>>` | `Promise` rechazada con `Error` |

## 7. Casos de prueba

Los siguientes casos pueden ejecutarse desde una consola Node después de `npm install`:

```js
const {
  buscarUsuarioConAlbumes,
  obtenerPostsConComentarios,
  obtenerUsuariosReducidos
} = require('./barrel');

buscarUsuarioConAlbumes('Bret').then((resultado) => console.log(resultado.username));
obtenerPostsConComentarios('Leanne Graham').then((resultado) => console.log(resultado.length));
obtenerUsuariosReducidos().then((resultado) => console.log(resultado[0]));
```

| Caso | Entrada | Resultado esperado |
| --- | --- | --- |
| Válido 1 | ejercicio 1 sin parámetros | Objeto con tareas pendientes agrupadas por usuario. |
| Válido 2 | `Bret` | Usuario `Bret` con álbumes y fotos. |
| Válido 3 | `Leanne Graham` | Posts de Leanne, cada uno con comentarios. |
| Válido 4 | ejercicio 4 sin parámetros | Diez objetos que contienen solo `name` y `phone`. |
| Válido 5 | ejercicio 5 sin parámetros | Diez usuarios con sus cuatro niveles de relaciones. |
| Inválido 1 | nombre vacío en ejercicio 2 | Error de validación: texto no vacío. |
| Inválido 2 | `UsuarioInexistente` | `null` en ejercicio 2 y `[]` en ejercicio 3. |
| Inválido 3 | opción `9` en el menú | Mensaje de opción inválida, sin petición HTTP. |
| Inválido 4 | API sin conexión o estado HTTP fallido | Error contextualizado desde `catch`. |

## 8. Git y ramas

La rama `main` representa la versión estable. `develop` integra el desarrollo y cada rama `feature/*` corresponde a un ejercicio. Los commits recomendados son descriptivos, por ejemplo:

- `chore: inicializa proyecto Node.js`
- `feat: agrega listado de tareas pendientes`
- `feat: agrega usuario con albumes y fotos`
- `feat: agrega posts con comentarios`
- `feat: agrega usuarios reducidos`
- `feat: agrega usuarios completos`
- `docs: documenta evaluación y casos de prueba`

El repositorio publicado contiene esas ramas y un commit descriptivo de implementación. Para continuar el flujo, los cambios deben realizarse en la rama `feature/*`, documentarse con un commit `feat: ...`, integrarse en `develop` y promoverse a `main` mediante pull request. En Windows, `chcp 65001` configura la consola en UTF-8 cuando los acentos no se muestran correctamente.
