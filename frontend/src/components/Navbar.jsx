import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <header className="navbar fixed-top">
            <div className="logo">
                ROYAL FILMS
            </div>
            <Link to="/" className="nav-links d-inline-flex align-items-center justify-content-between">
                <span className="home-icon">
                    <i className="fa-solid fa-film" />
                </span>
            </Link>
            <Link to="/create" className="nav-links ms-auto">
                <span className="btn-link">
                    <i className="fa-solid fa-plus me-2" />
                    Crear Película
                </span>
            </Link>
        </header>
    )
}

export default Navbar