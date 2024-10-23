import { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { applicationView } from '../features/auth/applicationView';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ApplicationsPage.css'; // Import your CSS file for table styling
import DeleteUser from '../Model/deleteModel';
import EditUser from '../Model/editModel';
import Pagination from '../component/Pagination/Pagination';

const ApplicationsPage = () => {
  const dispatch = useDispatch();
  const [deleteModel, setDeleteModel] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedEditId, setSelectedEditId] = useState(null);
  const[editModel , setEditModel]= useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editTaxNumber, setEditTaxNumber] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const { user = [],totalPages,  error } = useSelector((state) => state.applicants);
  const [currentPage , setCurrentPage] = useState(1)
  const [name, setName] = useState('');
  useEffect(() => {
   
      dispatch(applicationView({currentPage ,name})); // Fetch applicants data
  
  }, [dispatch,currentPage ,name]);
   
  // Handle errors gracefully
  if (error) {
    toast.error(`Error: ${error}`);
    return <div className="error-message">Error: {error}</div>;
  }
 
  const handleDeleteModel = (id) => {
    setDeleteModel(true);
    setSelectedId(id);
  };
  const handleEditModel = (id, name , email, address,phone , taxNumber)=>{
    setSelectedEditId(id);
    setEditName(name);
    setEditEmail(email);
    setEditAddress(address);
    setEditPhone(phone);
    setEditTaxNumber(taxNumber);
    setEditModel(true); 
  }

  const handleDeleteSuccess = (shouldRefresh = false) => {
    setDeleteModel(false); // Close modal
    if (shouldRefresh) {
      dispatch(applicationView()); // Optionally refresh the list
    }
  };

  const handleEditSuccess = (shouldRefresh=true) => {
    setEditModel(false); // Close the modal
    if (shouldRefresh) {
      dispatch(applicationView()); 
    }
  };
  

  return (
    <div className="container">
      <h1>Applications</h1>
      <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Search by name"
            />
      {user.length > 0 ? (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Tax Number</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Residency Card Valid</th>
              <th scope="col">CV</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {user.map((applicant) => (
              <tr key={applicant._id}>
                <td data-label="Tax Number">{applicant.taxNumber}</td>
                <td data-label="Name">{applicant.name}</td>
                <td data-label="Email">{applicant.email}</td>
                <td data-label="Phone">{applicant.phone}</td>
                <td data-label="Address">{applicant.address}</td>
                <td data-label="Residency Card Valid">
                  {applicant.residencyCard ? (
                    <span className="text-success">Valid</span>
                  ) : (
                    <span className="text-danger">Invalid</span>
                  )}
                </td>
                <td data-label="CV">
                <a
  href={`${import.meta.env.VITE_API_URL}${applicant.cvFilePath}`} // This will use the filename correctly
  download
  target="_blank"
  rel="noopener noreferrer"
  className="btn btn-primary btn-sm"
>
  Download CV
</a>

                </td>
                <td data-label="Actions">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteModel(applicant._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn  btn-success btn-sm"
                  onClick={() => handleEditModel(applicant._id,applicant.name,applicant.email,applicant.address,applicant.phone,applicant.taxNumber)}
                  
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No applications found.</p>
      )}
      
      {deleteModel && (
        <DeleteUser
          deleteModel={deleteModel}
          id={selectedId}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
      {
        editModel &&(
          <EditUser
          editModel={editModel}
          id={selectedEditId}
          name={editName}
          email={editEmail}
          address={editAddress}
          taxNumber={editTaxNumber}
          phone={editPhone}
          onEditSuccess={handleEditSuccess}  
          />
        )
      }
      <Pagination
      currentPage={currentPage}
      totalPage={totalPages}
      setCurrentPage={setCurrentPage}
      />
      <ToastContainer />
    </div>
  );
};

export default ApplicationsPage;
