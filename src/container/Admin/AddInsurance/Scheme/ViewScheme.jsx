import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../../../../components";

const ViewScheme = () => {
  const [schemes, setSchemes] = useState([]);
  const [policy, setPolicy] = useState([]);
  const [plans, setPlans] = useState([]);

  const userDetails = {
    name: localStorage.getItem('name'),
    username: localStorage.getItem('username'),
    role:localStorage.getItem('role'),
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId'),
  };

  const getAllPlans = async () => {
    try {
      let response = await axios.get(`http://localhost:8080/policy/getall`, {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
          Authorization: `${userDetails.token}`,
        },
      });
      console.log(response.data);
      if (response.data.user !== null) {
        setSchemes(response.data)
        // setPolicy(response.data.details)
        // setPlans(response.data.plan);

        // console.log(plans);
      }
    } catch (error) {
      alert("Please Login");
      return;
    }
  };

  useEffect(() => {
    getAllPlans();
  }, []);

  const handleUpdate = async (insuranceId) => {
    // try {
    //   let response = await axios.put(
    //     ` http://localhost:8080/api/v1/insuranceplan/update/${insuranceId}`,
    //     {},
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         withCredentials: true,
    //         Authorization: `${userDetails.token}`,
    //       },
    //     }
    //   );
    // } catch (error) {
    //   alert("Only Admin can update");
    //   return;
    // }
    // getAllPlans();
  };

  return (
    <>
      <div className="app__nav">
        <Navbar user={userDetails} />
      </div>
      <div className="viewemp">
        <h1>View Insurance Scheme</h1>
      </div>
      <section className="overflow-hidden">
        <div className="container ">
          <div className="table-responsive">
            <table className="table table-bordered border-primary">
              <thead>
                <tr class="table-success">
                  <th scope="col">Serial No.</th>
                  <th scope="col">Insurance ID</th>
                  <th scope="col">Insurance Type</th>
                  <th scope="col">Insurance Type Status</th>
                  <th scope="col">Policy ID</th>
                  <th scope="col">Policy Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Commission on new registration (in %)</th>
                  <th scope="col">Commission on new registration (in %)</th>
                  <th scope="col">Minimum Age</th>
                  <th scope="col">Maximum Age</th>
                  <th scope="col">Minimum Amount</th>
                  <th scope="col">Maximum Amount</th>
                  <th scope="col">Minimum Investment Time (in Years)</th>
                  <th scope="col">Maximum Investment Time (in Years)</th>
                  {/* <th scope="col">Status</th>
                  <th scope="col">Update</th> */}
                </tr>
              </thead>
              <tbody>
                {schemes.map((scheme, index) => {
                  return (
                    <tr className="table-success">
                      <td>{index + 1}</td>
                      <td>{scheme.plan.insuranceId}</td>
                      <td>{scheme.plan.insuranceType}</td>
                      <td>{scheme.plan.status}</td>
                      <td>{scheme.policyId}</td>
                      <td>{scheme.policyName}</td>
                      <td>{scheme.description}</td>
                      <td>{scheme.newCommission}</td>
                      <td>{scheme.installmentCommission}</td>
                      <td>{scheme.details.miniAge}</td>
                      <td>{scheme.details.maxiAge}</td>
                      <td>{scheme.details.miniAmount}</td>
                      <td>{scheme.details.maxiAmount}</td>
                      <td>{scheme.details.miniInvestmentTime}</td>
                      <td>{scheme.details.maxiInvestmentTime}</td>
                      {/* <td>
                        <button
                          type="button"
                          class="btn btn-outline-secondary"
                          onClick={() => handleUpdate(scheme.insuranceId)}
                        >
                          Update
                        </button>
                      </td> */}
                      {/* <td>
                        <button
                          type="button"
                          class="btn btn-outline-secondary"
                        //   onClick={() => handleUpdate(scheme.insuranceId)}
                        >
                          Delete
                        </button>
                      </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewScheme;
