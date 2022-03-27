import React from 'react'
import Logo from "../assets/images/Footer/DarkLogo.svg"
import Call from "../assets/images/Footer/Call.svg"
import Facebook from "../assets/images/Footer/Facebook.svg"
import Instagram from "../assets/images/Footer/Instagram.svg"
import Linkedin from "../assets/images/Footer/Linkedin.svg"
import Mail from "../assets/images/Footer/Mail.svg"
import "../assets/css/Footer.css"

function Footer() {
    return (
        <div className="footer blue-p-bg">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <img src={Logo} alt="logo" className="footer__logo" />
                    </div>
                    <div className="col-md-4">
                        <div className="footer__second">
                            <div className="footer__question white">
                                Having Queries?
                            </div>
                            <div className="footer__button green-p-bg white">
                                Call Us <img src={Call} alt="call" className="footer__button__img" />
                            </div>
                            <div className="footer__button green-p-bg white">
                                Mail Us <img src={Mail} alt="mail" className="footer__button__img" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="footer__newsletter">
                            <div className="footer__newsletter__text white">
                                Subscribe to our newsletter
                            </div>
                            <div className="footer__newsletter__input">
                                <input type="text" placeholder="Enter your email" />
                                <div className="footer__newsletter__button green-p-bg white">
                                    Sub!
                                </div>
                            </div>
                        </div>
                        <div className="footer__social white">
                            Follow Us!&nbsp;&nbsp;
                            <img src={Facebook} alt="facebook" className="footer__social__img" />
                            <img src={Instagram} alt="instagram" className="footer__social__img" />
                            <img src={Linkedin} alt="linkedin" className="footer__social__img" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
