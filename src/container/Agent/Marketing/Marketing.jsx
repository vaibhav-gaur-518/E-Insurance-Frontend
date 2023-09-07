import React, { useState } from "react";
import { Navbar } from "../../../components";
import axios from "axios";

const Marketing = () => {
  const userDetails = {
    name: localStorage.getItem("name"),
    username: localStorage.getItem("username"),
    role: localStorage.getItem("role"),
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId"),
  };

  const [receiverEmail, setReceiverEmail] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    const data = {
      to: receiverEmail,
      subject: subject,
      text: description,
    };

    if (receiverEmail === "" || subject === "" || description === "") {
      alert("Please fill all the fields");
      return;
    }
    try{
    let response = await axios.post(
      `http://localhost:8080/api/v1/agent/sendemail`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${userDetails.token}`,
        },
        withCredentials: true,
      }
    );
    }catch(err){
        alert("Not Able to send email right now please check email");
        return;
    }
    
    alert("Mail Sended Successfully");
  };

  return (
    <>
      <div className="app__nav">
        <Navbar user={userDetails} />
      </div>

      <div className="viewemp">
        <h1>Send Mail</h1>
      </div>

      <div className="container">
        <form class="row g-3">
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              To:
            </label>
            <input
              type="email"
              class="form-control"
              id="inputEmail4"
              onChange={(e) => setReceiverEmail(e.target.value)}
              placeholder="Enter Receiver Email Address"
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              Subject:
            </label>
            <input
              type="text"
              class="form-control"
              id="inputEmail4"
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter Subject"
            />
          </div>
          <div className="col-12">
            <label for="exampleFormControlTextarea1" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Body"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div class="col-12">
            <button
              type="submit"
              class="btn btn-outline-primary"
              onClick={handleSend}
            >
              Send Mail
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Marketing;
