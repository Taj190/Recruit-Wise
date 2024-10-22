import  { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';

const Addjob = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [requirement, setRequirement] = useState('');
  const [requirementsList, setRequirementsList] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/job-category/categories`, {
          withCredentials: true, // Send credentials with the request
        });
        setCategories(response.data); // Set the categories state with fetched data
      } catch (error) {
        toast.error(`${error} Failed to fetch categories`);
      }
    };

    fetchCategories();
  }, []);
  // Function to handle adding a requirement to the list
  const addRequirement = () => {
    if (requirement.trim() !== '') {
      setRequirementsList([...requirementsList, requirement]);
      setRequirement('');
    } else {
      toast.error('Please enter a valid requirement');
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobData = {
      category: selectedCategory,
      title,
      description,
      location,
      requirement: requirementsList,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/job-listing/job-post`,
        jobData,
        { withCredentials: true }
      );
      
      if (response.data.success) {
        toast.success('Job posted successfully!');
        // Clear form fields after successful submission
        setSelectedCategory('');
        setTitle('');
        setDescription('');
        setLocation('');
        setRequirementsList([]);
      } else {
        toast.error('Failed to post the job. Please try again.');
      }
    } catch (error) {
      toast.error(`${error} An error occurred while posting the job.`);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className='text-white'>Post a Job</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
  <label htmlFor="category" className="form-label text-white">Job Category</label>
  <select
    className="form-select form-select-lg" // Use larger select for better touch targets
    id="category"
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    required
  >
    <option value="">Select a category</option>
    {categories.map((category) => (
      <option key={category._id} value={category._id}>
        {category.name}
      </option>
    ))}
  </select>
</div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label text-white">Job Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label text-white">Job Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="location" className="form-label text-white">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="requirement" className="form-label text-white">Requirement</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="requirement"
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
            />
            <button type="button" className="btn btn-primary" onClick={addRequirement}>
              Add Requirement
            </button>
          </div>
        </div>

        <ul className="list-group mb-3">
          {requirementsList.map((req, index) => (
            <li key={index} className="list-group-item">{req}</li>
          ))}
        </ul>

        <button type="submit" className="btn btn-success">Post Job</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Addjob;
