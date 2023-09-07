import React, { useEffect, useState } from "react";
import { Navbar } from "../../components";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const ViewTransaction = () => {

    const [transactions, setTransactions] = useState([])

  const userDetails = {
    name: localStorage.getItem("name"),
    username: localStorage.getItem("username"),
    role: localStorage.getItem("role"),
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId"),
    accountNumber: useParams().accountNumber,
  };

  const getTransactions = async () => {
    let response = await axios
      .get(
        `http://localhost:8080/api/v1/insuranceapp/payment/details/${userDetails.accountNumber}`
      )
      .catch((err) => {
        toast.error("No Transactions Found");
        return;
      });
    console.log(response.data);
    setTransactions(response.data);
  };

  useEffect(() => {
    getTransactions();
  }, []);


  return (
    <>
      <div className="app__nav">
        <Navbar user={userDetails} />
      </div>

      <div className="viewcustomer">
        <h1>View Transactions</h1>
      </div>

      <section className="overflow-hidden">
        <div className="container ">
          <div className="table-responsive">
            <table className="table table-bordered border-primary">
              <thead>
                <tr class="table-success">
                  <th scope="col">Serial No.</th>
                  <th> Acc No.</th>
                  <th> Payment ID </th>
                  <th> Insurance Type </th>
                  <th> Insurance Scheme </th>
                  <th> Status </th>
                  <th> Amount </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => {
                  return (
                    <tr className="table-success">
                      <td>{index + 1}</td>
                      <td>{userDetails.accountNumber}</td>
                      <td>{transaction.paymentId}</td>
                      <td>{transaction.insuranceAccount.insuranceType}</td>
                      <td>{transaction.insuranceAccount.insuranceScheme}</td>
                      <td>{transaction.status === true ? "Success" : "Pending"}</td>
                      <td>{transaction.amount}</td>
                      
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

export default ViewTransaction;
