// import React, { useContext } from "react";
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
import {Link, useHistory } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import {Button} from "@material-ui/core";

export function LoginForm(props) {

  const { switchToSignup } = useContext(AccountContext);
  const [formState, updateFormState] = useState("login");
  const [payload, updatePayload] = useState({ name: "", email: "", password: "" });
  // const [isPasswordShown, updateIsPasswordShown] = useState(false);
  const [isLoading, updateIsLoading] = useState(false);
  const qs = require('qs');
  const history = useHistory();
  // const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [alertt, setAlert]= useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=>{
    if(sessionStorage.name){
      history.push('/home');
    }
  })
  // const signupSubmitHandler = (event) => {
  //   event.preventDefault();
  //   updateIsLoading(true)

  //   const url = `${window.API_URL}/user`;
  //   axios.post(url, payload)
  //     .then((res) => {
  //       updateIsLoading(false)
  //       if (res?.status === 200) {
  //         alert(res?.data?.msg)
  //         updateFormState('login');
  //       }
  //       else {
  //         alert(res?.data?.msg)
  //       }
  //     })
  //     .catch((err) => {
  //       updateIsLoading(false)
  //       alert(err?.response?.data?.msg)
  //     });
  // }

  // const passwordShownHandler = (event) => {
  //   let checked = event?.target?.checked;
  //   updateIsPasswordShown(checked);
  // }

  const onClickHandler = (value) => {
    updateFormState(value);
    updatePayload({ name: "", email: "", password: "" })
  };

  const onChangeHandler = (event) => {
    let id = event?.target?.id;
    let value = event?.target?.value;
    let updatedPayload = { ...payload };

    updatedPayload[id] = value;
    updatePayload(updatedPayload)
  }

  const loginSubmitHandler = (event) => {
    event.preventDefault();
    updateIsLoading(true);

    const url = `${window.API_URL}/login`;
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
        updateIsLoading(false);
        if (res?.status === 200) {
          // alert(res?.data?.msg);
          // setAlert(res?.data?.msg);
          // handleShow();
          sessionStorage.setItem("name", res?.data?.data?.name);
          sessionStorage.setItem("email", res?.data?.data?.email);
          sessionStorage.setItem("isAdmin", res?.data?.data?.isAdmin);
          // <Link to="/home"/>
          history.push("/home");
          // navigate(`/user/${res?.data?.data?._id}`)
        }
        else if (res.status === 401) {
          // alert(res?.data?.msg);
          console.log("33");
          setAlert(res?.data?.msg);
          handleShow();
        }
        else {
          setAlert(res?.data?.msg);
          handleShow();
          // alert(res?.data?.msg);
        }
      })
      .catch((err) => {
        updateIsLoading(false)
        setAlert(err?.response?.data?.msg);
        handleShow();
        
        // alert(err?.response?.data?.msg)
      });


    // axios.post(url, payload)
    //   .then((res) => {
    //     updateIsLoading(false);
    //     if (res?.status === 200) {
    //       alert(res?.data?.msg);
    //       sessionStorage.setItem("name", res?.data?.data?.name);
    //       sessionStorage.setItem("email", res?.data?.data?.email);
    //       sessionStorage.setItem("notes", JSON.stringify(res?.data?.data?.notes));
    //       <Link to="/home"/>
    //       // navigate(`/user/${res?.data?.data?._id}`);
    //     }
    //     else if (res.status === 401) {
    //       alert(res?.data?.msg);
    //     }
    //     else {
    //       alert(res?.data?.msg);
    //     }
    //   })
    //   .catch((err) => {
    //     updateIsLoading(false)
    //     alert(err?.response?.data?.msg)
    //   });
  };

  return (
    <BoxContainer>
      {   isLoading &&
          <div style={{position:"fixed", top:"0", left:"0", width:"100%", height:"100%", background:"rgba(0, 0, 0, 0.5)", display:"flex", justifyContent:"center", alignItems:"center", zIndex:"2"}}>
              <HashLoader color="#A2D5F2" loading={isLoading} size={90} />
          </div>
      }

      


      <FormContainer onSubmit={loginSubmitHandler}>
        <div>
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>Alert</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {/* <h5>Welcome Admin,</h5> */}
              <h5>{alertt}</h5>
          </Modal.Body>
          <Modal.Footer>
              <Button  style={{color:"white", backgroundColor:"royalblue"}} onClick={handleClose}>
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
        <Input type="email" placeholder="Email" id="email"  onChange={onChangeHandler} defaultValue={payload?.email} required/>
        <Input type="password" placeholder="Password" id="password" onChange={onChangeHandler} defaultValue={payload?.password} required/>
        <div style={{textAlign:"center"}}>
        {/* <Marginer direction="vertical" margin={10} /> */}
        {/* <MutedLink onClick={() => onClickHandler('reset')}>Forget your password?</MutedLink> */}
        <Marginer direction="vertical" margin="1.6em" />
        
        <SubmitButton type="submit">Signin</SubmitButton>
        </div>
        <Marginer direction="vertical" margin="15px" />
      </FormContainer>
      
      <LineText>
        Don't have an account?{" "}
        <BoldLink onClick={switchToSignup} style={{cursor:"pointer"}}>
          Signup
        </BoldLink>
      </LineText>
    </BoxContainer>
  );
}