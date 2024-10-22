import  { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AllCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editCategoryId, setEditCategoryId] = useState(null); // Track the category being edited
    const [newCategoryName, setNewCategoryName] = useState(''); // New category name input

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/job-category/categories`, {
                    withCredentials: true, // Send credentials with the request
                });
               
                setCategories(response.data);
            }catch (error) {
                const errorMessage = error.response?.data?.message || 'failed to get categories.';
                toast.error(errorMessage);
            }
             finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Delete category
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/job-category/category/${id}`, {
                    withCredentials: true,
                });
                setCategories(categories.filter((category) => category._id !== id));
                toast.success('Category deleted successfully!');
            } catch (error) {
                toast.error(`${error} Failed to delete category`);
            }
        }
    };

    // Update category
    const handleUpdate = async (id) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/job-category/category/${id}`,
                { name: newCategoryName }, // Send new category name
                { withCredentials: true }
            );
            // Update the categories state with the updated category
            setCategories(categories.map(category => category._id === id ? response.data : category));
            setEditCategoryId(null); // Reset the editing state
            setNewCategoryName(''); // Clear the input
            toast.success('Category updated successfully!');
        } catch (error) {
            toast.error(`${error} Failed to update category`);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    return (
        <div className="all-categories-container mt-4">
            <h2 className="text-center text-white">All Categories</h2>
            <table className="table table-bordered mt-3">
                <thead>
                    <tr>
                        <th scope="col">Category Name</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category._id}>
                            <td>
                                {editCategoryId === category._id ? (
                                    <input
                                        type="text"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter new category name"
                                    />
                                ) : (
                                    category.name
                                )}
                            </td>
                            <td>
                                {editCategoryId === category._id ? (
                                    <>
                                        <button
                                            className="btn btn-success me-2"
                                            onClick={() => handleUpdate(category._id)}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => {
                                                setEditCategoryId(null); // Cancel editing
                                                setNewCategoryName(''); // Clear input
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="btn btn-warning me-2"
                                            onClick={() => {
                                                setEditCategoryId(category._id); // Set category to edit
                                                setNewCategoryName(category.name); // Set the current name to the input
                                            }}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(category._id)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
};

export default AllCategories;
