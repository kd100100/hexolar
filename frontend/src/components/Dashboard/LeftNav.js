/* eslint-disable no-undef */
import React, { useEffect } from 'react'
import Menu from "../../assets/images/Dashboard/Menu.svg"
import Home from "../../assets/images/Dashboard/Icons/Home.svg"
import Home1 from "../../assets/images/Dashboard/Icons1/Home.svg"
import Battery from '../../assets/images/Dashboard/Icons/Battery.svg'
import Battery1 from '../../assets/images/Dashboard/Icons1/Battery.svg'
import Efficiency from '../../assets/images/Dashboard/Icons/Efficiency.svg'
import Efficiency1 from '../../assets/images/Dashboard/Icons1/Efficiency.svg'
import Future from '../../assets/images/Dashboard/Icons/Future.svg'
import Future1 from '../../assets/images/Dashboard/Icons1/Future.svg'
import Grid from '../../assets/images/Dashboard/Icons/Grid.svg'
import Grid1 from '../../assets/images/Dashboard/Icons1/Grid.svg'
import Log from '../../assets/images/Dashboard/Icons/Log.svg'
import Log1 from '../../assets/images/Dashboard/Icons1/Log.svg'
import Tilt from '../../assets/images/Dashboard/Icons/Tilt.svg'
import Tilt1 from '../../assets/images/Dashboard/Icons1/Tilt.svg'
import Past from '../../assets/images/Dashboard/Icons/Past.svg'
import Past1 from '../../assets/images/Dashboard/Icons1/Past.svg'
import Cloud from '../../assets/images/Dashboard/Icons/Cloud.svg'
import Cloud1 from '../../assets/images/Dashboard/Icons1/Cloud.svg'
import Avatar from "../../assets/images/Dashboard/Avatar.svg"
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios'
import TeamPic3 from '../../assets/images/Team/AR.png'

