import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { buildApiUrl, getApiHeaders } from '../config/api';

interface IProps {}

let About: React.FC<IProps> = () => {
  const [version, setVersion] = useState<string>();

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(buildApiUrl("/version"), {
        headers: getApiHeaders()
      });
      const result: string = data.code_version;
      setVersion(result);
    }
    fetchData();
  }, []);

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
              <li className="list-group-item">
                Code Version: <span className="fw-bold">{version}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default About;
