import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../../components";
import toast, { Toaster } from "react-hot-toast";

const CustomerAccounts = () => {
  const [accounts, setAccounts] = useState([]);

  const userDetails = {
    name: localStorage.getItem("name"),
    username: localStorage.getItem("username"),
    role: localStorage.getItem("role"),
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId"),
  };

  const [currentCust, setCurrentCust] = useState(null);

  const getAccounts = async () => {
    let response = await axios
      .get(
        `http://localhost:8080/api/v1/insuranceapp/get/${userDetails.username}`
      )
      .catch((err) => {
        toast.error("Customer not found");
        return;
      });
    console.log(response.data);
    setAccounts(response.data);
  };

  useEffect(() => {
    getAccounts();
  }, []);

  console.log(accounts);
  return (
    <>
      <div className="app__nav">
        <Navbar user={userDetails} />
      </div>

      <div className="viewcustomer">
        <h1>View Accounts</h1>
      </div>

      <section className="overflow-hidden">
        <div className="container ">
          <div className="table-responsive">
            <table className="table table-bordered border-primary">
              <thead>
                <tr class="table-success">
                  <th scope="col">Serial No.</th>
                  <th> Acc No.</th>
                  <th> Insurance Type </th>
                  <th> Insurance Scheme </th>
                  <th> Date Created </th>
                  <th> Maturity Date </th>
                  <th> Premium Type </th>
                  <th> Duration (in Years) </th>
                  <th> Total Premium Amount </th>
                  <th> Total Premium Amount Left</th>
                  <th> Installment Amount </th>
                  <th> Profit Ratio </th>
                  <th> Sum Assured </th>
                </tr>
              </thead>
              <tbody>
              {accounts.map((account, index) => {
                    return (
                      <tr className="table-success">
                        <td>{index + 1}</td>
                        <td>{account.accountNumber}</td>
                        <td>{account.insuranceType}</td>
                        <td>{account.insuranceScheme}</td>
                        <td>{account.dateCreated}</td>
                        <td>{account.maturityDate}</td>
                        <td>{account.premiumType}</td>
                        <td>{account.duration}</td>
                        <td>{account.totalPremiumAmount}</td>
                        <td>{account.totalPremiumAmountLeft}</td>
                        <td>{account.installmentAmount}</td>
                        <td>{account.profitRatio}</td>
                        <td>{account.sumAssured}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <Toaster position="top-right" reverseOrder={false} />;
      </section>
    </>
  );
};

export default CustomerAccounts;
