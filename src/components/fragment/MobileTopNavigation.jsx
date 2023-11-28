import React from "react";
import SearchBar from "./SearchBar";
import '../assets/scss/MobTopNav.scss';
import Brand from "./Brand";
import {AccountBox, DeleteForeverTwoTone, EjectOutlined, RemoveFromQueueOutlined} from "@material-ui/icons";
import {Button} from "@material-ui/core";
import {Redirect, Link, useHistory } from "react-router-dom";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

const LogoutHandler = () => {
    // const history = useHistory();
    sessionStorage.clear();
    googleLogout();
    // navigate('/')
    // history.replace('/');
}

class MobileTopNavigation extends React.Component{
    render() {
        return(
            
            <nav className="mob-top-navigation">
                <Brand/>
                <SearchBar/>
                <Button href="/" onClick={()=>{
                    // const history = useHistory();
                    LogoutHandler();
                }}><EjectOutlined  style={{alignSelf:"center", marginRight:"10px", color:"blue", fontSize:"35px"}} /></Button>
                {/* <Button endIcon={{EjectOutlined}} onClick={()=>{
                    LogoutHandler();
                }}/> */}
               
            </nav>
        );
    }
}

export default MobileTopNavigation;