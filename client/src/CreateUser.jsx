import axios from "axios";
import React, { useState } from "react";
import { addUser } from "./redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object to represent the user data
    const userData = {
      name: name,
      email: email,
      age: age,
    };

    axios.post('http://localhost:3001/create', userData)
      .then((res) => {
        dispatch(addUser(res.data));
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add User</h2>
          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="age">Age</label>
            <input
              type="text"
              id="age"
              placeholder="Enter Age"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button className="btn btn-success" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
