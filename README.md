# Evaluación JavaScript con Node.js

Proyecto académico que consume [JSONPlaceholder](https://jsonplaceholder.typicode.com/) para resolver cinco ejercicios de asincronía, transformación y composición de datos.

## Requisitos

- Node.js 18 o superior, porque incluye `fetch` de forma nativa.
- npm con acceso a Internet para descargar `readline-sync`.

## Instalación y ejecución

```bash
npm install
npm start
```

También se puede comprobar la sintaxis con:

```bash
npm run check
```

## Menú

1. Lista tareas pendientes agrupadas por `userId`.
2. Solicita un `username` y devuelve sus álbumes con sus fotos.
3. Solicita un nombre o `username`, filtra sus posts y agrega comentarios.
4. Devuelve únicamente nombre y teléfono de todos los usuarios.
5. Devuelve cada usuario con posts, comentarios, álbumes y fotos.

Para salir, selecciona `0`.

## Estructura

- `app.js`: menú interactivo y presentación de resultados.
- `barrel.js`: punto único de exportación de los ejercicios.
- `ejercicios/`: módulos independientes de cada ejercicio.
- `evaluacion.md`: explicación técnica, validaciones y casos de prueba.

## API

Todos los módulos usan `fetch`, `async/await` y `try/catch`. Las peticiones múltiples se realizan con `Promise.all` para evitar esperas innecesarias. Los datos recibidos se transforman en objetos nuevos y no se mutan directamente.
