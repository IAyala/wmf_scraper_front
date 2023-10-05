import React from "react";
import {Routes, Route} from 'react-router-dom';
import About from "./components/About";
import Navbar from "./components/NavBar";
import CompetitionOveralls from "./components/CompetitionOveralls";

function App() {
  return (
    <React.Fragment>
      <Navbar/>
      <Routes>
        <Route path={'/overalls'} element={<CompetitionOveralls/>} />
        <Route path={'/about'} element={<About/>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