function LeftNav({ comp, user, future, past, efficiencyGraph, efficiencyBox, setFutureData, setPastData, setEfficiencyGraph, setEfficiencyBox }) {

    const [est, setEst] = React.useState(20)
    const [width, setWidth] = React.useState("0vw")
    const [size, setSize] = React.useState("100%")

    const loop = () => {
        setTimeout(function () { document.getElementById("training-ml-text").style.opacity = "0"; }, 500);
        setTimeout(function () { document.getElementById("training-ml-text").style.opacity = "1"; }, 1500);
        const runCont = setInterval(function () {
            console.log("looper");
            document.getElementById("training-ml-text").style.opacity = "0";
            setTimeout(function () { document.getElementById("training-ml-text").style.opacity = "1"; }, 1000);
            setTimeout(function () { clearInterval(runCont); }, 17500);
        }, 2500)
        // setTimeout(function () { clearInterval(runCont); }, 20000);
    }

    useEffect(() => {
        setTimeout(function () {
            setEst(19)
            setWidth("5vw")
            setSize("120%")
        }, 1000);
        setTimeout(function () {
            setEst(18)
            setWidth("10vw")
            setSize("140%")
        }, 2000);
        setTimeout(function () {
            setEst(17)
            setWidth("15vw")
            setSize("160%")
        }, 3000);
        setTimeout(function () {
            setEst(16)
            setWidth("20vw")
            setSize("180%")
        }, 4000);
        setTimeout(function () {
            setEst(15)
            setWidth("25vw")
            setSize("200%")
        }, 5000);
        setTimeout(function () {
            setEst(14)
            setWidth("30vw")
            setSize("220%")
        }, 6000);
        setTimeout(function () {
            setEst(13)
            setWidth("35vw")
            setSize("240%")
        }, 7000);
        setTimeout(function () {
            setEst(12)
            setWidth("40vw")
            setSize("260%")
        }, 8000);
        setTimeout(function () {
            setEst(11)
            setWidth("45vw")
            setSize("280%")
        }, 9000);
        setTimeout(function () {
            setEst(10)
            setWidth("50vw")
            setSize("300%")
        }, 10000);
        setTimeout(function () {
            setEst(9)
            setWidth("55vw")
            setSize("320%")
        }, 11000);
        setTimeout(function () {
            setEst(8)
            setWidth("60vw")
            setSize("340%")
        }, 12000);
        setTimeout(function () {
            setEst(7)
            setWidth("65vw")
            setSize("360%")
        }, 13000);
        setTimeout(function () {
            setEst(6)
            setWidth("70vw")
            setSize("380%")
        }, 14000);
        setTimeout(function () {
            setEst(5)
            setWidth("75vw")
            setSize("400%")
        }, 15000);
        setTimeout(function () {
            setEst(4)
            setWidth("80vw")
            setSize("420%")
        }, 16000);
        setTimeout(function () {
            setEst(3)
            setWidth("85vw")
            setSize("440%")
        }, 17000);
        setTimeout(function () {
            setEst(2)
            setWidth("90vw")
            setSize("460%")
        }, 18000);
        setTimeout(function () {
            setEst(1)
            setWidth("95vw")
            setSize("480%")
        }, 19000);
        setTimeout(function () {
            setEst(0)
            setWidth("100vw")
            setSize("500%")
        }, 20000);
        console.log(future)
        if (future === null || past === null || efficiencyGraph === null || efficiencyBox === null) {
            document.getElementById("training-ml").style.display = "flex";
            // loop()
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
                    document.getElementById("training-ml").style.display = "none";
                    // clearInterval(runCont);
                })
        }
    }, [])

    return (
        <>
            <div className="training-ml" id="training-ml">
                <div
                    className="training-inner"
                    style={{ width: width }}
                ></div>
                <div
                    style={{
                        position: "absolute",
                        top: "32.5%",
                        fontSize: size,
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        transition: "0.5s",
                        zIndex: "1002"
                    }}
                >
                    💪🏻
                </div>
                <div
                    className="white"
                    style={{
                        fontSize: "150%",
                        transition: "1s",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: "1002"
                    }}
                >

                    <span id='training-ml-text' style={{ transition: "1s" }}>ML Model Training, <br />
                        Meanwhile, lean back, make yourself comfortable<br />
                        and
                        wait to be mindblown<br /></span>
                    <span style={{ fontSize: "70%", opacity: "1 !important" }}>Est. Time: {est} sec</span>
                </div>
            </div>
            <div className="leftNav green-p-bg">
                <img src={Menu} alt="menu" className="leftNav__menu" />
                <Link to="/dashboard">
                    <img src={comp === "general" ? Home1 : Home} alt="menu" className={comp === "general" ? "leftNav__item selected1" : "leftNav__item"} style={{ marginTop: "10px" }} />
                </Link>
                <Link to="/dashboard/battery">
                    <img src={comp === "battery" ? Battery1 : Battery} alt="menu" className={comp === "battery" ? "leftNav__item selected1" : "leftNav__item"} />
                </Link>
                <Link to="/dashboard/future">
                    <img src={comp === "future" ? Future1 : Future} alt="menu" className={comp === "future" ? "leftNav__item selected1" : "leftNav__item"} />
                </Link>
                <Link to="/dashboard/past">
                    <img src={comp === "past" ? Past1 : Past} alt="menu" className={comp === "past" ? "leftNav__item selected1" : "leftNav__item"} />
                </Link>
                <Link to="/dashboard/tilt">
                    <img src={comp === "tilt" ? Tilt1 : Tilt} alt="menu" className={comp === "tilt" ? "leftNav__item selected1" : "leftNav__item"} />
                </Link>
                <Link to="/dashboard/grid">
                    <img src={comp === "grid" ? Grid1 : Grid} alt="menu" className={comp === "grid" ? "leftNav__item selected1" : "leftNav__item"} />
                </Link>
                <Link to="/dashboard/compare">
                    <img src={comp === "compare" ? Efficiency1 : Efficiency} alt="menu" className={comp === "compare" ? "leftNav__item selected1" : "leftNav__item"} />
                </Link>
                {/* <Link to="/dashboard/temp">
                    <img src={comp === "temp" ? Temp1 : Temp} alt="menu" className={comp === "temp" ? "leftNav__item selected1" : "leftNav__item"}/>
                </Link> */}
                <Link to="/dashboard/weather">
                    <img src={comp === "wea" ? Cloud1 : Cloud} alt="menu" className={comp === "wea" ? "leftNav__item selected1" : "leftNav__item"} />
                </Link>
                <Link to="/dashboard/diagnose">
                    <img src={comp === "diagnose" ? Log1 : Log} alt="menu" className={comp === "diagnose" ? "leftNav__item selected1" : "leftNav__item"} />
                </Link>
                <img src={user.photoURL} alt="avatar" className="leftNav__avatar" />
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user,
        future: state.future,
        past: state.past,
        efficiencyGraph: state.efficiencyGraph,
        efficiencyBox: state.efficiencyBox
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(LeftNav)
