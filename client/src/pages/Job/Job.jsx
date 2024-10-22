import axios from 'axios'
import  { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import './job.css'
import { Link } from 'react-router-dom';
import JobApplicationForm from '../../component/JobApplication/JobApplicationForm';
import Pagination from '../../component/pagination/Pagination';

const Job = () => {
  const [category , setCategory] = useState([])
  const [selectedCategory , setSelectedCategory] = useState()
  const [job , setJob]= useState([])
  const [model ,setModel] = useState(false)
  const [selectedjob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [searchValue , setSearchValue] = useState('')
 const fetchData = async()=>{
 try {
  const response  =  await axios.get(
    `${import.meta.env.VITE_API_URL}/job-category/categories`)
    setCategory(response.data)
   
 } catch (error) {
  toast.error('an error occurred while fetching', error);
 }
 }

 useEffect(() => {
  fetchData(); 
}, []);

const fetchJob = useCallback(async () => {
  try {
      const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/job-listing/available-jobs`,
          {
              params: {
                  category: selectedCategory,
                  page: currentPage,
                  location: searchValue,
              },
          }
      );
      setJob(response.data.data);
      setTotalPages(response.data.totalPages);
  } catch (error) {
      alert('An error occurred while submitting. Try with other input.', error);
  }
}, [selectedCategory, currentPage, searchValue]); // Add dependencies

useEffect(() => {
  fetchJob(); // Call fetchJob within useEffect
}, [fetchJob]); 

const handleValue = (value)=>{
  setSelectedCategory(value)
 
}
const handleApplyJob=(job)=>{
   setModel(true)
   setSelectedJob(job)
  

}
const handleCloseModal = () => {
  setModel(false); // Close the modal when called
};
const handleSearchChange = (e)=>{
  setSearchValue(e.target.value)
  setCurrentPage(1)
}
  return (
    <div className="main-container container-fluid bg-light py-4">
      <div className="row">
        {/* Sticky Sidebar with Filter Radio Buttons */}
        <div className="col-md-3 mb-4">
          <div className="filter-sidebar p-3 bg-white shadow-sm rounded sticky-top">
            <h5 className="mb-3">Filter by Category</h5>
            <button className='btn btn-primary mb-3'
            onClick={()=> setSelectedCategory('')}
            >All Jobs</button>
            {category.map((item, index) => (
              <div className="form-check mb-2" key={index} style={{ backgroundColor: '#e9ecef', borderRadius: '5px', padding: '5px' }}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="categoryRadios"
                  id={`radio-${index}`}
                  value={item.name}
                 
                  onClick={() => handleValue(item.name)}
                />
                <label className="form-check-label" htmlFor={`radio-${index}`}>
                  {item.name}
                </label>
              
              </div>
            ))}
             <Link to='/'>
               <button className='btn btn-primary mt-3'>Back To Home</button>
               </Link>
          </div>
        </div>

        {/* Job Listings Section */}
        <div className="col-md-9">
          <div className="job-listing">
          <form className="d-flex" role="search"style={{ margin: '20px 0' }}>
      <input
        className="form-control me-2 search-input"
        type="search"
        placeholder="Search job with location"
        aria-label="Search"
        value={searchValue} 
        onChange={handleSearchChange} 
        style={{ backgroundColor: 'black', color: 'white' }}
      />
    </form>

            {job.length > 0 ? (
              job.map((item, index) => (
                <div key={index} className="job-card  p-4 mb-4 shadow-sm rounded text-center">
                  <h6 className="text-primary mb-2">Category: {item.category ? item.category.name : "No Category"}</h6>
                  <h4 className="job-title mb-2">Title: {item.title}</h4>
                  <h5 className="job-title mb-2">Description: {item.description}</h5>
                  <p className="text-muted">Location: {item.location}</p>
                  <p className="job-description">Requirement: {item.requirement}</p>
                  <button className="btn btn-primary mt-3"
                  onClick={(()=>handleApplyJob(item))}
                  >Apply</button>
                </div>
              ))
            ) : (
              <p>No jobs available for the selected category.</p>
            )}
          </div>
        </div>
      </div>
      {
        <JobApplicationForm
        model={model}
        selectedjob={selectedjob}
        onClose={handleCloseModal}
        />
      }
         <Pagination
      currentPage={currentPage}
      totalPage={totalPages}
      setCurrentPage={setCurrentPage}
      />
     
    </div>
);
  
}

export default Job