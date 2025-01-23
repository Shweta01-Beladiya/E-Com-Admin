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

const Forgotpassword= () => {
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
                    <h2>Forgot password</h2>
                    <p>Enter your mail to forgot your password.</p>
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

                                        <Field
                                            name="email"
                                            type="email"
                                            placeholder="Email"
                                            as={FormControl}
                                            isInvalid={touched.email && errors.email}
                                        />
                                        <InputGroup.Text>
                                            <i className="bi bi-envelope-fill"></i>
                                        </InputGroup.Text>
                                    </InputGroup>
                                    {touched.email && errors.email && (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    )}
                                </FormGroup>
                                 {/* Submit Button */}
                                <Button type="submit" className="btn-login w-100 mt-3">
                                    Send OTP
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Forgotpassword;
