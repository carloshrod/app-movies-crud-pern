import { useEffect, useState } from 'react';
import defaultImg from '../media/default-img.png';
import { validateForm, validateFormEdit } from '../utils/validateForm';

export const useForm = (initialForm, moviesDb, createMovie, updateMovie, movieToEdit, setMovieToEdit) => {
    const [form, setForm] = useState(initialForm);
    const [file, setFile] = useState("");
    const [pathImage, setPathImage] = useState(defaultImg)

    useEffect(() => {
        if (movieToEdit) {
            setPathImage(movieToEdit.poster_url || defaultImg)
            setForm(movieToEdit);
        } else {
            setPathImage(defaultImg)
            setForm(initialForm);
        }
    }, [movieToEdit, initialForm]);

    const onChangeFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const image = e.target.files[0];
            if (image.type.includes("image")) {
                const reader = new FileReader()
                reader.readAsDataURL(image)
                reader.onload = function load() {
                    setPathImage(reader.result)
                }
                setFile(image)
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    };

    const handleReset = (e) => {
        setForm(initialForm);
        setMovieToEdit(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.id === null) {
            if (validateForm(form, file) === true) {
                const formData = new FormData();
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
                createMovie(formData);
                handleReset();
            }
        } else {
            if (validateFormEdit(form) === true) {
                const formData = new FormData();
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
                updateMovie(formData);
            }
        }
    };

    return {
        form,
        pathImage,
        handleChange,
        onChangeFile,
        handleSubmit
    }
}