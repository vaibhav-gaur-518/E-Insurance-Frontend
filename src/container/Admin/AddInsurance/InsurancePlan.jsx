import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../../../components";
import toast, { Toaster } from "react-hot-toast";
import { delay } from "framer-motion";

const InsurancePlan = () => {
  const navigateObject = new useNavigate();

  const planName = useRef();
  const [status, setStatus] = useState("");
  const [insurances, setInsurances] = useState([]);

  const getAllPlans = async () => {
    let resp = await axios
      .get(`http://localhost:8080/api/v1/insuranceplan/getall`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${userDetails.token}`,
        },
      })
      .catch((err) => {
        toast.error("Please Login");
        return;
      });
    setInsurances(resp.data);
  };

  const userDetails = {
    name: localStorage.getItem("name"),
    username: localStorage.getItem("username"),
    role: localStorage.getItem("role"),
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId"),
  };

  const Add = async (e) => {
    if (planName.current.value === "") {
      toast.error("Type Can not be Empty");
      return;
    }
    if (status === "Select") {
      toast.error("Please set a Status");
      return;
    }
    const insuranceExists = insurances.some(
      (insurance) =>
        insurance.insuranceType.toLowerCase() ===
        planName.current.value.toLowerCase()
    );
    if (insuranceExists) {
      toast.error("Insurance plan already exists");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/insuranceplan/save`,
        {
          insuranceType: planName.current.value,
          status: status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${userDetails.token}`,
          },
        }
      );
      toast.warning("Added Successfully");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Please Login");
      } else {
        toast.error("Not Able To Add New Plan");
      }
    }
  };

  const handleAdd = async (e) => {
    Add();
    if (toast.error.isActive) navigateObject(`/admindashboard`);
  };

  useEffect(() => {
    getAllPlans();
  }, []);

  return (
    <>
      <div className="app__nav">
        <Navbar user={userDetails} />
      </div>
      <div className="viewemp">
        <h1>Add New Insurance Plan</h1>
      </div>

      <div className="container">
        <form class="row g-3">
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              Insurance Type
            </label>
            <input
              type="text"
              class="form-control"
              id="inputEmail4"
              ref={planName}
              required
            />
          </div>
          <div class="col-md-4">
            <label for="inputState" class="form-label">
              Status
            </label>
            <select
              id="inputState"
              class="form-select"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Select" selected>
                Select
              </option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary" onClick={handleAdd}>
            Add Insurance Plan
          </button>
        </form>
        <Toaster position="top-right" reverseOrder={false} />;
      </div>
    </>
  );
};

export default InsurancePlan;
