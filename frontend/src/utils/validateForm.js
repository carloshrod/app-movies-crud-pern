import { toastValidate } from "./toastCustom";

let regexUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\s+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\s+.~#?&=]*)/

export const validateForm = (form, file, moviesDb) => {
    if (!form.nombre || !form.idioma || !form.clasificacion ||
        !form.duracion || !form.fecha_estreno || !form.trailer ||
        !form.director || !form.sinopsis || !form.reparto || !file) {
        toastValidate("Todos los campos son requeridos!!!")
        return false;
    }

    if (!regexUrl.test(form.trailer)) {
        toastValidate("Por favor, ingresa una URL válida!!!")
        return false
    }

    const existingNombre = moviesDb.filter((movie) => movie.nombre === form.nombre)
    const existingTrailer = moviesDb.filter((movie) => movie.trailer === form.trailer)

    if (existingNombre.length > 0) {
        toastValidate("Ya existe una película con ese nombre!!!")
        return false
    }

    if (existingTrailer.length > 0) {
        toastValidate("Ya existe una película con ese trailer!!!")
        return false
    }

    return true;
}

export const validateFormEdit = (form, moviesDb, movieToEdit) => {
    if (!form.nombre || !form.idioma || !form.clasificacion ||
        !form.duracion || !form.fecha_estreno || !form.trailer ||
        !form.director || !form.sinopsis || !form.reparto) {
        toastValidate("Todos los campos son requeridos!!!")
        return false;
    }

    if (!regexUrl.test(form.trailer)) {
        toastValidate("Por favor, ingresa una URL válida!!!")
        return false
    }

    if ((movieToEdit.nombre !== form.nombre) || (movieToEdit.trailer !== form.trailer)) {
        const existingNombre = moviesDb.filter((movie) => movie.nombre === form.nombre)
        const existingTrailer = moviesDb.filter((movie) => movie.trailer === form.trailer)

        if (existingNombre.length > 0) {
            if (existingNombre[0].nombre !== movieToEdit.nombre) {
                toastValidate("Ya existe una película con ese nombre!!!")
                return false
            }
        }

        if (existingTrailer.length > 0) {
            if (existingTrailer[0].trailer !== movieToEdit.trailer) {
                toastValidate("Ya existe una película con ese trailer!!!")
                return false
            }
        }
    }

    return true;
}

