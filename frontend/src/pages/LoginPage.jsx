import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '', // Added for role selection
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.role) {
      alert('Please select a role before logging in.');
      return;
    }

    console.log('Login Data:', formData);

    // Call the backend API to log in the user
    fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data); // Log response for debugging
        if (data.token && data.role === formData.role) {
          console.log('Login successful!');
          alert('Login successful!');
          localStorage.setItem('token', data.token); // Store token in localStorage

          // Redirect based on the selected role
          if (formData.role === 'interviewer') {
            navigate('/start-interview');
          } else if (formData.role === 'manager') {
            navigate('/manager-dashboard');
          } else {
            alert(`Dashboard for ${formData.role} is not available yet.`);
          }
        } else if (data.role !== formData.role) {
          alert(`Role mismatch: You selected "${formData.role}" but your account role is "${data.role}".`);
        } else {
          alert('Invalid email or password');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to log in.');
      });
  };

  return (
    <div className="login-page">
      <h1>Welcome Back!</h1>
      <p className="login-subtitle">Please log in to continue.</p>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />

        <div className="input-field">
          <label>Select Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select your role</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="interviewer">Interviewer</option>
          </select>
        </div>

        <Button text="Login" type="submit" />
      </form>
    </div>
  );
};

export default LoginPage;
