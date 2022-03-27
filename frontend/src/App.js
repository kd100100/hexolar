import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Features from "./views/Features";
import Dashboard from "./views/Dashboard";
import "./assets/css/common.css";
import Feasibility from "./views/Feasibility/Feasibility";
import FeasibilityResult from "./views/Feasibility/Result";
import GetLoc from "./views/AddPanel";
import { auth } from "./firebase";
import { connect } from "react-redux";
import SuggestAngle from './views/SuggestAngle';

function App({ setUser }) {
    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            console.log("THE USER IS >>> ", authUser);

            if (authUser) {
                setUser(authUser);
                console.log("yes");
            } else {
                setUser(null);
                console.log("no");
            }
        });
    }, []);

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/feasibility" component={Feasibility} />
                    <Route
                        exact
                        path="/feasibility/result"
                        component={FeasibilityResult}
                    />
                    <Route path="/features" component={Features} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route exact path="/dashboard">
                        <Dashboard comp={"general"} />
                    </Route>
                    <Route exact path="/dashboard/battery">
                        <Dashboard comp={"battery"} />
                    </Route>
                    <Route exact path="/addpanel" component={GetLoc} />
                    <Route
                        exact
                        path="/suggest-angle"
                        component={SuggestAngle}
                    />

                    <Route exact path="/dashboard/temp">
                        <Dashboard comp={"temp"} />
                    </Route>
                    <Route exact path="/dashboard/future">
                        <Dashboard comp={"future"} />
                    </Route>
                    <Route exact path="/dashboard/past">
                        <Dashboard comp={"past"} />
                    </Route>
                    <Route exact path="/dashboard/tilt">
                        <Dashboard comp={"tilt"} />
                    </Route>
                    <Route exact path="/dashboard/compare">
                        <Dashboard comp={"compare"} />
                    </Route>
                    <Route exact path="/dashboard/grid">
                        <Dashboard comp={"grid"} />
                    </Route>
                    <Route exact path="/dashboard/diagnose">
                        <Dashboard comp={"diagnose"} />
                    </Route>
                    <Route exact path="/dashboard/weather">
                        <Dashboard comp={"wea"} />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (data) =>
            dispatch({
                type: "SET_USER",
                user: data,
            }),
    };
};

export default connect(null, mapDispatchToProps)(App);
