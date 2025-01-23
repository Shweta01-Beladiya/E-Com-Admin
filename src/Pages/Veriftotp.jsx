import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../CSS/riyansee.css";

const OTPSchema = Yup.object().shape({
  otp: Yup.string()
    .length(4, "OTP must be exactly 4 digits")
    .required("OTP is required"),
});

const VerifyOTP = () => {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      {/* Left Section */}
      <div className="left-section">
        <div className="cartoon-container">
          <img
            src={require("../Photos/logincartoon.png")}
            alt="Cartoon"
            className="cartoon-walk"
          />
        </div>
        <div className="cartoon-border"></div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="login-form">
          <h2>Verify OTP</h2>
          <p>Enter the OTP sent to your email.</p>
          <Formik
            initialValues={{ otp: "" }}
            validationSchema={OTPSchema}
            onSubmit={(values) => {
              console.log("OTP Submitted", values);
              navigate("/reset-password"); // Navigate to Reset Password page
            }}
          >
            {({ errors, touched }) => (
              <Form>
                {/* OTP Field */}
                <FormGroup className="mb-3">
                  <Field
                    name="otp"
                    type="text"
                    placeholder="Enter OTP"
                    className={`form-control ${
                      touched.otp && errors.otp ? "is-invalid" : ""
                    }`}
                  />
                  {touched.otp && errors.otp && (
                    <div className="invalid-feedback">{errors.otp}</div>
                  )}
                </FormGroup>

                {/* Submit Button */}
                <Button type="submit" className="btn-login w-100 mt-3">
                  Verify OTP
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
