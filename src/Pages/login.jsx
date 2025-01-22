import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormGroup, FormControl, InputGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../CSS/riyansee.css";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  return (
    <div className="login-page">
      {/* Left Section */}
      <div className="left-section">
        <div className="cartoon-container">
          <img src={require("../Photos/logincartoon.png")} alt="Cartoon" />
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="login-form">
          <h2>Login</h2>
          <p>Login to your existing account!</p>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              console.log("Form Submitted", values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                {/* Email Field */}
                <FormGroup className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-envelope-fill"></i>
                    </InputGroup.Text>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
                      as={FormControl}
                      isInvalid={touched.email && errors.email}
                    />
                  </InputGroup>
                  {touched.email && errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </FormGroup>

                {/* Password Field */}
                <FormGroup className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-lock-fill"></i>
                    </InputGroup.Text>
                    <Field
                      name="password"
                      type="password"
                      placeholder="Password"
                      as={FormControl}
                      isInvalid={touched.password && errors.password}
                    />
                  </InputGroup>
                  {touched.password && errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </FormGroup>

                {/* Forgot Password */}
                <div className="d-flex justify-content-between">
                  <a href="#" className="forgot-password">
                    Forgot Password?
                  </a>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="btn-login w-100 mt-3">
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
