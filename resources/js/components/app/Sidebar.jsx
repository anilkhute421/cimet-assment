import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    const [userDeatils , setUserDetails] = React.useState();

    const userInfo = () =>{
        const value = localStorage.getItem('user');
        setUserDetails(JSON.parse(value));
       }
     
     
       React.useEffect(()=>{
         userInfo();
       },[]);
  return (
    
    <aside className="app-sidebar bg-body-secondary shadow" data-bs-theme="dark"> 
    <div className="sidebar-brand"> <a href="../index.html" className="brand-link">   <span className="brand-text fw-light">CMS</span>  </a>  </div> 
    <div className="sidebar-wrapper">
        <nav className="mt-2"> 
            <ul className="nav sidebar-menu flex-column" data-lte-toggle="treeview" role="menu" data-accordion="false">
                <li className="nav-item"> <Link to="/" className="nav-link"> <i className="nav-icon bi bi-speedometer"></i>
                        <p>
                            Dashboard
                            <i className="nav-arrow bi bi-chevron-right"></i>
                        </p>
                    </Link>
                </li>
                { userDeatils?.role_id == 1 && <>
                    <li className="nav-item"> <Link to="/cms" className="nav-link"> <i className="nav-icon bi bi-speedometer"></i>
                    <p>
                        CMS
                        <i className="nav-arrow bi bi-chevron-right"></i>
                    </p>
                </Link>
            </li>
            <li className="nav-item"> <Link to="/partner" className="nav-link"> <i className="nav-icon bi bi-speedometer"></i>
                    <p>
                        Partners
                        <i className="nav-arrow bi bi-chevron-right"></i>
                    </p>
                </Link>
            </li>
            </>
                }
               
            </ul> 
        </nav>
    </div> 
</aside> 

  )
}
