import axios from "axios";
import { useState } from "react";
import "./register.css";
import { useSearchParams } from "react-router-dom";
import FormInput from "../../components/formInput/FormInput.jsx";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [values, setValues] = useState({  
    username: "",
    password: "",
    phone:"",
    country:"",
    city:"",
    token,
  });
  const navigate = useNavigate()
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    // {
    //   id: 2,
    //   name: "email",
    //   type: "email",
    //   placeholder: "Email",
    //   errorMessage: "It should be a valid email address!",
    //   label: "Email",
    //   required: true,
    // },
    {
      id:2,
      name:"phone",
      type:"tel",
      placeholder:"Number",
      label: "Phone",
      retuired:true
    },
    // {
    //   id: 4,
    //   name: "birthday",
    //   type: "date",
    //   placeholder: "Birthday",
    //   label: "Birthday",
    // },
    {
      id:3,
      name:"country",
      type:"country",
      placeholder:"Your Country",
      label: "Country",
      retuired:true
    },
    {
      id:4,
      name:"city",
      type:"city",
      placeholder:"Your City",
      label: "City",
      retuired:true
    },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 6,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
      axios.post("http://localhost:8800/api/auth/register", values ,{withCredentials:true})
        .then((res) => {
            navigate("/login")
            alert(res.data);
            
        })
        .catch((error) => {
          alert("Đăng ký không thành công")
        });
    }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
    <Navbar type="list" register="register"/>
    <div className="register-app">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className="register-text">Register</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className="register-submit">Submit</button>
      </form>
    </div>
  </>
  );
};

export default Register;
