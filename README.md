# CineClub

CineClub es una aplicación web fullstack que permite buscar películas utilizando la API de TMDB y agregar reseñas con un puntaje del 1 al 5.

El proyecto está dividido en un frontend desarrollado con React y Vite, y un backend desarrollado con Node.js y Express. El frontend se comunica con el backend, y el backend es el encargado de consultar la API de TMDB.

## Tecnologías utilizadas

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* Node.js
* Express
* Morgan
* CORS
* Dotenv
* API de TMDB

## Estructura del proyecto

```text
CineClub/
├── backend/
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

## Instalación

Primero se deben instalar las dependencias del backend y del frontend por separado.

### Backend

Ingresar a la carpeta `backend`:

```bash
cd backend
npm install
```

Creamos un archivo `.env` dentro de la carpeta `backend`:

```env
TMDB_API_KEY=tu_api_key
PORT=3001
```

La API key de TMDB se obtiene desde la cuenta de TMDB.

El archivo `.env` no debe subirse al repositorio.

Para iniciar el backend:

```bash
npm start
```

El servidor se ejecuta en el puerto indicado en `PORT`. Si no se especifica, utiliza el puerto `3001`.

### Frontend

Desde la carpeta `frontend`:

```bash
cd frontend
npm install
```

Crear un archivo `.env` dentro de `frontend`:

```env
VITE_API_URL=http://localhost:3001
```

Para iniciar el frontend:

```bash
npm run dev
```

Vite mostrará en la terminal la dirección local donde se puede acceder a la aplicación.

## Funcionamiento

La aplicación cuenta con dos vistas principales.

### Búsqueda

El usuario puede ingresar el nombre de una película y presionar el botón de búsqueda.

El frontend envía una solicitud al backend:

```text
React → Express → TMDB
```

El backend consulta TMDB y devuelve los resultados al frontend.

En cada resultado se muestra:

* Poster
* Título
* Descripción
* Año
* Promedio de reseñas

### Detalle de película

Al seleccionar una película se muestran sus datos, sus reseñas y el promedio de puntuación.

También se puede agregar una nueva reseña indicando:

* Autor
* Puntaje entre 1 y 5
* Comentario

Las reseñas se almacenan en memoria en el backend, por lo que se pierden al reiniciar el servidor.

## Endpoints principales

### Buscar películas

```http
GET /api/movies/search?q=nombre
```

Busca películas mediante la API de TMDB.

### Obtener una película

```http
GET /api/movies/:id
```

Obtiene los datos de una película junto con sus reseñas y promedio de puntuación.

Si la película no existe, el backend responde con `404`.

### Crear una reseña

```http
POST /api/movies/:id/reviews
```

Ejemplo de cuerpo:

```json
{
  "author": "Eugenia",
  "score": 5,
  "comment": "Muy buena película"
}
```

Los campos `author`, `score` y `comment` son obligatorios.

El `score` debe ser un número entre 1 y 5.

## Notas

La API key de TMDB se configura mediante variables de entorno y no se encuentra escrita directamente en el código.

Las reseñas se almacenan temporalmente en memoria y no utilizan una base de datos.
