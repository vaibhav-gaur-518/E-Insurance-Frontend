import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../../components";
import "./ViewEmployee.scss";
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

  const [employees, setEmployee] = useState([]);

  const handleDelete = async (userId, status) => {
    if (status === "INACTIVE") {
      alert("Already Inactive");
    }
    try {
      let response = await axios.put(
        ` http://localhost:8080/api/v1/employee/delete/${userId}`,
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

  const handleUpdate = async (userId, name, email, address, status) => {
    navigateObject(
      `/updateEmp/${userId}/${name}/${email}/${address}/${status}`
    );
  };

  const getAllEmp = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8080/api/v1/employee/getallemp`,
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
            Authorization: `${userDetails.token}`,
          },
        }
      );
      if (response.data.user !== null) {
        setEmployee(response.data);
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
        <h1>View Employees</h1>
      </div>

      <section className="overflow-hidden">
        <div className="container">
          <div className="table-responsive">
            <table className="table table-bordered border-primary">
              <thead>
                <tr class="table-success">
                  <th scope="col">Serial No.</th>
                  <th scope="col">Employee ID</th>
                  <th scope="col">Employee Name</th>
                  <th scope="col">Employee Username</th>
                  <th scope="col">Employee Email</th>
                  <th scope="col">Employee Address</th>
                  <th scope="col">Employee Status</th>
                  <th scope="col">Update</th>
                  <th scope="col">Update Status</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => {
                  return (
                    <tr className="table-success">
                      <td>{index + 1}</td>
                      <td>{employee.employeeId}</td>
                      <td>{employee.user.name}</td>
                      <td>{employee.user.username}</td>
                      <td>{employee.user.email}</td>
                      <td>{employee.user.address}</td>
                      <td>{employee.user.status}</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-outline-secondary"
                          onClick={() =>
                            handleUpdate(
                              employee.employeeId,
                              employee.user.name,
                              employee.user.email,
                              employee.user.address,
                              employee.user.status
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
                            handleDelete(
                              employee.employeeId,
                              employee.user.status
                            )
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
