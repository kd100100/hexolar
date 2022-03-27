import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/css/MainHeader.css'
import Logo from '../../assets/images/Logo.png'
import { auth } from "../../firebase"
import { connect } from 'react-redux';

function MainHeader({ tab, user }) {

    const handleAuthentication =() =>{
        if (user) {
            auth.signOut();
        }
        else {
            document.getElementById("mainHead__cta3").click()
        }
    }

    return (
        <div className="mainHead">
            <div className="container">
                <div className="flex">
                    <div className="flex-1">
                        <div className="mainHead__logo">
                            <Link to="/">
                                <img src={Logo} alt="logo" />
                            </Link>
                        </div>
                    </div>
                    <div className="mainHead__nav flex">
                        <div className="mainHead__nav__item blue-s" onClick={() => document.getElementById("mainHead__cta1").click()}>
                            Home
                        </div>
                        <div className={`mainHead__nav__item blue-s ${tab === "features" && "selected"} `} onClick={() => document.getElementById("mainHead__cta2").click()}>
                            Features
                        </div>
                        <div className="mainHead__nav__login green-p-bg white" onClick={handleAuthentication}>
                            {user ? "Logout" : "Login"}
                        </div>
                    </div>
                </div>
            </div>
            <Link to="/" style={{ display: "none" }}>
                <button id="mainHead__cta1"></button>
            </Link>
            <Link to="/features" style={{ display: "none" }}>
                <button id="mainHead__cta2"></button>
            </Link>
            <Link to="/login" style={{ display: "none" }}>
                <button id="mainHead__cta3"></button>
            </Link>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(MainHeader)
