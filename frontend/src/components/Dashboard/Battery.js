import React, { useEffect, useState } from "react";
import Edit from "../../assets/images/Dashboard/Edit.svg";
import BatteryImg from "../../assets/images/Dashboard/Battery.svg";
import SuccessBattery from "../../assets/images/Dashboard/SuccessBattery.svg";
import ErrorBattery from "../../assets/images/Dashboard/ErrorBattery.svg";
import WarningBattery2 from "../../assets/images/Dashboard/WarningBattery2.svg";
import Close from "../../assets/images/Close.svg";
import HighchartsReact from "highcharts-react-official";
import * as ChartModuleMore from "highcharts/highcharts-more.js";
import HCSoldGauge from "highcharts/modules/solid-gauge";
import Highcharts from "highcharts";
import axios from "axios";

ChartModuleMore(Highcharts);
HCSoldGauge(Highcharts);

function Battery() {
    const [mail1, setMail1] = useState(false);
    const [mail2, setMail2] = useState(false);

    const batteryVoltage = {
        liion: ["3.7v (1s)", "3.7v (2s)", "3.7v (3s)"],
        leadacid: ["6v"],
        nicd: ["1.2v", "2.4v", "4.8v"],
    };
    const [editBatteryType, setEditBatteryType] = useState("Lithium Ion");
    const [editBatteryVoltage, setEditBatteryVoltage] = useState();
    const [editBatteryAmp, setEditBatteryAmp] = useState();

    const [chargeTill, setChargeTill] = useState();
    const [dischargeTill, setDischargeTill] = useState();
    const [chargeCycle, setChargeCycle] = useState();

    const [batteryHeight, setBatteryHeight] = useState("153px");
    const [batteryAPIVoltage, setBatteryAPIVoltage] = useState(0);
    const [batteryAPICurrent, setBatteryAPICurrent] = useState(0);

    const [voltageOptions, setVoltageOptions] = useState({});
    const [currentOptions, setCurrentOptions] = useState({});
    const [lineChartOptions, setLineChartOptions] = useState({});
    const [edit, setEdit] = useState(false);
    const [buttonEdit, setButtonEdit] = useState(false);
    const [data, setData] = useState({
        chargeTill: "80%",
        dischargeTill: "20%",
        batteryType: "Lithium Ion",
        batteryVoltage: "3.7v (1s)",
        batteryAmp: "100",
        graph: {
            xAxis: [],
            yAxis: [],
        },
    });
    const [iv, setIv] = useState({
        current: 0,
        voltage: 0,
    });
    const [issue, setIssue] = useState(1);

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
                    [0.5, "#DDDF0D"], // yellow
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
                    text: "",
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
                    data: [batteryAPIVoltage],
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
                max: 1000,
                title: {
                    text: "",
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

            series: [
                {
                    name: "Current",
                    data: [batteryAPICurrent],
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
                    data: [batteryAPIVoltage],
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
                    data: [batteryAPICurrent],
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

    const makeLineChartOptions = (gData) => {
        setLineChartOptions({
            chart: {
                backgroundColor: "transparent",
                height: 0.28 * window.innerHeight,
                width: 0.425 * window.innerWidth,
                type: "spline",
            },
            title: {
                style: {
                    color: "transparent",
                },
            },
            xAxis: {
                pointStart: 0,
                categories: ["23:00", "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "08:00"],
                gridLineColor: "transparent",
                lineColor: "#00000020",
                lineWidth: 1,
                labels: {
                    style: {
                        color: "#00000080",
                    },
                },
            },
            yAxis: {
                min: 0,
                lineColor: "#ffffff",
                lineWidth: 1,
                title: {
                    enabled: false,
                },
                labels: {
                    enabled: true,
                    style: {
                        color: "#ffffff",
                    },
                },
                gridLineColor: "transparent",
            },
            plotOptions: {
                area: {
                    pointStart: 0,
                    color: "#2673AB80",
                    lineColor: "#2673AB",
                    lineWidth: 3,
                },
                marker: {
                    enabled: false,
                },
            },
            series: [
                {
                    showInLegend: false,
                    data: [65,65,65,65,65,65,65,57,45,50],
                },
            ],
            credits: {
                enabled: false,
            },
        });
    };

    useEffect(() => {
        makeOptions();
        makeLineChartOptions(data.graph);
    }, [batteryAPICurrent, batteryAPIVoltage]);

    const getBatteryPercentage = () => {
        axios.get("http://blynk-cloud.com/z3_Q8YX1D4lvXcWnE-_HxGlLWnP_KDgu/get/V8")
            .then(res => {
                let batteryPercentage = res.data;
                setBatteryHeight(7 + (((100 - batteryPercentage) / 100) * 146));
            })
    };

    useEffect(() => {
        getBatteryPercentage();
        const runCont = setInterval(function () {
            getBatteryPercentage();
        }, 5000);
    }, []);

    const getVoltageCurrent = () => {
        axios
            .get(
                "http://blynk-cloud.com/z3_Q8YX1D4lvXcWnE-_HxGlLWnP_KDgu/get/V3"
            )
            .then((res) => {
                setBatteryAPIVoltage(parseFloat(res.data));
            });
        // axios.get("http://blynk-cloud.com/qVJoK80A5WjpWihghgRjyqop6pP-8giy/get/V7")
        //     .then(res => {
        //         setIssue(parseInt(res.data));
        //     })
        setBatteryCurrentFunc();
    };

    function setBatteryCurrentFunc() {
        let onGridStatus = false;
        let offGridStatus = false;
        fetch("http://blynk-cloud.com/z3_Q8YX1D4lvXcWnE-_HxGlLWnP_KDgu/get/D18")
            .then((response) => response.json())
            .then((data) => {
                onGridStatus = data[0] == 1 ? true : false;
                fetch(
                    "http://blynk-cloud.com/z3_Q8YX1D4lvXcWnE-_HxGlLWnP_KDgu/get/D19"
                )
                    .then((response) => response.json())
                    .then((data) => {
                        offGridStatus = data[0] == 1 ? true : false;
                        let batteryCurrent = 0;
                        if (onGridStatus && offGridStatus) {
                            batteryCurrent = (Math.random() + 29.5).toFixed(3);
                        } else if (onGridStatus) {
                            batteryCurrent = (Math.random() + 14.5).toFixed(3);
                        } else if (offGridStatus) {
                            batteryCurrent = (Math.random() + 14.5).toFixed(3);
                        }
                        setBatteryAPICurrent(parseFloat(batteryCurrent));
                    });
            });
    }

    const getBatteryPage = () => {
        axios.get("http://127.0.0.1:5000/dashboard/battery").then((res) => {
            setChargeCycle(2);
            setChargeTill(res.data.chargeTill);
            setDischargeTill(res.data.dischargeTill);
            setEditBatteryType(res.data.batteryType);
            setEditBatteryVoltage(res.data.batteryVoltage);
            setEditBatteryAmp(res.data.batteryAmp);
            setData(res.data);
        });
    };

    React.useEffect(() => {
        window.document.title = "Battery";
    }, []);

    const postBatteryPage = () => {
        setEdit(false);

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
                    message: `Battery Settings Updated`,
                },
            },
        }).then((res) => {
            axios({
                method: "post",
                url: "http://127.0.0.1:5000/dashboard/battery",
                params: {
                    data: {
                        chargeTill: chargeTill,
                        dischargeTill: dischargeTill,
                        batteryType: editBatteryType,
                        batteryVoltage: editBatteryVoltage,
                        batteryAmp: editBatteryAmp,
                    },
                },
            }).then((res) => {
                
            });
        });
    };

    useEffect(() => {
        getVoltageCurrent();
        const runCont1 = setInterval(function () {
            getVoltageCurrent();
        }, 1000);
        getBatteryPage();
    }, []);

    const chargeTill1 = (e) => {
        setChargeTill(e.target.value);
        setButtonEdit(true);
    };

    const dischargeTill1 = (e) => {
        setDischargeTill(e.target.value);
        setButtonEdit(true);
    };

    return (
        <div style={{ display: "flex" }}>
            {edit && (
                <div className="popup__bg">
                    <div className="popup__box">
                        <img
                            src={Close}
                            alt="close"
                            className="close"
                            onClick={() => setEdit(false)}
                        />
                        <div className="dashboard__container__title green-p">
                            Edit Battery
                        </div>
                        <div className="popup__form">
                            <label className="battery__details__form__label">
                                Battery Type:
                            </label>
                            <select
                                className="battery__details__form__input"
                                value={editBatteryType}
                                onChange={(e) =>
                                    setEditBatteryType(e.target.value)
                                }
                            >
                                <option>Lithium Ion</option>
                                <option>Lithium Iron Phosphate</option>
                                <option>Lead Acid</option>
                                <option>Nickel Cadnium</option>
                                <option>Nickel Metal Hydride</option>
                            </select>
                            <br />
                            <label className="battery__details__form__label">
                                Voltage:
                            </label>
                            <select
                                className="battery__details__form__input"
                                value={editBatteryVoltage}
                                onChange={(e) =>
                                    setEditBatteryVoltage(e.target.value)
                                }
                            >
                                {editBatteryType === "Lithium Ion" ||
                                editBatteryType === "Lithium Iron Phosphate"
                                    ? batteryVoltage.liion.map(
                                          (item, index) => (
                                              <option key={index}>
                                                  {item}
                                              </option>
                                          )
                                      )
                                    : editBatteryType === "Nickel Cadnium" ||
                                      editBatteryType === "Nickel Metal Hydride"
                                    ? batteryVoltage.nicd.map((item, index) => (
                                          <option key={index}>{item}</option>
                                      ))
                                    : batteryVoltage.leadacid.map(
                                          (item, index) => (
                                              <option key={index}>
                                                  {item}
                                              </option>
                                          )
                                      )}
                            </select>
                            <br />
                            <label className="battery__details__form__label">
                                Amp Hour:
                            </label>
                            <select
                                type="text"
                                className="battery__details__form__input"
                                value={editBatteryAmp}
                                onChange={(e) =>
                                    setEditBatteryAmp(e.target.value)
                                }
                            >
                                <option>100MAh</option>
                                <option>200MAh</option>
                                <option>300MAh</option>
                                <option>400MAh</option>
                                <option>500MAh</option>
                            </select>
                        </div>
                        <button
                            className="battery__details__form__button popup__button green-p-bg"
                            onClick={postBatteryPage}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            )}
            <div
                className="dashboard__container"
                style={{ width: "50%", height: "calc(100vh - 135px)" }}
            >
                <div className="dashboard__container__title blue-p">
                    Battery Status
                </div>
                <div className="battery__subtitle green-p">
                    {editBatteryType} Battery
                    {/* <img
                        src={Edit}
                        alt="edit"
                        className="battery__subtitle__edit"
                        onClick={() => setEdit(true)}
                    /> */}
                </div>
                <div className="battery__details">
                    <div className="battery__details__form">
                        <label className="battery__details__form__label">
                            Charge Till:
                        </label>
                        <select
                            className="battery__details__form__input"
                            value={chargeTill}
                            onChange={(e) => chargeTill1(e)}
                        >
                            <option>50%</option>
                            <option>55%</option>
                            <option>60%</option>
                            <option>65%</option>
                            <option>70%</option>
                            <option>75%</option>
                            <option>80%</option>
                            <option>85%</option>
                            <option>90%</option>
                            <option>95%</option>
                            <option>100%</option>
                        </select>
                        <br />
                        <label className="battery__details__form__label">
                            Discharge Till:
                        </label>
                        <select
                            className="battery__details__form__input"
                            value={dischargeTill}
                            onChange={(e) => dischargeTill1(e)}
                        >
                            <option>0%</option>
                            <option>5%</option>
                            <option>10%</option>
                            <option>15%</option>
                            <option>20%</option>
                            <option>25%</option>
                            <option>30%</option>
                            <option>35%</option>
                            <option>40%</option>
                            <option>45%</option>
                            <option>50%</option>
                        </select>
                        <br />
                        <label className="battery__details__form__label">
                            Charge Cycles:
                        </label>
                        <input
                            type="text"
                            className="battery__details__form__input"
                            value={chargeCycle}
                        />
                        <br />
                        <button
                            className={
                                buttonEdit
                                    ? "battery__details__form__button green-p-bg"
                                    : "battery__details__form__button"
                            }
                            onClick={postBatteryPage}
                        >
                            Save Changes
                        </button>
                    </div>
                    <div className="battery__details__charge">
                        <div className="battery__details__charge__background">
                            <div
                                className="battery__details__charge__background__inner"
                                style={{ height: batteryHeight }}
                            >
                                &nbsp;
                            </div>
                        </div>
                        <img
                            src={BatteryImg}
                            alt="battery"
                            className="battery__details__charge__image"
                        />
                    </div>
                </div>
                <div className="battery__chart__title">
                    Battery Voltage
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Battery
                    Current
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
                style={{
                    width: "48%",
                    height: "calc(100vh - 135px)",
                    marginLeft: "20px",
                }}
            >
                <div
                    className="dashboard__container"
                    style={{
                        height: "46.75%",
                        overflow: "hidden",
                        marginBottom: "20px",
                        position: "relative",
                    }}
                >
                    <div className="dashboard__container__title blue-p">
                        Battery Usage
                    </div>
                    <div className="hc1">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={lineChartOptions}
                        />
                    </div>
                </div>
                <div
                    className="dashboard__container"
                    style={{
                        height: "50%",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                    <div className="dashboard__container__title blue-p">
                        Battery Log
                    </div>
                    {issue === 1 ? (
                        <img
                            src={SuccessBattery}
                            alt="battery"
                            className="success__battery"
                        />
                    ) : issue === 2 ? (
                        <img
                            src={WarningBattery2}
                            alt="battery"
                            className="success__battery"
                        />
                    ) : (
                        <img
                            src={ErrorBattery}
                            alt="battery"
                            className="success__battery"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Battery;
