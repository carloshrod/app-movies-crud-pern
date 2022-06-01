import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './App.css';
import Container from "./components/Container";
import Form from "./components/Form";
import Loader from './components/Loader';
import Navbar from "./components/Navbar";
import Table from './components/Table';
import { helpHttp } from './helpers/helpHttp';
import { useCrudUsers } from './services/useCrud';

function App({ screen }) {
  const [moviesDb, setMoviesDb] = useState([])
  const [movieToEdit, setMovieToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  let api = helpHttp();

  useEffect(() => {
    setLoading(true);
    api.get(`http://localhost:8080/movies`)
      .then((res) => {
        if (res.estado) {
          if (res.movies) {
            setMoviesDb(res.movies);
          } else {
            toast.error("Error, no hay conexión con la Base de Datos!!!", { toastId: "serverError" });
          }
        } else {
          toast.error("Error, no hay conexión con el servidor!!!", { toastId: "serverError" });
        }
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    createMovie,
    updateMovie,
    deleteMovie
  } = useCrudUsers(moviesDb, setMoviesDb)


  return (
    <>
      <Navbar />
      <Container
        title={screen}
      >
        {screen === "Listado de Películas" &&
          <Table
            movies={moviesDb}
            loader={loading && <Loader />}
            setMovieToEdit={setMovieToEdit}
            deleteMovie={deleteMovie}
          />
        }
        {screen === "Crear Película" &&
          <Form 
          createMovie={createMovie} 
          setMovieToEdit={setMovieToEdit} 
          btnText="Crear"
          />
        }
        {screen === "Editar Película" &&
          <Form 
          updateMovie={updateMovie} 
          movieToEdit={movieToEdit} 
          setMovieToEdit={setMovieToEdit} 
          btnText="Editar"
          />
        }
      </Container>
    </>
  );
}

export default App;
