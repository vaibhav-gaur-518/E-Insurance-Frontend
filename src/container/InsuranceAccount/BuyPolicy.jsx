import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Navbar } from "../../components";
import toast, { Toaster } from "react-hot-toast";

const BuyPolicy = () => {
  const navigateObject = new useNavigate();

  const userDetails = {
    name: localStorage.getItem("name"),
    username: localStorage.getItem("username"),
    role: localStorage.getItem("role"),
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId"),
  };
  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async () => {
    if (userDetails.role === "customer") {
      try {
        const response = await axios.get(
          `http://localhost:8080/file/allfiles/${userDetails.userId}`,
          {
            headers: {
              Authorization: userDetails.token,
            },
          }
        );
        setDocuments(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
        alert("Failed to fetch documents");
      }
    }
  };

  documents.map((document) => {
    if (document.documentStatus === "INACTIVE" || document == "") {
      alert("Your Documents Are Not Approved  You Can't Buy Policy For now");
      navigateObject(`/customerdashboard`);
    }
  });

  const insurnceRef = useRef(0);
  const schemeRef = useRef(0);
  const [insuranceData, setinsuranceData] = useState([]);
  const [schemeData, setSchemeData] = useState([]);

  const totalPremiumLeft = useRef();
  const totalPremiumAmountRef = useRef();
  const durationRef = useRef();
  const profitRatioRef = useRef(0);
  const premiumTypeRef = useRef();
  const schemeDataRef = useRef();

  const maxtermRef = useRef(1);
  const mintermRef = useRef(0);
  const maxAmountRef = useRef(0);
  const minAmountRef = useRef(0);
  const minAgeRef = useRef(0);
  const maxAgeRef = useRef(0);

  let response = {};

  useEffect(() => {
    fetchDocuments();

    documents.map((document) => {
      if (document.documentStatus === "INACTIVE") {
        alert("Your Documents Are Not Approved. You Can't Buy Policy For now");
        navigateObject(`/customerdashboard`);
      }
    });
  }, []);

  useEffect(() => {
    getAllInsurancePlans();
  }, []);

  const getAllInsurancePlans = async (e) => {
    response = await axios
      .get(`http://localhost:8080/api/v1/insuranceplan/getall`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${userDetails.token}`,
        },
        withCredentials: true,
      })
      .catch((err) => {
        toast.error("error occured");
        return;
      });

    setinsuranceData(response.data);
  };

  const getAllRespectiveSchemes = async (e) => {
    const insuranceplanid = insurnceRef.current.value;
    const response = await axios
      .get(
        `http://localhost:8080/api/v1/insuranceplan/getByInsuranceid/${insuranceplanid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${userDetails.token}`,
          },
          withCredentials: true,
        }
      )
      .catch((err) => {
        toast.error("error occured");
        return;
      });
    setSchemeData(response.data);
  };

  const handleMyForm = async (e) => {
    e.preventDefault();

    const insurnce = insurnceRef.current.value;
    const scheme = JSON.parse(schemeRef.current.value);
    console.log(scheme);
    console.log(scheme.details);

    const schemeDetails = scheme.details;
    const totalPremiumAmount = totalPremiumAmountRef.current.value;
    const totalPremiumLeft = totalPremiumAmountRef.current.value;
    const profitRatio = 10;
    const duration = durationRef.current.value;
    const premiumType = premiumTypeRef.current.value;

    maxtermRef.current = schemeDetails.maxiInvestmentTime;
    mintermRef.current = schemeDetails.miniInvestmentTime;
    maxAmountRef.current = schemeDetails.maxiAmount;
    minAmountRef.current = schemeDetails.miniAmount;
    maxAgeRef.current = schemeDetails.miniAge;
    minAgeRef.current = schemeDetails.maxiAge;

    if (
      !(
        totalPremiumAmount <= maxAmountRef.current &&
        totalPremiumAmount >= minAmountRef.current
      )
    ) {
      toast.error(
        "TotalPremiumAmount should be between " +
          minAmountRef.current +
          " and " +
          maxAmountRef.current
      );

      return;
    }

    if (!(duration <= maxtermRef.current && duration >= mintermRef.current)) {
      toast.error(
        "Duration should be between " +
          mintermRef.current +
          " and " +
          maxtermRef.current
      );

      return;
    }

    response = await axios
      .post(
        `http://localhost:8080/api/v1/insuranceapp/buypolicy/${userDetails.username}/${scheme.policyId}`,
        JSON.stringify({
          premiumType,
          totalPremiumAmount,
          totalPremiumLeft,
          profitRatio,
          duration,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${userDetails.token}`,
          },
          withCredentials: true,
        }
      )
      .catch((err) => {
        toast.error("error");
        return;
      });
    if (!response.data) {
      toast.error("Data not Found ! try again later");
      return;
    }
    console.log("done!!!", response);
    toast.success("Your have successfullly bought the Insurance ");
    navigateObject(`/customerdashboard`);
  };

  const insuranceOptions = insuranceData.map((insurance, index) => {
    if (insurance.status === "ACTIVE") {
      return (
        <option key={insurance.insuranceId} value={insurance.insuranceId}>
          Name: {insurance.insuranceType}{" "}
        </option>
      );
    }
  });

  const schemeOptions = schemeData.map((scheme, index) => {
    return (
      <option key={scheme.policyId} value={JSON.stringify(scheme)}>
        Name: {scheme.policyName}
      </option>
    );
  });

  return (
    <>
      <div className="app__nav">
        <Navbar user={userDetails} />
      </div>

      <div className="viewemp">
        <h1>Buy New Policy</h1>
      </div>

      <div className="container">
        <form class="row g-3">
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              Select a Insurance Type
            </label>
            <select
              className="form-select"
              id="insurance"
              onChange={getAllRespectiveSchemes}
              ref={insurnceRef}
            >
              <option selected value="select">
                Select
              </option>
              {insuranceOptions}
            </select>
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              Select a Policy Type
            </label>
            <select
              className="form-select"
              id="insurance"
              onChange={getAllRespectiveSchemes}
              ref={schemeRef}
            >
              <option selected value="select">
                Select
              </option>
              {schemeOptions}
            </select>
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              Select a Premium Type
            </label>
            <select className="form-select" id="insurance" ref={premiumTypeRef}>
              <option selected value="yearly">
                Yearly
              </option>
            </select>
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              Duration
            </label>
            <input
              type="number"
              class="form-control"
              id="inputEmail4"
              ref={durationRef}
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputEmail4" class="form-label">
              Total Amount
            </label>
            <input
              type="number"
              class="form-control"
              id="inputEmail4"
              ref={totalPremiumAmountRef}
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            onClick={(e) => handleMyForm(e)}
          >
            Buy Policy
          </button>
        </form>
        <Toaster position="top-right" reverseOrder={false} />;
      </div>
    </>
  );
};

export default BuyPolicy;
