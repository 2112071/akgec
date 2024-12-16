import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Registration Form Component
const RegisterForm = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && email) {
      const user = { name, email };
      await onRegister(user);
      setName('');
      setEmail('');
    } else {
      alert('Please fill in both fields!');
    }
  };

  return (
    <div id="registerSection">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

// Employee List Component
const EmployeeList = ({ employees }) => {
  return (
    <div id="employeeSection">
      <h2>Employee List</h2>
      <div id="employeeGrid" className="grid">
        {employees.map((employee) => (
          <div key={employee.id} className="employee-card">
            <h3>{employee.name}</h3>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Company:</strong> {employee.company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [user, setUser] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Employee Data
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  // Register User (POST Request)
  const handleRegister = async (userData) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', userData);
      setUser({
        name: response.data.name,
        email: response.data.email
      });
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  // Fetch employees when the app loads
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="App">
      <RegisterForm onRegister={handleRegister} />

      {user && (
        <div id="userConfirmation">
          <h3>Welcome, {user.name}</h3>
          <p>Your email: {user.email}</p>
        </div>
      )}

      {loading ? (
        <p>Loading employees...</p>
      ) : (
        <EmployeeList employees={employees} />
      )}
    </div>
  );
};

export default App;
