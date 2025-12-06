import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import About from "./components/About";
import Navbar from "./components/NavBar";
import CompetitionOveralls from "./components/CompetitionOveralls";
import CompetitionByCountry from "./components/CompetitionByCountry";
import TasksResultsCompetitor from "./components/TaskResultsCompetitor";
import AddCompetition from "./components/AddCompetition";
import LoadCompetition from "./components/LoadCompetition";
import CompetitorPath from "./components/CompetitorPath";
import RFSPenalties from "./components/RFSPenalties";
import Login from "./components/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem('isAuthenticated') === 'true'
  );

  const [userRole, setUserRole] = useState(
    sessionStorage.getItem('userRole') || ''
  );

  const handleLogin = (authenticated: boolean) => {
    setIsAuthenticated(authenticated);
    setUserRole(sessionStorage.getItem('userRole') || '');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('username');
    setIsAuthenticated(false);
    setUserRole('');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <React.Fragment>
      <Navbar onLogout={handleLogout} userRole={userRole} />
      <Routes>
        {/* Superadmin-only routes */}
        {userRole === 'superadmin' && (
          <>
            <Route path={'/add_competition'} element={<AddCompetition />} />
            <Route path={'/load_competition'} element={<LoadCompetition />} />
          </>
        )}

        {/* Routes available to both admin and superadmin */}
        <Route path={'/overalls'} element={<CompetitionOveralls />} />
        <Route path={'/about'} element={<About />} />
        <Route path={'/overalls_country'} element={<CompetitionByCountry />} />
        <Route path={'/results_competitor'} element={<TasksResultsCompetitor />} />
        <Route path={'/results_path'} element={<CompetitorPath />} />
        <Route path={'/rfs_penalties'} element={<RFSPenalties />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
