import React from 'react'
import Logo from "../../assets/images/Logo.png"
import { Link } from 'react-router-dom';
import Logout from "../../assets/images/Logout.svg"
import { auth } from "../../firebase"

function TopBar() {

    const log1 =() =>{
        auth.signOut();
    }

    return (
        <div className="topBar">
            <img src={Logout} alt="Logout" style={{ float: "right", marginTop: "20px", marginRight: "20px", width: "40px" }} onClick={log1} />
            <div className="mainHead__logo topBar__logo" style={{ marginLeft: "40px" }}>
                <Link to="/">
                    <img src={Logo} alt="logo" />
                </Link>
            </div>
        </div>
    )
}

export default TopBar
