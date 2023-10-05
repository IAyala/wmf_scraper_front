import React from "react";

interface IProps{
}

let About:React.FC<IProps> = () => {
    return (
        <React.Fragment>
            <div className="container mt-3">
                <div className="row">
                    <div className="col">
                        <p className="h3 text-success fw-bold">About Us</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <ul className="list-group">
                            <li className="list-group-item">
                                App Name: <span className="fw-bold">WMF Scraper Frontend</span>
                            </li>
                            <li className="list-group-item">
                                Author: <span className="fw-bold">Iván Ayala</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default About;