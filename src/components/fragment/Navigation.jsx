import React, {useContext, useState, useEffect} from "react";
import '../assets/scss/Navigation.scss';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import DropDownLanguageList from "./DropDownLanguageList";
import SearchBar from "./SearchBar";
import Brand from "./Brand";
import DropDownProfile from "./DropDownProfile";
import {Avatar, Button} from "@material-ui/core";
import {ThemeContext} from "../../api/Theme";
import NavigationButton from "./NavigationButton";
import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import {
//     useLocation, 
//   } from "react-router-dom"; 


function Navigation() {

    const [isLanguageListOpen, setLangList] = useState(false);
    const [isOpenProfile, setOpenProfile] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const location = useLocation()
    // useEffect(()=>{
    //     console.log(location.pathname);
    // });

    function handleOpenLanguageList() {
        if (isOpenProfile === true)
            setOpenProfile(!isOpenProfile);
        setLangList(!isLanguageListOpen);
    }

    function handleOpenProfile() {
        if (isLanguageListOpen === true)
            setLangList(!isLanguageListOpen);
        setOpenProfile(!isOpenProfile);
    }
    const useStyle = useContext(ThemeContext);
    return (
        <nav style={useStyle.component}>
            <Brand/>
            
            <SearchBar/>

            <div className={"navigation"}>
               {/* <NavigationButton href={"/home"} name={"Home"}/>*/}
               {/* <NavigationButton href={"/home/about"} name={"About"}/>*/}
                {/* <NavigationButton name={"Admin"} onClick={handleShow}/> */}
                {/* <Button variant="primary" onClick={handleShow}>
                    Admin
                </Button> */}
                {   
                    sessionStorage.isAdmin==="true"?
                    <Button onClick={handleShow}>
                    Admin
                    </Button> :<></> 

                }
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Admin Controls</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Welcome Admin,</h5>
                        <p>Here are some admin controls of the website.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button  href="/home/add" style={{color:"white", backgroundColor:"royalblue"}} onClick={handleClose}>
                            Add Songs
                        </Button> 
                        <Button href="/home/edit" style={{color:"white", backgroundColor:"#FFCA03", margin:"0px 10px"}} onClick={handleClose}>
                            Edit Songs
                        </Button>
                        <Button  style={{color:"white", backgroundColor:"red"}} onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <div className={"language"} onClick={handleOpenLanguageList}>
                <Button className={"Dropdown-btn"}
                        endIcon={isLanguageListOpen ? <ExpandMoreIcon/> : <ExpandLessIcon/>}>
                    <div className="wrapper">
                        <p>Music Languages</p>
                    </div>
                </Button>
                {
                    isLanguageListOpen
                    &&
                    <DropDownLanguageList/>
                }
            </div>
            <div className="profile" onClick={handleOpenProfile}>
                <Button className={"Dropdown-btn"}
                        startIcon={<Avatar style={{width:'30px',height:'30px',padding:'18px'}} >{sessionStorage.name.toUpperCase().split(' ')[0]?.[0]}{sessionStorage.name.toUpperCase().split(' ')[1]?.[0]}</Avatar>}
                        endIcon={isOpenProfile ? <ExpandMoreIcon/> : <ExpandLessIcon/>}>

                </Button>
                {
                    isOpenProfile &&
                    <DropDownProfile/>
                }
            </div>
        </nav>
    );
}

export default Navigation;