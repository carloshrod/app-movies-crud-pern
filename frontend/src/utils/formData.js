export const formDataCreateMovie = (formData, form, file) => {
    formData.append("nombre", form.nombre)
    formData.append("idioma", form.idioma)
    formData.append("clasificacion", form.clasificacion)
    formData.append("duracion", form.duracion)
    formData.append("fecha_estreno", form.fecha_estreno)
    formData.append("trailer", form.trailer)
    formData.append("director", form.director)
    formData.append("sinopsis", form.sinopsis)
    formData.append("reparto", form.reparto)
    formData.append("imagen", file) // Archivo de imágen
}

export const formDataUpdateMovie = (formData, form, movieToEdit, file) => {
    formData.append("nombre", form.nombre)
    formData.append("idioma", form.idioma)
    formData.append("clasificacion", form.clasificacion)
    formData.append("duracion", form.duracion)
    formData.append("fecha_estreno", form.fecha_estreno)
    formData.append("trailer", form.trailer)
    formData.append("director", form.director)
    formData.append("sinopsis", form.sinopsis)
    formData.append("reparto", form.reparto)
    formData.append("imgUrl", movieToEdit.poster_url)
    formData.append("imgId", movieToEdit.poster_id)
    formData.append("imagen", file) // Archivo de imágen
}