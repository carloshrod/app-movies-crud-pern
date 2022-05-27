import { inputMovies } from '../utils/inputProps';
import InputForm from './InputForm';
import { useForm } from '../hooks/useForm';

const initialForm = {
    id: null,
    nombre: "",
    idioma: "",
    clasificacion: "",
    duracion: "",
    fecha_estreno: "",
    trailer: "",
    sinopsis: "",
    director: "",
    reparto: "",
}

const Form = ({ moviesDb, createMovie, updateMovie, movieToEdit, setMovieToEdit }) => {

    const {
        form,
        pathImage,
        handleChange,
        onChangeFile,
        handleSubmit
    } = useForm(initialForm, moviesDb, createMovie, updateMovie, movieToEdit, setMovieToEdit);

    return (
        <form className="row g-3 needs-validation" encType="multipart/form-data" onSubmit={handleSubmit} noValidate>
            <div className="col-12 text-center mb-3">
                <div>
                    <img src={pathImage} alt="poster" className="img-fluid poster mb-2" />
                </div>
                <label className="btn btn-success m-1">
                    <input type="file" name="imagen" onChange={onChangeFile} />
                    <i className="fa-solid fa-arrow-up-from-bracket" />
                </label>
            </div>
            {inputMovies.map((input) => (
                <InputForm
                    key={input.id}
                    type={input.type}
                    {...input}
                    value={form[input.name]}
                    onChange={handleChange}
                />
            ))}
            <div className="col-10 col-md-5 col-lg-5 m-auto mt-2 mb-2">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">
                    Sinopsis
                </label>
                <textarea name="sinopsis" className="form-control" id="exampleFormControlTextarea1" rows="5"
                    value={form.sinopsis} onChange={handleChange} />
            </div>
            <div className="col-10 col-md-5 col-lg-5 m-auto mt-2 mb-2">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">
                    Reparto
                </label>
                <textarea name="reparto" className="form-control" id="exampleFormControlTextarea1" rows="5"
                    value={form.reparto} onChange={handleChange} />
            </div>
            <div className="col-5 col-sm-3 col-md-2 col-lg-3 m-auto mt-4">
                <button className="btn btn-success w-100" type="submit">
                    Crear
                </button>
            </div>
        </form>
    )
}

export default Form