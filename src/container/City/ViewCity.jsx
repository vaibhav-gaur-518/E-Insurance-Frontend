import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../../components";

const ViewCity = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [status, setStatus] = useState("");
  const [currentCity, setCurrentCity] = useState("");

  const userDetails = {
    name: localStorage.getItem("name"),
    username: localStorage.getItem("username"),
    role: localStorage.getItem("role"),
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId"),
  };

  const getCurrentStatus = async (e) => {
    try {
      let response = await axios.get(
        `http://localhost:8080/state/city/${selectedCityId}`,
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
        setCurrentCity(response.data);
      }
    } catch (error) {
      alert("No City Found");
      return;
    }
  };

  const getAllPlans = async () => {
    try {
      let response = await axios.get(`http://localhost:8080/state/getall`, {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
          Authorization: `${userDetails.token}`,
        },
      });
      console.log(response.data);
      if (response.data.user !== null) {
        setStates(response.data);
      }
    } catch (error) {
      alert("No State Found");
      return;
    }
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

  useEffect(() => {
    getAllPlans();
  }, []);

  useEffect(() => {
    if (selectedId !== "") {
      getAllCities();
    }
    if (selectedCityId !== "") {
      getCurrentStatus();
    }
  }, [selectedId, selectedCityId]);

  const handleUpdate = async (id) => {
    if (userDetails.role === "admin" || userDetails.role === "employee") {
      try {
        let response = await axios.put(
          `http://localhost:8080/state/update/city/${id}`,
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
    } else {
      alert("Only Admin can update");
    }
    getAllPlans();
  };

  return (
    <>
      <div className="app__nav">
        <Navbar user={userDetails} />
      </div>
      <div className="viewemp">
        <h1>View Cities</h1>
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
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              Select a City
            </label>
            <select
              className="form-select"
              id="insurance"
              onChange={(e) => setSelectedCityId(e.target.value)}
            >
              <option selected value="select">
                Select
              </option>
              {cities.map((city, index) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6 md-3">
            <label for="inputEmail4" class="form-label">
              Current Status
            </label>
            <input
              type="text"
              class="form-control"
              id="inputEmail4"
              value={currentCity.status}
              disabled
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
          <button
            type="submit"
            class="btn btn-outline-primary"
            onClick={() => handleUpdate(selectedCityId)}
          >
            Update Status
          </button>
        </form>
      </div>
    </>
  );
};

export default ViewCity;
