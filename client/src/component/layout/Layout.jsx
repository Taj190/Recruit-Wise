
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';  // Import PropTypes
import './Layout.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Helmet>
        <title>Flexible Employment Solutions | Portugal Workforce</title>
        <meta name="description" content="Providing temporary labor solutions in Portugal. Connecting employers with skilled labor for short-term contracts. Efficient and reliable workforce management." />
        <meta name="keywords" content="temporary labor, labor solutions, workforce management, Portugal, temporary contracts, labor for hire, skilled labor, employer services, short-term jobs" />
      </Helmet>
      
      <Header />
      
      <main className="content">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

// Add propTypes for validation
Layout.propTypes = {
  children: PropTypes.node.isRequired, // Specify that children is required
};

export default Layout;
