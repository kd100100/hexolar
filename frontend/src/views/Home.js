import React, {useEffect} from 'react'
import Header from '../components/Home/HomeHeader';
import '../assets/css/Home.css'
import FeasiblityPart from '../components/Home/FeasiblityPart';
import Footer from '../components/Footer';
import Team from '../components/Home/Team';
import { connect } from 'react-redux';
import axios from 'axios';

function Home({ setFutureData, setPastData, setEfficiencyBox, setEfficiencyGraph }) {


    useEffect(() => {
        // axios({
        //     method: 'get',
        //     url: 'http://127.0.0.1:5000/dashboard/futurepast',
        //     params: {
        //         data: {
        //             comp: "future",
        //         }
        //     }
        // })
        //     .then(res => {
        //         console.log(res.data)
        //         setFutureData(res.data);
        //     })
        // axios({
        //     method: 'get',
        //     url: 'http://127.0.0.1:5000/dashboard/futurepast',
        //     params: {
        //         data: {
        //             comp: "both",
        //         }
        //     }
        // })
        //     .then(res => {
        //         console.log(res.data)
        //         setPastData(res.data.past);
        //         setFutureData(res.data.future);
        //     })
        // axios.get('http://127.0.0.1:5000/dashboard/compare').then(res => {
        //     setEfficiencyGraph(res.data.graph)
        //     setEfficiencyBox(res.data.box)
        // })
        window.document.title = "Hexolar"
    }, [])

    return (
        <>
            <Header />
            <FeasiblityPart />
            <Team />
            <Footer />
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setFutureData: (data) => dispatch({
            type: 'SET_FUTURE_DATA',
            data: data
        }),
        setPastData: (data) => dispatch({
            type: 'SET_PAST_DATA',
            data: data
        }),
        setEfficiencyGraph: (data) => dispatch({
            type: 'SET_EFFICIENCY_GRAPH',
            data: data
        }),
        setEfficiencyBox: (data) => dispatch({
            type: 'SET_EFFICIENCY_BOX',
            data: data
        })
    }
}

export default connect(null, mapDispatchToProps)(Home)
