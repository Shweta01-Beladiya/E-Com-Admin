import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FormGroup, Button } from 'react-bootstrap';
import { AiOutlineMail, AiOutlineEye } from 'react-icons/ai';

const Login = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values) => {
    console.log('Form values:', values);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 border rounded shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center">Login</h3>
        <p className="text-center text-muted">Login to your existing account!</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors }) => (
            <Form>
              <FormGroup className="mb-3 position-relative">
                <div className="input-group">
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                  />
                  <span className="input-group-text bg-white border-0">
                    <AiOutlineMail />
                  </span>
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger small mt-1"
                />
              </FormGroup>

              <FormGroup className="mb-3 position-relative">
                <div className="input-group">
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                  />
                  <span className="input-group-text bg-white border-0">
                    <AiOutlineEye />
                  </span>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger small mt-1"
                />
              </FormGroup>

              <div className="d-flex justify-content-end">
                <a href="/forgot-password" className="text-danger small">Forgot Password?</a>
              </div>

              <Button type="submit" className="btn btn-dark w-100 mt-3">
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
