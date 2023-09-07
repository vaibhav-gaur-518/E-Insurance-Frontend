import React, { useState } from "react";
import { Navbar } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateCustomer.scss";
import axios from "axios";

const UpdateCustomer = () => {
  const navigateObject = new useNavigate();

  const userDetails = {
    name: localStorage.getItem('name'),
    username: localStorage.getItem('username'),
    role: localStorage.getItem('role'),
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId'),
    currCustomerId: useParams().customerId,
    currCustomerName: useParams().customerName,
    currCustomerEmail: useParams().customerEmail,
    currCustomerAddress: useParams().customerAddress,
    currCustomerStatus: useParams().customerStatus,
  };

  const [customerName, setCustomerName] = useState(
    userDetails.currCustomerName
  );
  const [customerEmail, setCustomerEmail] = useState(
    userDetails.currCustomerEmail
  );
  const [customerAddress, setCustomerAddress] = useState(
    userDetails.currCustomerAddress
  );
  const [customerStatus, setCustomerStatus] = useState(
    userDetails.currCustomerStatus
  );

  const update = async () => {
    const data = {
      user: {
        name: customerName,
        email: customerEmail,
        address: customerAddress,
        status: customerStatus,
      },
    };

    let response = await axios
      .put(
        `http://localhost:8080/api/v1/customer/update/${userDetails.currCustomerId}`,
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
        alert(err.message);
        return;
      });
  };

  const handleUpdate = async (e) => {
    update();
    navigateObject(
      `/viewCustomer`
    );
  };

  return (
    <>
      <div className="app__nav">
        <Navbar user={userDetails} />
      </div>

      <div className="viewcustomer">
        <h1>Update Agents</h1>
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
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
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
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
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
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
            />
          </div>
          <div class="col-md-4">
            <label for="inputState" class="form-label">
              Status
            </label>
            <select
              id="inputState"
              class="form-select"
              onChange={(e) => setCustomerStatus(e.target.value)}
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

export default UpdateCustomer;
