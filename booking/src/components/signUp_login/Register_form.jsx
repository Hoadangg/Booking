import React from 'react'
import { useState,useRef,useContext } from 'react';
import "./register_form.css"
//import useFetch from "../../hooks/useFetch";
//import { func } from 'prop-types';
import UserContext from '../../globalState.js';
import axios from 'axios'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { faArrowLeftRotate } from '@fortawesome/free-solid-svg-icons';

export default function Register() {
    const [email,setEmail] = useState("");
    const checkEmpty = useRef(null)
    const [resData,setResData] = useState("");
    const {modal, setModal} = useContext(UserContext)
    const [verify,setVerify] = useState(false);

    const navigate = useNavigate();
    async function handleSubmit(e){
        
        e.preventDefault();
        if(checkEmpty.current.value === ''){
            return alert("Please enter your email")
        }
        const data = { email: email }
        setModal(!modal);
        try {
            const res = await axios.post('http://localhost:8800/api/auth/sendMail', data)
            setResData(res.data)
            setEmail("")
            console.log(resData)
        } catch (e) {
            alert(e)
        }
        
    }
// useEffect(
//     ()=>{
//         if(resData === email){
//             setVerify(true)
//             navigate("/register", {email: email,verified:verify})
//         }


//     },[resData])
        

    
    
  return (
    <div className='regModal'>
        <div className="regForm">
        <h2 className='regFormText'>Sign in or create an account</h2>
        <form className="regForm_input" onSubmit={handleSubmit}>
            <label htmlFor="regEmail">Email address</label>
            <input ref={checkEmpty} className='emailInput' type="text" onChange={(e)=>{setEmail(e.target.value)}}/>
            <button onClick={handleSubmit} className='regBtn'>Continue with Email</button>
        </form>
        <div className="social-divider">
            <hr className="social social-divider-line"/>
                <span className="social-divider-text">or use one of these options</span>
            <hr className="social social-divider-line"/>

        </div>
        <div className="social_link">
        <div className='gg_link'>
            <svg viewBox="0 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" aria-hidden="true" focusable="false" width="24" height="24" role="img">
                <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"></path>
                <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"></path>
                <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"></path>
                <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"></path>
            </svg>

        </div>
        <div className="phone_link">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="24" height="24" role="img">
            <path d="M14.25 15.75v4.768a1.982 1.982 0 0 1-1.982 1.982H5.732a1.982 1.982 0 0 1-1.983-1.981V4.983A1.985 1.985 0 0 1 5.733 3H7.5a.75.75 0 0 0 0-1.5H5.733A3.483 3.483 0 0 0 2.25 4.983v15.536A3.482 3.482 0 0 0 5.733 24h6.535a3.482 3.482 0 0 0 3.482-3.482V15.75a.75.75 0 0 0-1.5 0zM3 19.5h12a.75.75 0 0 0 0-1.5H3a.75.75 0 0 0 0 1.5zM20.25 6.75a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0zm1.5 0a6.75 6.75 0 1 0-13.5 0 6.75 6.75 0 0 0 13.5 0zm-4.676-2.194l-2.9 3.873h-.002l-1.499-1.5a.75.75 0 1 0-1.06 1.061l1.5 1.5a1.502 1.502 0 0 0 2.26-.16l2.901-3.874a.75.75 0 0 0-1.2-.9z"></path>
        </svg>
        </div>
        </div>


        </div>
    </div>
  )
}
