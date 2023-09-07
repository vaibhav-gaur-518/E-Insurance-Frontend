import React, { useState } from "react";
import "./Login.scss";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const navigateObject = new useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username === "" && password === "") {
       toast.error("Username or Password is empty");
      return;
    }

    const response = await axios
      .post(
        `http://localhost:8080/login`,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .catch((err) => {
        toast.error("Username or Password is Incorrect");
      });

    // console.log(response.headers.authorization);

    localStorage.setItem("token", response.headers.authorization);
    const token = localStorage.getItem("token");

    const response2 = await axios
      .get(`http://localhost:8080/user/details`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .catch((err) => {
        toast.error("Can not found user");
      });

    if (response2.data.status === "INACTIVE") {
      toast.error("User Not Found or Deleted");
      return;
    }

    localStorage.setItem("name", response2.data.name);
    localStorage.setItem("username", response2.data.username);
    localStorage.setItem("role", response2.data.role);
    localStorage.setItem("userId", response2.data.userId);

    const name = localStorage.getItem("name");
    const username2 = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");

    if (response2.data.role === "admin") {
      navigateObject(`/admindashboard`);
      return;
    }

    if (response2.data.role === "employee") {
      navigateObject(`/employeedashboard`);
      return;
    }

    if (response2.data.role === "agent") {
      navigateObject(`/agentdashboard`);
      return;
    }

    if (response2.data.role === "customer") {
      navigateObject(`/customerdashboard`);
      return;
    }
  };

  return (
    <div className="login app__container">
      <div class="login-box">
        <button class="loginbtn">Please Login To access Dashboard</button>
        <form>
          <div class="user-box">
            <input
              type="text"
              name=""
              required=""
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Username</label>
          </div>
          <div class="user-box">
            <input
              type="password"
              name=""
              required=""
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <center onClick={handleLogin}>
            <a href="#">
              Login
              <span></span>
            </a>
          </center>
        </form>
      </div>
      <Toaster position="top-right" reverseOrder={false} />;
    </div>
  );
};

export default Login;
