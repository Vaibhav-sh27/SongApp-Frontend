import React, {useContext} from "react";
import '../assets/scss/DropDownProfile.scss';
import {ThemeContext} from "../../api/Theme";
import HoverButton from "./HoverButton";
import {AccountBox, DeleteForeverTwoTone, EjectOutlined, RemoveFromQueueOutlined} from "@material-ui/icons";
import { Button } from "bootstrap";

const DropDownProfile = () => {
    const useStyle = useContext(ThemeContext);
    return (
        <div style={useStyle.component} className="dropdown-profile">
            <HoverButton Icon={AccountBox} variant={"text"} text={"Profile"}/>
            <HoverButton Icon={EjectOutlined} variant={"text"} text={"LogOut"}/>
            {/*<HoverButton Icon={Explore} variant={"text"} text={"About"}/>*/}
        </div>
    );
}
export default DropDownProfile;