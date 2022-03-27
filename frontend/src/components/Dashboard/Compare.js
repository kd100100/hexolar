import React, { useEffect, useState } from 'react'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts'
import axios from 'axios'
import PanelGood from '../../assets/images/Dashboard/PanelGood.svg'
import PanelBad from '../../assets/images/Dashboard/PanelBad.svg'
import { connect } from 'react-redux';

function Compare({ efficiencyGraph, efficiencyBox }) {

    const [options, setOptions] = useState()

    const [data, setData] = useState()

    const [boxData, setBoxData] = useState({
        lastDay: 0,
        lastMonth: 0,
        lastYear: 0,
        efficiency: 0,
    })

    const makeOption = () => {
        setOptions({
            chart: {
                backgroundColor: null,
                height: 0.50 * window.innerHeight,
                width: 0.91 * window.innerWidth,
                type: "spline",
                // styledMode: true,
            },
            title: {
                text: ''
            },
            
            yAxis: {
                gridLineColor: 'transparent',
                lineColor: '#ffffff',
                lineWidth: 1,
                title: {
                    enabled: false
                },
                labels: {
                    style: {
                        color: '#ffff'
                    }
                }
            },

            xAxis: {
                categories: ["17/03/2022", "18/03/2022", "19/03/2022", "20/03/2022", "21/03/2022", "22/03/2022", "23/03/2022", "24/03/2022", "25/03/2022", "26/03/2022"],
                color: '#ffffff',
                lineColor: '#2673AB',
                lineWidth: 1,
                labels: {
                    style: {
                        color: '#2673AB'
                    }
                }

            },

            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 80,
                y: 20,
                floating: true,
                itemStyle: {
                    color: '#2673AB',
                    fontSize: '18px'
                }

            },

            plotOptions: {
                series: {
                    shadow: true,
                    label: {
                        connectorAllowed: false
                    },

                }
            },

            series: [{
                color: '#fc3d21',
                className: "nasa_data",
                name: 'NASA Data',
                data: efficiencyGraph.NASA,
                lineWidth: 2,
                jitter: {
                    y: 0.0001
                }
            }, {
                color: '#4086fb',
                className: "user_data",
                name: 'Panel Data',
                data: efficiencyGraph.user,
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            },
            credits: {
                enabled: false
            },

            tooltip: {
                formatter: function () {
                    if (this.series.name === "Panel Data") {
                        return `
                        <b>Solar Panel Data</b></br>
                        <b>${this.x}:</b> ${this.y}
                    `;
                    } else {
                        return `
                        <b>${this.series.name}</b></br>
                        <b>${this.x}:</b> ${Highcharts.numberFormat(this.y, 2)}
                    `;
                    }

                }

            },

        })
    }
    React.useEffect(() => {
        window.document.title = "NASA Comparison"
    }, [])

    useEffect(() => {
        makeOption()
    }, [efficiencyGraph])

    // useEffect(() => {
    //     axios.get('http://127.0.0.1:5000/dashboard/compare').then(res => {
    //         setData(res.data.graph)
    //         setBoxData(res.data.box)
    //     })
    // }, [])

    return (
        <div className="dashboard__container" style={{ width: "calc(100vw - 135px)", height: "calc(100vh - 135px)", position: "relative" }}>
            <div className="flex">

                <div className="dashboard__container__box1">
                    <div className="dashboard__container__box__title1 blue-p">
                        Last Day Power
                    </div>
                    {
                        efficiencyBox.lastDay === "-" ?
                            <div className="dashboard__container__box__value1 green-p">
                                <span className="dashboard__container__box__value__unit">
                                    No Data Available
                                </span>
                            </div>
                            :
                            <div className="dashboard__container__box__value1 green-p">
                                {efficiencyBox.lastDay}&nbsp;
                                <span className="dashboard__container__box__value__unit">
                                    Watts
                                </span>
                            </div>
                    }
                </div>
                <div className="dashboard__container__box1" style={{ margin: "0 30px", marginTop: "20px" }}>
                    <div className="dashboard__container__box__title1 blue-p">
                    Efficiency Variance
                    </div>
                    <div className="dashboard__container__box__value1 green-p">
                        {efficiencyBox.efficiency}&nbsp;
                        <span className="dashboard__container__box__value__unit">
                            %
                        </span>
                    </div>
                </div>
                <div className="dashboard__container__box1" style={{ height: "205px" }}>
                    <img src={efficiencyBox.efficiency > 15 ? PanelBad : PanelGood} alt="panel good" className="panel-good"  style={{ height: "70px", marginTop: "60px" }}/>
                </div>
            </div>
            <div className="compare__graph" >
                {efficiencyGraph && <HighchartsReact highcharts={Highcharts} options={options} />}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        efficiencyGraph: state.efficiencyGraph,
        efficiencyBox: state.efficiencyBox
    }
}

export default connect(mapStateToProps)(Compare)
