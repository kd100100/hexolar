import React, { useEffect } from 'react'
import Checked from "../../assets/images/Dashboard/Checked.svg"
import Unchecked from "../../assets/images/Dashboard/Unchecked.svg"
import Sunrise from "../../assets/images/Dashboard/Sunrise.svg"
import Sunset from "../../assets/images/Dashboard/Sunset.svg"
import axios from 'axios'

function Tilt() {

    const [sunrise, setSunrise] = React.useState()
    const [sunset, setSunset] = React.useState()
    const [dayTime, setDayTime] = React.useState()

    const [checked, setChecked] = React.useState(true);
    const [feasible, setFeasible] = React.useState(true);

    const [tilt, setTilt] = React.useState(0);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/dashboard/location')
            .then(res => {
                axios.get(`https://api.ipgeolocation.io/astronomy?apiKey=e3c6fc13570347e3b309bffeea7df326&lat=${res.data.lat}&long=${res.data.lon}`)
                    .then(res => {
                        setSunrise(res.data.sunrise)
                        setSunset(res.data.sunset)
                        setDayTime(res.data.day_length)
                        axios.get('http://127.0.0.1:5000/dashboard/tilt')
                            .then(res1 => {
                                console.log(res1.data)
                                setChecked(res1.data.automatic[0] === '1' ? true : false)
                                setFeasible(res1.data.automaticFeasible[0] === '1' ? true : false)
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        
        axios.get('http://blynk-cloud.com/z3_Q8YX1D4lvXcWnE-_HxGlLWnP_KDgu/get/V1')
            .then(res => {
                console.log(res.data)
                setTilt(res.data)
            })
            .catch(err => {
                console.log(err)
            })

            
        window.document.title = "Panel Tilt"
    }, [])

    const updateTiltAngle = (action) => {
        axios.get('http://blynk-cloud.com/z3_Q8YX1D4lvXcWnE-_HxGlLWnP_KDgu/get/V1')
            .then(res => {
                console.log(res.data)
                if (action == "plus"){
                    setTilt(parseInt(res.data)+1)
                    axios.get(`http://blynk-cloud.com/z3_Q8YX1D4lvXcWnE-_HxGlLWnP_KDgu/update/V1?value=${parseInt(res.data)+1}`)
                }
                else{
                    setTilt(parseInt(res.data)-1)
                    axios.get(`http://blynk-cloud.com/z3_Q8YX1D4lvXcWnE-_HxGlLWnP_KDgu/update/V1?value=${parseInt(res.data)-1}`)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const checkChange = () => {
        if (feasible === true) {
            setChecked(!checked)
            var date = new Date();
            var dateTime = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
            axios({
                method: 'post',
                url: 'http://127.0.0.1:5000/dashboard/logs',
                params: {
                    data: {
                        datte: dateTime,
                        message: `Automatic Panel Tilt ${checked ? 'Disabled' : 'Enabled'}`,
                    }
                }
            })
                .then(res => {
                    axios({
                        method: 'post',
                        url: 'http://127.0.0.1:5000/dashboard/tilt',
                        params: {
                            data: {
                                automatic: checked ? '0' : '1'
                            }
                        }
                    })
                
                })
        }
        else {
            alert("Automatic tilt is not feasible")
        }
    }

    return (
        <div style={{ position: "relative", height: "75vh" }}>
            <div className="flex" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "80%", justifyContent: "center" }}>
                <div className="dashboard__container" style={{ width: "45%", marginRight: "30px" }}>
                    <div className="dashboard__container__title blue-p">
                        Tilt Angle
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <div className="tilt__automatic flex" onClick={() => { checkChange() }}>
                            {checked ? <img src={Checked} alt="checked" className="tile__checkbox" /> : <img src={Unchecked} alt="unchecked" className="tile__checkbox" />}
                            <div className="tilt__automatic__text green-p">
                                Automatic Tilting based on Sun’s Angle
                            </div>
                        </div>
                        <div className="tilt__angle__title blue-p">
                            {checked === true ? "Current" : ""} Tilt Angle
                        </div>
                        <div className="tilt__angle green-p">
                            <span>{tilt}°</span>
                            {!checked && <span>
                                <div className='tilt__actionBtns green-p-bg white' style={{ marginBottom: "10px" }} onClick={() => updateTiltAngle("plus")}>+</div>
                                <div className='tilt__actionBtns green-p-bg white' onClick={() => updateTiltAngle("minus")}>-</div>
                            </span>}
                        </div>
                    </div>
                </div>
                <div className="dashboard__container" style={{ width: "45%" }}>
                    <div className="dashboard__container__title blue-p">
                        Sun Details
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <div className="flex" style={{ justifyContent: "space-evenly", marginTop: "-20px", marginBottom: "20px" }}>
                            <div>
                                <img src={Sunrise} alt="sinrise" className="sun" />
                                <div className="sun__text blue-p">
                                    Sunrise
                                </div>
                                <div className="sun__time green-p">
                                    {sunrise}
                                </div>
                            </div>
                            <div>
                                <img src={Sunset} alt="sunset" className="sun" />
                                <div className="sun__text blue-p">
                                    Sunset
                                </div>
                                <div className="sun__time green-p">
                                    {sunset}
                                </div>
                            </div>
                        </div>
                        <div className="sun__text blue-p">
                            Day Length: {dayTime}Hrs
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tilt;
