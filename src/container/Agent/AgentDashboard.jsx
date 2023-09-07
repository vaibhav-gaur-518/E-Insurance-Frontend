import React from 'react'
import "./AgentDashboard.scss"
import { Navbar } from '../../components';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { images } from '../../constants';

const AgentDashboard = () => {
  const navigateObject = new useNavigate();

  const userDetails = {
    name: localStorage.getItem('name'),
    username: localStorage.getItem('username'),
    role:localStorage.getItem('role'),
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId'),
  };

  const handleViewInsuranceType = () => {
    navigateObject(
      `/viewinsurancetype`
    );
  }

  const handleViewCustomer = () => {
    navigateObject(
      `/viewcustomer`
    );
  }

  const handleViewInsuranceScheme = () => {
    navigateObject(
      `/viewscheme`
    );
  }

  const handleViewState = () => {
    navigateObject(
      `/viewstate`
    );
  }

  const handleViewCity = () => {
    navigateObject(
      `/viewcity`
    );
  }

  return (
    <>
      <div className="app__admin">
        <div className="app__nav">
          <Navbar user={userDetails} />
        </div>

        <div className="app__grid">
          <h1>Welcome {userDetails.name} </h1>
          <Grid
            container
            justifyContent="flex-start"
            alignItems="center"
            spacing={4}
            style={{ marginLeft: "3rem" }}
          >
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <div className="card" onClick={handleViewCustomer}>
              <img className="image" src={images.Customer} />
                <h3>View Customer</h3>
              </div>
            </Grid>
            {/* <Grid item xs={12} sm={6} md={4} lg={3}>
              <div className="card">
              <img className="image" src={images.Doc} />
                <h3>Customer Documents</h3>
              </div>
            </Grid> */}
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <div className="card" onClick={handleViewInsuranceType}>
                <img className="image" src={images.InsuranceType} />
                <h3>View Insurance Type</h3>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <div className="card" onClick={handleViewInsuranceScheme}>
              <img className="image" src={images.InsurancePlans} />
                <h3>View Insurance Plan</h3>
              </div>
            </Grid>
            {/* <Grid item xs={12} sm={6} md={4} lg={3}>
              <div className="card">
              <img className="image" src={images.PolicyPayment} />
                <h3>View Policy Payment</h3>
              </div>
            </Grid> */}
            {/* <Grid item xs={12} sm={6} md={4} lg={3}>
              <div className="card">
              <img className="image" src={images.PolicyClaim} />
                <h3>Policy Claim</h3>
              </div>
            </Grid> */}
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <div className="card" onClick={handleViewState}>
              <img className="image" src={images.State} />
                <h3>View State</h3>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <div className="card" onClick={handleViewState}>
              <img className="image" src={images.City} />
                <h3>View City</h3>
              </div>
            </Grid>

          </Grid>
        </div>
      </div>
    </>
  )
}

export default AgentDashboard