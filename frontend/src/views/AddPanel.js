/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react'
import MainHeader from '../components/common/MainHeader'
import Map from "../assets/images/Feasibility/map.svg"
import Marker from "../assets/images/Feasibility/marker.svg"
import "../assets/css/Feasibility.css"
import "../assets/css/AddPanel.css"
import { Link } from 'react-router-dom';
import Img from "../assets/images/HomePage/HomeImage2.svg"
import Back from "../assets/images/Back.svg"
import { connect } from 'react-redux';

export class AddPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // lat: "13.0604",
            // lng: "80.2244"
            lat: null,
            lng: null,
            tilt: "yes",
        };
        this.getLocation = this.getLocation.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.yesNoPage = this.yesNoPage.bind(this);
        this.yesPage = this.yesPage.bind(this);
        this.noPage = this.noPage.bind(this);
        this.handleLocationError = this.handleLocationError.bind(this);
        this.addPanel = this.addPanel.bind(this);
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);
        } else {
            alert("Geolocation is not supported by this browser");
        }
    }

    getCoordinates(position) {
        console.log("Location " + position.coords.latitude + " " + position.coords.longitude);
        this.setState({
            lat: Math.round(position.coords.latitude * 10000) / 10000,
            lng: Math.round(position.coords.longitude * 10000) / 10000
        })
    }

    handleLocationError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request")
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location unavailable")
                break;
            case error.TIMEOUT:
                alert("Request timeout")
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error")
                break;
            default:
                alert("An unknown error")
        }
    }

    nextPage = () => {
        document.getElementById("location").style.display = "none";
        document.getElementById("panel").style.display = "block";
    }

    yesNoPage = (res) => {
        if (res === "no") {
            this.setState({
                tilt: "no"
            })
        }
        document.getElementById("tilt").style.display = "none";
        document.getElementById("question").style.display = "block";
    }

    yesPage = () => {
        document.getElementById("question").style.display = "none";
        document.getElementById("yes").style.display = "block";
        document.getElementById("back").style.display = "block";
    }

    noPage = () => {
        document.getElementById("question").style.display = "none";
        document.getElementById("no").style.display = "block";
        document.getElementById("back").style.display = "block";
    }

    addPanel = () => {
        if (this.state.tilt === "no") {
            this.props.setlat(this.state.lat);
            this.props.setlng(this.state.lng);
            document.getElementById("addPanel__cta1").click();
        } else {
            document.getElementById("addPanel__cta").click();
        }
    }

    backoff = () => {
        document.getElementById("no").style.display = "none";
        document.getElementById("question").style.display = "block";
        document.getElementById("yes").style.display = "none";
        document.getElementById("back").style.display = "none";
    }

    render(props) {
        
        window.document.title = "Add Panel"
        return (
            <>
                <MainHeader tab="feasibility" />
                <div id="panel" style={{ display: "none" }}>
                    <div className="container feasibility__content" style={{ marginTop: "170px" }}>
                        <div className="row">
                            <img src={Back} alt="Back" 
                                style={{ 
                                    width: "70px",
                                    position: "absolute",
                                    top: "150px",
                                    left: "100px",
                                    cursor: "pointer",
                                    display: "none"
                                }}    
                                onClick={() => {this.backoff()}} 
                                id="back"
                            />
                            <div className="col-md-6">
                                <img src={Img} alt="image" />
                            </div>
                            <div className="col-md-6 feasibility__right" style={{ marginTop: "00px" }}>
                                <div className="feasibility__right__title green-p" style={{ marginBottom: "40px" }}>
                                    Enter Panel Details
                                </div>
                                <div id="tilt">
                                    <div className="feasibility__right__subtitle blue-p">
                                        Does you solar panel have<br />automatic tilt control?
                                    </div>
                                    <button className="panel__question1 white green-p-bg" onClick={() => this.yesNoPage("yes")}>Yes</button>
                                    <button className="panel__question2 green-p" onClick={() => this.yesNoPage("no")}>No</button>
                                </div>
                                <div id="question" style={{ display: "none" }}>
                                    <div className="feasibility__right__subtitle blue-p">
                                        Do you know the wattage of<br />your Solar Panel?
                                    </div>
                                    <button className="panel__question1 white green-p-bg" onClick={this.yesPage}>Yes</button>
                                    <button className="panel__question2 green-p" onClick={this.noPage}>No</button>
                                </div>
                                <div id="yes" style={{ display: "none" }}>
                                    <form className="feasibility__right__form">

                                        <label className="feasibility__right__form__label blue-p">
                                            Wattage&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                                        </label>
                                        <input type="text" className="loginSignup__form__input feasibility__right__form__input" placeholder="40" />
                                        <div
                                            className="loginSignup__form__button feasibility__right__form__button green-p-bg white"
                                            onClick={this.addPanel}
                                        >
                                            Add your Panel
                                        </div>
                                    </form>
                                </div>
                                <div id="no" style={{ display: "none" }}>
                                    <form className="feasibility__right__form">
                                        <label className="feasibility__right__form__label blue-p">
                                            Panel Area &nbsp;&nbsp;&nbsp;
                                        </label>
                                        <input type="text" className="loginSignup__form__input feasibility__right__form__input" placeholder="12" />
                                        <br />
                                        <label className="feasibility__right__form__label blue-p">
                                            Efficiency&nbsp;&nbsp;&nbsp; &nbsp;
                                        </label>
                                        <input type="text" className="loginSignup__form__input feasibility__right__form__input"  placeholder="12" />
                                        <div
                                            className="loginSignup__form__button feasibility__right__form__button green-p-bg white"
                                            onClick={this.addPanel}
                                        >
                                            Add your Panel
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="location">
                    <div className="container feasibility__content">
                        <div className="row">
                            <div className="col-md-6 feasibility__left">
                                <div className="feasibility__map" >
                                    {this.state.lat && this.state.lng ?
                                        <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.lat},${this.state.lng}&zoom=17&size=1504x500&sensor=false&markers=color:red%7C${this.state.lat},${this.state.lng}&key=AIzaSyBZKgOw0iHBsgviKcnRqih4p2iPfOz4Jd8`} alt="map" className="getData__map" />
                                        :
                                        <img src={Map} alt="map" className="feasibility__map__img" />
                                    }
                                    {/* 640px width map */}
                                </div>
                                {this.state.lat && this.state.lng ?
                                    <></>
                                    :
                                    <div className="feasibility__map__cover">
                                        <div
                                            className="loginSignup__form__button green-p-bg white feasibility__map__cover__button"
                                            onClick={this.getLocation}
                                        >
                                            <img src={Marker} alt="marker" className="feasibility__map__cover__button__img" />
                                            &nbsp;&nbsp;Detect My Location Automatically
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="col-md-6 feasibility__right" style={{ marginTop: "70px" }}>
                                <div className="feasibility__right__title green-p" style={{ marginBottom: "40px" }}>
                                    Enter Location
                                </div>
                                <form className="feasibility__right__form">
                                    <label className="feasibility__right__form__label blue-p">
                                        Latitude &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                                    </label>
                                    <input type="text" className="loginSignup__form__input feasibility__right__form__input" placeholder="Eg: 13.8640"
                                    value={this.state.lat}
                                    onChange={(e) => this.setState({ lat: e.target.value })} />
                                <br />
                                <label className="feasibility__right__form__label blue-p">
                                    Longitude&nbsp;&nbsp;&nbsp; &nbsp;
                                </label>
                                <input type="text" className="loginSignup__form__input feasibility__right__form__input" placeholder="Eg: 13.8640"
                                    value={this.state.lng}
                                    onChange={(e) => this.setState({ lng: e.target.value })} />
                                    <div
                                        className="loginSignup__form__button feasibility__right__form__button green-p-bg white"
                                        onClick={this.nextPage}
                                    >
                                        Go to Next Page
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Link to="/">
                    <button style={{ display: 'none' }} id="addPanel__cta" />
                </Link>
                <Link to="/suggest-angle">
                    <button style={{ display: 'none' }} id="addPanel__cta1" />
                </Link>
            </>
        )
        }
}

const mapDispatchToProps = dispatch => {
    return {
        setlat: (lat) => dispatch({
            type: 'SET_LAT',
            data: lat
        }),
        setlng: (lng) => dispatch({
            type: 'SET_LNG',
            data: lng
        }),
    }
}

export default connect(null, mapDispatchToProps)(AddPanel);
