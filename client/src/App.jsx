
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import React Router
import Layout from './component/layout/Layout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import FeaturedServices from './pages/Service/Service';
import AreaOfEmployment from './pages/Employemt-Area/EmploymentArea';
import CandidateDetails from './pages/Form/Form';
import Job from './pages/Job/Job'; // Import the Job page component
import EmployerRequestForm from './pages/Form/employerForm';

const App = () => {
  return (
    <Router> {/* Wrap the content with Router */}
      <Routes>
        <Route path="/" element={(
          <Layout>
            <Home /> {/* Home section */}
            <About />
            <FeaturedServices />
            <AreaOfEmployment />
            <CandidateDetails />
            <EmployerRequestForm/>
          </Layout>
        )} />
        <Route path="/jobs" element={<Job />} /> {/* Job page as a separate route */}
      </Routes>
    </Router>
  );
};

export default App;
