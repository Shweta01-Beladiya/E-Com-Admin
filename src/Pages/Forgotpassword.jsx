import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../CSS/riyansee.css";
import Animation from "./Animaton";
import { Box, Button, InputAdornment, TextField, Typography } from "@mui/material";
import { BsTelephoneFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const initialValues = {
    mobileNo: '',
};

const validationSchema = Yup.object({
    mobileNo: Yup.string()
        .matches(/^[0-9]+$/, "Mobile number must contain only digits")
        .min(10, "Mobile number must be at least 10 digits")
        .required("Mobile Number is Required"),
});

const Forgotpassword = () => {

    const navigate = useNavigate();

    const handleSubmit = (values) => {
        console.log('Form values:', values);
    };
    
    const handleSendOtp = () => {
        navigate('/verify-otp');
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
                                <Typography variant="h5" align="center" style={{ fontWeight: '700',color:'#2B221E' }} >Forgot password</Typography>
                                <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
                                    Enter your mail to forgot your password.
                                </Typography>

                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ touched, errors, handleChange, handleBlur, values }) => (
                                        <Form>
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
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                fullWidth
                                                sx={{ mt: 3 }}
                                                style={{ backgroundColor: '#2B221E', color: '#fff', padding: '10px 0' }}
                                                onClick={handleSendOtp}
                                            >
                                                Send Otp
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

export default Forgotpassword;
