import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

export default function Header() {
  const navigate = useNavigate(); // Use navigate to redirect after logout
  const [userDeatils , setUserDetails] = React.useState();
  // var name = '';

  const handleLogout = () => {
    localStorage.removeItem('token'); // Assuming authToken is stored
    localStorage.removeItem('user'); // Assuming authToken is stored

    navigate('/login');
  };

  const userInfo = () =>{
   const value = localStorage.getItem('user');
   setUserDetails(JSON.parse(value));
  }


  React.useEffect(()=>{
    userInfo();
  },[]);

  return (
    <nav className="app-header navbar navbar-expand bg-body"> 
      <div className="container-fluid"> 
        <ul className="navbar-nav">
          <li className="nav-item"> 
            <Link className="nav-link" data-lte-toggle="sidebar" to="#" role="button"> 
              <i className="bi bi-list"></i> 
            </Link> 
          </li>
          <li className="nav-item d-none d-md-block"> 
            <a href="#" className="nav-link">Home</a> 
          </li>
          <li className="nav-item d-none d-md-block"> 
            <a href="#" className="nav-link">Contact</a> 
          </li>
        </ul> 
        <ul className="navbar-nav ms-auto"> 
          <li className="nav-item dropdown user-menu"> 
            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"> 
              <img 
                src="../../../dist/assets/img/user2-160x160.jpg" 
                className="user-image rounded-circle shadow" 
                alt="User Image" 
              /> 
              <span className="d-none d-md-inline">{userDeatils?.name}</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-mg dropdown-menu-end"> 
              <li className="user-footer"> 
                <button onClick={handleLogout} className="btn btn-default btn-flat float-end">
                  Sign out
                </button> 
              </li>
            </ul>
          </li> 
        </ul> 
      </div>
    </nav> 
  );
}
