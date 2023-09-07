import React, { useEffect, useState } from "react";
import { Navbar } from "../../../components";
import { images } from "../../../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewDocuments = () => {
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
    if (userDetails.role === "admin") {
      try {
        const response = await axios.get(
          `http://localhost:8080/file/allfiles`,
          {
            headers: {
              Authorization: userDetails.token,
            },
          }
        );
        setDocuments(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
        alert("Failed to fetch documents");
      }
    }
  };

  const handleApprove = async (documentId) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/file/approve/${documentId}`,
        {
          headers: {
            Authorization: userDetails.token,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      alert("Error Updating");
    }
    navigateObject(`/admindashboard`);
  };
  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <>
      <div className="app__nav">
        <Navbar user={userDetails} />
      </div>

      <div className="viewemp">
        <h1>View Documents</h1>
      </div>

      <section className="overflow-hidden">
        <div className="container ">
          <div className="table-responsive">
            <table className="table table-bordered border-primary">
              <thead>
                <tr class="table-success">
                  <th scope="col">Serial No.</th>
                  <th scope="col">Document ID</th>
                  <th scope="col">Document Name</th>
                  {/* <th scope="col">Document</th> */}
                  <th scope="col">Status</th>
                  {userDetails.role === "admin" ? (
                    <th scope="col">Approve</th>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {documents.map((document, index) => {
                  return (
                    <tr className="table-success">
                      <td>{index + 1}</td>
                      <td>{document.documentId}</td>
                      <td>{document.documentName}</td>
                      <td>
                        {document.documentStatus === "INACTIVE"
                          ? "Pending"
                          : "Approved"}
                      </td>
                      {userDetails.role === "admin" ? (
                        <td>
                          <button
                            type="button"
                            class="btn btn-outline-danger"
                            onClick={() => handleApprove(document.documentId)}
                          >
                            Approve
                          </button>
                        </td>
                      ) : null}
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

export default ViewDocuments;

 {/* <td>
                        <img
                          src={`${document.documentData}`}
                          className="card-img-top"
                          alt="Document"
                        />
                      </td> */}