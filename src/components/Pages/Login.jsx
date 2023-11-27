import React from "react";
import HeadPhone from '../assets/img/headphones.svg';
import './css/Login.scss';
import {Link, useHistory} from "react-router-dom";
import "./css/styles.css";
import styled from "styled-components";
import AccountBox from "../accountBox/index"
import { useEffect } from "react";
import {Avatar, Button} from "@material-ui/core";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


class Login extends React.Component{
    
    render() {
        let muu = document.getElementById("muu");
        let sign = document.getElementById("sign");
        let head = document.getElementById("head");
        return(
            <>
            <section id="main">
                    <div className="nav-item">
                        <a className="navbar-brand" href="/">BeatX</a>
                    </div>
                    <div className="main-row">
                        <div className="main-row-img" id="head">
                            <img className="head-phone-img" src={HeadPhone} alt=""/>
                        </div>
                        {/* { */}
                
                            <div className="main-row-text" id="muu">
                            <h1>Music for everyone</h1>
                            <p>Without music, life would be a mistake</p>
                            <Button className="btn" onClick={()=>{
                                muu.style.display='none';
                                sign.style.display='block';
                                if(window.innerWidth < 970){
                                    head.style.display='none';
                                }
                            }}>
                                Start Listening
                            </Button>
                            </div> 
                            
                            <div className="main-row-text" id="sign" style={{display:'none'}}>
                            <AppContainer>
                                <AccountBox />
                            </AppContainer>
                            </div>

                        {/* } */}
                        

                        
                    </div>
            </section>
            </>
        );
    }
}

export default Login;