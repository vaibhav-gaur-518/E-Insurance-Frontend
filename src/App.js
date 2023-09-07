import React from "react";
import { Login, AdminDashboard } from "./container";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import EmpDashboard from "./container/Employee/EmpDashboard";
import AgentDashboard from "./container/Agent/AgentDashboard";
import CustomerDashboard from "./container/Customer/CustomerDashboard";
import Home from "./container/Home/Home";
import AddEmployee from "./container/Admin/Employee/AddEmployee";
import ViewEmployee from "./container/Admin/Employee/ViewEmployee";
import UpdateEmployee from "./container/Admin/Employee/UpdateEmployee";
import AddAgent from "./container/Admin/Agent/AddAgent";
import ViewAgent from "./container/Admin/Agent/ViewAgent";
import UpdateAgent from "./container/Admin/Agent/UpdateAgent";
import ViewCustomer from "./container/Admin/Customer/ViewCustomer";
import UpdateCustomer from "./container/Admin/Customer/UpdateCustomer";
import InsurancePlan from "./container/Admin/AddInsurance/InsurancePlan";
import ViewInsurancePlan from "./container/Admin/AddInsurance/ViewInsurancePlan";
import Profile from "./container/Admin/Profile/Profile";
import CustomerProfile from "./container/Customer/Profile/CustomerProfile";
import AddScheme from "./container/Admin/AddInsurance/Scheme/AddScheme";
import ViewScheme from "./container/Admin/AddInsurance/Scheme/ViewScheme";
import ChangePassword from "./container/Admin/Password/ChangePassword";
import State from "./container/State/State";
import ViewState from "./container/State/ViewState";
import City from "./container/City/City";
import ViewCity from "./container/City/ViewCity";
import AddCustomer from "./container/Employee/Customer/AddCustomer";
import Marketing from "./container/Agent/Marketing/Marketing";
import CustomerAccounts from "./container/InsuranceAccount/CustomerAccounts";
import BuyPolicy from "./container/InsuranceAccount/BuyPolicy";
import GetAllCustomerAccounts from "./container/InsuranceAccount/GetAllCustomerAccounts";
import Payment from "./container/InsuranceAccount/Payment";
import ViewTransaction from "./container/InsuranceAccount/ViewTransaction";
import Documents from "./container/Customer/Documents/Documents";
import ViewDocuments from "./container/Customer/Documents/ViewDocuments";


const App = () => {
  return (
    <div className="app" id="light">

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/logout" element={<Home />} />

        <Route exact path='/admindashboard' element={<AdminDashboard />} />
        <Route exact path='/updatepassword' element={<ChangePassword />} />
        <Route exact path='/addemployee' element={<AddEmployee />} />
        <Route exact path='/viewemployee' element={<ViewEmployee />} />
        <Route exact path='/updateEmp/:empUserId/:empName/:empEmail/:empAddress/:empStatus' element={<UpdateEmployee />} />
        <Route exact path='/viewallcustomeraccounts' element={<GetAllCustomerAccounts />} />

        <Route exact path='/addagent' element={<AddAgent />} />
        <Route exact path='/viewagent' element={<ViewAgent />} />
        <Route exact path='/updateagent/:agentId/:agentName/:agentEmail/:agentAddress/:agentStatus' element={<UpdateAgent />} />

        <Route exact path='/viewcustomer' element={<ViewCustomer />} />
        <Route exact path='/updatecustomer/:customerId/:customerName/:customerEmail/:customerAddress/:customerStatus' element={<UpdateCustomer />} />

        <Route exact path='/insurancetype' element={<InsurancePlan />} />
        <Route exact path='/viewinsurancetype' element={<ViewInsurancePlan />} />
        <Route exact path='/addscheme' element={<AddScheme />} />
        <Route exact path='/viewscheme' element={<ViewScheme />} />

        <Route exact path='/profile' element={<Profile />} />
        
        <Route exact path='/employeedashboard' element={<EmpDashboard />} />
        <Route exact path='/addcustomer' element={<AddCustomer />} />

        <Route exact path='/agentdashboard' element={<AgentDashboard />} />
        <Route exact path='/marketing' element={<Marketing />} />

        <Route exact path='/customerdashboard' element={<CustomerDashboard />} />
        <Route exact path='/customerprofile' element={<CustomerProfile />} />
        <Route exact path='/buypolicy' element={<BuyPolicy />} />
        <Route exact path='/viewpolicy' element={<CustomerAccounts />} />
        <Route exact path='/payment' element={<Payment />} />
        <Route exact path='/viewtransactions/:accountNumber' element={<ViewTransaction />} />
        <Route exact path='/doucments' element={<Documents />} />
        <Route exact path='/viewdoucments' element={<ViewDocuments />} />


        <Route exact path='/state' element={<State />} />
        <Route exact path='/viewstate' element={<ViewState />} />
        <Route exact path='/city' element={<City />} />
        <Route exact path='/viewcity' element={<ViewCity />} />
      </Routes>

    </div>
  );
};

export default App;
