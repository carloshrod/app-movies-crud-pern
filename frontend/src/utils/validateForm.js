import { toast } from "react-toastify";

let regexUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\s+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\s+.~#?&=]*)/

export const validateForm = (form, file, moviesDb) => {
    if (!form.nombre || !form.idioma || !form.clasificacion ||
        !form.duracion || !form.fecha_estreno || !form.trailer ||
        !form.director || !form.sinopsis || !form.reparto || !file) {
        toast.error("Todos los campos son requeridos!!!")
        return false;
    }

    if (!regexUrl.test(form.trailer)) {
        toast.error("Por favor, ingresa una URL válida!!!")
        return false
    }

    const existingNombre = moviesDb.filter((movie) => movie.nombre === form.nombre)
    const existingTrailer = moviesDb.filter((movie) => movie.trailer === form.trailer)

    if (existingNombre.length > 0) {
        toast.error("Ya existe una película con ese nombre!!!")
        return false
    }

    if (existingTrailer.length > 0) {
        toast.error("Ya existe una película con ese trailer!!!")
        return false
    }

    return true;
}

export const validateFormEdit = (form, moviesDb) => {
    if (!form.nombre || !form.idioma || !form.clasificacion ||
        !form.duracion || !form.fecha_estreno || !form.trailer ||
        !form.director || !form.sinopsis || !form.reparto) {
        toast.error("Todos los campos son requeridos!!!")
        return false;
    }

    if (!regexUrl.test(form.trailer)) {
        toast.error("Por favor, ingresa una URL válida!!!")
        return false
    }

    const existingNombre = moviesDb.filter((movie) => movie.nombre === form.nombre)
    const existingTrailer = moviesDb.filter((movie) => movie.trailer === form.trailer)

    if (existingNombre.length > 0) {
        toast.error("Ya existe una película con ese nombre!!!")
        return false
    }

    if (existingTrailer.length > 0) {
        toast.error("Ya existe una película con ese trailer!!!")
        return false
    }

    return true;
}

