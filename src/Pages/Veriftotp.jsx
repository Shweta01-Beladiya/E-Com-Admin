import React, { useRef } from "react";
import { Formik, Form, Field } from "formik";
import { FormGroup } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "../CSS/riyansee.css";
import Animation from "./Animaton";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";

const VerifyOTP = () => {

  const BaseUrl = process.env.REACT_APP_BASEURL;

  const navigate = useNavigate();
  const location = useLocation();

  // console.log("locartion",location);
  const otp = location.state.otp;
  const mobileNo = location.state.mobileNo;

  // console.log("otp",otp);
  // console.log("mobileNo",mobileNo);
  
  const inputRefs = useRef([]);

  const handleKeyUp = (e, index) => {
    if (e.target.value.length === 1 && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index, setFieldValue) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (e.target.value) {
        setFieldValue(`otp${index + 1}`, "");
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        setFieldValue(`otp${index}`, "");
      }
    }
  };

  const handleSubmit = async(values) => {
    try {
      const enteredOtp = values.otp1 + values.otp2 + values.otp3 + values.otp4;

      const response = await axios.post(`${BaseUrl}/api/verifyOtp`,{
        mobileNo:mobileNo,
        otp:enteredOtp
      });
      console.log("response",response.data);
      if(response.data.status === 200) {
        navigate("/reset-password");
      }
    } catch (error) {
      console.error('Verify Otp Error:', error);
    }
  }
  return (
    <div className='relative sb_line'>
      <div className='container-fluid'>
        <div className="row md:relative">
          <div className="col-lg-5 col-12 s_animation_bottom" style={{ backgroundColor: '#fcf3ed' }}>
            <Animation />
          </div>
          <div className='col-lg-7 col-12 p-0 s_animation_top'>
            <div className="d-flex justify-content-center align-items-center vh-100 md:bg-light bg-transparent">
            <Box maxWidth={400} width="100%" p={4} style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                <Typography variant="h5" align="center" style={{fontWeight:'700',color:'#2B221E'}}>Verify OTP</Typography>
                <Typography variant="body2" align="center" style={{color:'#6A6A6A'}} gutterBottom>
                  Code has been successfully to +91 {mobileNo}
                </Typography>
                <Formik
                  initialValues={{ otp1: "", otp2: "", otp3: "", otp4: "" }}
                  onSubmit={handleSubmit}
                >
                  {({ setFieldValue }) => (
                    <Form>
                      <div className="d-flex justify-content-between mb-3 mt-4">
                        {[1, 2, 3, 4].map((num, index) => (
                          <FormGroup key={num} className="mx-1">
                            <Field
                              name={`otp${num}`}
                              type="text"
                              maxLength="1"
                              className="form-control text-center otp-input"
                              style={{ width: "60px", height: "60px", fontSize: "24px" }}
                              onKeyUp={(e) => handleKeyUp(e, index)}
                              onKeyDown={(e) => handleKeyDown(e, index, setFieldValue)}
                              innerRef={(el) => (inputRefs.current[index] = el)}
                              onInput={(e) => { e.target.value = e.target.value.replace(/\D/g, ''); }}
                            />
                          </FormGroup>
                        ))}
                      </div>
    
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 3 }}
                        style={{ backgroundColor: '#2B221E', color: '#fff', padding: '10px 0' }}
                      >
                        Verify
                      </Button>
                      <Typography className="mt-3 text-center">
                        <p style={{color:'#6A6A6A'}}> Didn't receive code? <span style={{ cursor: "pointer", color: "#2B221E", fontWeight:'bold' }}>Resend</span></p>
                      </Typography>
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

export default VerifyOTP;
