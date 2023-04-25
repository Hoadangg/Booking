import "./mailList.css"
import axios from "axios";
import { useState,useRef } from "react";
import validator from 'validator'
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";


const MailList = () => {
  
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const [mail,setMail] = useState("")
  const inputRef = useRef(null)
  console.log(mail)
  const [emailError, setEmailError] = useState('')
  const validateEmail = (e) => {
    var email = e.target.value
  
    if (validator.isEmail(email)) {
      setEmailError('Valid Email :)')
    } else {
      setEmailError('Enter valid Email!')
    }
  }



  const sendMail = ()=>{
    if(inputRef.current.value === "")
    {
        return alert("Please enter your mail to proceed !")
    }
    if(emailError !== "Valid Email :)")
    {
      return alert("It's should be valid email address")
    }
    else{
        axios.post("http://localhost:8800/get-email",{email:mail},{withCredentials:true})
        .then((res)=>{
            inputRef.current.value = "";
            inputRef.current.focus();
    
            alert("Successful!")
        })
        .catch((err)=>{
          alert(err)
        })

    }
  }

  

  
  return (
    <div className="mail"data-aos= "fade-down">
      <h1 className="mailTitle">Save time, save money!</h1>
      <span className="mailDesc" >Sign up and we'll send the best deals to you</span>
      <div className="mailInputContainer">
        <input ref={inputRef} type="text" placeholder="Your Email" onChange={(e)=>{validateEmail(e);setMail(e.target.value)}} />
        <button onClick={sendMail}>
          <img src="https://cdn-icons-png.flaticon.com/512/858/858933.png" alt="" />
          Subscribe</button>
      </div>
      {  <span style={{
          fontWeight: 'bold',
          color: 'white',
        }}>{emailError}</span>}
    </div>
  )
}

export default MailList