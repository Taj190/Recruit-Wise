import { useRef } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddCategories = () => {
    const categoryNameRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const categoryName = categoryNameRef.current.value; // Get the value from the ref

        if (!categoryName) {
            toast.error('Category name is required!');
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/job-category/category`, // Use your API URL
                { name: categoryName },
                { withCredentials: true } // Include credentials in the request
            );

            toast.success(`Category "${response.data.name}" added successfully!`);
            categoryNameRef.current.value = ''; // Clear input after success
        } catch (error) {
            toast.error(error.response?.data.error || 'An error occurred while adding the category');
        }
    };

    return (
        <div className="add-categories-container mt-4">
            <h2 className="add-categories-title text-center text-white">Add New Category</h2>
            <form onSubmit={handleSubmit} className="add-categories-form mt-3">
                <div className="mb-3">
                    <label htmlFor="categoryName" className="form-label text-white">Category Name:</label>
                    <input
                        type="text"
                        id="categoryName"
                        className="form-control"
                        ref={categoryNameRef} // Use useRef here
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary add-categories-button">Add Category</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddCategories;
