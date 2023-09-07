import React, { useEffect, useState } from "react";
import "./ViewInsurancePlan.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../../components";
import axios from "axios";

const ViewInsurancePlan = () => {
  const [plans, setPlans] = useState([]);

  const userDetails = {
    name: localStorage.getItem('name'),
    username: localStorage.getItem('username'),
    role:localStorage.getItem('role'),
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId'),
  };

  const getAllPlans = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8080/api/v1/insuranceplan/getall`,
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
            Authorization: `${userDetails.token}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.user !== null) {
        setPlans(response.data);
      }
    } catch (error) {
      alert("No Plan Found");
      return;
    }
  };

  useEffect(() => {
    getAllPlans();
  }, []);

  const handleUpdate = async (insuranceId) => {
    if(userDetails.role === 'admin' || userDetails.role === 'employee'){
    try {
      let response = await axios.put(
        ` http://localhost:8080/api/v1/insuranceplan/update/${insuranceId}`,
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
      alert("Only Admin can update");
      return;
    }
  }else{alert("Only Admin and employee can update");}
    getAllPlans();
  };

  return (
    <>
      <div className="app__nav">
        <Navbar user={userDetails} />
      </div>
      <div className="viewemp">
        <h1>View Insurance Plan</h1>
      </div>
      <section className="overflow-hidden">
        <div className="container ">
          <div className="table-responsive">
            <table className="table table-bordered border-primary">
              <thead>
                <tr class="table-success">
                  <th scope="col">Serial No.</th>
                  <th scope="col">Insurance ID</th>
                  <th scope="col">Insurance Type</th>
                  <th scope="col">Status</th>
                  <th scope="col">Update</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan, index) => {
                  return (
                    <tr className="table-success">
                      <td>{index + 1}</td>
                      <td>{plan.insuranceId}</td>
                      <td>{plan.insuranceType}</td>
                      <td>{plan.status}</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-outline-secondary"
                          onClick={() => handleUpdate(plan.insuranceId)}
                        >
                          Update
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

export default ViewInsurancePlan;
