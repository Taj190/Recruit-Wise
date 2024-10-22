import axios from "axios";
import { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

export const EditJobModel = ({ model, id, category, title, description, requirement, location, onEditSuccess }) => {
    const [editJobModel, setJobModel] = useState(model);
    const categoryRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const requirementRef = useRef(null);
    const locationRef = useRef(null);

    const handleEditClick = async () => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/job-listing/edit-job-data/${id}`,
                {
                    category: categoryRef.current.value,
                    title: titleRef.current.value,
                    description: descriptionRef.current.value,
                    requirement: requirementRef.current.value,
                    location: locationRef.current.value,
                },
                {
                    withCredentials: true,
                }
            );
            console.log(response);
            setJobModel(null); 
            setTimeout(() => {
                onEditSuccess(true); 
            }, 2000);
            toast.success("Successfully updated the job!");
        } catch (error) {
            toast.error(`${error} Error updating user`);
        }
    };

    return (
        <>
            <ToastContainer /> {/* Moved this outside the modal */}
            {editJobModel && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Edit Job Details</h3>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Category</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control"
                                    defaultValue={category}
                                    ref={categoryRef}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    className="form-control"
                                    defaultValue={title}
                                    ref={titleRef}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    id="description"
                                    className="form-control"
                                    defaultValue={description}
                                    ref={descriptionRef}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="requirement">Requirement</label>
                                <input
                                    type="text"
                                    id="requirement"
                                    className="form-control"
                                    defaultValue={requirement}
                                    ref={requirementRef}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="location">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    className="form-control"
                                    defaultValue={location}
                                    ref={locationRef}
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



export default EditJobModel;
