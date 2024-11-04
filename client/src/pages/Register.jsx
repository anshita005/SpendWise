import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error when user types
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const hasSixCharacters = password.length >= 6;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasSixCharacters && hasLetter && hasNumber && hasSpecialChar;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let emailError = '';
    let passwordError = '';

    if (!validateEmail(formData.email)) {
      emailError = 'Invalid email format';
    }

    if (!validatePassword(formData.password)) {
      passwordError = 'Password must contain at least 6 characters, including letters, numbers, and special characters';
    }

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    try {
      // await axios.post('/users/register', formData);
      await axios.post(`/users/register`, formData);


      toast.success("Registration Successful");
      navigate('/login');
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <ToastContainer />
      <div className="register-page"  style={{
        background: 'linear-gradient(to bottom right, #e0f7fa, #ffffff)', // Light blue gradient background
  
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
        
        <div className="d-flex vh-100">
          <div className="container my-auto">
            <div className="row justify-content-center">
              <div className="col-md-4">
                <div className="card p-4 shadow-lg">
                  <h4 className="text-center mb-4" style={{ color: '#002766' }}>Register</h4>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="InputName1" className="form-label">Name</label>
                      <input 
                        type="text" 
                        className="form-control form-control-sm" 
                        id="InputName1" 
                        name="name" 
                        onChange={handleChange} 
                        value={formData.name} 
                        style={{
                          backgroundColor: '#e6f0ff', // Light blue background for input
                          border: 'none',
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="InputEmail1" className="form-label">Email address</label>
                      <input 
                        type="email" 
                        className="form-control form-control-sm" 
                        id="InputEmail1" 
                        name="email" 
                        onChange={handleChange} 
                        value={formData.email} 
                        style={{
                          backgroundColor: '#e6f0ff', // Light blue background for input
                          border: 'none',
                        }}
                      />
                      {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="InputPassword1" className="form-label">Password</label>
                      <div className="input-group">
                        <input 
                          type={showPassword ? "text" : "password"} // Toggle between text and password
                          className="form-control form-control-sm" 
                          id="InputPassword1" 
                          name="password" 
                          onChange={handleChange} 
                          value={formData.password} 
                          autoComplete="new-password"
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
                      {errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>
                    <div className="mb-3 form-check">
                      <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                      <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <p className="mt-3">Already have an account? <Link to="/login"  style={{ color: '#002766' }}>Click here to login</Link></p>
                    <button  style={{
                    backgroundColor: '#002766', // Dark blue color for the button
                    borderColor: '#002766',
                    borderRadius: '5px',
                  }} type="submit" className="btn btn-primary w-100" >Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
