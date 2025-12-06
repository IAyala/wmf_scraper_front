import React, { useState, useEffect } from 'react';

interface LoginProps {
  onLogin: (isAuthenticated: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isAuthenticated') === 'true';
    if (isLoggedIn) {
      onLogin(true);
    }
  }, [onLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Role-based authentication
    const adminUsername = process.env.REACT_APP_ADMIN_USERNAME;
    const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;
    const superAdminUsername = process.env.REACT_APP_SUPERADMIN_USERNAME;
    const superAdminPassword = process.env.REACT_APP_SUPERADMIN_PASSWORD;

    // Security check - ensure credentials were provided at build time
    if (!adminUsername || !adminPassword || !superAdminUsername || !superAdminPassword) {
      setError('Application not properly configured. Missing user credentials.');
      setLoading(false);
      return;
    }

    let userRole = null;

    if (credentials.username === superAdminUsername && credentials.password === superAdminPassword) {
      userRole = 'superadmin';
    } else if (credentials.username === adminUsername && credentials.password === adminPassword) {
      userRole = 'admin';
    }

    if (userRole) {
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('userRole', userRole);
      sessionStorage.setItem('username', credentials.username);
      onLogin(true);
    } else {
      setError('Invalid username or password');
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card">
            <div className="card-header">
              <h4 className="text-center mb-0">WMF Scraper Login</h4>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                    placeholder="Enter username"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter password"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;