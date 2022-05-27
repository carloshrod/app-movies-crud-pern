import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TableMoviesRow from "./TableMoviesRow";
import ReactPaginate from 'react-paginate';

export const initialForm = {
    select: 10
}

const Table = ({ movies, loader, setMovieToEdit, deleteMovie }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const filter = searchParams.get("filter") ?? "";
    const [pageNumber, setPageNumber] = useState(0);
    const [moviesPerPage, setMoviesPerPage] = useState(initialForm);
    const firstItemShowedPerPage = pageNumber * moviesPerPage.select;
    const lastItemShowedPerPage = firstItemShowedPerPage + moviesPerPage.select;

    const tableHeaders = ["#", "Nombre", "Clasificación", "Fecha de Estreno", ""]

    const handleInputChange = (event) => {
        setMoviesPerPage({
            [event.target.name]: parseInt(event.target.value)
        })
    }

    const selectRef = useRef();

    const handleFilter = (e) => {
        setSearchParams({ filter: e.target.value })
    }

    // Filtrar películas:
    const filterMovies = movies.filter((movie) => {
        return (movie.clasificacion.toLowerCase().includes(filter.toLowerCase()) ||
            movie.idioma.toLowerCase().includes(filter.toLowerCase()) ||
            movie.fechaestreno.toLowerCase().includes(filter.toLowerCase()))
    })

    // Mostrar películas:
    const displayMovies = filterMovies.slice(firstItemShowedPerPage, lastItemShowedPerPage).map((movie, index) => {
        return (
            <TableMoviesRow
                key={movie.id}
                nro_registro={index + 1 + firstItemShowedPerPage}
                movie={movie}
                setMovieToEdit={setMovieToEdit}
                deleteMovie={deleteMovie}
            />
        )
    });

    const pageCount = () => {
        if (!filter) return Math.ceil(movies.length / moviesPerPage.select);
        return Math.ceil(filterMovies.length / moviesPerPage.select);
    }

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    const range = () => {
        if (!filter) return movies.length;
        return filterMovies.length
    }

    return (
        <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
            <div className="dataTable-top mb-2">
                <div className="col-4 col-sm-6 col-md-4 dataTable-dropdown">
                    <select name="select" ref={selectRef} className="dataTable-selector text-center" value={moviesPerPage.select} onChange={handleInputChange}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value={movies.length}>Todos</option>
                    </select>
                    <label className="table-labels"> Usuarios por página</label>
                </div>

                <div className="col-4 col-sm-6 col-md-4 dataTable-search">
                    <input
                        data-tip
                        className="col-12 col-sm-7 col-md-7 col-lg-8 dataTable-input"
                        placeholder="Filtrar..." type="text" value={filter}
                        onChange={handleFilter}
                    />
                    <label className="table-labels">{range()} {range() === 1 ? "Usuario" : "Usuarios"}</label>
                </div>
            </div>

            <div className="dataTable-container">
                <table className="table datatable table-hover text-center">
                    <thead>
                        <tr>
                            {tableHeaders.map((header) => (
                                <th key={header}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {movies.length > 0 ?
                            <>
                                {displayMovies}
                            </>
                            : (
                                <tr>
                                    <td colSpan={6}>
                                        <h2 className="text-center m-5">
                                            {loader}{!loader && "¡No hay información!"}
                                        </h2>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className="dataTable-bottom">
                <div className="dataTable-info d-none d-sm-block mt-4">
                    <span style={{ fontSize: "12px" }}>Mostrando {firstItemShowedPerPage + 1} a {pageNumber + 1 === pageCount() ?
                        range()
                        :
                        lastItemShowedPerPage} de {range()}
                    </span>
                </div>
                <nav className="dataTable-pagination mt-3">
                    <ReactPaginate
                        breakLabel="..."
                        previousLabel={<i className="fa-solid fa-chevron-left" />}
                        nextLabel={<i className="fa-solid fa-chevron-right" />}
                        marginPagesDisplayed={0}
                        pageRangeDisplayed={5}
                        pageCount={pageCount()}
                        onPageChange={changePage}
                        previousLinkClassName="paginate"
                        nextLinkClassName="paginate"
                        activeClassName="active"
                    />
                </nav>
            </div>
        </div>
    )
}

export default Table