/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { connect } from 'react-redux';
import MainHeader from './../components/common/MainHeader';
import Img from "../assets/images/HomePage/HomeImage2.svg"

function SuggestAngle({ lat, lng }) {

    React.useEffect(() => {
        window.document.title = "Add Panel"
    }, [])

    return (
        <div>
            <MainHeader tab="feasibility" />
            <div id="panel">
                    <div className="container feasibility__content" style={{ marginTop: "170px" }}>
                        <div className="row">
                            <div className="col-md-5">
                                <img src={Img} alt="image" />
                            </div>
                            <div className="col-md-7 feasibility__right" style={{ marginTop: "00px" }}>
                                <div className="feasibility__right__title green-p" style={{ marginBottom: "0px", fontSize: "300%", fontWeight: "500" }}>
                                    Suggested Tilt Angle<br/>for you location
                                </div>
                                <div className="feasibility__right__title blue-p" style={{ marginBottom: "40px", fontSize: "500%", fontWeight: "400" }}>
                                    {Math.floor(Math.random() * 20) + 45}°
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        lat: state.lat,
        lng: state.lng,
    }
}

export default connect(mapStateToProps)(SuggestAngle)
