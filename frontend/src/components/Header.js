import {UserContext} from "../userContext";
import {Link} from "react-router-dom";

function Header(props) {
    return (
        <header>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link
                        className="navbar-brand text-decoration-none text-dark" to='/'>Galerija</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto">
                            <UserContext.Consumer>
                                {context => (
                                    context.user ?
                                        <>
                                            <Link className="text-decoration-none text-dark nav-link"
                                                  to='/publish'>Publish</Link>
                                            <Link className="text-decoration-none text-dark nav-link"
                                                  to='/profile'>Profile</Link>
                                            <Link className="text-decoration-none text-dark nav-link"
                                                  to='/logout'>Logout</Link>
                                            <Link className="text-decoration-none text-dark nav-link ms-auto "
                                                  to="/profile"> Pozdravljen <span className="fw-bold"> {context.user.username}</span> </Link>
                                        </>
                                        :
                                        <>
                                            <Link className="text-decoration-none text-dark nav-link"
                                                  to="/login">Login</Link>
                                            <Link className="text-decoration-none text-dark nav-link"
                                                  to="/register">Register</Link>

                                        </>
                                )}
                            </UserContext.Consumer>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;