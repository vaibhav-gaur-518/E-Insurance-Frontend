import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../../../components";
import toast, { Toaster } from "react-hot-toast";

const AddCustomer = () => {
  const navigateObject = new useNavigate();

  const [agentId, setAgentId] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [nominee, setNominee] = useState("");
  const [nomineeRelation, setNomineeRelation] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const userDetails = {
    name: localStorage.getItem("name"),
    username: localStorage.getItem("username"),
    role: localStorage.getItem("role"),
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId"),
  };

  const validateForm = () => {
    if (
      !agentId ||
      !dateOfBirth ||
      !phone ||
      !state ||
      !city ||
      !pincode ||
      !nominee ||
      !nomineeRelation ||
      !name ||
      !username ||
      !password ||
      !confirmPassword ||
      !email ||
      !address
    ) {
      toast.error("Please fill in all fields");
      return false;
    }

    const usernameRegex = /^[a-zA-Z0-9_]{6,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const pincodeRegex = /^[0-9]{6}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if(!usernameRegex.test(username)){
      toast.error("Invalid username. Username should be at least 6 characters long and contain only letters, numbers or underscores.");
      return false;
    }

    if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
      return false;
    }

    if (!phoneRegex.test(phone)) {
      toast.error("Invalid phone number");
      return false;
    }

    if (!pincodeRegex.test(pincode)) {
      toast.error("Invalid pincode");
      return false;
    }

    if(!passwordRegex.test(password)){
      toast.error("Invalid password. Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Password didn't match");
      return false;
    }

    return true;
  };

  const Add = async () => {
    if (!validateForm()) {
      return;
    }

      let usernames = await axios
        .get(`http://localhost:8080/user/username`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${userDetails.token}`,
          },
          withCredentials: true,
        })
        .catch((err) => {
          toast.error("Error");
          return;
        });

      if (usernames.data.includes(username)) {
        toast.error("Username already exists");
        return;
      }

      let emails = await axios
        .get(`http://localhost:8080/user/email`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${userDetails.token}`,
          },
          withCredentials: true,
        })
        .catch((err) => {
          toast.error("Error");
          return;
        });

      if (emails.data.includes(email)) {
        toast.error("Email already exists");
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Password Didn't Match");
        return;
      }

      const data = {
        agentId: agentId,
        dateOfBirth: dateOfBirth,
        phone: phone,
        state: state,
        city: city,
        pincode: pincode,
        nominee: nominee,
        nomineeRelation: nomineeRelation,
        user: {
          name: name,
          username: username,
          password: password,
          email: email,
          address: address,
          status: "ACTIVE",
          role: "customer",
        },
      };

      let response = await axios.post(
        `http://localhost:8080/api/v1/customer/save`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${userDetails.token}`,
          },
          withCredentials: true,
        }
      );
      
       
      
    
  };

  const handleAdd = async (e) => {
    Add();
    alert("Employee added successfully");
    navigateObject(`/viewcustomer`);
  };

  return (
    <>
      <div className="app__nav">
        <Navbar user={userDetails} />
      </div>

      <div className="viewemp">
        <h1>Add New Customer</h1>
      </div>

      <div className="container">
        <form class="row g-3">
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              Agent Id
            </label>
            <input
              type="text"
              class="form-control"
              id="inputEmail4"
              onChange={(e) => setAgentId(e.target.value)}
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              Name
            </label>
            <input
              type="text"
              class="form-control"
              id="inputEmail4"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              Username
            </label>
            <input
              type="text"
              class="form-control"
              id="inputEmail4"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputPassword4" class="form-label">
              Date Of birth
            </label>
            <input
              type="text"
              class="form-control"
              id="inputPassword4"
              onChange={(e) => setDateOfBirth(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              Nominee
            </label>
            <input
              type="text"
              class="form-control"
              id="inputEmail4"
              onChange={(e) => setNominee(e.target.value)}
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              Nominee Relation
            </label>
            <input
              type="text"
              class="form-control"
              id="inputEmail4"
              onChange={(e) => setNomineeRelation(e.target.value)}
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              City
            </label>
            <input
              type="text"
              class="form-control"
              id="inputEmail4"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              State
            </label>
            <input
              type="text"
              class="form-control"
              id="inputEmail4"
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div class="col-12">
            <label for="inputAddress" class="form-label">
              Address
            </label>
            <input
              type="text"
              class="form-control"
              id="inputAddress"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              phone Number
            </label>
            <input
              type="text"
              class="form-control"
              id="inputEmail4"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              Pincode
            </label>
            <input
              type="text"
              class="form-control"
              id="inputEmail4"
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="inputEmail4"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              class="form-control"
              id="inputEmail4"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div class="col-12">
            <button
              type="submit"
              class="btn btn-outline-primary"
              onClick={handleAdd}
            >
              Add Customer
            </button>
          </div>
        </form>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
};

export default AddCustomer;
