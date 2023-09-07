import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../../components";
import toast, { Toaster } from "react-hot-toast";

const State = () => {
  const [state, setState] = useState("");
  const [states, setStates] = useState([])
  const [status, setStatus] = useState("");
  const navigateObject = new useNavigate();

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
        `http://localhost:8080/state/getall`,
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
        setStates(response.data);
      }
    } catch (error) {
      alert("No State Found");
      return;
    }
  };

  const Add = async (e) => {
    if (status === "Select") {
      toast.error("Please set a Status");
      return;
    }

    if (state === "") {
      toast.error("Please enter a state")
      return;
    }

    const existingState = states.find(
        (c) => c.name.toLowerCase() === state.toLowerCase()
      );
      if (existingState) {
        toast.error("State already exists");
        return;
      }

    const response = await axios
      .post(
        `http://localhost:8080/state/save`,
        {
          name: state,
          status: status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${userDetails.token}`,
          },
        }
      )
      .catch((error) => toast.error("Not Able To Add New State"));
  };

  const handleAdd = async (e) => {
    Add();
    navigateObject(
      `/admindashboard`
    );
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
        <h1>Add New State</h1>
      </div>

      <div className="container">
        <form class="row g-3">
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              State
            </label>
            <input
              type="text"
              class="form-control"
              id="inputEmail4"
              onChange={(e) => setState(e.target.value)}
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
            Add State
          </button>
        </form>
      </div>
    </>
  );
};

export default State;
