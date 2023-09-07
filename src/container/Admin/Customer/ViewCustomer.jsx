import React, { useEffect, useState } from "react";
import "./ViewCustomer.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../../../components";

const ViewCustomer = () => {
  const navigateObject = new useNavigate();

  const userDetails = {
    name: localStorage.getItem("name"),
    username: localStorage.getItem("username"),
    role: localStorage.getItem("role"),
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId"),
  };

  const [customers, setCustomers] = useState([]);
  const [curragent, setCurragent] = useState([]);

  const handleDelete = async (userId, status) => {
    if (status === "INACTIVE") {
      alert("Already Inactive");
    }
    try {
      let response = await axios.put(
        ` http://localhost:8080/api/v1/customer/delete/${userId}`,
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
    getAllCustomer();
  };

  const handleUpdate = async (agentId, name, email, address, status) => {
    navigateObject(
      `/updatecustomer/${agentId}/${name}/${email}/${address}/${status}`
    );
  };

  const getAllCustomer = async () => {
    if (userDetails.role !== "agent") {
      try {
        let response = await axios.get(
          `http://localhost:8080/api/v1/customer/getall`,
          {
            headers: {
              "Content-Type": "application/json",
              withCredentials: true,
              Authorization: `${userDetails.token}`,
            },
          }
        );
        if (response.data.user !== null) {
          setCustomers(response.data);
        }
      } catch (error) {
        alert("Error");
        return;
      }
    }
    if(userDetails.role === "agent"){
      try {
        let response = await axios.get(
          `http://localhost:8080/api/v1/customer/get/${userDetails.username}`,
          {
            headers: {
              "Content-Type": "application/json",
              withCredentials: true,
              Authorization: `${userDetails.token}`,
            },
          }
        );
        if (response.data.user !== null) {
          setCustomers(response.data);
        }
      } catch (error) {
        alert("Error");
        return;
      }
    }
  };

  useEffect(() => {
    getAllCustomer();
  }, []);

  if (userDetails.role !== "agent") {
    return (
      <>
        <div className="app__nav">
          <Navbar user={userDetails} />
        </div>

        <div className="viewcustomer">
          <h1>View Customers</h1>
        </div>

        <section className="overflow-hidden">
          <div className="container ">
            <div className="table-responsive">
              <table className="table table-bordered border-primary">
                <thead>
                  <tr class="table-success">
                    <th scope="col">Serial No.</th>
                    <th scope="col">Customer ID</th>
                    <th scope="col">Agent ID</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Customer Username</th>
                    <th scope="col">Customer Email</th>
                    <th scope="col">City</th>
                    <th scope="col">State</th>
                    <th scope="col">Pincode</th>
                    <th scope="col">Customer Address</th>
                    <th scope="col">Date of birth</th>
                    <th scope="col">Nominee</th>
                    <th scope="col">Nominee Relation</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Status</th>
                    <th scope="col">Update</th>
                    <th scope="col">Update Status</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer, index) => {
                    return (
                      <tr className="table-success">
                        <td>{index + 1}</td>
                        <td>{customer.customerId}</td>
                        <td>{customer.agentId}</td>
                        <td>{customer.user.name}</td>
                        <td>{customer.user.username}</td>
                        <td>{customer.user.email}</td>
                        <td>{customer.city}</td>
                        <td>{customer.state}</td>
                        <td>{customer.pincode}</td>
                        <td>{customer.user.address}</td>
                        <td>{customer.dateOfBirth}</td>
                        <td>{customer.nominee}</td>
                        <td>{customer.nomineeRelation}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.user.status}</td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-outline-secondary"
                            onClick={() =>
                              handleUpdate(
                                customer.customerId,
                                customer.user.name,
                                customer.user.email,
                                customer.user.address,
                                customer.user.status
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
                                customer.customerId,
                                customer.user.status
                              )
                            }
                          >
                            Update Status
                          </button>
                        </td>
                      </tr>
                    );
                    // }
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <div className="app__nav">
        <Navbar user={userDetails} />
      </div>

      <div className="viewcustomer">
        <h1>View Customers</h1>
      </div>

      <section className="overflow-hidden">
        <div className="container ">
          <div className="table-responsive">
            <table className="table table-bordered border-primary">
              <thead>
                <tr class="table-success">
                  <th scope="col">Serial No.</th>
                  <th scope="col">Customer ID</th>
                  <th scope="col">Agent ID</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Customer Username</th>
                  <th scope="col">Customer Email</th>
                  <th scope="col">City</th>
                  <th scope="col">State</th>
                  <th scope="col">Pincode</th>
                  <th scope="col">Customer Address</th>
                  <th scope="col">Date of birth</th>
                  <th scope="col">Nominee</th>
                  <th scope="col">Nominee Relation</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => {
                  return (
                    <tr className="table-success">
                      <td>{index + 1}</td>
                      <td>{customer.customerId}</td>
                      <td>{customer.agentId}</td>
                      <td>{customer.user.name}</td>
                      <td>{customer.user.username}</td>
                      <td>{customer.user.email}</td>
                      <td>{customer.city}</td>
                      <td>{customer.state}</td>
                      <td>{customer.pincode}</td>
                      <td>{customer.user.address}</td>
                      <td>{customer.dateOfBirth}</td>
                      <td>{customer.nominee}</td>
                      <td>{customer.nomineeRelation}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.user.status}</td>
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

export default ViewCustomer;
