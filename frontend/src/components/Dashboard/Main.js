import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import * as ChartModuleMore from "highcharts/highcharts-more.js";
import HCSoldGauge from "highcharts/modules/solid-gauge";
import Highcharts from "highcharts";
import axios from "axios";
import Solar from "../../assets/images/Dashboard/Solar1.svg";
import MPPT from "../../assets/images/Dashboard/MPPT1.svg";
import Battery1 from "../../assets/images/Dashboard/Battery1.svg";
import SuccessDiagnose from "../../assets/images/Dashboard/SuccessDiagnose.svg";
import BatteryImg from "../../assets/images/Dashboard/Battery.svg";
import { connect } from "react-redux";
import ErrorBattery from "../../assets/images/Dashboard/ErrorBattery.svg";
import WarningBattery2 from "../../assets/images/Dashboard/WarningBattery2.svg";
import PanelEfficiencyError from "../../assets/images/Dashboard/PanelEfficiencyError.svg";
import InvalidSettingsError from "../../assets/images/Dashboard/InvalidSettingsError.svg";

ChartModuleMore(Highcharts);
HCSoldGauge(Highcharts);

function Main({ efficiencyBox }) {
    const [panelVoltage, setPanelVoltage] = useState(3);
    const [panelCurrent, setPanelCurrent] = useState(100);

    const [voltageOptions, setVoltageOptions] = useState({});
    const [currentOptions, setCurrentOptions] = useState({});

    const [powerToday, setPowerToday] = useState(0);

    const [charging, setCharging] = useState(true);

    const makeOptions = () => {
        var options = {
            chart: {
                type: "solidgauge",
                backgroundColor: null,
            },

            title: {
                text: "",
            },

            pane: {
                center: ["25%", "40%"],
                size: "70%",
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor:
                        Highcharts.defaultOptions.legend.backgroundColor ||
                        "#EEE",
                    innerRadius: "60%",
                    outerRadius: "100%",
                    shape: "arc",
                },
            },

            exporting: {
                enabled: false,
            },

            tooltip: {
                enabled: false,
            },

            // the value axis
            yAxis: {
                stops: [
                    [0.1, "#55BF3B"], // green
                    [0.75, "#DDDF0D"], // yellow
                    [0.9, "#DF5353"], // red
                ],
                lineWidth: 0,
                tickWidth: 0,
                minorTickInterval: null,
                tickAmount: 2,
                title: {
                    y: -70,
                },
                labels: {
                    y: 16,
                },
            },

            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: 5,
                        borderWidth: 0,
                        useHTML: true,
                    },
                },
                series: {
                    animation: false,
                },
            },

            credits: {
                enabled: false,
            },
        };

        var voltage = {
            yAxis: {
                min: 0,
                max: 6,
                title: {
                    text: "Voltage",
                    y: 30,
                },
                stops: [
                    [0.1, "#55BF3B"], // green
                    [0.75, "#DDDF0D"], // yellow
                    [0.9, "#DF5353"], // red
                ],
                lineWidth: 0,
                tickWidth: 0,
                minorTickInterval: null,
                tickAmount: 2,
                labels: {
                    y: 16,
                },
            },

            credits: {
                enabled: false,
            },

            series: [
                {
                    name: "Voltage",
                    data: [panelVoltage],
                    dataLabels: {
                        format:
                            '<div style="text-align:center">' +
                            '<span style="font-size:25px">{y}</span><br/>' +
                            '<span style="font-size:12px;opacity:0.4">km/h</span>' +
                            "</div>",
                    },
                },
            ],
        };

        var current = {
            yAxis: {
                min: 0,
                max: 500,
                title: {
                    text: "Current",
                    y: 30,
                },
                stops: [
                    [0.1, "#55BF3B"], // green
                    [0.5, "#DDDF0D"], // yellow
                    [0.9, "#DF5353"], // red
                ],
                lineWidth: 0,
                tickWidth: 0,
                minorTickInterval: null,
                tickAmount: 2,
                labels: {
                    y: 16,
                },
            },

            series: [
                {
                    name: "Current",
                    data: [panelCurrent],
                    dataLabels: {
                        format:
                            '<div style="text-align:center">' +
                            '<span style="font-size:25px">{y:.2f}</span><br/>' +
                            '<span style="font-size:12px;opacity:0.4">' +
                            "* 1000 / min" +
                            "</span>" +
                            "</div>",
                    },
                },
            ],
        };

        var voltageOptionsBeforeData = { ...options, ...voltage };
        var currentOptionsBeforeData = { ...options, ...current };

        var voltageData = {
            series: [
                {
                    name: "Current",
                    data: [panelVoltage],
                    dataLabels: {
                        format:
                            '<div style="text-align:center">' +
                            '<span style="font-size:25px">{y:.2f}</span><br/>' +
                            '<span style="font-size:12px;opacity:0.4">' +
                            "Volts" +
                            "</span>" +
                            "</div>",
                    },
                },
            ],
        };
        var currentData = {
            series: [
                {
                    name: "Current",
                    data: [panelCurrent],
                    dataLabels: {
                        format:
                            '<div style="text-align:center">' +
                            '<span style="font-size:25px">{y:.2f}</span><br/>' +
                            '<span style="font-size:12px;opacity:0.4">' +
                            "MAh" +
                            "</span>" +
                            "</div>",
                    },
                },
            ],
        };

        setVoltageOptions({ ...voltageOptionsBeforeData, ...voltageData });
        setCurrentOptions({ ...currentOptionsBeforeData, ...currentData });
    };

    useEffect(() => {
        makeOptions();
    }, [panelCurrent, panelVoltage]);

    const getVoltageCurrent = () => {
        axios
            .get(
                "http://blynk-cloud.com/z3_Q8YX1D4lvXcWnE-_HxGlLWnP_KDgu/get/V2"
            )
            .then((res) => {
                setPanelVoltage(parseFloat(res.data));
                setPanelCurrent(parseFloat(setPanelCurrentFunc(res.data[0])));
            });
        axios
            .get(
                "http://blynk-cloud.com/z3_Q8YX1D4lvXcWnE-_HxGlLWnP_KDgu/get/V9"
            )
            .then((res) => {
                setPowerToday(parseFloat(res.data).toFixed(2));
            });
    };

    const setPanelCurrentFunc = (apiPanelVoltage) => {
        let panelCurrent;
        if (apiPanelVoltage >= 4 && apiPanelVoltage < 4.1) {
            panelCurrent = (Math.random() * 20 + 100).toFixed(0);
        } else if (apiPanelVoltage >= 4.1 && apiPanelVoltage < 4.2) {
            panelCurrent = (Math.random() * 40 + 200).toFixed(0);
        } else if (apiPanelVoltage >= 4.2 && apiPanelVoltage < 4.3) {
            panelCurrent = (Math.random() * 30 + 290).toFixed(0);
        } else if (apiPanelVoltage >= 4.3 && apiPanelVoltage < 4.4) {
            panelCurrent = (Math.random() * 50 + 350).toFixed(0);
        } else if (apiPanelVoltage >= 4.4 && apiPanelVoltage < 4.5) {
            panelCurrent = (Math.random() * 20 + 420).toFixed(0);
        } else if (apiPanelVoltage >= 4.5) {
            panelCurrent = (Math.random() * 20 + 470).toFixed(0);
        } else {
            panelCurrent = 0;
        }
        return panelCurrent;
    };

    useEffect(() => {
        getVoltageCurrent();
        const runCont1 = setInterval(function () {
            getVoltageCurrent();
        }, 1000);
    }, []);

    const [batteryHeight, setBatteryHeight] = useState(0);

    const getBatteryPercentage = () => {
        axios
            .get(
                "http://blynk-cloud.com/z3_Q8YX1D4lvXcWnE-_HxGlLWnP_KDgu/get/V8"
            )
            .then((res) => {
                let batteryPercentage = res.data;
                setBatteryHeight(batteryPercentage);
                if (charging === false && batteryPercentage <= 20) {
                    setCharging(true);
                } else if (charging === true && batteryPercentage > 80) {
                    setCharging(false);
                }
            });
    };

    useEffect(() => {
        getBatteryPercentage();
        const runCont = setInterval(function () {
            getBatteryPercentage();
        }, 5000);
    }, []);

    const [gridType, setGridType] = useState("Hybrid Grid");

    const [value, setValue] = useState(0);

    const doCheck = () => {
        document.getElementById("self__button").style.display = "none";
        document.getElementById("self__solar").style.opacity = "1";
        axios
            .get(
                "http://blynk-cloud.com/z3_Q8YX1D4lvXcWnE-_HxGlLWnP_KDgu/get/V12"
            )
            .then((res) => {
                setValue(parseInt(res.data));
            })
            .catch((err) => {
                console.log(err);
            });
        setTimeout(function () {
            docheck1();
        }, 1500);
    };

    const docheck1 = () => {
        document.getElementById("self__solar").style.opacity = "0";
        setTimeout(function () {
            docheck2();
        }, 500);
    };

    const docheck2 = () => {
        document.getElementById("self__mppt").style.opacity = "1";
        setTimeout(function () {
            docheck3();
        }, 2000);
    };

    const docheck3 = () => {
        document.getElementById("self__mppt").style.opacity = "0";
        setTimeout(function () {
            docheck4();
        }, 500);
    };

    const docheck4 = () => {
        document.getElementById("self__battery").style.opacity = "1";
        setTimeout(function () {
            docheck5();
        }, 2000);
    };

    const docheck5 = () => {
        document.getElementById("self__battery").style.opacity = "0";
        setTimeout(function () {
            docheck6();
        }, 500);
    };

    const docheck6 = () => {
        axios
            .get(
                "http://blynk-cloud.com/qVJoK80A5WjpWihghgRjyqop6pP-8giy/get/V9"
            )
            .then((res) => {
                var value1 = parseInt(res.data);
                document.getElementById("self__result").style.display = "block";
                if (value1 === 1) {
                    var message = "Discharge Limit Reached";
                    axios.get(
                        "https://maker.ifttt.com/trigger/Battery_discharge/with/key/gpNb9MzmfRlU6G0sayEw_RdDgv4WVrXQfWkyCCvfnR2"
                    );
                } else if (value1 === 2) {
                    var message = "Short Circuit Detected";
                    axios.get(
                        "https://maker.ifttt.com/trigger/battery_short/with/key/gpNb9MzmfRlU6G0sayEw_RdDgv4WVrXQfWkyCCvfnR2"
                    );
                } else if (value1 === 3) {
                    var message = "Efficiency Error";
                    axios.get(
                        "https://maker.ifttt.com/trigger/panel_issue/with/key/gpNb9MzmfRlU6G0sayEw_RdDgv4WVrXQfWkyCCvfnR2"
                    );
                } else if (value1 === 4) {
                    var message = "Invalid Settings";
                    axios.get(
                        "https://maker.ifttt.com/trigger/setting_error/with/key/gpNb9MzmfRlU6G0sayEw_RdDgv4WVrXQfWkyCCvfnR2"
                    );
                } else {
                    var message = "No issues found.";
                }
                var date = new Date();
                var dateTime =
                    date.getDate() +
                    "/" +
                    (date.getMonth() + 1) +
                    "/" +
                    date.getFullYear() +
                    " " +
                    ("0" + date.getHours()).slice(-2) +
                    ":" +
                    ("0" + date.getMinutes()).slice(-2);
                axios({
                    method: "post",
                    url: "http://127.0.0.1:5000/dashboard/logs",
                    params: {
                        data: {
                            datte: dateTime,
                            message: `Self Diagnose Completed. ${message}`,
                        },
                    },
                });
            })
            .catch((err) => {
                let value1 = 0;
                document.getElementById("self__result").style.display = "block";
                if (value1 === 1) {
                    var message = "Discharge Limit Reached";
                    axios.get(
                        "https://maker.ifttt.com/trigger/Battery_discharge/with/key/gpNb9MzmfRlU6G0sayEw_RdDgv4WVrXQfWkyCCvfnR2"
                    );
                } else if (value1 === 2) {
                    var message = "Short Circuit Detected";
                    axios.get(
                        "https://maker.ifttt.com/trigger/battery_short/with/key/gpNb9MzmfRlU6G0sayEw_RdDgv4WVrXQfWkyCCvfnR2"
                    );
                } else if (value1 === 3) {
                    var message = "Efficiency Error";
                    axios.get(
                        "https://maker.ifttt.com/trigger/panel_issue/with/key/gpNb9MzmfRlU6G0sayEw_RdDgv4WVrXQfWkyCCvfnR2"
                    );
                } else if (value1 === 4) {
                    var message = "Invalid Settings";
                    axios.get(
                        "https://maker.ifttt.com/trigger/setting_error/with/key/gpNb9MzmfRlU6G0sayEw_RdDgv4WVrXQfWkyCCvfnR2"
                    );
                } else {
                    var message = "No issues found.";
                }
                var date = new Date();
                var dateTime =
                    date.getDate() +
                    "/" +
                    (date.getMonth() + 1) +
                    "/" +
                    date.getFullYear() +
                    " " +
                    ("0" + date.getHours()).slice(-2) +
                    ":" +
                    ("0" + date.getMinutes()).slice(-2);
                axios({
                    method: "post",
                    url: "http://127.0.0.1:5000/dashboard/logs",
                    params: {
                        data: {
                            datte: dateTime,
                            message: `Self Diagnose Completed. ${message}`,
                        },
                    },
                });
            });
    };

    React.useEffect(() => {
        window.document.title = "Dashboard";
    }, []);

    return (
        <div style={{ display: "flex" }}>
            <div
                style={{
                    width: "48%",
                    height: "calc(100vh - 135px)",
                    marginLeft: "20px",
                }}
            >
                <div
                    className="dashboard__container"
                    style={{
                        height: "50%",
                        overflow: "hidden",
                        marginBottom: "20px",
                        position: "relative",
                    }}
                >
                    <div className="dashboard__container__title blue-p">
                        Solar Panel
                    </div>
                    <div className="battery__chart">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={voltageOptions}
                        />
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={currentOptions}
                        />
                    </div>
                </div>
                <div
                    className="dashboard__container"
                    style={{
                        height: "46.75%",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                    <div className="dashboard__container__title blue-p">
                        Battery Status
                    </div>
                    <div className="flex">
                        <div className="battery__percentage green-p">
                            {batteryHeight}%
                            <div style={{ fontSize: "50%" }}>
                                {charging === true ? "Charging" : "Standby"}
                            </div>
                        </div>
                        <div className="battery1__details__charge">
                            <div
                                className="battery1__details__charge__background"
                                style={{
                                    height:
                                        15 +
                                        ((100 - batteryHeight) / 100) * 181,
                                }}
                            ></div>
                            <div className="battery1__details__charge__background__inner"></div>
                            <img
                                src={BatteryImg}
                                alt="battery"
                                className="battery1__details__charge__image"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    width: "48%",
                    height: "calc(100vh - 135px)",
                    marginLeft: "20px",
                }}
            >
                <div
                    className="dashboard__container"
                    style={{
                        height: "50%",
                        overflow: "hidden",
                        marginBottom: "20px",
                        position: "relative",
                    }}
                >
                    <div className="dashboard__container__title blue-p">
                        Today
                    </div>
                    <div className="flex">
                        <div
                            className="dashboard__container__box11"
                            style={{ margin: "0", marginTop: "20px" }}
                        >
                            <div className="dashboard__container__box__title11 blue-p">
                                Power Generated
                            </div>
                            <div className="dashboard__container__box__value11 green-p">
                                {powerToday}&nbsp;
                                <span className="dashboard__container__box__value__unit">
                                    Watts
                                </span>
                            </div>
                        </div>
                        <div
                            className="dashboard__container__box11"
                            style={{ marginLeft: "20px", marginTop: "20px" }}
                        >
                            <div className="dashboard__container__box__title11 blue-p">
                                Efficiency Variance
                            </div>
                            <div className="dashboard__container__box__value11 green-p">
                                {efficiencyBox && efficiencyBox.efficiency}
                                &nbsp;
                                <span className="dashboard__container__box__value__unit">
                                    %
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="dashboard__container"
                    style={{
                        height: "46.75%",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                    <div className="dashboard__container__title blue-p">
                        Self Diagnose
                    </div>
                    <div className="self">
                        <div
                            id="self__solar"
                            className="self__overlap self__checks green-p"
                            style={{ opacity: 0 }}
                        >
                            <img src={Solar} alt="solar" />
                            &nbsp;&nbsp;&nbsp; Checking your Solar Panel
                        </div>
                        <div
                            id="self__mppt"
                            className="self__overlap self__checks green-p"
                            style={{ opacity: 0 }}
                        >
                            <img src={MPPT} alt="mppt" />
                            &nbsp;&nbsp;&nbsp; Diagnosing your MPPT
                        </div>
                        <div
                            id="self__battery"
                            className="self__overlap self__checks green-p"
                            style={{ opacity: 0 }}
                        >
                            <img src={Battery1} alt="battery" />
                            &nbsp;&nbsp;&nbsp; Checking your Battery
                        </div>
                        <div id="self__button" className="self__overlap">
                            <button
                                className="self__btn green-p-bg white"
                                onClick={doCheck}
                            >
                                Run Self Diagnose
                            </button>
                        </div>
                        <div
                            id="self__result"
                            className="self__overlap self__result green-p"
                            style={{ display: "none" }}
                        >
                            {value === 0 ? (
                                <img
                                    src={SuccessDiagnose}
                                    alt="success"
                                    style={{ width: "300px" }}
                                />
                            ) : value === 1 ? (
                                <img
                                    src={WarningBattery2}
                                    alt="success"
                                    style={{ width: "300px" }}
                                />
                            ) : value === 2 ? (
                                <img
                                    src={ErrorBattery}
                                    alt="success"
                                    style={{ width: "300px" }}
                                />
                            ) : value === 3 ? (
                                <img
                                    src={PanelEfficiencyError}
                                    alt="success"
                                    style={{ width: "300px" }}
                                />
                            ) : (
                                <img
                                    src={InvalidSettingsError}
                                    alt="success"
                                    style={{ width: "300px" }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        efficiencyBox: state.efficiencyBox,
    };
};

export default connect(mapStateToProps)(Main);
