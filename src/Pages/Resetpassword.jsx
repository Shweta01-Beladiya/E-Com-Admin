import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "../CSS/riyansee.css";
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import Animation from "./Animaton";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const ResetPassword = () => {

  const BaseUrl = process.env.REACT_APP_BASEURL;
  const userId = localStorage.getItem('userId');

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = async(values) => {
    try {
      const response = await axios.post(`${BaseUrl}/api/resetPassword/${userId}`, values);
      // console.log("response",response.data);
      if(response.data.status === 200) {
        navigate('/');
      }
    } catch (error) {
      console.error('Password Reset Error:', error);
    }
  };


  return (
    <div className='relative sb_line'>
      <div className='container-fluid'>
        <div className="row md:relative">
          <div className="col-lg-5 col-12 s_animation_bottom" style={{ backgroundColor: '#fcf3ed' }}>
            <Animation />
          </div>
          <div className='col-lg-7 col-12 p-0 s_animation_top' >
            <div className="d-flex justify-content-center align-items-center vh-100 md:bg-light bg-transparent">
              <Box maxWidth={400} width="100%" p={4} style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                <Typography variant="h5" align="center" style={{ fontWeight: '700', color: '#2B221E' }}>Reset password</Typography>
                <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
                  Reset your password!
                </Typography>

                <Formik
                  initialValues={initialValues}
                  validationSchema={ResetPasswordSchema}
                  onSubmit={handleSubmit}
                >
                  {({ touched, errors, handleChange, handleBlur, values }) => (
                    <Form>
                      <Field
                        as={TextField}
                        fullWidth
                        name="newPassword"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        margin="normal"
                        error={touched.newPassword && Boolean(errors.newPassword)}
                        helperText={touched.newPassword && errors.newPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.newPassword}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                aria-label="toggle password visibility"
                              >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />

                      <Field
                        as={TextField}
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        margin="normal"
                        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                        helperText={touched.confirmPassword && errors.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                edge="end"
                                aria-label="toggle confirm password visibility"
                              >
                                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />

                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 3 }}
                        style={{ backgroundColor: '#2B221E', color: '#fff', padding: '10px 0' }}
                      >
                      Reset Password
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;