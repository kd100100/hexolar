import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../assets/css/LoginSignup.css'
import { auth } from "../firebase"
import firebase from 'firebase';

function Signup() {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');


    const updateDet= (e) =>{
        console.log('updating')
        var user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name,
            photoURL: 'https://ui-avatars.com/api/?name='+name+'&background=090909&color=fff&font-size=0.33'
        }).then(function() {
            console.log('pushing')
            history.push('/addpanel')
        }).catch(function(error) {
            alert(error)
        })
    }
    React.useEffect(() => {
        window.document.title = "Signup"
    }, [])

    const signupCheck = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            console.log(auth);
            if (auth){
                updateDet()
                // history.push('/')
            }
        })
        .catch(error => alert(error.message))
    }

    return (
        <div className="loginSignup">
            <div className="row" style={{ position: "relative", padding: "0", margin: "0" }}>
                <div className="col-md-8" style={{ position: "relative", padding: "0" }}>
                    {/* <img src={BG} alt="background" className="loginSignup__img" /> */}
                    <div className="loginSignup__img" />
                </div>
                <div className="col-md-4" style={{ position: "relative", padding: "0" }}>
                    <div className="loginSignup__form">
                        <div className="loginSignup__form__title blue-p" onClick={() => document.getElementById("loginSignup__cta2").click()}>
                            Signup
                        </div>
                        <div className="loginSignup__form__subtitle green-p">
                            Solar Power Your Home Now!
                        </div>
                        <input type="text" placeholder="Enter your Name" className="loginSignup__form__input" style={{ marginTop: "5vh" }} value={name} onChange={e => setName(e.target.value)}/>
                        <input type="text" placeholder="Enter your Email" className="loginSignup__form__input" value={email} onChange={e => setEmail(e.target.value)}/>
                        <input type="password" placeholder="Enter your Password" className="loginSignup__form__input" value={password} onChange={e => setPassword(e.target.value)}/>
                        <div className="loginSignup__form__button green-p-bg white" onClick={signupCheck}>
                            Create your account
                        </div>
                        <div className="loginSignup__form__noAcc green-p">
                            Already have an account? <span className="loginSignup__form__noAcc__link" onClick={() => document.getElementById("loginSignup__cta").click()}>Login</span>
                        </div>
                    </div>
                </div>
            </div>
            <Link to="/login">
                <button style={{ display: 'none' }} id="loginSignup__cta" />
            </Link>
            <Link to="/">
                <button style={{ display: 'none' }} id="loginSignup__cta2" />
            </Link>
        </div>
    )
}

export default Signup
