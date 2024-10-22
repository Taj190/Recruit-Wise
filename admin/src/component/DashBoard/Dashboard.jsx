
import { useSelector } from 'react-redux'
import Sidebar from '../SideBar/SideBar'
import './Dashboard.css'
import { Outlet } from 'react-router-dom';
const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard Content */}
      <div className="dashboard-content">
        <h1>{`Welcome ${user.name}`}</h1>
      
        <Outlet /> 
      </div>
    </div>
  );
};

export default Dashboard