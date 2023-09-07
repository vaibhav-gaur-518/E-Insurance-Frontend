import React, { useState } from "react";
import { images } from "../../constants";
// import { client } from "../../client";
import "./Footer.scss";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

const Footer = () => {
  // return (
  //   // <div id="contact" className="app__header app__flex app__container">
  //     <footer id="contact" className="footer">
  //       <div className="container">
  //         <p className="footer-text">
  //           &copy; 2023 Vaibhav Gaur & Avani. All rights reserved.
  //         </p>
  //       </div>
  //     </footer>
  //   // </div>
  // );

  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted" id="contact">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a
            href="https://www.facebook.com/example"
            className="me-4 text-reset"
            style={{zIndex:"10"}}
          >
            <MDBIcon color="secondary" fab icon="facebook-f" />
          </a>
          <a href="https://twitter.com/example" className="me-4 text-reset">
            <MDBIcon color="secondary" fab icon="twitter" />
          </a>
          <a href="https://www.google.com/" className="me-4 text-reset">
            <MDBIcon color="secondary" fab icon="google" />
          </a>
        </div>
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon color="secondary" icon="gem" className="me-3" />
                INSTA Insurance
              </h6>
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <a href="#!" className="text-reset">
                  React
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Spring Boot
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  MySQL
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Postman
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="#!" className="text-reset">
                  Pricing
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Settings
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Orders
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <MDBIcon color="secondary" icon="home" className="me-2" />
                Faridabad, Haryana, India
              </p>
              <p>
                <MDBIcon color="secondary" icon="envelope" className="me-3" />
                vaibhavgaur518@gmail.com
              </p>
              <p>
                <MDBIcon color="primary" icon="phone" className="me-3" /> + 01
                1234567890
              </p>
              <p>
                <MDBIcon color="secondary" icon="print" className="me-3" /> + 01
                9876543210
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2023 Copyright:
        <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
          Vaibhav Gaur
        </a>
      </div>
    </MDBFooter>
  );
};

export default Footer;
