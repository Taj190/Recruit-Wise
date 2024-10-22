
import { Link } from 'react-router-dom';
import './header.css';


const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top"> {/* Added sticky-top class */}
      <div className="container-fluid">
        <img src="/logo.jpg" alt="Company Logo" className="logo" /> <span className='recruit'>Recruit</span>-<span className='wise'>Wise</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <a className="nav-link" href="#home">Home</a>
            <a className="nav-link" href="#about">About</a>
            <a className="nav-link" href="#featured-services">Service</a>
           
            <Link className="nav-link" to="/jobs">Jobs</Link> 
              
            <a className="nav-link" href="#contact">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
