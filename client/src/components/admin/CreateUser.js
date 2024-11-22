import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CreateUser = () => {
  const [inputData, setInputData] = useState({
    firstname: '',
    lastName: '',
    identity: '',
    email: '',
    phone: '',
    age: '',
    role: '',
    image: null, // New field for storing image data
  });

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  // Handle file input changes (convert to Base64 for simplicity)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInputData({ ...inputData, image: reader.result }); // Store Base64 image data
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit form data to the backend
  const addUser = (e) => {
    e.preventDefault();

    fetch('http://localhost:8001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to create user.');
        }
        return res.json();
      })
      .then((createdUser) => {
        alert('User created successfully!');
        console.log('Created User:', createdUser);

        // Clear form fields after success
        setInputData({
          firstname: '',
          lastName: '',
          identity: '',
          email: '',
          phone: '',
          age: '',
          role: '',
          image: null,
        });
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        alert('Failed to create user. Please try again.');
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="card col-md-10 col-lg-8">
          <div className="card-header">
            <h4>Create New User</h4>
          </div>
          <form className="row g-3 mt-3" onSubmit={addUser}>
            <div className="col-6">
              <input
                name="firstname"
                type="text"
                value={inputData.firstname}
                className="form-control"
                placeholder="Enter First Name"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-6">
              <input
                name="lastName"
                type="text"
                value={inputData.lastName}
                className="form-control"
                placeholder="Enter Last Name"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-6">
              <input
                name="identity"
                type="text"
                value={inputData.identity}
                className="form-control"
                placeholder="Enter Identity Number"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-6">
              <input
                name="email"
                type="email"
                value={inputData.email}
                className="form-control"
                placeholder="Enter Email"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-6">
              <input
                name="phone"
                type="text"
                value={inputData.phone}
                className="form-control"
                placeholder="Enter Phone Number"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-6">
              <input
                name="age"
                type="number"
                value={inputData.age}
                className="form-control"
                placeholder="Enter Age"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <select
                name="role"
                className="form-select"
                value={inputData.role}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="superAdmin">Super Admin</option>
              </select>
            </div>
            <div className="col-md-6">
              <input
                name="image"
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <div className="col-12 mb-3 mt-5">
              <button type="submit" className="btn btn-primary me-3">
                Save [+]
              </button>
              <Link to="/users" className="btn btn-dark">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
