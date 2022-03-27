import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import G from '../assets/images/Login/g.svg'
import '../assets/css/LoginSignup.css'
import { auth } from "../firebase"
import firebase from 'firebase';
function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    
    const gofire = () =>{
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            console.log(result)
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;
    
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user, token)
            history.push('/dashboard')
            // ...
        })
        .catch((error) => {
           console.log(error); 
        });
    }

    const loginCheck = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
        .then(auth => {
            history.push('/')
        })
        .catch(error => alert(error.message))
    }

    React.useEffect(() => {
        window.document.title = "Login"
    }, [])

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
                            Login
                        </div>
                        <div className="loginSignup__form__subtitle green-p">
                            Solar Power Your Home Now!
                        </div>
                        <div className="loginSignup__form__google" onClick={gofire}>
                            <img src={G} alt="google" />
                            Login with Google
                        </div>
                        <div className="loginSignup__form__or green-p">
                            or use your email
                        </div>
                        <input type="text" placeholder="Enter your Email" className="loginSignup__form__input" value={email} onChange={e => setEmail(e.target.value)}/>
                        <input type="password" placeholder="Enter your Password" className="loginSignup__form__input" value={password} onChange={e => setPassword(e.target.value)}/>
                        <div className="loginSignup__form__button green-p-bg white" onClick={loginCheck}>
                            Login into your account
                        </div>
                        <div className="loginSignup__form__noAcc green-p">
                            Don't have an account? <span className="loginSignup__form__noAcc__link" onClick={() => document.getElementById("loginSignup__cta").click()}>Sign Up</span>
                        </div>
                    </div>
                </div>
            </div>
            <Link to="/signup">
                <button style={{ display: 'none' }} id="loginSignup__cta" />
            </Link>
        </div>
    )
}

export default Login
