import { useEffect, useState } from 'react';
import defaultImg from '../media/default-img.png';
import { validateForm, validateFormEdit } from '../utils/validateForm';
import { formDataCreateMovie, formDataUpdateMovie } from "../utils/formData";

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.id === null) {
            if (validateForm(form, file, moviesDb) === true) {
                const formData = new FormData();
                formDataCreateMovie(formData, form, file);
                createMovie(formData);
                setPathImage(defaultImg);
                setForm(initialForm);
            }
        } else {
            if (validateFormEdit(form, moviesDb, movieToEdit) === true) {
                const formData = new FormData();
                formDataUpdateMovie(formData, form, movieToEdit, file);
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