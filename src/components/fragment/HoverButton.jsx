import React, {useContext, useState} from 'react';
import '../assets/scss/HoverButton.scss';
import {Button} from "@material-ui/core";
import {ThemeContext} from "../../api/Theme";

import {Link, useHistory } from "react-router-dom";

function HoverButton({text,variant,Icon}) {
    const useStyle = useContext(ThemeContext);
    const [currStyle, setCurrStyle] = useState(null);
    const history = useHistory();
    const handleOver = () => {
        setCurrStyle(useStyle.button.onHover)
    };
    const logoutHandler = () => {
        sessionStorage.clear();
        // navigate('/')
        history.replace('/');

    }
    const handleOut = () => {
        setCurrStyle(null)
    };
    return (
        <>
        {   text!=="LogOut"?
            <Link to={"/home/"+text.toLowerCase()} className={"hb"}>
            <Button style={currStyle}
                    startIcon={Icon?<Icon/>:null}
                    variant={variant}   
                    onMouseOver={handleOver} onMouseOut={handleOut}>
                {text}
            </Button>
            </Link> :
            <Link className={"hb"}>
            <Button style={currStyle}
                    startIcon={Icon?<Icon/>:null}
                    variant={variant}   
                    onMouseOver={handleOver} onMouseOut={handleOut} onClick={logoutHandler}>
                {text}
            </Button>
            </Link>
        }
        </>
        
    );
}

export default HoverButton;