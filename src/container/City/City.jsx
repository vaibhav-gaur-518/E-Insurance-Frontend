import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../../components";

const City = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [status, setStatus] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [city, setCity] = useState("");
  const navigateObject = new useNavigate();

  const userDetails = {
    name: localStorage.getItem("name"),
    username: localStorage.getItem("username"),
    role: localStorage.getItem("role"),
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId"),
  };

  const getAllCities = async (e) => {
    try {
      let response = await axios.get(
        `  http://localhost:8080/state/getall/city/${selectedId}`,
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
        setCities(response.data);
      }
    } catch (error) {
      alert("No State Found");
      return;
    }
  };

  const getAllPlans = async (e) => {
    try {
      let response = await axios.get(`http://localhost:8080/state/getall`, {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
          Authorization: `${userDetails.token}`,
        },
      });
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
      alert("Please set a Status");
      return;
    }

    if (city === "") {
      alert("Please enter a city");
      return;
    }

    const existingCity = cities.find(
      (c) => c.name.toLowerCase() === city.toLowerCase()
    );
    if (existingCity) {
      alert("City already exists");
      return;
    }

    const response = await axios
      .post(
        `http://localhost:8080/state/save/city/${selectedId}`,
        {
          name: city,
          status: status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${userDetails.token}`,
          },
        }
      )
      .catch((error) => alert("Not Able To Add New City"));
  };

  const handleAdd = async (e) => {
    Add();
    navigateObject(`/admindashboard`);
  };

  useEffect(() => {
    getAllPlans();
  }, []);

  useEffect(() => {
    if (selectedId !== "") {
      getAllCities();
    }
  }, [selectedId]);

  return (
    <>
      <div className="app__nav">
        <Navbar user={userDetails} />
      </div>
      <div className="viewemp">
        <h1>Add New City</h1>
      </div>

      <div className="container">
        <form class="row g-3">
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              Select a State
            </label>
            <select
              className="form-select"
              id="insurance"
              onChange={(e) => setSelectedId(e.target.value)}
            >
              <option selected value="select">
                Select
              </option>
              {states.map((state, index) => {
                if (state.status === "ACTIVE") {
                  return (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  );
                }
              })}
            </select>

            <div class="col-md-6 mb-3">
              <label for="inputEmail4" class="form-label">
                City
              </label>
              <input
                type="text"
                class="form-control"
                id="inputEmail4"
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
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
            Add City
          </button>
        </form>
      </div>
    </>
  );
};

export default City;
