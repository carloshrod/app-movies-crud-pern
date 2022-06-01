import { useNavigate, useParams } from 'react-router-dom';
import { helpHttp } from '../helpers/helpHttp';
import Swal from 'sweetalert2';
import { errorMsg } from '../utils/errorMsgCustom';
import { toastLoading, toastUpdate } from '../utils/toastCustom';

export const useCrudUsers = (moviesDb, setMoviesDb) => {
    let api = helpHttp();
    const navigate = useNavigate()
    const { id } = useParams()

    const createMovie = async (formData) => {
        let endpoint = "http://localhost:8080/movies"
        let options = {
            body: formData,
        }
        const loading = toastLoading()
        const res = await api.post(endpoint, options);
        console.log(res)
        if (!res.estado) {
            toastUpdate(loading, "Error, no hay conexión con el servidor!!!", "error", "colored", false)
        } else {
            if (res.movie) {
                setMoviesDb([...moviesDb, res.movie])
                toastUpdate(loading, res.msg, "success")
            } else {
                toastUpdate(loading, errorMsg(res.msg), "error")
            }
        }
    };

    const updateMovie = async (formData) => {
        let endpoint = "http://localhost:8080/movies/" + id
        let options = {
            body: formData,
        }
        const loading = toastLoading()
        const res = await api.put(endpoint, options);
        console.log(res)
        if (!res.estado) {
            toastUpdate(loading, "Error, no hay conexión con el servidor!!!", "error", "colored", false)
        } else {
            if (res.movie) {
                let newData = moviesDb.map((e) => (e.id === res.movie.id ? res.movie : e))
                setMoviesDb(newData);
                toastUpdate(loading, res.msg, "success")
                navigate("/", { replace: true })
            } else {
                toastUpdate(loading, errorMsg(res.msg), "error")
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
                const loading = toastLoading()
                api.del(endpoint).then((res) => {
                    if (!res.estado) {
                        toastUpdate(loading, "Error, no hay conexión con el servidor!!!", "error", "colored", false)
                    } else {
                        if (res.estado === "ok") {
                            let newData = moviesDb.filter((el) => el.id !== id);
                            setMoviesDb(newData);
                            toastUpdate(loading, res.msg, "success")
                        } else {
                            toastUpdate(loading, errorMsg(res.msg), "error")
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

