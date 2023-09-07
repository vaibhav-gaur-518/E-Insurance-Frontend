import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../../components";

const ViewState = () => {
  const [states, setStates] = useState([])

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

  useEffect(() => {
    getAllPlans();
  }, []);

  const handleUpdate = async (id) => {
    if(userDetails.role === 'admin' || userDetails.role === 'employee'){
    try {
      let response = await axios.put(
        `http://localhost:8080/state/update/${id}`,
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
  }else{alert("Only Admin can update");}
    getAllPlans();
  };

  return (
    <>
      <div className="app__nav">
        <Navbar user={userDetails} />
      </div>
      <div className="viewemp">
        <h1>View States</h1>
      </div>
      <section className="overflow-hidden">
        <div className="container ">
          <div className="table-responsive">
            <table className="table table-bordered border-primary">
              <thead>
                <tr class="table-success">
                  <th scope="col">Serial No.</th>
                  <th scope="col">State ID</th>
                  <th scope="col">State Type</th>
                  <th scope="col">Status</th>
                  <th scope="col">Update</th>
                </tr>
              </thead>
              <tbody>
                {states.map((state, index) => {
                  return (
                    <tr className="table-success">
                      <td>{index + 1}</td>
                      <td>{state.id}</td>
                      <td>{state.name}</td>
                      <td>{state.status}</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-outline-secondary"
                          onClick={() => handleUpdate(state.id)}
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

export default ViewState;
