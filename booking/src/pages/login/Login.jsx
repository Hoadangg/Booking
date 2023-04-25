import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import "./login.css";
import FormInput from "../../components/formInput/FormInput.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
   const inputs =[
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "User name",
      // errorMessage: "It should be a valid email address!",
      label: "UserName",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      // errorMessage:
        // "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    }
   ]

  

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
    
      const res = await axios.post("http://localhost:8800/api/auth/login", credentials,{ withCredentials: true });
      dispatch({ type: "LOGIN_SUCCESS", payload: {...res.data}});
     // console.log(res.data)
      if(res.data.isAdmin){ 

        navigate("/admin")
      }
      else {
        navigate("/")
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  

  return (
    <div className="login">
      <Navbar type="list" login="login" register="register"/>
     
       <div className="login-app">
       <div className="loginTitle">
       <img src="https://png.pngtree.com/png-clipart/20220705/ourmid/pngtree-blink-bling-stars-cartoon-png-image_5683010.png" alt="" />
        Welcome to Booking
        <img src="https://png.pngtree.com/png-clipart/20220705/ourmid/pngtree-blink-bling-stars-cartoon-png-image_5683010.png" alt="" />
      </div>
      <form className="login-form" onSubmit={handleClick}>
        <h1 className="login-text">Login</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={credentials[input.name]}
            onChange={handleChange}
          />
        ))}
        <button className="login-submit">Login</button>
      </form>
    </div>
        {error && <span>{error.message}</span>}
    </div>
  );
};

export default Login;
