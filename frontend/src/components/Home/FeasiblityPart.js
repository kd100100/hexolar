import React from 'react'
import { Link } from 'react-router-dom'
import Arrow from './../../assets/images/Arrow.svg'
import HomeImage2 from './../../assets/images/HomePage/HomeImage2.svg'

function FeasiblityPart() {
    return (
        <div className="container feasiblityPart">
            <div className="row">
                <div className="feasiblityPart__left col-lg-4">
                    <img src={HomeImage2} className="feasiblityPart__left__img" alt="" />
                </div>
                <div className="feasiblityPart__right col-lg-8">
                    <div className="feasiblityPart__right__text blue-p">
                        A solar panel of 4 K.Watts can save you upto ₹50000 every year.
                    </div>
                    <button className="feasiblityPart__right__button flex white green-p-bg" onClick={() => document.getElementById("fp__cta").click()}>
                        Check Feasibility For Your Location
                        <div className="feasiblityPart__right__button__arrow green-s-bg">
                            <img src={Arrow} alt="arrow"/>
                        </div>
                    </button>
                    <Link to="/feasibility" style={{ display: "none" }}>
                        <button id="fp__cta"></button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default FeasiblityPart
