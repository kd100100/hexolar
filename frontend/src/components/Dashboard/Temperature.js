import React from 'react'
import Temp from "../../assets/images/Dashboard/Temp.svg"
import axios from 'axios'

function Temperature() {

    const [temp, setTemp] = React.useState("10")

    React.useEffect(() => {
        axios.get("http://localhost:5000/api/temperature")
            .then(res => {
                setTemp(res.data.temperature)
            })
    }, [])

    React.useEffect(() => {
        window.document.title = "Login"
    }, [])

    return (
        <div style={{ position: "relative", height: "75vh" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "45%" }}>
                <div className="dashboard__container" style={{ width: "100%", marginRight: "30px" }}>
                    <div className="dashboard__container__title blue-p">
                        Solar Panel Temperature
                    </div>
                    <div className='flex' style={{ justifyContent: "space-between" }}>
                        <div style={{ textAlign: "center", flex: 1 }}>
                            <div className="tilt__angle__title green-p" style={{ marginTop: "70px" }}>
                                Predicted Temperature
                            </div>
                            <div className="tilt__angle blue-p">
                                {temp}°C
                            </div>
                        </div>
                        <div style={{ textAlign: "center", position: "relative", height: "300px", width: "150px" }}>
                            <div className="temp__inner" style={{ height: (temp * 240 / 50)+60 }} />
                            <img src={Temp} alt="temp" className="temp__outer" />
                            <div className="temp__value">
                                {temp}°C
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Temperature
