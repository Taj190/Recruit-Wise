import  { useState } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';
import Logout from '../logout/Logout'
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <span className="hamburger-icon">☰</span>
      </button>

      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Job Tracker</h3>
        </div>
        
        <div className="sidebar-links">
          <Link to="/dashboard" className="sidebar-link">
            <i className="bi bi-house-door"></i>
            <span>Home</span>
          </Link>

          <Link to="add-category" className="sidebar-link">
            <i className="bi bi-briefcase"></i>
            <span>Add Categories</span>
          </Link>

          <Link to="all-category" className="sidebar-link">
            <i className="bi bi-briefcase"></i>
            <span>All Categories</span>
          </Link>
          
          <Link to="/dashboard/add-job"  className="sidebar-link">
            <i className="bi bi-plus-circle"></i>
            <span>Add Job</span>
          </Link>

         
          <Link to="all-jobs" className="sidebar-link">
            <i className="bi bi-briefcase"></i>
            <span>All Jobs</span>
          </Link>
          <Link to="job-application" className="sidebar-link">
            <i className="bi bi-briefcase"></i>
            <span>Job Application</span>
          </Link>

        </div>
        
        <div className="sidebar-footer">
          <div className="logout-btn">
            <i className="bi bi-box-arrow-right"></i>
            <span><Logout/></span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;