import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // Assuming you are using axios for API requests

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError(null); // Clear any previous errors

    try {
      const response = await axios.post('/api/login', { email, password });

      if (response?.status === 200) {
        // Save the token to localStorage
        localStorage.setItem('token', response?.data?.access_token);
        localStorage.setItem('user', JSON.stringify(response?.data?.user));
        // Navigate to the dashboard after a short delay
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setError('Something went wrong'); // Show error if status is not 200
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="login-page bg-body-secondary">
      <div className="login-box">
        <div className="login-logo">
          <a href="../index2.html"><b>CMS</b></a>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>

            {/* Form submission handler */}
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="input-group-text">
                  <span className="bi bi-envelope"></span>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="input-group-text">
                  <span className="bi bi-lock-fill"></span>
                </div>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <div className="row">
                <div className="col-4">
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">Sign In</button>
                  </div>
                </div>
              </div>
            </form>

            {/* <p className="mb-1">
              <Link to="forgot-password">I forgot my password</Link>
            </p> */}
            <p className="mb-0">
              <Link to="/register" className="text-center">
                Register a new membership
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
