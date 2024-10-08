import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CreateCms() {
  const [pages, setPages] = useState([]);
  const [newPage, setNewPage] = useState({ title: '', slug: '' });

  useEffect(() => {
    // Fetch pages from the API (optional)
    // axios.get('/api/pages').then(response => setPages(response.data));
  }, []);

  const handleCreatePage = () => {
    axios.post('/api/pages', newPage).then(response => {
      alert('page created successfully');
      setPages([...pages, response.data]);
    });
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Page Management</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              {/* Card for page creation */}
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Create New Page</h3>
                </div>
                <form>
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="pageTitle">Page Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="pageTitle"
                        value={newPage.title}
                        onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
                        placeholder="Enter title"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="pageSlug">Page Slug</label>
                      <input
                        type="text"
                        className="form-control"
                        id="pageSlug"
                        value={newPage.slug}
                        onChange={(e) => setNewPage({ ...newPage, slug: e.target.value })}
                        placeholder="Enter slug"
                      />
                    </div>
                  </div>

                  <div className="card-footer">
                    <button type="button" onClick={handleCreatePage} className="btn btn-primary">
                      Create Page
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Optional section to list pages */}
            <div className="col-md-6">
              <div className="card card-secondary">
                <div className="card-header">
                  <h3 className="card-title">Existing Pages</h3>
                </div>
                <div className="card-body">
                  <ul className="list-group">
                    {pages?.map((page) => (
                      <li key={page.id} className="list-group-item">
                        {page.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
