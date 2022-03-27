import React, { Component } from 'react'
import MainHeader from '../../components/common/MainHeader'
import Map from "../../assets/images/Feasibility/map.svg"
import Marker from "../../assets/images/Feasibility/marker.svg"
import "../../assets/css/Feasibility.css"
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios'

export class Feasibility extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // lat: "13.0604",
            // lng: "80.2244"
            lat: null,
            lng: null,
        };
        this.getLocation = this.getLocation.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);
        this.submit = this.submit.bind(this);
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

    submit() {

        // document.getElementsByClassName("spinner_load")[0].style.display = "flex"
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/feasiblity',
            params: {
                data: {
                    latitude: this.state.lat,
                    longitude: this.state.lng
                }
            }
        })
            .then(res => {
                console.log(res);
                this.props.setDatas(res.data);
                document.getElementById("feasibility__cta").click()
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        
        window.document.title = "Check Feasiblity"
        return (
            <div>
                <MainHeader tab="feasibility" />
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
                        <div className="col-md-6 feasibility__right">
                            <div className="feasibility__right__title blue-p">
                                Check Feasiblity
                            </div>
                            <div className="feasibility__right__subtitle green-p">
                                Enter your Location to check Feasiblity<br />of Solar Panels in your area
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
                                    onClick={this.submit}
                                >
                                    Check Feasiblity
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Link to="/feasibility/result">
                    <button style={{ display: 'none' }} id="feasibility__cta" />
                </Link>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setDatas: (data) => dispatch({ type: "SET_FEA_DATA", data: data })
    }
}

export default connect(null, mapDispatchToProps)(Feasibility);