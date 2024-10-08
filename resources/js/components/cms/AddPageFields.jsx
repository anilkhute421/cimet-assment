import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddPageFields = ({ pageId }) => {
  const [fields, setFields] = useState([
    { label: '', field_type: 'text', validation: { required: false, minLength: '', maxLength: '' } }
  ]);
  const [errors, setErrors] = useState({});
  const [pageTitle, setPageTitle] = useState(''); // State for the selected page title
  const [allPageTitle, setAllPageTitle] = useState(); // State for all available page titles

  const handleFieldChange = (index, event) => {
    const values = [...fields];
    values[index][event.target.name] = event.target.value;
    setFields(values);
  };

  const handleValidationChange = (index, event) => {
    const values = [...fields];
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    values[index].validation[name] = value;
    setFields(values);
  };

  const validateFields = () => {
    let isValid = true;
    const newErrors = {};

    // Validate static page title
    if (!pageTitle) {
      isValid = false;
      newErrors.pageTitle = 'Page title is required';
    }

    fields.forEach((field, index) => {
      console.log(field , 'fields');
      
      const { label, validation } = field;
      const { required, minLength, maxLength } = validation;

      if (!fields[index].label) {
        isValid = false;
        newErrors[index] = `Field label is required`;
      }

      if (minLength && fields[index].value && fields[index].value.length < minLength) {
        isValid = false;
        newErrors[index] = `${label} must be at least ${minLength} characters`;
      }

      if (maxLength && fields[index].value && fields[index].value.length > maxLength) {
        isValid = false;
        newErrors[index] = `${label} must be less than ${maxLength} characters`;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const addField = () => {
    setFields([...fields, { label: '', field_type: 'text', validation: { required: false, minLength: '', maxLength: '' } }]);
  };

  const removeField = (index) => {
    const newFields = fields.filter((_, fieldIndex) => fieldIndex !== index);
    setFields(newFields);
  };

  const handleSubmit = async () => {
    if (validateFields()) {
      try{
        // Include static pageTitle in the request payload
      await axios.post(`/api/pagesFields`, { fields, pageTitle });
      setFields([
        { label: '', field_type: 'text', validation: { required: false, minLength: '', maxLength: '' } }
      ]);
      setPageTitle('');
      alert('Fields added!');

      }catch(error){

      }
      
    } else {
      // alert('Please fix validation errors');
    }
  };

  const getAllTitle = async () => {
    try {
      const response = await axios.get('/api/pageTitle');
      if (response?.status === 200) {
        setAllPageTitle(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTitle();
  }, []);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Add Fields with Validation</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Page Fields</h3>
                </div>
                <div className="card-body">
                  {/* Static Page Title Select Field */}
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Page Title</label>
                    <div className="col-sm-10">
                      <select
                        className="form-control"
                        value={pageTitle}
                        onChange={(e) => setPageTitle(e.target.value)}
                      >
                        <option value="">Select a Page Title</option>
                        {allPageTitle?.map((item, index) => (
                          <option key={index} value={item?.id}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                      {errors.pageTitle && <div className="text-danger">{errors.pageTitle}</div>}
                    </div>
                  </div>
                  <hr />
                  {/* Dynamic Fields */}
                  {fields.map((field, index) => (
                    <div key={index} className="form-group row">
                      <label className="col-sm-2 col-form-label">Field Label</label>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          className="form-control"
                          name="label"
                          value={field.label}
                          onChange={(e) => handleFieldChange(index, e)}
                          placeholder="Enter field label"
                        />
                      </div>
                      <div className="col-sm-4">
                        <select
                          className="form-control"
                          name="field_type"
                          value={field.field_type}
                          onChange={(e) => handleFieldChange(index, e)}
                        >
                          <option value="text">Text</option>
                          <option value="textarea">Textarea</option>
                          <option value="radio">Radio</option>
                          <option value="checkbox">Checkbox</option>
                        </select>
                      </div>

                      {/* Validation Settings */}
                      <div className="col-sm-12 mt-3">
                        <label>Validation Settings:</label>
                        <div className="form-group">
                          <label className="col-sm-2 col-form-label">Required</label>
                          <input
                            type="checkbox"
                            name="required"
                            checked={field.validation.required}
                            onChange={(e) => handleValidationChange(index, e)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Min Length</label>
                          <input
                            type="number"
                            className="form-control"
                            name="minLength"
                            value={field.validation.minLength}
                            onChange={(e) => handleValidationChange(index, e)}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Max Length</label>
                          <input
                            type="number"
                            className="form-control"
                            name="maxLength"
                            value={field.validation.maxLength}
                            onChange={(e) => handleValidationChange(index, e)}
                          />
                        </div>
                      </div>

                      {/* Error Display */}
                      {errors[index] && <div className="text-danger">{errors[index]}</div>}
                      { index > 0 && <> <div className="col-sm-12 mb-3">
                        <button type="button" className="btn btn-danger" onClick={() => removeField(index)}>
                          Remove Field
                        </button>
                      </div>
                      <hr /> 
                      </>
                      }
                    </div>
                  ))}

                  <button type="button" className="btn btn-success" onClick={addField}>
                    <i className="fas fa-plus"></i> Add Field
                  </button>
                </div>

                <div className="card-footer">
                  <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddPageFields;
