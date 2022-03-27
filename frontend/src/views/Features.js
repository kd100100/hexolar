import React, { useEffect } from 'react'
import MainHeader from '../components/common/MainHeader'
import img from "../assets/images/Features/img.svg"
import img2 from "../assets/images/Features/img2.svg"
import img3 from "../assets/images/Features/img3.svg"
import img4 from "../assets/images/Features/img4.svg"
import img5 from "../assets/images/Features/img5.svg"
import "../assets/css/Features.css"
import Arrow from '../assets/images/Arrow.svg'
import Footer from './../components/Footer';
import { connect } from 'react-redux';
import axios from 'axios'
import { Link } from 'react-router-dom';

function Features({ setFutureData, setPastData, setEfficiencyBox, setEfficiencyGraph }) {
    
    useEffect(() => {
        // axios({
        //     method: 'get',
        //     url: 'http://127.0.0.1:5000/dashboard/futurepast',
        //     params: {
        //         data: {
        //             comp: "future",
        //         }
        //     }
        // })
        //     .then(res => {
        //         console.log(res.data)
        //         setFutureData(res.data);
        //     })
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/dashboard'
        })
            .then(res => {
                console.log(res.data)
                setPastData(res.data.past);
                setFutureData(res.data.future);
                setEfficiencyGraph(res.data.efficiency.graph)
                setEfficiencyBox(res.data.efficiency.box)
            })
        // axios.get('http://127.0.0.1:5000/dashboard/compare').then(res => {
        //     setEfficiencyGraph(res.data.graph)
        //     setEfficiencyBox(res.data.box)
        // })
        window.document.title = "Features"
    }, [])

    
    return (
        <div>
            <MainHeader tab="features" />
            <div className="container features">
                <div className="row">
                    <div className="col-md-6 features__blockl">
                        <img src={img} alt="img" />
                    </div>
                    <div className="col-md-6 features__blockr">
                        <div className="features__title blue-p">
                        Check Solar Panel Feasibility
                        </div>
                        <div className="features__text blue-s">
                        Confused about whether or not you will get enough Solar Energy??🤷🏻‍♂️ Check here and decide for yourself.
                        </div>
                        <button className="feasiblityPart__right__button features__button flex white green-p-bg" onClick={() => document.getElementById("fp__cta").click()}>
                            Take me there
                            <div className="feasiblityPart__right__button__arrow features__button__arrow green-s-bg">
                                <img src={Arrow} alt="arrow"/>
                            </div>
                        </button>
                    </div>
                    <div className="col-md-6 features__blockl">
                        <div className="features__title blue-p">
                        In and Out of your<br/>Battery
                        </div>
                        <div className="features__text blue-s">
                        
Swipe right to know more about your battery and probably get a long term relationship.💘
                        </div>
                        <button className="feasiblityPart__right__button features__button flex white green-p-bg" onClick={() => document.getElementById("fp__cta").click()}>
                            Take me there
                            <div className="feasiblityPart__right__button__arrow features__button__arrow green-s-bg">
                                <img src={Arrow} alt="arrow"/>
                            </div>
                        </button>
                    </div>
                    <div className="col-md-6 features__blockr">
                        <img src={img3} alt="img" />
                    </div>
                    <div className="col-md-6 features__blockl">
                        <img src={img2} alt="img" />
                    </div>
                    <div className="col-md-6 features__blockr">
                        <div className="features__title blue-p">
                            Predict power output for the future
                        </div>
                        <div className="features__text blue-s">
                        We don't use ML (Magical Lantern)🔮, we use ML (Machine learning) for predicting the future.
                        </div>
                        <button className="feasiblityPart__right__button features__button flex white green-p-bg" onClick={() => document.getElementById("fp__cta").click()}>
                            Take me there
                            <div className="feasiblityPart__right__button__arrow features__button__arrow green-s-bg">
                                <img src={Arrow} alt="arrow"/>
                            </div>
                        </button>
                    </div>
                    <div className="col-md-6 features__blockl">
                        <div className="features__title blue-p">
                            Tilt Panel automatically using the sun's position
                        </div>
                        <div className="features__text blue-s">
                        Maximize the respect (power) from the Sun☀️<br/>
Stand up high or Bow down low according to the situation
                        </div>
                        <button className="feasiblityPart__right__button features__button flex white green-p-bg" onClick={() => document.getElementById("fp__cta").click()}>
                            Take me there
                            <div className="feasiblityPart__right__button__arrow features__button__arrow green-s-bg">
                                <img src={Arrow} alt="arrow"/>
                            </div>
                        </button>
                    </div>
                    <div className="col-md-6 features__blockr">
                        <img src={img4} alt="img" />
                    </div>
                    <div className="col-md-6 features__blockl">
                        <img src={img5} alt="img" />
                    </div>
                    <div className="col-md-6 features__blockr">
                        <div className="features__title blue-p">
                            Compare your panel with NASA's data
                        </div>
                        <div className="features__text blue-s">
                        Go Head on Head with the Titan<br/>
Weigh Up yourself with the Gaint NASA🚀
                        </div>
                        <button className="feasiblityPart__right__button features__button flex white green-p-bg" onClick={() => document.getElementById("fp__cta").click()}>
                            Take me there
                            <div className="feasiblityPart__right__button__arrow features__button__arrow green-s-bg">
                                <img src={Arrow} alt="arrow"/>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
            <Link to="/feasibility">
                <button id="fp__cta" style={{ display: "none" }} />
            </Link>
        </div>  
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setFutureData: (data) => dispatch({
            type: 'SET_FUTURE_DATA',
            data: data
        }),
        setPastData: (data) => dispatch({
            type: 'SET_PAST_DATA',
            data: data
        }),
        setEfficiencyGraph: (data) => dispatch({
            type: 'SET_EFFICIENCY_GRAPH',
            data: data
        }),
        setEfficiencyBox: (data) => dispatch({
            type: 'SET_EFFICIENCY_BOX',
            data: data
        })
    }
}

export default connect(null, mapDispatchToProps)(Features);
