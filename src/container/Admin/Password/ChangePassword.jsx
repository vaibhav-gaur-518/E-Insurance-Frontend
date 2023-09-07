import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../../../components";
import { toast } from "react-hot-toast";

const ChangePassword = () => {
  const navigateObject = new useNavigate();
  
  const userDetails = {
    name: localStorage.getItem('name'),
    username: localStorage.getItem('username'),
    role:localStorage.getItem('role'),
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId'),
  };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirect, setRedirect] = useState(false)

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  const Add = async () => {
    if (password == "" || confirmPassword == ""){
      alert("Both Field Required");
      return
    }

    if (password !== confirmPassword) {
      alert("Password Didn't Match");
      return
    }

    if (!passwordRegex.test(password)) {
      alert("Invalid password format. Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.");
      return;
    }

    const data = {
      password: password,
    };

    let response = await axios
      .put(`http://localhost:8080/user/password/${userDetails.userId}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${userDetails.token}`,
        },
        withCredentials: true,
      })
      .catch((err) => {
        alert("Error");
        return
      });
    setRedirect(true)
  };

  const handleAdd = async (e) => {
    e.preventDefault(); 
    await Add(); 

    if (redirect) {
      alert("Password Changed Successfully. Please Login Again");
      navigateObject(`/logout`);
    }
  };

  return (
    <>
      <div className="app__nav">
        <Navbar user={userDetails} />
      </div>

      <div className="viewemp">
        <h1>Update Password</h1>
      </div>

      <div className="container">
        <form class="row g-3">
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="inputEmail4"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              class="form-control"
              id="inputEmail4"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-primary" onClick={handleAdd}>
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
