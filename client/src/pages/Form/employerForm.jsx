import  { useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

import './FormStyles.css'; 

const EmployerRequestForm = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value,
    };
    
    try {
     
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/employer/employer-request`, data);
     if(response.status){
       nameRef.current.value = ''
       emailRef.current.value = ''
       messageRef.current.value = ''
     }
      alert('Thank you! We will get in touch with you soon.');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="form-section container-fluid d-flex justify-content-center align-items-center">
      <div className="row w-100" style={{ maxWidth: '1200px' }} >
        {/* Form Container */}
        <motion.div
          className="col-12 col-lg-6 form-container p-4 mb-4 " // Added margin bottom for small screens
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: -2 }}
          transition={{ duration: 0.8 }}
        >
          <form onSubmit={handleSubmit}>
            <h2 className="form-heading">Get in Touch with Us</h2>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Company Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                ref={nameRef}
                placeholder="Enter your Company Name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                ref={emailRef}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                className="form-control"
                id="message"
                ref={messageRef}
                rows="4"
                placeholder="Enter your message"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit</button>
          </form>
        </motion.div>

        {/* Text Container */}
        <motion.div
          className="col-12 col-lg-5 d-flex align-items-center justify-content-center text-container " // Added margin top for small screens
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 15 }}
          transition={{ duration: 0.8 }}
        >
          <p className="encouraging-text">
            Looking for reliable and professional labor services on a temporary contract basis?
            <br />
            We take care of all the paperwork, so you can focus on what matters. Connect with us today to get skilled workers delivered directly to your project.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default EmployerRequestForm;

