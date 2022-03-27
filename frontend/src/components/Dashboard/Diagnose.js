import React, { useEffect } from 'react'
import Solar from "../../assets/images/Dashboard/Solar1.svg";
import MPPT from "../../assets/images/Dashboard/MPPT1.svg";
import Battery1 from "../../assets/images/Dashboard/Battery1.svg";
import axios from 'axios';
import SuccessDiagnose from "../../assets/images/Dashboard/SuccessDiagnose.svg";
import Close from "../../assets/images/Close.svg"
import ErrorBattery from "../../assets/images/Dashboard/ErrorBattery.svg"
import WarningBattery2 from "../../assets/images/Dashboard/WarningBattery2.svg"
import PanelEfficiencyError from "../../assets/images/Dashboard/PanelEfficiencyError.svg"
import InvalidSettingsError from "../../assets/images/Dashboard/InvalidSettingsError.svg"

function Diagnose() {

    const [logs, setLogs] = React.useState([
        ["hi", "jo"]
    ]);
    const [edit, setEdit] = React.useState(false);
    const [value, setValue] = React.useState(0);

    const getDiagnosePage = () => {
        axios.get('http://127.0.0.1:5000/dashboard/logs')
            .then(res => {
                console.log(res.data.logs);
                setLogs(res.data.logs);
            })
            .catch(err => {
                console.log(err);
            })

    };

    useEffect(() => {
        getDiagnosePage();
        const runCont1 = setInterval(function () {
            getDiagnosePage();
        }, 5000)
    }, [])

    const doCheck = () => {
        document.getElementById("self__result").style.display = "none";
        document.getElementById("self__button").style.display = "none";
        document.getElementById("self__solar").style.opacity = "1";
        // axios.get("http://blynk-cloud.com/qVJoK80A5WjpWihghgRjyqop6pP-8giy/get/V9")
        //     .then(res => {
        //         setValue(parseInt(res.data));
        //     })
        setTimeout(function () { docheck1() }, 1500);
    }

    const docheck1 = () => {
        document.getElementById("self__solar").style.opacity = "0";
        setTimeout(function () { docheck2() }, 500);
    }

    const docheck2 = () => {
        document.getElementById("self__mppt").style.opacity = "1";
        setTimeout(function () { docheck3() }, 2000);
    }

    const docheck3 = () => {
        document.getElementById("self__mppt").style.opacity = "0";
        setTimeout(function () { docheck4() }, 500);
    }

    const docheck4 = () => {
        document.getElementById("self__battery").style.opacity = "1";
        setTimeout(function () { docheck5() }, 2000);
    }

    const docheck5 = () => {
        document.getElementById("self__battery").style.opacity = "0";
        setTimeout(function () { docheck6() }, 500);
    }
    React.useEffect(() => {
        window.document.title = "Diagnosis"
    }, [])

    const docheck6 = () => {
        // axios.get("http://blynk-cloud.com/qVJoK80A5WjpWihghgRjyqop6pP-8giy/get/V9")
        //     .then(res => {
        //         var value1 = (parseInt(res.data));
                document.getElementById("self__result").style.display = "block";
        //         if (value1 === 1) {
        //             var message = "Discharge Limit Reached";
        //             axios.get("https://maker.ifttt.com/trigger/Battery_discharge/with/key/gpNb9MzmfRlU6G0sayEw_RdDgv4WVrXQfWkyCCvfnR2")
        //         }
        //         else if (value1 === 2) {
        //             var message = "Short Circuit Detected";
        //             axios.get("https://maker.ifttt.com/trigger/battery_short/with/key/gpNb9MzmfRlU6G0sayEw_RdDgv4WVrXQfWkyCCvfnR2")
        //         }
        //         else if (value1 === 3) {
        //             var message = "Efficiency Error";
        //             axios.get("https://maker.ifttt.com/trigger/panel_issue/with/key/gpNb9MzmfRlU6G0sayEw_RdDgv4WVrXQfWkyCCvfnR2")
        //         }
        //         else if (value1 === 4) {
        //             var message = "Invalid Settings";
        //             axios.get("https://maker.ifttt.com/trigger/setting_error/with/key/gpNb9MzmfRlU6G0sayEw_RdDgv4WVrXQfWkyCCvfnR2")
        //         }
        //         else {
                    var message = "No issues found.";
        //         }
                var date = new Date();
                var dateTime = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
                axios({
                    method: 'post',
                    url: 'http://127.0.0.1:5000/dashboard/logs',
                    params: {
                        data: {
                            datte: dateTime,
                            message: `Self Diagnose Completed. ${message}`
                        }
                    }
                })
        //     })

    }

    return (
        <div>
            {edit && (
                <div className="popup__bg">
                    <div className="popup__box">
                        <img src={Close} alt="close" className="close" onClick={() => setEdit(false)} />
                        <div className="dashboard__container__title green-p">
                            Auto Diagnose
                        </div>
                        <div className="popup__form">
                            <label className="battery__details__form__label">
                                Frequency:
                            </label>
                            <select className="battery__details__form__input" >
                                <option>Once a Day</option>
                                <option>Once a Week</option>
                                <option>Once a Month</option>
                            </select>
                        </div>
                        <button className="battery__details__form__button popup__button green-p-bg" onClick={() => setEdit(false)} >
                            Save Changes
                        </button>
                    </div>
                </div>
            )}
            <div className="dashboard__container" style={{ width: "50%", margin: "0 auto" }}>
                <div className="dashboard__container__title blue-p">
                    Self Diagnose
                    <span className="green-button" onClick={() => setEdit(true)}>
                        Set Auto Diagnosis
                    </span>
                </div>
                <div className="self">
                    <div id="self__solar" className="self__overlap self__checks green-p" style={{ opacity: 0 }}>
                        <img src={Solar} alt="solar" />&nbsp;&nbsp;&nbsp;
                        Checking your Solar Panel
                    </div>
                    <div id="self__mppt" className="self__overlap self__checks green-p" style={{ opacity: 0 }}>
                        <img src={MPPT} alt="mppt" />&nbsp;&nbsp;&nbsp;
                        Diagnosing your MPPT
                    </div>
                    <div id="self__battery" className="self__overlap self__checks green-p" style={{ opacity: 0 }}>
                        <img src={Battery1} alt="battery" />&nbsp;&nbsp;&nbsp;
                        Checking your Battery
                    </div>
                    <div id="self__button" className="self__overlap">
                        <button className="self__btn green-p-bg white" onClick={doCheck}>Run Self Diagnose</button>
                    </div>
                    <div id="self__result" className="self__overlap self__result green-p" style={{ display: "none" }}>
                        {value === 0 ? (
                            <img src={SuccessDiagnose} alt="success" style={{ width: "300px" }} />
                        ) : (
                            value === 1 ? (
                                <img src={WarningBattery2} alt="success" style={{ width: "300px" }} />
                            ) : (
                                value === 2 ? (
                                    <img src={ErrorBattery} alt="success" style={{ width: "300px" }} />
                                ) : (
                                    value === 3 ? (
                                        <img src={PanelEfficiencyError} alt="success" style={{ width: "300px" }} />
                                    ) : (
                                        <img src={InvalidSettingsError} alt="success" style={{ width: "300px" }} />
                                    )
                                )
                            )
                        )}
                        <br />
                        <span
                            className="green-button"
                            style={{
                                fontSize: "20px",
                                marginTop: "20px",
                                borderColor: "#2673ab",
                                color: "#2673ab"
                            }}
                            onClick={doCheck}
                        >Diagnose Again</span>
                    </div>
                </div>
            </div>
            <div className="dashboard__container" style={{ width: "50%", margin: "0 auto", marginTop: "20px" }}>
                <div className="dashboard__container__title blue-p">
                    Logs
                </div>
                <div className="logs" style={{ height: "225px", overflowY: "auto" }}>
                    {logs.map((log, index) => {
                        return (
                            <div className="log">
                                <span className="log__timeDate">
                                    {log[0]}
                                </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="log__message">
                                    {log[1]}
                                </span>
                                <hr />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Diagnose
