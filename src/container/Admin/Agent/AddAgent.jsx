import React, { useEffect, useState } from "react";
import "./AddAgent.scss";
import { Navbar } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddEmployee = () => {
  const navigateObject = new useNavigate();

  const userDetails = {
    name: localStorage.getItem('name'),
    username: localStorage.getItem('username'),
    role:localStorage.getItem('role'),
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId'),
  };

  const [agentCode, setAgentCode] = useState("");
  const [qualification, setQualification] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeUsername, setEmployeeUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeeAddress, setEmployeeAddress] = useState("");
  const [employeeStatus, setEmployeeStatus] = useState("");
  const [role, setRole] = useState("");

  const Add = async () => {
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

    if (usernames.data.includes(employeeUsername)) {
      alert("Username already exists");
      return;
    }

    if (emails.data.includes(employeeEmail)) {
      alert("Username already exists");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password Didn't Match");
      return;
    }

    const data = {
      agentCode: agentCode,
      qualification: qualification,
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
    console.log(data);
    let response = await axios
      .post(`http://localhost:8080/api/v1/agent/save`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${userDetails.token}`,
        },
        withCredentials: true,
      })
      .catch((err) => {
        alert("Only User And Admin can add new agent");
        return;
      });
  };

  const handleAdd = async (e) => {
    Add();
    navigateObject(
      `/viewagent`
    );
  };

  return (
    <>
      <div className="app__nav">
        <Navbar user={userDetails} />
      </div>

      <div className="viewemp">
        <h1>Add New Agent</h1>
      </div>

      <div className="container">
        <form class="row g-3">
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              Agent Code
            </label>
            <input
              type="text"
              class="form-control"
              id="inputEmail4"
              onChange={(e) => setAgentCode(e.target.value)}
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              Qualification
            </label>
            <input
              type="text"
              class="form-control"
              id="inputEmail4"
              onChange={(e) => setQualification(e.target.value)}
            />
          </div>
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
              <option value="agent">Agent</option>
            </select>
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-primary" onClick={handleAdd}>
              Add Agent
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddEmployee;
