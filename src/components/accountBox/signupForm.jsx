import React, {useContext, useEffect, useRef, useState} from 'react';
import axios from "axios";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  LineText,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from './accountContext';
import HashLoader from "react-spinners/HashLoader";
import Modal from 'react-bootstrap/Modal';
import {Button} from "@material-ui/core";
const qs = require('qs');


export function SignupForm(props) {

  const { switchToSignup } = useContext(AccountContext);
  const { switchToSignin } = useContext(AccountContext);
  // const [formState, updateFormState] = useState("login");
  const [payload, updatePayload] = useState({ name: "", email: "", password: "" });
  // const [isPasswordShown, updateIsPasswordShown] = useState(false);
  const [isLoading, updateIsLoading] = useState(false);
  // const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [alertt, setAlert]= useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const signupSubmitHandler = (event) => {
    console.log("signup");
    event.preventDefault();
    updateIsLoading(true)

    const url = `${window.API_URL}/user`;
    console.log(payload);
    let data= qs.stringify(payload);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: url,
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      }, 
      data : data
    };

    axios.request(config)
      .then((res) => {
        updateIsLoading(false)
        if (res?.status === 200) {
          // alert(res?.data?.msg)
          // updateFormState('login');
          setAlert(res?.data?.msg);
          handleShow();

          
        }
        else {
          // alert(res?.data?.msg)
          setAlert(res?.data?.msg);
          handleShow();
        }
      })
      .catch((err) => {
        updateIsLoading(false)
        // alert(err?.response?.data?.msg)
        setAlert(err?.response?.data?.msg);
        handleShow();
      });

    // axios.post(url, payload)
    //   .then((res) => {
    //     updateIsLoading(false)
    //     if (res?.status === 200) {
    //       alert(res?.data?.msg)
    //       // updateFormState('login');
    //       switchToSignin();
    //     }
    //     else {
    //       alert(res?.data?.msg)
    //     }
    //   })
    //   .catch((err) => {
    //     updateIsLoading(false)
    //     alert(err?.response?.data?.msg)
    //   });
  }

  // const passwordShownHandler = (event) => {
  //   let checked = event?.target?.checked;
  //   updateIsPasswordShown(checked);
  // }

  // const onClickHandler = (value) => {
  //   updateFormState(value);
  //   updatePayload({ name: "", email: "", password: "" })
  // };

  const onChangeHandler = (event) => {
    console.log("pay");
    let id = event?.target?.id;
    let value = event?.target?.value;
    let updatedPayload = { ...payload };

    updatedPayload[id] = value;
    updatePayload(updatedPayload)
  }

  // const loginSubmitHandler = (event) => {
  //   event.preventDefault();
  //   updateIsLoading(true);

  //   const url = `${window.API_URL}/login`;
  //   axios.post(url, payload)
  //     .then((res) => {
  //       updateIsLoading(false);
  //       if (res?.status === 200) {
  //         alert(res?.data?.msg);
  //         sessionStorage.setItem("name", res?.data?.data?.name);
  //         sessionStorage.setItem("email", res?.data?.data?.email);
  //         sessionStorage.setItem("notes", JSON.stringify(res?.data?.data?.notes));
  //         // navigate(`/user/${res?.data?.data?._id}`);
  //       }
  //       else if (res.status === 401) {
  //         alert(res?.data?.msg);
  //       }
  //       else {
  //         alert(res?.data?.msg);
  //       }
  //     })
  //     .catch((err) => {
  //       updateIsLoading(false)
  //       alert(err?.response?.data?.msg)
  //     });
  // };

  
  return (
    <BoxContainer>
      {   isLoading &&
          <div style={{position:"fixed", top:"0", left:"0", width:"100%", height:"100%", background:"rgba(0, 0, 0, 0.5)", display:"flex", justifyContent:"center", alignItems:"center", zIndex:"2"}}>
              <HashLoader color="#A2D5F2" loading={isLoading} size={90} />
          </div>
      }
      <FormContainer onSubmit={signupSubmitHandler}>
      <div>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
              <Modal.Title>Alert</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {/* <h5>Welcome Admin,</h5> */}
              <h5>{alertt}</h5>
          </Modal.Body>
          <Modal.Footer>
              <Button  style={{color:"white", backgroundColor:"royalblue"}} onClick={()=>{
                handleClose();
                switchToSignin();
              }}>
                  Ok
              </Button> 
              {/* <Button  style={{color:"white", backgroundColor:"red", margin:"0px 10px"}} onClick={function(){
                      handleClose();
                      
                  }}>
                  Yes
              </Button> */}
              {/* <Button  style={{color:"white", backgroundColor:"red"}} onClick={handleClose}>
                  Close
              </Button> */}
          </Modal.Footer>
      </Modal>
      </div>
        <Input type="text" placeholder="Full name" id="name" onChange={onChangeHandler} defaultValue={payload?.name} required/>
        <Input type="email" placeholder="Email" id="email" onChange={onChangeHandler} defaultValue={payload?.email} required/>
        <Input type="password" placeholder="Password" id="password" onChange={onChangeHandler} defaultValue={payload?.password} required/>
        {/* <Input type="password" placeholder="Confirm password" /> */}
        <Marginer direction="vertical" margin={10} />
        <div style={{textAlign:"center"}}>
        <SubmitButton type="submit" >Signup</SubmitButton>
        </div>
        <Marginer direction="vertical" margin="15px" />
      </FormContainer>
      
      <LineText>
        Already have an account?{" "}
        <BoldLink onClick={switchToSignin} style={{cursor:"pointer"}}>
          Signin
        </BoldLink>
      </LineText>
    </BoxContainer>
  );
}