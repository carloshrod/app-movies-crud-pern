const { Router } = require('express');
const { getAllMovies, getMovie, createMovie,
    updateMovie, deleteMovie } = require('../controllers/movies.controller');
const { Upload } = require('../middlewares/fileUpload');

const router = Router();

router.get('/movies', getAllMovies)
router.post('/movies', Upload, createMovie)
router.put('/movies/:id', Upload, updateMovie)
router.delete('/movies/:id', deleteMovie)

exports.router = router;