import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Weather() {

    const [gridType, setGridType] = useState("Hybrid Grid")
    const [precipitation, setPrecipitation] = useState()
    const [chancesOfRain, setChancesOfRain] = useState()
    const [status, setStatus] = useState("")

    useEffect(() => {
        axios.get('http://localhost:5000/dashboard/location')
            .then(res => {
                console.log(res.data)
                axios.get(`http://api.weatherapi.com/v1/forecast.json?q=${res.data.lat},${res.data.lon}&days=3&key=1607df16ccff446db7c24344211112`)
                    .then(res => {
                        console.log(res.data)
                        var precipitation = res.data.forecast.forecastday[0].day.totalprecip_mm
                        setPrecipitation(precipitation)
                        var chancesOfRain = res.data.forecast.forecastday[0].day.daily_chance_of_rain
                        setChancesOfRain(chancesOfRain)
                        console.log(res.data.forecast.forecastday[0].day)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })

        axios.get('http://127.0.0.1:5000/dashboard/grid')
            .then(res => {
                setGridType(res.data.gridType)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        console.log("precipitation --> " + precipitation)
        console.log("chancesOfRain --> " + chancesOfRain)
        if (precipitation !== undefined) {
            console.log(precipitation)
            if (precipitation < 30) {
                setStatus("Sunny")
            } else if (precipitation < 50) {
                setStatus("Cloudy")
            } else if (precipitation < 75) {
                setStatus("Rainy")
            } else {
                setStatus("Thunderstorm")
            }
        }
        else {
            setStatus("Sunny")
        }
        
    }, [precipitation,chancesOfRain])

    React.useEffect(() => {
        window.document.title = "Weather Forecast"
    }, [])

    const changeGridType = (type) => {
        setGridType(type)
        var date = new Date();
        var dateTime = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
        axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/dashboard/logs',
            params: {
                data: {
                    datte: dateTime,
                    message: `Grid type changed to ${type}`,
                }
            }
        })
            .then(res => {
                axios({
                    method: 'post',
                    url: 'http://127.0.0.1:5000/dashboard/grid',
                    params: {
                        data: {
                            gridType: type
                        }
                    }
                })
                    .then(res => {
                        console.log(res.data)
                    })
            
            })

    }

    return (
        <div>
            <div className="dashboard__container" style={{ width: "50%", margin: "0 auto", marginTop: "10px" }}>
                <div className="dashboard__container__title blue-p">
                    Power Suggestion
                </div>
                <div className="battery__subtitle green-p" style={{ margin: "20px 0" }}>
                    Tomorrow's Forecast:
                </div>
                <div className="dashboard__container__box3">
                    <div className="dashboard__container__box__title1 blue-p">
                        {status && status}
                    </div>
                    <div className="grid__text">
                        Precipitation Expected: {precipitation ? precipitation : 0}mm<br/>
                        Chances of Rain: {chancesOfRain ? chancesOfRain : 0}%
                    </div>
                </div>
                <div className="battery__subtitle" style={{ marginTop: "40px", color: "#333", fontSize: "150%" }}>
                    {
                        status === "Sunny" ? (
                            gridType === "On Grid" ?
                                "You are on On Grid. The weather is good, you are on the correct grid choice."
                            : "You are on " + gridType + ". The weather is good, you can change to On Grid."
                        )
                        : status === "Cloudy" ? (
                            gridType === "Hybrid Grid" ?
                                "You are on hybrid Grid. There might be light showers, you are on the correct grid choice."
                            : "You are on " + gridType + ". There might be light showers, you can change to Hybrid grid."
                        )
                        : (
                            gridType === "Off Grid" ?
                                "You are Off Grid. There might be heavy showers, you are on the correct grid choice."
                            : "You are on " + gridType + ". There might be heavy showers, you can change to Off grid to keep batteries charged for any power loss."
                        )
                    }
                </div>
                {
                        status === "Sunny" ? (
                            gridType !== "On Grid" &&
                            <div
                                className="loginSignup__form__button feasibility__right__form__button green-p-bg white"
                                style={{ marginTop: "40px", textAlign: "center" }}
                                onClick={() => changeGridType("On Grid")}
                            >
                                Change to On Grid
                            </div>
                        )
                        : status === "Cloudy" ? (
                            gridType !== "Hybrid Grid" &&
                            <div
                                className="loginSignup__form__button feasibility__right__form__button green-p-bg white"
                                style={{ marginTop: "40px", textAlign: "center" }}
                                onClick={() => changeGridType("Hybrid Grid")}
                            >
                                Change to Hybrid Grid
                            </div>
                        )
                        :  (
                            gridType !== "Off Grid" &&
                            <div
                                className="loginSignup__form__button feasibility__right__form__button green-p-bg white"
                                style={{ marginTop: "40px", textAlign: "center" }}
                                onClick={() => changeGridType("Off Grid")}
                            >
                                Change to Off Grid
                            </div>
                        )
                    }
            </div>
        </div>
    )
}

export default Weather
