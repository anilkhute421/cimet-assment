import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Create() {
  // State to handle form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
	setError('');
    const partnerData = { name, email , password };
    try {
      await axios.post('/api/partner/create', partnerData);
      alert('Partner created successfully');
      // Clear the form after successful submission
      setName('');
      setEmail('');
      setPassword('');

	  navigate('/partner');
    } catch (error) {
      console.error('Error creating partner:', error);
	  setError(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-4">
              <h1>Create Partner</h1>
            </div>
            <div className="col-sm-5">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/partners">Partners</a>
                </li>
                <li className="breadcrumb-item active">Create Partner</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Add New Partner</h3>
            </div>
            {/* /.card-header */}
            {/* form start */}
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="partnerName">Partner Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="partnerName"
                    placeholder="Enter partner name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="partnerEmail">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="partnerEmail"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
				<div className="form-group">
                  <label htmlFor="partnerPassword">Password </label>
                  <input
                    type="password"
                    className="form-control"
                    id="partnerPaswword"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

				{error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              </div>
              {/* /.card-body */}

              <div className="card-footer">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
