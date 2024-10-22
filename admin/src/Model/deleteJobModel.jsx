import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import PropTypes from "prop-types"; // Import PropTypes

// Delete Job Model Component
export const DeleteJobModel = ({ id, model, onDeleteSuccess }) => {
  const handleDeleteClick = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/job-listing/delete-job/${id}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Job deleted successfully");
        onDeleteSuccess(true);
      }
    } catch (error) {
      toast.error("Failed to delete job");
      console.error(error);
      onDeleteSuccess(false);
    }
  };

  return (
    <>
      {model && ( // Directly use model prop
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
          <ToastContainer />
        </div>
      )}
    </>
  );
};

// Prop validation for DeleteJobModel
DeleteJobModel.propTypes = {
  id: PropTypes.string.isRequired, // Assuming id is a string; adjust if needed
  model: PropTypes.bool.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
};

// Delete Job Application Component
export const DeleteJobApplication = ({ id, model, onDeleteSuccess }) => {
  const handleDeleteClick = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/job-apply/delete-job-application/${id}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Job application deleted successfully");
        onDeleteSuccess(true);
      }
    } catch (error) {
      toast.error("Failed to delete job application");
      console.error(error);
      onDeleteSuccess(false);
    }
  };

  return (
    <>
      {model && ( // Directly use model prop
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
          <ToastContainer />
        </div>
      )}
    </>
  );
};

// Prop validation for DeleteJobApplication
DeleteJobApplication.propTypes = {
  id: PropTypes.string.isRequired, // Assuming id is a string; adjust if needed
  model: PropTypes.bool.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
};
