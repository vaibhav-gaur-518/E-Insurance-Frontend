import React, { useEffect, useState } from "react";
import "./AddEmployee.scss";
import { Navbar } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddEmployee = () => {
  const navigateObject = new useNavigate();

  const userDetails = {
    name: localStorage.getItem("name"),
    username: localStorage.getItem("username"),
    role: localStorage.getItem("role"),
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId"),
  };

  const [employeeName, setEmployeeName] = useState("");
  const [employeeUsername, setEmployeeUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeeAddress, setEmployeeAddress] = useState("");
  const [employeeStatus, setEmployeeStatus] = useState("");
  const [role, setRole] = useState("");

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9_]{6,}$/;
    return regex.test(username);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
  };

  const validateForm = () => {
    if (
      !employeeName ||
      !employeeUsername ||
      !password ||
      !confirmPassword ||
      !employeeEmail ||
      !employeeAddress ||
      !employeeStatus ||
      !role
    ) {
      alert("Please fill in all fields");
      return false;
    }

    if (!validateUsername(employeeUsername)) {
      alert(
        "Invalid username. Username should be at least 6 characters long and contain only letters, numbers or underscores."
      );
      return false;
    }

    if (!validateEmail(employeeEmail)) {
      alert("Invalid email address");
      return false;
    }

    if (!validatePassword(password)) {
      alert(
        "Invalid password. Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      );
      return false;
    }

    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match");
      return false;
    }

    return true;
  };

  const Add = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      let usernames = await axios
        .get(`http://localhost:8080/user/username`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${userDetails.token}`,
          },
          withCredentials: true,
        })
        .catch((err) => {
          alert("Error");
          return;
        });

      if (usernames.data.includes(employeeUsername)) {
        alert("Username already exists");
        return;
      }

      let emails = await axios
        .get(`http://localhost:8080/user/email`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${userDetails.token}`,
          },
          withCredentials: true,
        })
        .catch((err) => {
          alert("Error");
          return;
        });

      if (emails.data.includes(employeeEmail)) {
        alert("Username already exists");
        return;
      }

      const data = {
        user: {
          name: employeeName,
          username: employeeUsername,
          password: password,
          role: role,
          email: employeeEmail,
          address: employeeAddress,
          status: employeeStatus,
        },
      };

      let response;
      if (role === "admin") {
        response = await axios
          .post(`http://localhost:8080/admin/save`, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${userDetails.token}`,
            },
            withCredentials: true,
          })
          .catch((err) => {
            alert("Error");
            return;
          });
      } else if (role === "employee") {
        response = await axios
          .post(`http://localhost:8080/api/v1/employee/save`, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${userDetails.token}`,
            },
            withCredentials: true,
          })
          .catch((err) => {
            alert("Error");
            return;
          });
      }

      if (response) {
        alert("Employee added successfully");
        navigateObject("/viewemployee");
      } else {
        alert("Error occurred while adding the employee");
      }

    } catch (err) {
      alert("Error occurred while adding the employee");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    Add();
  };

  return (
    <>
      <div className="app__nav">
        <Navbar user={userDetails} />
      </div>

      <div className="viewemp">
        <h1>Add New Employee</h1>
      </div>

      <div className="container">
        <form class="row g-3">
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              Name
            </label>
            <input
              type="text"
              class="form-control"
              id="inputEmail4"
              onChange={(e) => setEmployeeName(e.target.value)}
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              Username
            </label>
            <input
              type="text"
              class="form-control"
              id="inputEmail4"
              onChange={(e) => setEmployeeUsername(e.target.value)}
            />
          </div>
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
          <div class="col-md-6 mb-3">
            <label for="inputPassword4" class="form-label">
              Email
            </label>
            <input
              type="email"
              class="form-control"
              id="inputPassword4"
              onChange={(e) => setEmployeeEmail(e.target.value)}
            />
          </div>
          <div class="col-12">
            <label for="inputAddress" class="form-label">
              Address
            </label>
            <input
              type="text"
              class="form-control"
              id="inputAddress"
              onChange={(e) => setEmployeeAddress(e.target.value)}
            />
          </div>
          <div class="col-md-4">
            <label for="inputState" class="form-label">
              Status
            </label>
            <select
              id="inputState"
              class="form-select"
              onChange={(e) => setEmployeeStatus(e.target.value)}
            >
              <option selected>Select</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
          <div class="col-md-4">
            <label for="inputState" class="form-label">
              Role
            </label>
            <select
              id="inputState"
              class="form-select"
              onChange={(e) => setRole(e.target.value)}
            >
              <option selected>Select</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-primary" onClick={handleAdd}>
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddEmployee;
