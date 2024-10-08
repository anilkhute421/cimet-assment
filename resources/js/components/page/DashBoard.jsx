import React from 'react'

export default function Dashboard () {
    const [userDeatils , setUserDetails] = React.useState();

    const userInfo = () =>{
        const value = localStorage.getItem('user');
        setUserDetails(JSON.parse(value));
       }
     
     
       React.useEffect(()=>{
         userInfo();
       },[]);
  return (
    
        <main className="app-main"> 
            <div className="app-content-header">
                <div className="container-fluid"> 
                    <div className="row">
                        <div className="col-sm-6">
                            <h3 className="mb-0">{userDeatils?.role_id==1 ? "Admin Dashboard" : userDeatils?.role_id==2 ? "Partner Dasbord" : "User Dashboard"}</h3>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-end">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    Simple Tables
                                </li>
                            </ol>
                        </div>
                    </div> 
                </div> 
            </div> 
            <div className="app-content">
                <div className="container-fluid"> 
                    <div className="row">
                       
                    </div> 
                </div> 
            </div> 
        </main> 
  )
}
