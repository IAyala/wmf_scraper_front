import React from "react";
import { Link } from "react-router-dom";

interface IProps {}

let Navbar: React.FC<IProps> = () => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
        <div className="container">
          <Link to={"/"} className="navbar-brand">
            WMF Scraper Main Menu
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to={"/add_competition"} className="nav-link">
                  Add Competition
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/load_competition"} className="nav-link">
                  Load Competition
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/overalls"} className="nav-link">
                  Competition Overalls
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/overalls_country"} className="nav-link">
                  Country Overalls
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/results_competitor"} className="nav-link">
                  Results Competitor
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/results_path"} className="nav-link">
                  Competitor Results Path
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/rfs_penalties"} className="nav-link">
                  RFS Penalties
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/about"} className="nav-link">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};
export default Navbar;
