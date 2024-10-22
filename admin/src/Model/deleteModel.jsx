import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types"; // Import PropTypes
import './deleteModel.css';

const DeleteUser = ({ deleteModel, id, onDeleteSuccess }) => {
  
  const handleDeleteClick = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/job-portal/userdata/${id}`,
        {
          withCredentials: true,
        }
      );
      toast.success("User deleted successfully");
      onDeleteSuccess(true); // Trigger the success callback from the parent to refresh the list
    } catch (error) {
      toast.error(`${error} cannot delete `);
    }
  };

  return (
    <>
      {deleteModel && ( // Use deleteModel prop directly
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Are You Sure?</h3>
            <div className="modal-actions">
              <button className="btn btn-danger" onClick={handleDeleteClick}>
                Yes
              </button>
              <button className="btn btn-secondary" onClick={() => onDeleteSuccess(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Define PropTypes
DeleteUser.propTypes = {
  deleteModel: PropTypes.bool.isRequired, // deleteModel should be a boolean
  id: PropTypes.string.isRequired,         // id should be a string
  onDeleteSuccess: PropTypes.func.isRequired, // onDeleteSuccess should be a function
};

export default DeleteUser;