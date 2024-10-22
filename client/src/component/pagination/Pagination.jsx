import PropTypes from 'prop-types'; // Import PropTypes
import './Pagination.css'; // Import your custom CSS file

const Pagination = ({ currentPage, totalPage, setCurrentPage }) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="pagination-container d-flex justify-content-center align-items-center my-3">
      <button
        className="btn btn-outline-primary mx-2"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <span className="pagination-info mx-3">
        {`Page ${currentPage} of ${totalPage}`}
      </span>
      <button
        className="btn btn-outline-primary mx-2"
        onClick={handleNext}
        disabled={currentPage === totalPage}
      >
        Next
      </button>
    </div>
  );
};

// Define prop types
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired, // currentPage must be a number and is required
  totalPage: PropTypes.number.isRequired,   // totalPage must be a number and is required
  setCurrentPage: PropTypes.func.isRequired, // setCurrentPage must be a function and is required
};

export default Pagination;

