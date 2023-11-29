// import React, { useContext } from "react";
import React, {useContext, useEffect, useRef, useState} from 'react';
import axios from "axios";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
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
import gg from "./google.svg";

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

  const [ user, setUser ] = useState([]);
  const [ profile, setProfile ] = useState([]);

  useEffect(()=>{
    if(sessionStorage.name){
      history.push('/home');
    }
  })
  

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
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
});

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  useEffect(
    () => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data);
                    sessionStorage.setItem("name", res?.data?.name);
                    sessionStorage.setItem("email", res?.data?.email);
                    sessionStorage.setItem("picture", res?.data?.picture);

                    const url = `${window.API_URL}/google_login`;
                    let data= qs.stringify({
                      name: res?.data?.name,
                      email: res?.data?.email,
                      password: ""
                    });
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
                        // updateIsLoading(false);
                        if (res?.status === 200) {
                          sessionStorage.setItem("name", res?.data?.data?.name);
                          sessionStorage.setItem("isAdmin", res?.data?.data?.isAdmin);
                          // history.push("/home");
                          window.location.reload();
                        }
                        else {
                          // setAlert(res?.data?.msg);
                          // handleShow();
                          console.log(res?.data?.msg);
                          // alert(res?.data?.msg);
                        }
                      })
                      .catch((err) => {
                        // updateIsLoading(false)
                        // setAlert(err?.response?.data?.msg);
                        // handleShow();
                        console.log(err?.response?.data?.msg);
                        // alert(err?.response?.data?.msg)
                      });
                    // sessionStorage.setItem("isAdmin", false);
                })
                .catch((err) => console.log(err));
        }
    },
    [ user ]
  );

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
      {/* <i class="bi bi-google"></i> */}
      {/* <button type="button" class="btn btn-link btn-floating mx-1" style={{backgroundColor:'red', borderRadius:"50%"}} >
      <img src={gg} alt="" style={{width:"30px", height:"40px"}}/>
    </button> */}
    <div class="col s12 m6 offset-m3 center-align">
    <button class="oauth-container btn darken-4 white black-text" onClick={()=>{login();}}  style={{textTransform:"none", display:"flex", justifyContent:"space-between", alignItems:"center", color:"black", backgroundColor:"rgb(220, 221, 223)", borderRadius:"50px"}}>
        <div class="left">
            <img width="20px" alt="Google sign-in" 
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=" />
        </div>
    </button>
</div>
    
    </BoxContainer>
  );
}