import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Animation from './Animaton';
import { Button, TextField, InputAdornment, Box, Typography, IconButton } from '@mui/material';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { BsTelephoneFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    mobileNo: '',
    password: '',
  };

  const validationSchema = Yup.object({
    mobileNo: Yup.string()
      .matches(/^[0-9]+$/, "Mobile number must contain only digits")
      .min(10, "Mobile number must be at least 10 digits")
      .required("Mobile Number is Required"),
    
    password: Yup.string()
      .required("Password is required"),
  });
  
  const handleSubmit = (values) => {
    console.log('Form values:', values);
  };

  const handleNavigate = () => {
    navigate('/forgot-password');
  }
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
                <Typography variant="h5" align="center" style={{fontWeight:'700',color:'#2B221E'}}>Login</Typography>
                <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
                  Login to your existing account!
                </Typography>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ touched, errors, handleChange, handleBlur, values }) => (
                    <Form>
                      {/* Email Field */}
                      <Field
                        as={TextField}
                        fullWidth
                        name="mobileNo"
                        label="Mobile No"
                        variant="outlined"
                        margin="normal"
                        error={touched.mobileNo && Boolean(errors.mobileNo)}
                        helperText={touched.mobileNo && errors.mobileNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.mobileNo}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <BsTelephoneFill />
                            </InputAdornment>
                          ),
                        }}
                      />

                      {/* Password Field */}
                      <Field
                        as={TextField}
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        margin="normal"
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                {showPassword ? <FaEye /> : < FaEyeSlash />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />

                      <Box display="flex" justifyContent="flex-end" mt={1} onClick={handleNavigate}>
                        <Typography
                          style={{ textDecoration: 'none', cursor: 'pointer', color: '#FF2D2D', fontSize: 14, fontWeight: 'bold' }}
                        >
                          Forgot Password?
                        </Typography>
                      </Box>

                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 3 }}
                        style={{ backgroundColor: '#2B221E', color: '#fff', padding: '10px 0' }}
                      >
                        Login
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

export default Login;
