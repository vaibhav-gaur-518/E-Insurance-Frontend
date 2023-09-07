import React, { useState } from "react";
import { Navbar } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateAgent.scss";
import axios from "axios";

const UpdateEmployee = () => {
  const navigateObject = new useNavigate();

  const userDetails = {
    name: localStorage.getItem('name'),
    username: localStorage.getItem('username'),
    role: localStorage.getItem('role'),
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId'),
    currAgentId: useParams().agentId,
    currAgentName: useParams().agentName,
    currAgentEmail: useParams().agentEmail,
    currAgentAddress: useParams().agentAddress,
    currAgentStatus: useParams().agentStatus,
  };

  const [agentName, setAgentName] = useState(userDetails.currAgentName);
  const [agentEmail, setAgentEmail] = useState(userDetails.currAgentEmail);
  const [agentAddress, setAgentAddress] = useState(
    userDetails.currAgentAddress
  );
  const [agentStatus, setAgentStatus] = useState(userDetails.currAgentStatus);

  const update = async () => {
    const data = {
      user: {
        name: agentName,
        email: agentEmail,
        address: agentAddress,
        status: agentStatus,
      },
    };

    let response = await axios
      .put(
        `http://localhost:8080/api/v1/agent/update/${userDetails.currAgentId}`,
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
      `/viewagent`
    );
  };

  return (
    <>
      <div className="app__nav">
        <Navbar user={userDetails} />
      </div>

      <div className="viewemp">
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
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
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
              value={agentEmail}
              onChange={(e) => setAgentEmail(e.target.value)}
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
              value={agentAddress}
              onChange={(e) => setAgentAddress(e.target.value)}
            />
          </div>
          <div class="col-md-4">
            <label for="inputState" class="form-label">
              Status
            </label>
            <select
              id="inputState"
              class="form-select"
              onChange={(e) => setAgentStatus(e.target.value)}
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
