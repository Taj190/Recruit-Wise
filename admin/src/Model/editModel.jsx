import axios from "axios";
import { useRef } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types"; // Import PropTypes
import './deleteModel.css';

const EditUser = ({ editModel, id, name, email, address, phone, taxNumber, onEditSuccess }) => {
  // Using useRef to reference form fields
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const taxNumberRef = useRef();

  const handleEditClick = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/job-portal/edituserdata/${id}`,
        {
          name: nameRef.current.value,
          email: emailRef.current.value,
          phone: phoneRef.current.value,
          address: addressRef.current.value,
          taxNumber: taxNumberRef.current.value,
        },
        {
          withCredentials: true,
        }
      );
     
      if (response.data.success) {
        toast.success("User updated successfully");
        onEditSuccess(true); // Trigger the success callback with true
      } else {
        toast.error("Failed to update user"); // Handle failure case
      }
    } catch (error) {
      toast.error(`${error} Error updating user`);
    }
  };

  return (
    <>
      {editModel && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit User Details</h3>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  defaultValue={name}
                  ref={nameRef}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  defaultValue={email}
                  ref={emailRef}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  className="form-control"
                  defaultValue={address}
                  ref={addressRef}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  className="form-control"
                  defaultValue={phone}
                  ref={phoneRef}
                />
              </div>
              <div className="form-group">
                <label htmlFor="taxNumber">Tax Number</label>
                <input
                  type="text"
                  id="taxNumber"
                  className="form-control"
                  defaultValue={taxNumber}
                  ref={taxNumberRef}
                />
              </div>
            </form>

            <div className="modal-actions">
              <button className="btn btn-success" onClick={handleEditClick}>
                Save Changes
              </button>
              <button className="btn btn-secondary" onClick={() => onEditSuccess(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Define prop types
EditUser.propTypes = {
  editModel: PropTypes.bool.isRequired, // editModel must be a boolean and is required
  id: PropTypes.string.isRequired,       // id must be a string and is required
  name: PropTypes.string.isRequired,     // name must be a string and is required
  email: PropTypes.string.isRequired,    // email must be a string and is required
  address: PropTypes.string.isRequired,  // address must be a string and is required
  phone: PropTypes.string.isRequired,    // phone must be a string and is required
  taxNumber: PropTypes.string.isRequired, // taxNumber must be a string and is required
  onEditSuccess: PropTypes.func.isRequired, // onEditSuccess must be a function and is required
};

export default EditUser;
