import React from "react";
import {Link} from "react-router-dom";

interface IProps{
}

let Navbar:React.FC<IProps> = () => {
    return (
        <React.Fragment>
            <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
                <div className="container">
                    <Link to={'/'} className="navbar-brand">WMF Scraper Main Menu</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to={'/overalls'} className="nav-link">Competition Overalls</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/about'} className="nav-link">About</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
}
export default Navbar;