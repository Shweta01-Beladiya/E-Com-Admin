import React, { useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../CSS/riyansee.css";

const OTPSchema = Yup.object().shape({
  otp1: Yup.string()
    .length(1, "Required")
    .required("Required"),
  otp2: Yup.string()
    .length(1, "Required")
    .required("Required"),
  otp3: Yup.string()
    .length(1, "Required")
    .required("Required"),
  otp4: Yup.string()
    .length(1, "Required")
    .required("Required"),
});

const VerifyOTP = () => {
  const navigate = useNavigate();
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleKeyUp = (e, index) => {
    if (e.target.value.length === 1 && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

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
          <p>Code has been succesfully sent to example@gmail.com</p>
          <Formik
            initialValues={{ otp1: "", otp2: "", otp3: "", otp4: "" }}
            validationSchema={OTPSchema}
            onSubmit={(values) => {
              const otp = values.otp1 + values.otp2 + values.otp3 + values.otp4;
              console.log("OTP Submitted", otp);
              navigate("/reset-password");
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="d-flex justify-content-between mb-3">
                  {[1, 2, 3, 4].map((num, index) => (
                    <FormGroup key={num} className="mx-1">
                      <Field
                        name={`otp${num}`}
                        type="text"
                        maxLength="1"
                        className={`form-control text-center otp-input ${
                          touched[`otp${num}`] && errors[`otp${num}`] ? "is-invalid" : ""
                        }`}
                        style={{ width: "60px", height: "60px", fontSize: "24px" }}
                        onKeyUp={(e) => handleKeyUp(e, index)}
                        innerRef={inputRefs[index]}
                      />
                    </FormGroup>
                  ))}
                </div>

                {/* Submit Button */}
                <Button type="submit" className="btn-login w-100 mt-3">
                  Verify OTP
                </Button>
                <p className="mt-3 text-center">
                  Didn't receive code? <span style={{ cursor: "pointer", color: "#007bff" }}>Resend</span>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;