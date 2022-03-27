import React, { useEffect } from 'react'
import Edit from "../../assets/images/Dashboard/Edit.svg"
import Close from "../../assets/images/Close.svg"
import axios from 'axios'

function Grid() {

    const [edit, setEdit] = React.useState(false)

    const [gridType, setgridType] = React.useState("Hybrid Grid")

    const getGridPage = () => {
        axios.get('http://127.0.0.1:5000/dashboard/grid')
            .then(res => {
                setgridType(res.data.gridType)
            })
            .catch(err => {
                console.log(err)
            })
    }
    React.useEffect(() => {
        window.document.title = "Grid Selection"
    }, [])

    const postGridPage = () => {
        setEdit(false)
        if (gridType === "Hybrid Grid") {
            axios.get("http://blynk-cloud.com/z3_Q8YX1D4lvXcWnE-_HxGlLWnP_KDgu/update/D18?value=1")
            axios.get("http://blynk-cloud.com/z3_Q8YX1D4lvXcWnE-_HxGlLWnP_KDgu/update/D19?value=1")
        }
        else if (gridType === "On Grid") {
            axios.get("http://blynk-cloud.com/z3_Q8YX1D4lvXcWnE-_HxGlLWnP_KDgu/update/D18?value=1")
            axios.get("http://blynk-cloud.com/z3_Q8YX1D4lvXcWnE-_HxGlLWnP_KDgu/update/D19?value=0")
        }
        else if (gridType === "Off Grid") {
            axios.get("http://blynk-cloud.com/z3_Q8YX1D4lvXcWnE-_HxGlLWnP_KDgu/update/D18?value=0")
            axios.get("http://blynk-cloud.com/z3_Q8YX1D4lvXcWnE-_HxGlLWnP_KDgu/update/D19?value=1")
        }
        var date = new Date();
        var dateTime = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
        axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/dashboard/logs',
            params: {
                data: {
                    datte: dateTime,
                    message: `Grid type changed to ${gridType}`,
                }
            }
        })
            .then(res => {
                axios({
                    method: 'post',
                    url: 'http://127.0.0.1:5000/dashboard/grid',
                    params: {
                        data: {
                            gridType: gridType
                        }
                    }
                })
                    .then(res => {
                        console.log(res.data)
                    })

            })

        
    }

    useEffect(() => {
        getGridPage()
    }, [])

    return (
        <>
            {edit && (
                <div className="popup__bg">
                    <div className="popup__box">
                        <img src={Close} alt="close" className="close" onClick={() => setEdit(false)} />
                        <div className="dashboard__container__title green-p">
                            Edit Grid Selection
                        </div>
                        <div className="popup__form">
                            <label className="battery__details__form__label">
                                Grid Type:
                            </label>
                            <select className="battery__details__form__input" value={gridType} onChange={(e) => { setgridType(e.target.value) }}>
                                <option>On Grid</option>
                                <option>Hybrid Grid</option>
                                <option>Off Grid</option>
                            </select>
                        </div>
                        <button className="battery__details__form__button popup__button green-p-bg" onClick={postGridPage}>
                            Save Changes
                        </button>
                    </div>
                </div>
            )}
            <div className="dashboard__container" style={{ width: "50%", margin: "0 auto" }}>
                <div className="dashboard__container__title blue-p">
                    Grid Selection
                </div>
                <div className="battery__subtitle green-p" style={{ marginTop: "20px" }}>
                    {gridType} is selected
                    <img src={Edit} alt="edit" className="battery__subtitle__edit" onClick={() => setEdit(true)} />
                </div>
                <div className="grid__text">
                    {
                        gridType === "On Grid" ? (
                            "On-grid means your solar system is tied to your local utility's GRID, whatever you make will be sent to the GRID"
                        ) : gridType === "Hybrid Grid" ? (
                            "Hybrid Grid means your solar system is tied to your local utility's GRID, but you can also make your own electricity. Most Common!"
                        ) : (
                            "Off Grid means your solar system is not tied to your local utility's GRID, and you can make your own electricity."
                        )
                    }
                </div>
            </div>
            <div className="dashboard__container" style={{ width: "50%", margin: "0 auto", marginTop: "20px" }}>
                <div className="dashboard__container__title blue-p">
                    Panel Power Distribution
                </div>
                <div className="flex" style={{ margin: "20px 0" }}>
                    <div className="dashboard__container__box2">
                        <div className="dashboard__container__box__title1 blue-p">
                            Battery
                        </div>
                        <div className="dashboard__container__box__value1 green-p">
                            {
                                gridType === "On Grid" ? (
                                    "0.0"
                                ) : (
                                    gridType === "Hybrid Grid" ? (
                                        "1.2"
                                    ) : (
                                        "2.4"
                                    )
                                )
                            }
                            &nbsp;
                            <span className="dashboard__container__box__value__unit">
                                Watts
                            </span>
                        </div>
                    </div>
                    <div className="dashboard__container__box2" style={{ marginLeft: "30px" }}>
                        <div className="dashboard__container__box__title1 blue-p">
                            Electricity Grid
                        </div>
                        <div className="dashboard__container__box__value1 green-p">
                            {
                                gridType === "On Grid" ? (
                                    "2.4"
                                ) : (
                                    gridType === "Hybrid Grid" ? (
                                        "1.2"
                                    ) : (
                                        "0.0"
                                    )
                                )
                            }
                            &nbsp;
                            <span className="dashboard__container__box__value__unit">
                                Watts
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Grid
