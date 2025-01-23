import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../CSS/riyansee.css";

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const ResetPassword = () => {
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
          <h2>Reset Password</h2>
          <p>Reset Your password here!</p>
          <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={ResetPasswordSchema}
            onSubmit={(values) => {
              console.log("Password Reset Successful", values);
              navigate("/"); // Navigate back to Login page
            }}
          >
            {({ errors, touched }) => (
              <Form>
                {/* Password Field */}
                <FormGroup className="mb-3">
                  <Field
                    name="password"
                    type="password"
                    placeholder="Create new password"
                    className={`form-control ${
                      touched.password && errors.password ? "is-invalid" : ""
                    }`}
                  />
                  {touched.password && errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </FormGroup>

                {/* Confirm Password Field */}
                <FormGroup className="mb-3">
                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className={`form-control ${
                      touched.confirmPassword && errors.confirmPassword
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </FormGroup>

                {/* Submit Button */}
                <Button type="submit" className="btn-login w-100 mt-3">
                  Reset Password
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
