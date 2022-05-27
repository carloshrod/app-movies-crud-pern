const pool = require('../db');
const fs = require('fs-extra');
const { uploadImage, deleteImage } = require('../utils/cloudinary');

const getAllMovies = async (req, res) => {
    try {
        const allMovies = await pool.query('SELECT * FROM movies');
        res.json({ estado: "ok", movies: allMovies.rows })
    } catch (error) {
        res.json({ estado: "error", error: error.message })
    }
};

const createMovie = async (req, res) => {
    const { nombre, idioma, clasificacion, duracion, fecha_estreno,
        trailer, sinopsis, director, reparto } = req.body
    try {
        const image = req.files?.imagen && await uploadImage(req.files.imagen.tempFilePath)
        await fs.unlink(req.files.imagen.tempFilePath)
        const poster_url = image.secure_url || ""
        const poster_id = image.public_id || ""
        const result = await pool.query(
            `INSERT INTO movies (nombre, idioma, clasificacion, duracion, fecha_estreno, 
                trailer, sinopsis, director, reparto, poster_url, poster_id) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
            [
                nombre, idioma, clasificacion, duracion, fecha_estreno, trailer, sinopsis,
                director, reparto, poster_url, poster_id
            ]);
        res.json({ estado: "ok", msg: "Película creada con éxito!!!", movie: result.rows[0] })
    } catch (error) {
        res.json({ estado: "error", msg: error.message })
    }
};

const updateMovie = async (req, res) => {
    const { id } = req.params
    const { nombre, idioma, clasificacion, duracion, fecha_estreno,
        trailer, sinopsis, director, reparto, imgUrl, imgId } = req.body
    try {
        const image = req.files?.imagen && await uploadImage(req.files.imagen.tempFilePath)
        if (req.files?.imagen) {
            await fs.unlink(req.files.imagen.tempFilePath)
            await deleteImage(imgId);
        }
        const poster_url = req.files?.imagen ? image.secure_url : imgUrl
        const poster_id = req.files?.imagen ? image.public_id : imgId
        const result = await pool.query(
            `UPDATE movies SET nombre = $1, idioma = $2, clasificacion = $3, duracion = $4, fecha_estreno = $5,
            trailer = $6, sinopsis = $7, director = $8, reparto = $9, poster_url = $10, poster_id = $11
             WHERE id = $12 RETURNING *`,
            [
                nombre, idioma, clasificacion, duracion, fecha_estreno,
                trailer, sinopsis, director, reparto, poster_url, poster_id, id
            ]
        )
        if (result.rowCount === 0)
            return res.status(404).json({
                message: "Película no encontrada!!!"
            })
        res.json({ estado: "ok", msg: "Película editada con éxito!!!", movie: result.rows[0] })
    } catch (error) {
        res.json({ estado: "error", msg: error.message })
    }
}

const deleteMovie = async (req, res) => {
    const { id } = req.params
    try {
        const imgId = await pool.query('SELECT poster_id FROM movies WHERE id = $1', [id])
        await deleteImage(imgId.rows[0].poster_id)
        const result = await pool.query('DELETE FROM movies WHERE id = $1', [id])
        if (result.rowCount === 0)
            return res.status(404).json({
                message: "Película no encontrada!!!"
            })
        res.json({ estado: "ok", msg: "Película eliminada con éxito!!!" })
    } catch (error) {
        res.json({ estado: "error", error: error.message })
    }
}

module.exports = {
    getAllMovies,
    createMovie,
    updateMovie,
    deleteMovie
}