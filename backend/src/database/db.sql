CREATE DATABASE moviesdb

CREATE TABLE movies(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) UNIQUE NOT NULL,
    idioma VARCHAR(255) NOT NULL,
    clasificacion VARCHAR(255) NOT NULL,
    duracion INT NOT NULL,
    fecha_estreno VARCHAR(255) NOT NULL,
    trailer VARCHAR(255) UNIQUE NOT NULL,
    sinopsis TEXT NOT NULL,
    director VARCHAR(255) NOT NULL,
    reparto TEXT NOT NULL,
    poster_url TEXT NOT NULL,
    poster_id TEXT NOT NULL,
);