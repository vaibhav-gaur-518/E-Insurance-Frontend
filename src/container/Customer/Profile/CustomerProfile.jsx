import React, { useEffect, useState } from "react";
import { Navbar } from "../../../components";
import { useParams } from "react-router-dom";
import axios from "axios";

const CustomerProfile = () => {
  
  const userDetails = {
    name: localStorage.getItem('name'),
    username: localStorage.getItem('username'),
    role:localStorage.getItem('role'),
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId'),
  };

  const [response, setResponse] = useState([])
  const [userData, setUserData] = useState([])
  const show = async (e) => {
    const response2 = await axios
      .get(`http://localhost:8080/api/v1/customer/getcustomer/${userDetails.username}`, {
        headers: {
          Authorization: `${userDetails.token}`,
        },
      })
      .catch((err) => {
        alert("Not Able to Show");
      });
      setUserData(response2.data)
      setResponse(response2.data.user);
  };

  useEffect(() => {
    show();
  }, []);

  return (
    <>
      <div className="app__nav">
        <Navbar user={userDetails} />
      </div>

      <div className="viewemp">
        <h1>Profile</h1>
      </div>

      <div className="container">
        <form class="row g-3">
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              Name
            </label>
            <input type="text" class="form-control" id="inputEmail4" value = {`${userDetails.name}`} />
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              Username
            </label>
            <input type="text" class="form-control" id="inputEmail4" value={`${userDetails.username}`} />
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputPassword4" class="form-label">
              Date Of birth
            </label>
            <input
              type="email"
              class="form-control"
              id="inputPassword4"
              value={`${userData.dateOfBirth}`}
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
              value={`${response.email}`}
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              Nominee
            </label>
            <input type="text" class="form-control" id="inputEmail4" value = {`${userData.nominee}`} />
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
            Nominee Relation
            </label>
            <input type="text" class="form-control" id="inputEmail4" value = {`${userData.nomineeRelation}`} />
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              City
            </label>
            <input type="text" class="form-control" id="inputEmail4" value = {`${userData.city}`} />
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              State
            </label>
            <input type="text" class="form-control" id="inputEmail4" value={`${userData.state}`} />
          </div>
          <div class="col-12">
            <label for="inputAddress" class="form-label">
              Address
            </label>
            <input
              type="text"
              class="form-control"
              id="inputAddress"
              value={`${response.address}`}
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              phone Number
            </label>
            <input type="text" class="form-control" id="inputEmail4" value = {`${userData.phone}`} />
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              Pincode
            </label>
            <input type="text" class="form-control" id="inputEmail4" value = {`${userData.pincode}`} />
          </div>
          <div class="col-md-4">
            <label for="inputState" class="form-label">
              Status
            </label>
            <input
              type="text"
              class="form-control"
              id="inputAddress"
              value={`${response.status}`}
            />
          </div>
          <div class="col-md-4">
            <label for="inputState" class="form-label">
              Role
            </label>
            <input
              type="text"
              class="form-control"
              id="inputAddress"
              value={`${userDetails.role}`}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CustomerProfile;
