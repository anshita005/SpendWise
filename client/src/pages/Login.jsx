import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error when user types
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let emailError = '';
    let passwordError = '';

    if (!validateEmail(formData.email)) {
      emailError = 'Invalid email format';
    }

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, formData);
      console.log(formData);
      toast.success('Login Successful');
      localStorage.setItem("user", JSON.stringify({ ...data.user, password: '' }));
      navigate('/');
    } catch (error) {
      toast.error('Invalid username or password');
    }
  };

  return (
    <>
      <div className="login-page" style={{
        background: 'linear-gradient(to bottom right, #e0f7fa, #ffffff)', // Light blue gradient background
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div className="container my-auto">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="card p-4 shadow-lg" style={{
                backgroundColor: '#ffffff', 
                borderRadius: '10px',
                opacity: 0.95,
              }}>
                <h4 className="text-center mb-4" style={{ color: '#002766' }}>Login</h4>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="InputEmail1" className="form-label" style={{ fontWeight: 'bold', color: '#002766' }}>Email address</label>
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      id="InputEmail1"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        backgroundColor: '#e6f0ff', // Light blue background for input
                        border: 'none',
                      }}
                    />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="InputPassword1" className="form-label" style={{ fontWeight: 'bold', color: '#002766' }}>Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"} // Toggle between text and password
                        className="form-control form-control-sm"
                        id="InputPassword1"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        autoComplete="current-password"
                        style={{
                          backgroundColor: '#e6f0ff', // Light blue background for input
                          border: 'none',
                        }}
                      />
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary" 
                        onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                      >
                        <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i> {/* Eye icon */}
                      </button>
                    </div>
                  </div>
                  <p className="mt-3" style={{ fontSize: '14px' }}>
                    Not a user? <Link to="/register" style={{ color: '#002766' }}>Click here to register</Link>
                  </p>
                  <button className="btn btn-primary w-100" type="submit" style={{
                    backgroundColor: '#002766', // Dark blue color for the button
                    borderColor: '#002766',
                    borderRadius: '5px',
                  }}>
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
