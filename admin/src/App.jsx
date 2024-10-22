import  { useEffect } from 'react'; 
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './component/Form/LoginForm';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
import Dashboard from './component/DashBoard/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './features/auth/authSlice';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './app/store';
import Cookies from 'js-cookie'; // Assuming you are using the js-cookie library
import AddJob from './pages/AddJob';
import ApplicationsPage from './pages/ApplicantsPage';
import JobListing from './pages/AllJobs';
import AddCategories from './pages/AddCategories';
import AllCategories from './pages/AllCategories';
import JobApplications from './pages/JobApplications';
import NotFound from './component/NotFound/NotFound';

const App = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  // Helper function to check for token in cookies
  const tokenExists = () => {
    const token = Cookies.get('token'); // Assuming the token is saved in a cookie named 'token'
    return token ? true : false;
  };

  useEffect(() => {
    if (tokenExists()) {
      dispatch(checkAuth());  
    }
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>; // You can show a loading screen here
  }

  return (
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />}/>
        <Route path="/login" element={<LoginForm />} />
        
        <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="" element={<Dashboard />}> {/* Keep the Dashboard layout */}
          <Route index element={<ApplicationsPage/>} /> {/* Default content */}
          <Route path="add-job" element={<AddJob />} /> {/* AddJob content */}
          <Route path="add-category" element={<AddCategories />} /> {/* AddJob content */}
          <Route path="all-category" element={<AllCategories />} /> {/* AddJob content */}
          <Route path="all-jobs" element={<JobListing />} /> {/* AddJob content */}
          <Route path="job-application" element={<JobApplications />} /> {/* AddJob content */}
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
      </Routes>
    </PersistGate>
  );
};

export default App;
