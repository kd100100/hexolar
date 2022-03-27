import React, { useState, useEffect } from 'react'
import MainHeader from './../../components/common/MainHeader';
import Success from "../../assets/images/Feasibility/success.svg"
import Fail from "../../assets/images/Feasibility/fail.svg"
import { connect } from 'react-redux';

function Result({ data }) {

    // const [result, setResult] = useState({
    //     "status": "high",
    //     "amount": "7329.2",
    //     "line1": "Wow!! You have the capacity",
    //     "line2": "to give a thundershock",
    //     "line3": "stronger than Pikachu!"
    // });
    // const [result, setResult] = useState({
    //     "status": "medium",
    //     "amount": "7329.2",
    //     "line1": "Bingo, you can play GTA V for an",
    //     "line2": "entire year with the power you",
    //     "line3": "will be generating for 3 months."
    // });
    // const [result, setResult] = useState({
    //     "status": "low",
    //     "amount": "7329.2",
    //     "line1": "Oops, you have only enough",
    //     "line2": "sunshine over your rooftop to",
    //     "line3": "light a bulb for 1 year."
    // });

    // useEffect(() => {
    //     if (data) {
    //         setResult(data);
    //     }
    // }, [data]);
    React.useEffect(() => {
        window.document.title = "Check Feasiblity"
    }, [])

    return (
        <div>
            <MainHeader tab="feasibility" />
            <div className="fesResult">
                <img src={data && data.status === "fail" ? Fail : Success} alt="resukt" className="feaResult__image" />
                <div className="feaResult__content blue-p">
                    {data && data.line1}<br/>
                    {data && data.line2}<br/>
                    {data && data.line3}
                </div>
                <div className="feaResult__content blue-p">
                    It is {
                        data && data.status === "fail" ?
                            "Not "
                            : (
                                data && data.status === "medium" ?
                                    ""
                                    : "Highly "
                            )
                    }Feasible!
                </div>
                <div className="feaResult__amount" style={data && data.status === "fail" ? {color: "#F24E1E"} : {color: "#0FA958"}}>
                    <span className="feaResult__amount__value">
                        ~{data && data.amount}
                    </span>
                    <span className="feaResult__amount__unit">
                        &nbsp;K.Watts/year
                    </span>
                </div>
                <div className="feaResult__subline blue-p">
                    for a Solar Panel of 4 K.Watts
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        data: state.feaData
    }
}

export default connect(mapStateToProps)(Result);
