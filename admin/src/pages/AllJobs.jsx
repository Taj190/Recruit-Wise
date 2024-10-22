import  { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DeleteJobModel } from '../Model/deleteJobModel';
import { EditJobModel } from '../Model/editJobModel';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from '../component/Pagination/Pagination';
import { useCallback } from 'react';
const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [deleteModel, setDeleteModel] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editModel, setEditModel] = useState(false);
  const [editJobData, setJobData] = useState({
    category: '',
    title: '',
    description: '',
    requirement: [],
    location: '',
  });

  // Define fetchJobs outside of useEffect
  const fetchJobs = useCallback(async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/job-listing/available-jobs`, {
            params: { title, location, page },
        });
       
        if (response.data.success) {
            setJobs(response.data.data);
            setTotalPages(response.data.totalPages);
        } else {
            toast.error('Failed to fetch jobs');
        }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error fetching job applications. Please try again.';
      toast.error(errorMessage);
  }
  
}, [page, title, location]); // Add dependencies here

useEffect(() => {
    fetchJobs(); // Call the memoized fetchJobs function
}, [fetchJobs]); // Add fetchJobs as a dependency

  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteModel(true);
  };

  const handleDeleteSuccess = (shouldRefresh = false) => {
    setDeleteModel(false);
    if (shouldRefresh) {
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== deleteId));
    }
  };

  const handleEdit = (id) => {
    setEditId(id);
    const editJob = jobs.find((job) => job._id === id);

    if (editJob) {
      setJobData({
        category: editJob.category?editJob.category.name :"no name",
        title: editJob.title,
        description: editJob.description,
        requirement: editJob.requirement,
        location: editJob.location,
      });
    }
    setEditModel(true);
  };

  const handleEditSuccess = (updatedJob) => {
    setEditModel(false); 
     
    // Update the local jobs state with the updated job details
    setJobs((prevJobs) => 
      prevJobs.map((job) => 
        job._id === updatedJob._id ? updatedJob : job
      )
    );

    // Fetch updated job data from the server
    fetchJobs();
    
  };

  return (
    <div className="container">
      <h1>Job Listings</h1>

      {/* Search and Filter Form */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
        />
        <input
          type="text"
          placeholder="Search by location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="form-control mt-2"
        />
      </div>

      {/* Job Cards */}
      <div className="row">
        {jobs.map((job) => (
          <div className="col-md-4 mb-3" key={job._id}>
            <div className="card">
              <div className="card-body">
              <h4 className="card-title"><strong>Category: </strong>
              {job.category ? job.category.name : 'No Category'}</h4>
                <h5 className="card-title"><strong>Job Title: </strong>
                  {job.title}</h5>
                <p className="card-text"><strong>Description: </strong> {job.description}</p>
                
                {/* Requirements as a bullet list */}
                <p className="card-text">
                  <strong>Requirements: </strong>
                </p>
                <ul>
                  {job.requirement.map((req, index) => (
                    <li key={index}>{req}</li> // Display each requirement as a list item
                  ))}
                </ul>

                <p className="card-text"><strong>Location: </strong>
                  <small>{job.location}</small></p>
                
                {/* Edit and Delete Buttons */}
                <div className="d-flex justify-content-between">
                  <button className="btn btn-primary" onClick={() => handleEdit(job._id)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(job._id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals for Delete and Edit */}
      {deleteModel && (
        <DeleteJobModel
          model={deleteModel}
          id={deleteId}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
      {editModel && (
        <EditJobModel
          model={editModel}
          id={editId}
          category={editJobData.category}
          title={editJobData.title}
          description={editJobData.description}
          requirement={editJobData.requirement}
          location={editJobData.location}
          onEditSuccess={handleEditSuccess}
        />
      )}
      <Pagination
      currentPage={page}
      totalPage={totalPages}
      setCurrentPage={setPage}
      />
      <ToastContainer />
    </div>
  );
};

export default JobListing;
