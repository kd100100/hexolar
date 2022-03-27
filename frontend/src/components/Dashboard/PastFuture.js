import React, { useEffect, useState } from 'react'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts'
import axios from 'axios'
import { connect } from 'react-redux';

function PastFuture({ comp, pastData, futureData }) {

    const [lineChartOptions, setLineChartOptions] = useState({});
    const [status, setStatus] = useState('daily');
    const [DisplayData, setDisplayData] = useState();

    // const getFuturePastPage = () => {
    //     axios({
    //         method: 'get',
    //         url: 'http://127.0.0.1:5000/dashboard/futurepast',
    //         params: {
    //             data: {
    //                 comp: comp,
    //             }
    //         }
    //     })
    //         .then(res => {
    //             console.log(res.data)
    //             setData(res.data);
    //         })
    // }

    const [data, setData] = useState({
        daily: {
            display: {
                date: [10, 11, 12],
                month: [12, 12, 12],
                year: [2022, 2022, 2022],
                values: [0, 0, 0]
            },
            graph: {
                xAxis: ["10/12/21", "11/12/21", "12/12/21", "13/12/21", "14/12/21", "15/12/21", "16/12/21", "17/12/21", "18/12/21", "19/12/21", "20/12/21"],
                yAxis: [0,0,0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
        },
        monthly: {
            display: {
                month: [10, 11, 12],
                year: [2021, 2021, 2021],
                values: [0,0, 0]
            },
            graph: {
                xAxis: ["02/21", "03/21", "04/21", "05/21", "06/21", "07/21", "08/21", "09/21", "10/21", "11/21", "12/21"],
                yAxis: [0,0,0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
        },
        yearly: {
            display: {
                year: [2019, 2020, 2021],
                values: [0,0, 0]
            },
            graph: {
                xAxis: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012],
                yAxis: [0,0,0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
        }
    });

    const makeLineChartOptions = (data) => {
        setLineChartOptions({

            chart: {
                backgroundColor: 'transparent',
                height: 0.3 * window.innerHeight,
                width: 0.75 * window.innerWidth,
                type: "areaspline"
            },
            title: {
                style: {
                    color: 'transparent'
                }
            },
            xAxis: {
                pointStart: 0,
                categories: data.xAxis,
                gridLineColor: 'transparent',
                lineColor: '#00000020',
                lineWidth: 1,
                labels: {
                    style: {
                        color: '#00000080'
                    }
                }
            },
            yAxis: {
                min: 0,
                lineColor: '#ffffff',
                lineWidth: 1,
                title: {
                    enabled: false
                },
                labels: {
                    enabled: true,
                    style: {
                        color: '#ffffff'
                    },
                },
                gridLineColor: 'transparent',


            },
            plotOptions: {
                areaspline: {
                    pointStart: 0,
                    color: '#2673AB33',
                    lineColor: '#10bab9',
                    lineWidth: 3
                },
                marker: {
                    enabled: false
                }
            },
            series: [{
                showInLegend: false,
                data: data.yAxis,
            }],
            credits: {
                enabled: false
            }
        });
    }

    const number2month = (num) => {
        switch (num) {
            case 1:
                return 'January';
            case 2:
                return 'February';
            case 3:
                return 'March';
            case 4:
                return 'April';
            case 5:
                return 'May';
            case 6:
                return 'June';
            case 7:
                return 'July';
            case 8:
                return 'August';
            case 9:
                return 'September';
            case 10:
                return 'October';
            case 11:
                return 'November';
            case 12:
                return 'December';
            default:
                return 'January';
        }
    }


    const makeDisplayData = (data) => {
        if (status === "yearly") {
            setDisplayData({
                topline: data.year,
                bottomline: data.values
            });
        } else if (status === "monthly") {
            var topline = [];
            for (let i = 0; i < 3; i++) {
                topline.push(number2month(data.month[i]) + " " + data.year[i]);
            }
            setDisplayData({
                topline: topline,
                bottomline: data.values
            });
        } else {
            var topline = [];
            for (let i = 0; i < 3; i++) {
                topline.push(data.date[i] + " " + number2month(data.month[i]) + " " + data.year[i]);
            }
            setDisplayData({
                topline: topline,
                bottomline: data.values
            });
        }
    }

    useEffect(() => {
        if (data) {
            makeLineChartOptions(data[status].graph);
            makeDisplayData(data[status].display);
        }
    }, [data, status, comp]);

    useEffect(() => {
        setStatus("daily")
    }, [comp])

    useEffect(() => {
        // getFuturePastPage()
        if (comp === "future") {
            setData(futureData);
        } else if (comp === "past") {
            setData(pastData);
        }
        
        window.document.title = (comp === "future" ? "Future Data" : "Past Data");
    }, [comp, futureData, pastData])


    return (
        <div>
            <div className="dashboard__container" style={{ width: "calc(100vw - 135px)", height: "calc(100vh - 135px)" }}>
                {
                    comp === "future" &&
                    <div className="future green-p" style={{ float: "right", marginTop: "20px" }}>
                        *External Factors like temp, humidity, etc. are taken into consideration
                    </div>
                }
                <div className="dashboard__container__title blue-p">
                    {comp === "future" ? (<>Future</>) : (<>Past</>)} Performance
                </div>
                <div className="flex" style={{ marginTop: "30px" }}>
                    <div className="dashboard__container__buttons">
                        <div
                            className={status === "daily" ? "dashboard__container__buttons__button green-p" : "dashboard__container__buttons__button green-p-bg white"}
                            onClick={() => setStatus("daily")}
                        >
                            Daily
                        </div>
                        {
                            comp === "future" ?
                                <div
                                    className={status === "monthly" ? "dashboard__container__buttons__button green-p" : "dashboard__container__buttons__button green-p-bg white"}
                                    onClick={() => setStatus("monthly")}
                                >
                                    Monthly
                                </div>
                                :
                                <div
                                    className={status === "monthly" ? "dashboard__container__buttons__button green-p" : "dashboard__container__buttons__button"}
                                    style={{ backgroundColor: "#ddd", borderColor: "#ddd", color: "#444" }}
                                    onClick={() => alert("Data is not available for monthly data")}
                                >
                                    Monthly
                                </div>
                        }

                        {
                            comp === "future" ?
                                <div
                                    className={status === "yearly" ? "dashboard__container__buttons__button green-p" : "dashboard__container__buttons__button green-p-bg white"}
                                    onClick={() => setStatus("yearly")}
                                >
                                    Yearly
                                </div>
                                :
                                <div
                                    className={status === "monthly" ? "dashboard__container__buttons__button green-p" : "dashboard__container__buttons__button"}
                                    style={{ backgroundColor: "#ddd", borderColor: "#ddd", color: "#444" }}
                                    onClick={() => alert("Data is not available for yearly data")}
                                >
                                    Yearly
                                </div>
                        }
                    </div>
                    <div className="dashboard__container__graph">
                        <HighchartsReact highcharts={Highcharts} options={lineChartOptions} />
                    </div>
                </div>
                <div className="flex">
                    <div className="dashboard__container__box">
                        <div className="dashboard__container__box__title blue-p">
                            {DisplayData && DisplayData.topline[0]}
                        </div>
                        <div className="dashboard__container__box__value green-p">
                            {DisplayData && DisplayData.bottomline[0]}&nbsp;
                            <span className="dashboard__container__box__value__unit">
                                Watts
                            </span>
                        </div>
                    </div>
                    <div className="dashboard__container__box" style={{ margin: "30px", marginBottom: 0 }}>
                        <div className="dashboard__container__box__title blue-p">
                        {DisplayData && DisplayData.topline[1]}
                        </div>
                        <div className="dashboard__container__box__value green-p">
                        {DisplayData && (
                                status === "yearly" ? 
                                    parseFloat(DisplayData.bottomline[1]) + 10
                                    :
                                    DisplayData.bottomline[1]
                            )}&nbsp;
                            <span className="dashboard__container__box__value__unit">
                                Watts
                            </span>
                        </div>
                    </div>
                    <div className="dashboard__container__box">
                        <div className="dashboard__container__box__title blue-p">
                            {DisplayData && DisplayData.topline[2]}
                        </div>
                        <div className="dashboard__container__box__value green-p">
                            {DisplayData && (
                                status === "yearly" ? 
                                    parseFloat(DisplayData.bottomline[2]) - 10
                                    :
                                    DisplayData.bottomline[2]
                            )}&nbsp;
                            <span className="dashboard__container__box__value__unit">
                                Watts
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        futureData: state.future,
        pastData: state.past
    }
}

export default connect(mapStateToProps)(PastFuture);
