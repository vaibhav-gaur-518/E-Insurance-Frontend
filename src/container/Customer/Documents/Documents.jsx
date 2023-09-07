import React, { useState } from "react";
import { Navbar } from "../../../components";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Documents = () => {
  const navigateObject = new useNavigate();
  const [file, setFile] = useState(null);

  const userDetails = {
    name: localStorage.getItem("name"),
    username: localStorage.getItem("username"),
    role: localStorage.getItem("role"),
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId"),
  };

  const Add = async (e) => {
    const formData = new FormData();
    formData.append("file", file);

    const response2 = await axios
      .post(`http://localhost:8080/file/upload/${userDetails.userId}`, 
      formData,
      {
        headers: {
          Authorization: `${userDetails.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      alert("Document Uploded Successfully")
      .catch((err) => {
        alert("Not Able to Upload");
      });
  };

  const handleAdd = async (e) => {
    Add();
    navigateObject(`/customerdashboard`);
  };

  return (
    <>
      <div className="app__nav">
        <Navbar user={userDetails} />
      </div>

      <div className="viewemp">
        <h1>Upload Doucment</h1>
      </div>

      <div className="container">
        <form class="row g-3">
          <div class="col-mb-6 mb-3">
            <label for="formFile" class="form-label">
              Please Upload 1 Document For ID Verification(Aadhar Card, PAN
              Card, etc....)
            </label>
            <input class="form-control" type="file" id="formFile" onChange={(e) => setFile(e.target.files[0])}/>
          </div>
          <div class="col-12">
            <button
              type="submit"
              class="btn btn-outline-primary"
              onClick={handleAdd}
            >
              Submit
            </button>
          </div>
        </form>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
};

export default Documents;
