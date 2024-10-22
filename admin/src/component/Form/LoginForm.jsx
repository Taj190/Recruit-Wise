import  {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../features/auth/authSlice';
import './LoginForm.css'; // Import the CSS file

const LoginForm = () => {
  const [email, setEmail] = useState('');  // State to store email
  const [password, setPassword] = useState(''); // State to store password
  const dispatch = useDispatch(); // To dispatch actions
  const navigate = useNavigate(); // To navigate to different pages

  const { status, error } = useSelector((state) => state.auth); // Access auth state from Redux store

  const handleSubmit = (e) => {
    e.preventDefault();  
    dispatch(login({ email, password })).then((result) => {

      if (result.type === 'auth/login/fulfilled') {
        navigate('/dashboard');
      }
    });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h3 className="text-center mb-4">Login</h3>
        {error && <div className="error-message">{error}</div>} {/* Display error if present */}
        
        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit button */}
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
