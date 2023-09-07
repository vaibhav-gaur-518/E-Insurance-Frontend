import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../components";
import toast, { Toaster } from "react-hot-toast";

const Payment = (e) => {
  const navigateObject = new useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");

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

  const handlePayment = (account) => {
    setSelectedAccount(account);
  };

  const handlePay = async (
    accountNumber,
    totalPremiumAmount,
    totalPremiumAmountLeft,
    installmentAmount
  ) => {
    if (totalPremiumAmountLeft == 0) {
      alert("All Payments are done");
      return;
    }

    let response = await axios
      .put(
        `http://localhost:8080/api/v1/insuranceapp/payment/${accountNumber}/${totalPremiumAmount}/${totalPremiumAmountLeft}/${installmentAmount}`
      )
      .catch((err) => {
        toast.error("Payment not successful");
        return;
      });
    alert("Payment successful");
    // getAccounts();
  };

  const handleTransaction = (accountNumber) => {
    navigateObject(`/viewtransactions/${accountNumber}`);
  };

  return (
    <>
      <div className="app__nav">
        <Navbar user={userDetails} />
      </div>

      <div className="viewcustomer">
        <h1>Make Payment</h1>
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
                  <th> Amount Assured </th>
                  <th> Payment </th>
                  <th> View Transactions </th>
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
                      <td>
                        <button
                          type="button"
                          class="btn btn-outline-secondary"
                          data-toggle="modal"
                          data-target="#exampleModal"
                          onClick={() => handlePayment(account)}
                        >
                          Pay
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-outline-secondary"
                          data-toggle="modal"
                          data-target="#exampleModal"
                          onClick={() =>
                            handleTransaction(account.accountNumber)
                          }
                        >
                          View Transaction
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <Toaster position="top-right" reverseOrder={false} />;
      </section>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Payment
              </h5>
              <button
                type="button"
                class="close btn btn-outline-secondary"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="name">Account Number</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    value={selectedAccount.accountNumber}
                    disabled
                  />
                </div>
                <div class="form-group">
                  <label for="name">Insurance Type</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    value={selectedAccount.insuranceType}
                    disabled
                  />
                </div>
                <div class="form-group">
                  <label for="name">Insurance Scheme</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    value={selectedAccount.insuranceScheme}
                    disabled
                  />
                </div>
                <div class="form-group">
                  <label for="name">Date Created</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    value={selectedAccount.dateCreated}
                    disabled
                  />
                </div>
                <div class="form-group">
                  <label for="name">Maturity Date</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    value={selectedAccount.maturityDate}
                    disabled
                  />
                </div>
                <div class="form-group">
                  <label for="name">Premium Type</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    value={selectedAccount.premiumType}
                    disabled
                  />
                </div>
                <div class="form-group">
                  <label for="name">Duration ( in Years )</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    value={selectedAccount.duration}
                    disabled
                  />
                </div>
                <div class="form-group">
                  <label for="name">Total Premium Amount</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    value={selectedAccount.totalPremiumAmount}
                    disabled
                  />
                </div>
                <div class="form-group">
                  <label for="name">Total Premium Amount Left</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    value={selectedAccount.totalPremiumAmountLeft}
                    disabled
                  />
                </div>
                <div class="form-group">
                  <label for="name">Installment Amount</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    value={selectedAccount.installmentAmount}
                    disabled
                  />
                </div>
                <div class="form-group">
                  <label for="name">Profit Ration</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    value={selectedAccount.profitRatio}
                    disabled
                  />
                </div>
                <div class="form-group">
                  <label for="name">Amount Assured</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    value={selectedAccount.sumAssured}
                    disabled
                  />
                </div>
                <button
                  type="submit"
                  class="btn btn-primary"
                  onClick={(e) => {
                    handlePay(
                      selectedAccount.accountNumber,
                      selectedAccount.totalPremiumAmount,
                      selectedAccount.totalPremiumAmountLeft,
                      selectedAccount.installmentAmount
                    );
                  }}
                >
                  Pay
                </button>
              </form>
            </div>
          </div>
        </div>
        <Toaster position="top-right" reverseOrder={false} />;
      </div>
    </>
  );
};

export default Payment;
