import React, { useState } from "react";
import { Navbar } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateEmployee.scss";
import axios from "axios";

const UpdateEmployee = () => {
  const navigateObject = new useNavigate();

  const userDetails = {
    name: localStorage.getItem('name'),
    username: localStorage.getItem('username'),
    role: localStorage.getItem('role'),
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId'),
    employeeId: useParams().empUserId,
    employeeName: useParams().empName,
    employeeEmail: useParams().empEmail,
    employeeAddress: useParams().empAddress,
    employeeStatus: useParams().empStatus,
  };
  console.log(userDetails.employeeStatus);

  const [employeeName, setEmployeeName] = useState(userDetails.employeeName);
  const [employeeEmail, setEmployeeEmail] = useState(userDetails.employeeEmail);
  const [employeeAddress, setEmployeeAddress] = useState(
    userDetails.employeeAddress
  );
  const [employeeStatus, setEmployeeStatus] = useState(
    userDetails.employeeStatus
  );

  const update = async () => {
    console.log(employeeStatus);
    const data = {
      user: {
        name: employeeName,
        email: employeeEmail,
        address: employeeAddress,
        status: employeeStatus,
      },
    };

    let response = await axios
      .put(
        `http://localhost:8080/api/v1/employee/update/${userDetails.employeeId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${userDetails.token}`,
          },
          withCredentials: true,
        }
      )
      .catch((err) => {
        alert("Error");
        return;
      });
  };

  const handleUpdate = async (e) => {
    update();
    navigateObject(
      `/viewemployee`
    );
  };

  return (
    <>
      <div className="app__nav">
        <Navbar user={userDetails} />
      </div>

      <div className="viewemp">
        <h1>Update Employees</h1>
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
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
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
              value={employeeEmail}
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
              value={employeeAddress}
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
          <div class="col-12">
            <button
              type="submit"
              class="btn btn-primary"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateEmployee;
