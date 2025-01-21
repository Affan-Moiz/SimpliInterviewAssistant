import React, { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import '../styles/SignupPage.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    organization: '',
  });
  const [isLoading, setIsLoading] = useState(false); // Loader state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.role || !formData.organization) {
      alert('Please fill in all fields.');
      return;
    }

    setIsLoading(true); // Start loader
    console.log('Form Data:', formData);

    // Call the backend API to register the user
    fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        alert('User registered successfully!');
        setFormData({ name: '', email: '', password: '', role: '', organization: '' }); // Reset form
        setIsLoading(false); // Stop loader
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to register user.');
        setIsLoading(false); // Stop loader
      });
  };

  return (
    <div className="signup-page">
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
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
          <label>Role</label>
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="interviewer">Interviewer</option>
          </select>
        </div>
        <InputField
          label="Organization"
          type="text"
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          placeholder="Enter organization ID"
        />
        <Button text={isLoading ? 'Registering...' : 'Register'} type="submit" disabled={isLoading} />
      </form>
    </div>
  );
};

export default SignupPage;
