import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types'; // Add PropTypes
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const JobApplicationForm = ({ selectedjob, model, onClose }) => {
    const [showModel, setShowModel] = useState(model);
    const [formData, setFormData] = useState({
        taxNumber: '',
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        cv: null,
    });

    useEffect(() => {
        setShowModel(model);
    }, [model]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'cv') {
            if (files[0] && files[0].type !== 'application/pdf') {
                toast.error('Only PDF files are allowed for CV uploads.');
                return;
            }
            setFormData({ ...formData, cv: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('taxNumber', formData.taxNumber);
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('phoneNumber', formData.phoneNumber);
        data.append('address', formData.address);
        data.append('cv', formData.cv);
        data.append('category', selectedjob?.category?.name);
        
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/job-apply/application-submission`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            toast.success('Application submitted successfully!'); 
            
                setFormData({ taxNumber: '', name: '', email: '', phoneNumber: '', address: '', cv: null });
                setShowModel(false);
                onClose();
           
           
           
           
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred while submitting your application.');
        }
    };

    return (
        <>
            {showModel && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Apply for: {selectedjob?.category?.name || 'No Category Selected'}</h5>
                                <h6>
                                    {!selectedjob?.location?.toLowerCase().includes('portugal') && (
                                        <div className="alert alert-danger">
                                            You can only apply for this job if you have a residency permit valid for 6 months.
                                        </div>
                                    )}
                                </h6>
                                <button type="button" className="close" onClick={() => { setShowModel(false); onClose(); }} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    {/* Form Fields */}
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue={selectedjob?.category?.name || ''}
                                            readOnly
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="taxNumber"
                                            placeholder="Tax Number"
                                            value={formData.taxNumber}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            placeholder="Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phoneNumber"
                                            placeholder="Phone Number"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="address"
                                            placeholder="Address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="cv">CV (PDF)</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            name="cv"
                                            accept=".pdf"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                        <button type="button" className="btn btn-secondary" onClick={() => { setShowModel(false); onClose(); }}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
             <ToastContainer /> 
        </>
    );
};

// Add PropTypes for validation
JobApplicationForm.propTypes = {
    selectedjob: PropTypes.object.isRequired,
    model: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default JobApplicationForm;
