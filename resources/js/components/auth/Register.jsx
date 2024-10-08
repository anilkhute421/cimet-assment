import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Prepare the data for the API call
    const userData = {
      name: fullName,
      email: email,
      password: password,
      role_id: 3
    };

    try {
      const response = await axios.post('/api/register', userData);

    //   const data = await response.json();

      if (response.status==200) {
        // Display success message
        setSuccessMessage("Registration successful. Please login.");
        setErrorMessage("");
        setTimeout(() => {
          navigate('/'); // Redirect to login page after a delay
        }, 3000);
      } else {
        // Display error message if registration fails
        // console.log(response , 'response');
        
        setErrorMessage(response.message || "Registration failed. Please try again.");
        setSuccessMessage("");
      }
    } catch (error) {
        console.log(error , 'error');
        
      setErrorMessage(error.response.data?.message || "Something went wrong. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="register-page bg-body-secondary">
      <div className="register-box">
        <div className="register-logo">
          <a href="../index2.html"><b>Admin</b>LTE</a>
        </div>
        <div className="card">
          <div className="card-body register-card-body">
            <p className="register-box-msg">Register a new membership</p>

            {/* Display error or success messages */}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            <form onSubmit={handleRegister}>
              <div className="input-group mb-3">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <div className="input-group-text"> 
                  <span className="bi bi-person"></span>
                </div>
              </div>

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

              <div className="row">
                <div className="col-4">
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">Register</button>
                  </div>
                </div>
              </div>
            </form>

            <p className="mb-0">
              <Link to="/login" className="text-center">I already have a membership</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
