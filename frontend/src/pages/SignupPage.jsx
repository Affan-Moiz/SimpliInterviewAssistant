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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to register user.');
      });
  };

  return (
    <div className="signup-page">
      <h1>Sign Up</h1>
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
        <InputField
          label="Role"
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="e.g., admin, manager, interviewer"
        />
        <InputField
          label="Organization"
          type="text"
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          placeholder="Enter organization ID"
        />
        <Button text="Register" type="submit" />
      </form>
    </div>
  );
};

export default SignupPage;
