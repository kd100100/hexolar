import React from 'react'
import Arrow from './../../assets/images/Arrow.svg'
import HomeImage from './../../assets/images/HomePage/HomeImage.png'
import { Link } from 'react-router-dom';
import { auth } from "../../firebase"
import { connect } from 'react-redux';

function Header({ user }) {

    const handleAuthentication =() =>{
        if (user) {
            auth.signOut();
        }
        else {
            document.getElementById("head__cta2").click()
        }
    }

    return (
        <div className="container header">
            <div className="row">
                <div className="header__left col-lg-5">
                    <div className="header__left__nav flex">
                        <div className="header__left__nav__item header__left__nav__home blue-s selected">
                            Home
                        </div>
                        <div className="header__left__nav__item blue-s" onClick={() => document.getElementById("head__cta").click()}>
                            Features
                        </div>
                        {
                            user ?
                            (
                                <div className="header__left__nav__item blue-s" onClick={() => document.getElementById("head__cta3").click()}>
                                    Dashboard
                                </div>
                            ) :
                            ""
                        }
                        <div className="header__left__nav__login green-p-bg white" onClick={handleAuthentication}>
                            {user ? "Logout" : "Login"}
                        </div>
                    </div>
                    <div className="header__left__logo">
                        <div className="header__left__logo__brand blue-p">
                            Hexolar
                        </div>
                        <div className="header__left__logo__tagline green-p">
                            Your AI Solar Tool
                        </div>
                    </div>
                    <div className="header__left__quote blue-s">
                        It won’t take much energy,<br/>to conserve energy.
                    </div>
                    <button className="header__left__button flex white green-p-bg" onClick={() => document.getElementById("head__cta").click()}>
                        Explore Features
                        <div className="header__left__button__arrow green-s-bg">
                            <img src={Arrow} alt="arrow"/>
                        </div>
                    </button>
                </div>
                <div className="header__right col-lg-7">
                    <img src={HomeImage} alt="" className="header__right__img"/>
                </div>
                <Link to="/features" style={{ display: "none" }}>
                    <button id="head__cta"></button>
                </Link>
                <Link to="/login" style={{ display: "none" }}>
                    <button id="head__cta2"></button>
                </Link>
                <Link to="/dashboard" style={{ display: "none" }}>
                    <button id="head__cta3"></button>
                </Link>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Header)
