import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../../../components";

const AddPolicy = () => {
  const navigateObject = new useNavigate();

  const policyName = useRef();
  const commNew = useRef();
  const description = useRef();
  const commInst = useRef();
  const policyMinTerm = useRef();
  const policyMaxTerm = useRef();
  const policyMinAge = useRef();
  const policyMaxAge = useRef();
  const policyMinAmount = useRef();
  const policyMaxAmount = useRef();

  const [insurances, setInsurances] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [status, setStatus] = useState("");

  const userDetails = {
    name: localStorage.getItem('name'),
    username: localStorage.getItem('username'),
    role:localStorage.getItem('role'),
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId'),
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
        alert("Please Login");
        return;
      });
    setInsurances(resp.data);
  };

  useEffect(() => {
    getAllPlans();
  }, []);

  const Add = async (e) => {
    if (status === "Select") {
        alert("Please set a Status");
        return;
      }

    const response = await axios
      .post(
        `http://localhost:8080/policy/save`,
        {
          policyName: policyName.current.value,
          newCommission: commNew.current.value,
          installmentCommission: commInst.current.value,
          description: description.current.value,
          status: status,
          plan: {
            insuranceId: selectedId,
          },
          details: {
            miniAmount: policyMinAmount.current.value,
            maxiAmount: policyMaxAmount.current.value,
            miniInvestmentTime: policyMinTerm.current.value,
            maxiInvestmentTime: policyMaxTerm.current.value,
            miniAge: policyMinAge.current.value,
            maxiAge: policyMaxAge.current.value,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${userDetails.token}`,
          },
        }
      )
      .catch((error) => console.error("Not Able To Add New Scheme"));
  };

  const handleAdd = async (e) => {
    Add();
    navigateObject(
      `/admindashboard`
    );
  };

  return (
    <>
      <div className="app__nav">
        <Navbar user={userDetails} />
      </div>
      <div className="viewemp">
        <h1>Add New Insurance Scheme</h1>
      </div>
      <div className="container">
        <form className="row g-3">
          <div className="col-md-6 mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Insurance Type:
            </label>
            <select
              className="form-select"
              id="insurance"
              onChange={(e) => setSelectedId(e.target.value)}
            >
              <option selectedd value="">
                Select
              </option>
              {insurances.map((insurance) => (
                <option
                  key={insurance.insuranceId}
                  value={insurance.insuranceId}
                >
                  {insurance.insuranceType}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Insurance Scheme:
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              ref={policyName}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Commission for new registration(%):
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              ref={commNew}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Commission for installment payment(%):
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              ref={commInst}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label for="inputState" className="form-label">
              Status
            </label>
            <select
              id="inputState"
              className="form-select"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Select" selected>
                Select
              </option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
          <div className="col-12">
            <label for="exampleFormControlTextarea1" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              ref={description}
            ></textarea>
          </div>
          <div className="col-12">
            <h1 className="d-flex align-items-center justify-content-center">
              Premium Details
            </h1>
          </div>
          <div className="col-md-4 mb-3">
            <h5 className="mt-2">Age:</h5>
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              ref={policyMinAge}
              placeholder="minimum age"
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              ref={policyMaxAge}
              placeholder="maximum age"
            />
          </div>
          <div className="col-md-4">
            <h5 className="mt-2">Policy Term: (in Years)</h5>
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              ref={policyMinTerm}
              placeholder="minimum term"
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              ref={policyMaxTerm}
              placeholder="maximum term"
            />
          </div>
          <div className="col-md-4">
            <h5 className="mt-2">Investment Amount:</h5>
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              ref={policyMinAmount}
              placeholder="minimum amount"
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              ref={policyMaxAmount}
              placeholder="maximum amount"
            />
          </div>
          <button
            type="submit"
            className="btn btn-outline-primary col-md-4"
            onClick={handleAdd}
          >
            Add Scheme
          </button>
        </form>
      </div>
    </>
  );
};

export default AddPolicy;
