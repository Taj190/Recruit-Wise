import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Pagination from '../component/Pagination/Pagination';
import { DeleteJobApplication } from '../Model/deleteJobModel';
import { useCallback } from 'react';

const JobApplications = () => {
    const [applications, setApplications] = useState([]);
    const [searchCategory, setSearchCategory] = useState('');
    const [searchName, setSearchName] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage , setCurrentPage]= useState(1)
    const [totalPages, setTotalPages] = useState()
    const [deleteModel , setDeleteModel] =useState(false);
    const[selectedId , setSelectedId] = useState()
    // Fetch job applications
    const fetchApplications = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/job-apply/get-applications`, {
                params: {
                    category: searchCategory,
                    name: searchName,
                },
                withCredentials: true,
            });
            setTotalPages(response.data.totalPages);
            setApplications(response.data.data || []);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error fetching job applications. Please try again.';
            toast.error(errorMessage);
        }
        finally {
            setLoading(false);
        }
    }, [searchCategory, searchName]); // Add dependencies here

    // Fetch data when the component mounts or search filters change
    useEffect(() => {
        fetchApplications();
    }, [fetchApplications, currentPage]); 
    const handleDeleteModel = (id) => {
      
      setDeleteModel(true);
      setSelectedId(id);
     
    };
    const handleDeleteSuccess = (shouldRefresh=true) => {
      setDeleteModel(false); // Close the modal
      if (shouldRefresh) {
        fetchApplications(); 
      }
    };

    return (
        <div className="container my-5">
            <h2 className="mb-4 text-white">Job Applications</h2>

            {/* Search Fields */}
            <div className="row mb-4">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Category"
                        value={searchCategory}
                        onChange={(e) => setSearchCategory(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Name"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                </div>
            </div>

            {/* Applications Table */}
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Category</th>
                            <th scope="col">TaxNumber</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Address</th>
                            <th scope="col">Applied Date</th>
                            <th scope="col">CV</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.length > 0 ? (
                            applications.map((applicant) => (
                                <tr key={applicant._id}>
                                    <td data-label="Category">{applicant.category?.name || 'N/A'}</td>
                                    <td data-label="taxNumber">{applicant.taxNumber || 'N/A'}</td>
                                    <td data-label="Name">{applicant.name}</td>
                                    <td data-label="Email">{applicant.email}</td>
                                    <td data-label="Phone">{applicant.phoneNumber}</td>
                                    <td data-label="Address">{applicant.address}</td>
                                    <td data-label="Applied Date">{new Date(applicant.createdAt).toLocaleDateString()}</td>
                                    <td data-label="CV">
                                   {applicant.cvFilePath ? (
                                       <a                                                            
                                           href={`${import.meta.env.VITE_API_URL}/filefolder/${applicant.cvFilePath.split('\\').pop()}`}
                                           download
                                           target="_blank"
                                           rel="noopener noreferrer"
                                           className="btn btn-primary btn-sm"
                                       >
                                           Download CV
                                       </a>
                                                                  ) : (
                                       <span className="text-muted">No CV Available</span>
                                   )}
                               </td>
                                  <td data-label="Actions">
                                  <button
                                 className="btn btn-danger btn-sm"
                                 onClick={() => handleDeleteModel(applicant._id)}
                                 >
                                 Delete
                               </button>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    No applications found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
             {deleteModel && (
        <DeleteJobApplication
          model={deleteModel}
          id={selectedId}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
               <Pagination
      currentPage={currentPage}
      totalPage={totalPages}
      setCurrentPage={setCurrentPage}
      />
        </div>
    );

};

export default JobApplications;
