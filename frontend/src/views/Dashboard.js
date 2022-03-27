import React from 'react'
import "../assets/css/Dashboard.css"
import LeftNav from '../components/Dashboard/LeftNav';
import TopBar from './../components/Dashboard/TopBar';
import Battery from './../components/Dashboard/Battery';
import PastFuture from '../components/Dashboard/PastFuture';
import Tilt from './../components/Dashboard/Tilt';
import Compare from './../components/Dashboard/Compare';
import Grid from './../components/Dashboard/Grid';
import Diagnose from './../components/Dashboard/Diagnose';
import { connect } from 'react-redux';
import Temperature from './../components/Dashboard/Temperature';
import Main from './../components/Dashboard/Main';
import Weather from '../components/Dashboard/Weather';

function Dashboard({ comp, user }) {

    if (user) {
        return (
            <div className="dashboard">
                <TopBar />
                <LeftNav comp={comp} />
                <div className="dashboard__content">
                    {comp === "general" && <Main/>}
                    {comp === "temp" && <Temperature/>}
                    {comp === "battery" && <Battery/>}
                    {comp === "tilt" && <Tilt/>}
                    {comp === "compare" && <Compare/>}
                    {comp === "grid" && <Grid/>}
                    {comp === "diagnose" && <Diagnose/>}
                    {comp === "wea" && <Weather/>}
                    {(comp === "future" || comp === "past") && <PastFuture comp={comp} />}
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                You are not logged in
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Dashboard)
