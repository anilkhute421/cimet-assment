import React from 'react';
import { Link } from 'react-router-dom';

export default function Cms() {

	const [partnerList , setPartnerList] = React.useState();

	const getPartners = async() =>{
       try{
          
		const response = await axios.get('/api/pageTitle');

		if(response?.status === 200){
			setPartnerList(response?.data)
		}

	   }catch(error){
          console.log(error);
	   }
	}

	React.useEffect(() => {
	   getPartners();
	}, [])
	

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h3>Page</h3>
            </div>
             
			<div className="col-sm-6">
                            <ol className="breadcrumb float-sm-end">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    Page
                                </li>
                            </ol>
                        </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Page List</h3>
              <div className="card-tools">
                <Link
                  to="/cms/create"
                  className="btn btn-dark btn-xm float-right ml-15"
                  style={{ marginRight: '10px' }}
                >
                Create page
                </Link>
                <Link
                  to="/cms/pageFileds"
                  className="btn btn-dark btn-xm float-right ml-5"
                >
                   Create page Fileds
                </Link>
              </div>
            </div>
            {/* /.card-header */}
            <div className="card-body">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Page Title</th>
                    <th>Slug Name</th>
                  </tr>
                </thead>
                <tbody>
				{partnerList?.length > 0 ? (
                    partnerList?.map((partner) => (
                      <tr key={partner.id}>
                        <td>{partner.id}</td>
                        <td>{partner.title}</td>
                        <td>{partner.slug}</td>
                        {/* <td>
                          <div className="btn-group">
                            <Link
                              to={`/partners/show/${partner.id}`}
                              className="btn btn-sm btn-info"
                            >
                              <i className="fas fa-eye"></i> Show
                            </Link>
                            <Link
                              to={`/partners/edit/${partner.id}`}
                              className="btn btn-sm btn-warning"
                            >
                              <i className="fas fa-edit"></i> Edit
                            </Link>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => confirmDelete(partner.id)}
                            >
                              <i className="fas fa-trash"></i> Delete
                            </button>
                          </div>
                        </td> */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No partners found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function confirmDelete(id) {
  if (window.confirm("Are you sure you want to delete this partner?")) {
    // Perform delete action here, like calling an API to remove the partner by ID
    console.log("Partner with ID " + id + " deleted.");
  }
}
