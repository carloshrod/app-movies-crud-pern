import { useNavigate, useParams } from 'react-router-dom';
import { helpHttp } from '../helpers/helpHttp';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

export const useCrudUsers = (moviesDb, setMoviesDb) => {
    let api = helpHttp();
    const navigate = useNavigate()
    const { id } = useParams()

    const createMovie = async (formData) => {
        let endpoint = "http://localhost:8080/movies"
        let options = {
            body: formData,
        }
        const res = await api.post(endpoint, options);
        console.log(res)
        if (!res.estado) {
            toast.error("Error, no hay conexión con el servidor!!!")
        } else {
            if (res.movie) {
                setMoviesDb([...moviesDb, res.movie])
                toast.success(res.msg)
            } else {
                toast.error(res.msg)
            }
        }
    };

    const updateMovie = async (formData) => {
        let endpoint = "http://localhost:8080/movies/" + id
        let options = {
            body: formData,
        }
        const res = await api.put(endpoint, options);
        console.log(res)
        if (!res.estado) {
            toast.error("Error, no hay conexión con el servidor!!!")
        } else {
            if (res.movie) {
                let newData = moviesDb.map((e) => (e.id === res.movie.id ? res.movie : e))
                setMoviesDb(newData);
                toast.success(res.msg)
                navigate("/", { replace: true })
            } else {
                toast.error(res.msg)
            }
        }
    };

    const deleteMovie = (id, nombre) => {
        Swal.fire({
            html: `¿Estás seguro que quieres eliminar la película <b>${nombre}</b> con ID <b>${id}</b>?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0b295e',
            cancelButtonColor: '#be0d1f',
            confirmButtonText: 'Sí, aceptar',
            cancelButtonText: 'Cancelar'
        }).then((res) => {
            if (res.isConfirmed) {
                let endpoint = "http://localhost:8080/movies/" + id;
                api.del(endpoint).then((res) => {
                    if (!res.estado) {
                        toast.error("Error, no hay conexión con el servidor!!!")
                    } else {
                        if (res.estado === "ok") {
                            let newData = moviesDb.filter((el) => el.id !== id);
                            setMoviesDb(newData);
                            toast.success(res.msg)
                        } else {
                            toast.error(res.msg)
                        }
                    }
                })
            }
        })
    };

    return {
        createMovie,
        updateMovie,
        deleteMovie
    }
}

