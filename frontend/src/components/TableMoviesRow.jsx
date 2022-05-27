import { Link, useLocation } from 'react-router-dom';

const TableMoviesRow = ({ movie, nro_registro, setMovieToEdit, deleteMovie }) => {
    let { id, nombre, clasificacion, fecha_estreno } = movie || {};
    const location = useLocation()

    return (
        <tr>
            <th className="align-middle">{nro_registro}</th>
            <td className="align-middle">{nombre}</td>
            <td className="align-middle">{clasificacion}</td>
            <td className="align-middle d-none d-sm-table-cell">{fecha_estreno}</td>
            <td className="align-middle">
                <Link
                    to={`edit/${id}`}
                >
                    <button
                        data-tip data-for="toolTipEdit"
                        type="button"
                        className="btn btn-success me-1"
                        onClick={() => { setMovieToEdit(movie) }}
                    >
                        <i className="fa-solid fa-pen"/>
                    </button>
                </Link >
                <Link to={location.search}>
                    <button
                        data-tip data-for="toolTipDelete"
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteMovie(id, nombre)}
                    >
                        <i className="fa-solid fa-trash-can" />
                    </button>
                </Link>
            </td>
        </tr>
    );
};

export default TableMoviesRow;
