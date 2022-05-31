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

const Form = ({ moviesDb, createMovie, updateMovie, movieToEdit, setMovieToEdit, btnText }) => {

    const {
        form,
        pathImage,
        handleChange,
        onChangeFile,
        handleSubmit
    } = useForm(initialForm, moviesDb, createMovie, updateMovie, movieToEdit, setMovieToEdit);

    return (
        <form className="row g-3 needs-validation d-flex justify-content-center align-items-center" encType="multipart/form-data" onSubmit={handleSubmit} noValidate>
            <div className="col-md-6 text-center">
                <div className="pt-3">
                    <img src={pathImage} alt="poster" className="img-fluid poster mb-2" />
                </div>
                <div className="pb-3">
                    <label className="btn btn-success m-1">
                        <input type="file" name="imagen" onChange={onChangeFile} />
                        <i className="fa-solid fa-arrow-up-from-bracket" />
                    </label>
                </div>
            </div>
            <div className="row col-md-6">
                {inputMovies.map((input) => (
                    <InputForm
                        key={input.id}
                        type={input.type}
                        {...input}
                        value={form[input.name]}
                        onChange={handleChange}
                    />
                ))}
            </div>
            <div className="row">
                <div className="col-11 col-md-5 m-auto p-2">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">
                        Sinopsis
                    </label>
                    <textarea name="sinopsis" className="form-control" id="exampleFormControlTextarea1" rows="5"
                        value={form.sinopsis} onChange={handleChange} />
                </div>
                <div className="col-11 col-md-5 m-auto p-2">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">
                        Reparto
                    </label>
                    <textarea name="reparto" className="form-control" id="exampleFormControlTextarea1" rows="5"
                        value={form.reparto} onChange={handleChange} />
                </div>
            </div>
            <div className="d-flex align-items-center col-5 col-sm-3 col-md-3 col-lg-3 m-auto mt-3 mb-1">
                <button className="btn btn-success w-100" type="submit">
                    {btnText}
                </button>
            </div>
        </form>
    )
}

export default Form