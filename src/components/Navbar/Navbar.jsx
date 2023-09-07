import React, { useEffect, useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { images } from "../../constants";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = (userDetails) => {
  const [toggle, setToggle] = useState(false);
  const [insurances, setInsurances] = useState([]);

  const navigateObject = new useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    navigateObject(`/login`);
    return;
  };

  const getAllPlans = async () => {
    let resp = await axios
      .get(`http://localhost:8080/api/v1/insuranceplan/getall`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${userDetails.token}`,
        },
      })
      .catch((err) => {
        // toast.error("Some Error has Occured");
        return;
      });
    setInsurances(resp.data);
  };

  useEffect(() => {
    getAllPlans();
  }, []);

  if (userDetails.user.role === "admin") {
    return (
      <nav className="app__navbar">
        <div className="app__navbar-logo">
          <a href="#home">
            <img src={images.logo} alt="logo" />
          </a>
        </div>
        <ul className="app__navbar-links">
          <li className="app__flex p-text">
            <div />
            <a href={`/admindashboard`}>Dashboard</a>
          </li>
          <li className="dropdown app__flex p-text">
            <div />
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Agent
            </a>
            <ul
              className="dropdown-menu"
              style={{ backgroundColor: "#191810" }}
            >
              <li>
                <a
                  style={{ backgroundColor: "#191810" }}
                  className="dropdown-item"
                  href={`/addagent`}
                >
                  Add Agent
                </a>
              </li>
              <li>
                <a
                  style={{ backgroundColor: "#191810" }}
                  className="dropdown-item"
                  href={`/viewagent`}
                >
                  View Agent
                </a>
              </li>
              {/* <li>
                <a className="dropdown-item" href="#">
                  View Commission
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  View Commission Withdraw
                </a>
              </li> */}
            </ul>
          </li>
          <li className="dropdown app__flex p-text">
            <div />
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Insurance
            </a>
            <ul
              className="dropdown-menu"
              style={{ backgroundColor: "#191810" }}
            >
              <li>
                <a
                  style={{ backgroundColor: "#191810" }}
                  className="dropdown-item"
                  href={`/viewcustomer`}
                >
                  View Customer
                </a>
              </li>
              <li>
                <a
                  style={{ backgroundColor: "#191810" }}
                  className="dropdown-item"
                  href={`/viewallcustomeraccounts`}
                >
                  Insurance Account
                </a>
              </li>
              {/* <li>
                <a className="dropdown-item" href="#">
                  View Policy Payment
                </a>
              </li> */}
              {/* <li>
                <a className="dropdown-item" href="#">
                  View Policy Claim
                </a>
              </li> */}
            </ul>
          </li>
          {/* <li className="dropdown app__flex p-text">
            <div />
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Query
            </a>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  View Feedback
                </a>
              </li>
            </ul>
          </li> */}
          <li className="dropdown app__flex p-text">
            <div />
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Insurance Type
            </a>
            <ul
              className="dropdown-menu"
              style={{ backgroundColor: "#191810" }}
            >
              <li>
                <a
                  style={{ backgroundColor: "#191810" }}
                  className="dropdown-item"
                  href={`/insurancetype`}
                >
                  Add Insurance Type
                </a>
              </li>
              <li>
                <a
                  style={{ backgroundColor: "#191810" }}
                  className="dropdown-item"
                  href={`/viewinsurancetype`}
                >
                  View Insurance Type
                </a>
              </li>
              <li>
                <a
                  style={{ backgroundColor: "#191810" }}
                  className="dropdown-item"
                  href={`/addscheme`}
                >
                  Add Insurance Scheme
                </a>
              </li>
              <li>
                <a
                  style={{ backgroundColor: "#191810" }}
                  className="dropdown-item"
                  href={`/viewscheme`}
                >
                  View Insurance Scheme
                </a>
              </li>
              {/* <li>
                <a className="dropdown-item" href="#">
                  Add Insurance Plan
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  View Insurance Plan
                </a>
              </li> */}
            </ul>
          </li>
          <li className="dropdown app__flex p-text">
            <div />
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Settings
            </a>
            <ul
              className="dropdown-menu"
              style={{ backgroundColor: "#191810" }}
            >
              {/* <li>
                <a className="dropdown-item" href="#">
                  Tax Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Insurance Settings
                </a>
              </li> */}
              <li>
                <a
                  className="dropdown-item"
                  style={{ backgroundColor: "#191810" }}
                  href={`/state`}
                >
                  Add State
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  style={{ backgroundColor: "#191810" }}
                  href={`/viewstate`}
                >
                  View State
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  style={{ backgroundColor: "#191810" }}
                  href={`/city`}
                >
                  Add City
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  style={{ backgroundColor: "#191810" }}
                  href={`/viewcity`}
                >
                  View City
                </a>
              </li>
            </ul>
          </li>
          <li className="dropdown app__flex p-text">
            <div />
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Account
            </a>
            <ul
              className="dropdown-menu"
              style={{ backgroundColor: "#191810" }}
            >
              <li>
                <a
                  style={{ backgroundColor: "#191810" }}
                  className="dropdown-item"
                  href={`/profile`}
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  style={{ backgroundColor: "#191810" }}
                  className="dropdown-item"
                  href={`/updatepassword`}
                >
                  Change Password
                </a>
              </li>
              <li>
                <a
                  style={{ backgroundColor: "#191810" }}
                  className="dropdown-item"
                  href={`/addemployee`}
                >
                  Add Employee
                </a>
              </li>
              <li>
                <a
                  style={{ backgroundColor: "#191810" }}
                  className="dropdown-item"
                  href={`/viewemployee`}
                >
                  View Employee
                </a>
              </li>
            </ul>
          </li>
          <li className="app__flex p-text">
            <div />
            <a href={`/logout`}>Logout</a>
          </li>
        </ul>
        <div className="app__navbar-menu">
          <HiMenuAlt4 onClick={() => setToggle(true)} />

          {toggle && (
            <motion.div
              whileInView={{ x: [300, 0] }}
              transition={{ duration: 0.85, ease: "easeOut" }}
            >
              <HiX onClick={() => setToggle(false)} />
              <ul className="app__navbar-links"></ul>
            </motion.div>
          )}
        </div>
        <Toaster position="top-right" reverseOrder={false} />;
      </nav>
    );
  }

  if (userDetails.user.role === "customer") {
    return (
      <nav className="app__navbar">
        <div className="app__navbar-logo">
          <a href="#home">
            <img src={images.logo} alt="logo" />
          </a>
        </div>
        <ul className="app__navbar-links">
          <li className="app__flex p-text">
            <div />
            <a href={`/customerdashboard`}>Dashboard</a>
          </li>
          <li className="app__flex p-text">
            <div />
            <a href={`/viewpolicy`}>Account</a>
          </li>
          <li className="dropdown app__flex p-text">
            <div />
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Customize Profile
            </a>
            <ul
              className="dropdown-menu"
              style={{ backgroundColor: "#191810" }}
            >
              <li>
                <a
                  style={{ backgroundColor: "#191810" }}
                  className="dropdown-item"
                  href={`/customerprofile`}
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  style={{ backgroundColor: "#191810" }}
                  className="dropdown-item"
                  href={`/updatepassword`}
                >
                  Change Password
                </a>
              </li>
            </ul>
          </li>
          <li className="dropdown app__flex p-text">
            <div />
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Documents
            </a>
            <ul
              className="dropdown-menu"
              style={{ backgroundColor: "#191810" }}
            >
              <li>
                <a
                  style={{ backgroundColor: "#191810" }}
                  className="dropdown-item"
                  href={`/doucments`}
                >
                  Upload Documents
                </a>
              </li>
              <li>
                <a
                  style={{ backgroundColor: "#191810" }}
                  className="dropdown-item"
                  href={`/viewdoucments`}
                >
                  View Documents
                </a>
              </li>
            </ul>
          </li>
          <li className="dropdown app__flex p-text">
            <div />
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Insurance Plans
            </a>
            <ul
              className="dropdown-menu"
              style={{ backgroundColor: "#191810" }}
            >
              {insurances.map((insurance) => {
                if (insurance.status === "ACTIVE") {
                  return (
                    <li>
                      <a
                        style={{ backgroundColor: "#191810" }}
                        className="dropdown-item"
                        href="#"
                        key={insurance.insuranceId}
                        value={insurance.insuranceId}
                      >
                        {insurance.insuranceType}
                      </a>
                    </li>
                  );
                }
              })}
            </ul>
          </li>
          {/* <li className="app__flex p-text">
            <div />
            <a href={`/insuranceaccount`}>Insurace Account</a>
          </li> */}
          {/* <li className="dropdown app__flex p-text">
            <div />
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Queries
            </a>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Enquiry
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  View Feedback
                </a>
              </li>
            </ul>
          </li> */}
          <li className="app__flex p-text">
            <div />
            <a href={`/logout`}>Logout</a>
          </li>
        </ul>
        <div className="app__navbar-menu">
          <HiMenuAlt4 onClick={() => setToggle(true)} />

          {toggle && (
            <motion.div
              whileInView={{ x: [300, 0] }}
              transition={{ duration: 0.85, ease: "easeOut" }}
            >
              <HiX onClick={() => setToggle(false)} />
              <ul className="app__navbar-links"></ul>
            </motion.div>
          )}
        </div>
        <Toaster position="top-right" reverseOrder={false} />;
      </nav>
    );
  }

  if (userDetails.user.role === "agent") {
    return (
      <nav className="app__navbar">
        <div className="app__navbar-logo">
          <a href="#home">
            <img src={images.logo} alt="logo" />
          </a>
        </div>
        <ul className="app__navbar-links">
          <li className="app__flex p-text">
            <div />
            <a href={`/agentdashboard`}>Dashboard</a>
          </li>
          <li className="dropdown app__flex p-text">
            <div />
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Account
            </a>
            <ul
              className="dropdown-menu"
              style={{ backgroundColor: "#191810" }}
            >
              <li>
                <a
                  style={{ backgroundColor: "#191810" }}
                  className="dropdown-item"
                  href={`/profile`}
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  style={{ backgroundColor: "#191810" }}
                  className="dropdown-item"
                  href={`/updatepassword`}
                >
                  Change Password
                </a>
              </li>
              {/* <li>
                <a className="dropdown-item" href="#">
                  View Commission
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  View Commission Withdraw
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Withdraw Amount
                </a>
              </li> */}
            </ul>
          </li>
          <li className="app__flex p-text">
            <div />
            <a href={`/marketing`}>Marketing</a>
          </li>
          <li className="dropdown app__flex p-text">
            <div />
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Insurance
            </a>
            <ul
              className="dropdown-menu"
              style={{ backgroundColor: "#191810" }}
            >
              <li>
                <a
                  style={{ backgroundColor: "#191810" }}
                  className="dropdown-item"
                  href={`/viewcustomer`}
                >
                  View Customers
                </a>
              </li>
              <li>
                <a
                  style={{ backgroundColor: "#191810" }}
                  className="dropdown-item"
                  href={`/viewallcustomeraccounts`}
                >
                  Insurance Account
                </a>
              </li>
              {/* <li>
                <a className="dropdown-item" href="#">
                  View Policy Payment
                </a>
              </li> */}
              {/* <li>
                <a className="dropdown-item" href="#">
                  View Policy Claim
                </a>
              </li> */}
            </ul>
          </li>
          <li className="app__flex p-text">
            <div />
            <a href={`/logout`}>Logout</a>
          </li>
        </ul>
        <div className="app__navbar-menu">
          <HiMenuAlt4 onClick={() => setToggle(true)} />

          {toggle && (
            <motion.div
              whileInView={{ x: [300, 0] }}
              transition={{ duration: 0.85, ease: "easeOut" }}
            >
              <HiX onClick={() => setToggle(false)} />
              <ul className="app__navbar-links"></ul>
            </motion.div>
          )}
        </div>
        <Toaster position="top-right" reverseOrder={false} />;
      </nav>
    );
  }

  if (userDetails.user.role === "employee") {
    return (
      <nav className="app__navbar">
        <div className="app__navbar-logo">
          <a href="#home">
            <img src={images.logo} alt="logo" />
          </a>
        </div>
        <ul className="app__navbar-links">
          <li className="app__flex p-text">
            <div />
            <a href={`/employeedashboard`}>Dashboard</a>
          </li>
          <li className="dropdown app__flex p-text">
            <div />
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Agent
            </a>
            <ul
              className="dropdown-menu"
              style={{ backgroundColor: "#191810" }}
            >
              <li>
                <a
                  style={{ backgroundColor: "#191810" }}
                  className="dropdown-item"
                  href={`/addagent`}
                >
                  Add Agent
                </a>
              </li>
              <li>
                <a
                  style={{ backgroundColor: "#191810" }}
                  className="dropdown-item"
                  href={`/viewagent`}
                >
                  View Agent
                </a>
              </li>
              {/* <li>
                <a className="dropdown-item" href="#">
                  View Commission
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  View Commission Withdraw
                </a>
              </li> */}
            </ul>
          </li>
          <li className="dropdown app__flex p-text">
            <div />
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Insurance
            </a>
            <ul
              className="dropdown-menu"
              style={{ backgroundColor: "#191810" }}
            >
              <li>
                <a
                  style={{ backgroundColor: "#191810" }}
                  className="dropdown-item"
                  href={`/viewcustomer`}
                >
                  View Customers
                </a>
              </li>
              <li>
                <a className="dropdown-item" href={`/viewallcustomeraccounts`}>
                  Insurance Account
                </a>
              </li>
              {/* <li>
                <a className="dropdown-item" href="#">
                  View Policy Payment
                </a>
              </li> */}
              {/* <li>
                <a className="dropdown-item" href="#">
                  View Policy Claim
                </a>
              </li> */}
            </ul>
          </li>
          <li className="dropdown app__flex p-text">
            <div />
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Account
            </a>
            <ul
              className="dropdown-menu"
              style={{ backgroundColor: "#191810" }}
            >
              <li>
                <a
                  style={{ backgroundColor: "#191810" }}
                  className="dropdown-item"
                  href={`/profile`}
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  style={{ backgroundColor: "#191810" }}
                  className="dropdown-item"
                  href={`/updatepassword`}
                >
                  Change Password
                </a>
              </li>
            </ul>
          </li>
          <li className="app__flex p-text">
            <div />
            <a href={`/logout`}>Logout</a>
          </li>
        </ul>
        <div className="app__navbar-menu">
          <HiMenuAlt4 onClick={() => setToggle(true)} />

          {toggle && (
            <motion.div
              whileInView={{ x: [300, 0] }}
              transition={{ duration: 0.85, ease: "easeOut" }}
            >
              <HiX onClick={() => setToggle(false)} />
              <ul className="app__navbar-links"></ul>
            </motion.div>
          )}
        </div>
        <Toaster position="top-right" reverseOrder={false} />;
      </nav>
    );
  }

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <a href="#home">
          <img src={images.logo} alt="logo" />
        </a>
      </div>
      <ul className="app__navbar-links">
        {["home", "about", "contact"].map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <div />
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
        {/* <li className="app__flex p-text" key={`link-Insurace Plans`}>
          <div />
          <a href="" onClick={handlePlans}>
            Insurace Plans
          </a>
        </li> */}
        <li className="app__flex p-text" key={`link-Login`}>
          <div />
          <a href="" onClick={handleLogin}>
            Login
          </a>
        </li>
      </ul>
      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul className="app__navbar-links">
              {["home", "about", "Login", "contact"].map((item) => (
                <li className="app__flex p-text" key={item}>
                  <a href={`#${item}`} onClick={() => setToggle(false)}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
      <Toaster position="top-right" reverseOrder={false} />;
    </nav>
  );
};

export default Navbar;
