const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { router } = require('./routes/movies.routes');
require("dotenv").config();

const app = express();
const PORT = 8080;

//Middlewares:
app.use(morgan("dev"))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router:
app.use(router)

// Error middleware:
app.use((error, req, res, next) => {
    return res.json({ estado: "error", msg: error.message })
})

// Iniciar servidor:
app.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}!!!`);
})
