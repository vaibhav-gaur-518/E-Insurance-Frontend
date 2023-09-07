import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../../components";
import "./ViewAgent.scss";
import axios from "axios";

const ViewEmployee = () => {
  const navigateObject = new useNavigate();

  const userDetails = {
    name: localStorage.getItem('name'),
    username: localStorage.getItem('username'),
    role:localStorage.getItem('role'),
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId'),
  };

  const [agents, setAgents] = useState([]);

  const handleDelete = async (userId, status) => {
    if (status === "INACTIVE") {
      alert("Already Inactive");
    }
    try {
      let response = await axios.put(
        ` http://localhost:8080/api/v1/agent/delete/${userId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
            Authorization: `${userDetails.token}`,
          },
        }
      );
    } catch (error) {
      alert("Error");
      return;
    }
    getAllEmp();
  };

  const handleUpdate = async (agentId, name, email, address, status) => {
    navigateObject(
      `/updateagent/${agentId}/${name}/${email}/${address}/${status}`
    );
  };

  const getAllEmp = async () => {
    try {
      let response = await axios.get(`http://localhost:8080/api/v1/agent`, {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
          Authorization: `${userDetails.token}`,
        },
      });
      console.log(response.data);
      if (response.data.user !== null) {
        setAgents(response.data);
      }
    } catch (error) {
      alert("Error");
      return;
    }
  };

  useEffect(() => {
    getAllEmp();
  }, []);

  return (
    <>
      <div className="app__nav">
        <Navbar user={userDetails} />
      </div>

      <div className="viewemp">
        <h1>View Agents</h1>
      </div>

      <section className="overflow-hidden">
        <div className="container ">
          <div className="table-responsive">
            <table className="table table-bordered border-primary">
              <thead>
                <tr class="table-success">
                  <th scope="col">Serial No.</th>
                  <th scope="col">Agent ID</th>
                  <th scope="col">Agent Code</th>
                  <th scope="col">Qualification</th>
                  <th scope="col">Agent Name</th>
                  <th scope="col">Agent Username</th>
                  <th scope="col">Agent Email</th>
                  <th scope="col">Agent Address</th>
                  <th scope="col">Agent Status</th>
                  <th scope="col">Update</th>
                  <th scope="col">Update Status</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent, index) => {
                  return (
                    <tr className="table-success">
                      <td>{index + 1}</td>
                      <td>{agent.agentId}</td>
                      <td>{agent.agentCode}</td>
                      <td>{agent.qualification}</td>
                      <td>{agent.user.name}</td>
                      <td>{agent.user.username}</td>
                      <td>{agent.user.email}</td>
                      <td>{agent.user.address}</td>
                      <td>{agent.user.status}</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-outline-secondary"
                          onClick={() =>
                            handleUpdate(
                              agent.agentId,
                              agent.user.name,
                              agent.user.email,
                              agent.user.address,
                              agent.user.status
                            )
                          }
                        >
                          Update
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-outline-danger"
                          onClick={() =>
                            handleDelete(agent.agentId, agent.user.status)
                          }
                        >
                          Update Status
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewEmployee;
