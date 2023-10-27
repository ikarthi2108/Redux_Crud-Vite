import axios from "axios";
import React, { useState, useEffect } from "react";
import { addUser, updateUser } from "./redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.users.users);
  const user = users.find((u) => u.id === id);
  
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    
    console.log("Handling update...");
    
    const userData = {
      id,
      name,
      email,
      age,
    };
    
    console.log("Updating user data:", userData);
    
    axios
      .put("http://localhost:3001/update/" + id, userData)
      .then((res) => {
        console.log("Update successful!");
        dispatch(updateUser(userData));
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleUpdate}>
          <h2>Update User</h2>
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
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
