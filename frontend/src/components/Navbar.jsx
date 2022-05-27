import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <header className="navbar fixed-top">
            <div className="logo">
                ROYAL FILMS
                {/* <img className="img-fluid" src="/img/logo-gov-co.png" alt="" /> */}
            </div>
            <Link to="/" className="nav-links d-inline-flex align-items-center justify-content-between">
                <span className="home-icon">
                    <i className="fa-solid fa-film" />
                </span>
            </Link>
            <Link to="/create" className="nav-links d-none d-sm-block ms-auto">
                <span className="btn-link">
                    <i className="fa-solid fa-plus me-2" />
                    Crear Película
                </span>
            </Link>
        </header>
    )
}

export default Navbar