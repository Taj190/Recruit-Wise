
import { PhoneOutlined, MailOutlined } from '@ant-design/icons';
import logo from '../../../public/logo.jpg'; // Import your logo image
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer" id='contact'>
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <izmg src={logo} alt="Logo" className="footer-logo-image" />
            <p><span className='recruit'>Recruit</span>-<span className='wise'>Wise</span></p>
          </div>
          <div className="footer-info">
            <div className="contact">
              <p>
                <MailOutlined /> Email: <a href="mailto:geral@recruitwise.pt">geral@recruitwise.pt</a>
              </p>
              <p>
                <MailOutlined /> For Job Enquiry : <a href="mailto:rh@recruitwise.pt">rh@recruitwise.pt</a>
              </p>
              <p>
                <PhoneOutlined /> Phone: <span>243073019</span>
              </p>
            </div>
          </div>
          <div className="service-section">
            <h3>Services</h3>
            <ul className="service-list">
              <li>1. Temporary Employment</li>
              <li>2. Provision of Services</li>
              <li>3. Recruitment</li>
            </ul>
          </div>
          <div className="map-container">
            <h3>Our Location</h3>
            <div className="map-wrapper">
              <iframe className = 'map'
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3085.7581419500684!2d-8.938825924187476!3d39.339064871633184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd18b8c5520baed1%3A0x504751fd9b93e738!2sR.%20Mariano%20de%20Carvalho%2026%2C%20Rio%20Maior!5e0!3m2!1sen!2spt!4v1730550208098!5m2!1sen!2spt" width="400"  
              height="300"  style={{ border: 0 }} 
              allowFullScreen="" loading="lazy"></iframe>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Recruit-Wise. All Rights Reserved.</p>
          <ul className="footer-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Job</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
