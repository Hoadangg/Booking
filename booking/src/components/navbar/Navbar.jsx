import "./navbar.css";
import { useContext, createContext } from "react";
import { useState } from "react";
import UserContext from "../../globalState.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
 
const Navbar = ({ type, register, login }) => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const toRotate = ["Booking"];
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [text, setText] = useState("");
  const period = 2000;
  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);
    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updateText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);
    setText(updateText);
    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }
    if (!isDeleting && updateText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updateText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  const { modal, setModal } = useContext(UserContext);
  const { user } = useContext(AuthContext);
  const toggleModal = () => {
    setModal(!modal);
  };

  const { dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    // try {
    //   const res = await axios.post("http://localhost:8800/api/auth/login", credentials);
    //   dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
    //   navigate("/")
    // } catch (err) {
    //   dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    // }
  };
  return (
    <div className={type === "list" ? "Navbar nav-listMode" : "Navbar"}>
      <div className="navContainer">
        <Link to="/" className="logo-wrapper">
          <span className="logo" data-aos= "fade-down">{text}</span>
          {/* <img
            className="img-logo"
            src="https://cdn-icons-png.flaticon.com/512/6348/6348608.png"
            alt=""
          /> */}
        </Link>

        <div>
          {user ? (
            user.username
          ) : (
            <div className="navItems" data-aos= "fade-left">
              <button
                onClick={toggleModal}
                className={
                  register === "register"
                    ? "navButton nav-registerMode"
                    : "navButton"
                }
              >
                <b>Register</b>{" "}
              </button>
              <Link to="/login">
                <button
                  className={
                    login === "login" ? "navButton nav-loginMode" : "navButton"
                  }
                >
                  {" "}
                  <b>Login</b>
                </button>
              </Link>
            </div>
          )}
          {user && (
            <button onClick={handleClick} className="navButton">
              <b>Log out</b>
              <img
                className="logout-icon"
                src="https://img.freepik.com/free-icon/logout_318-385171.jpg"
                alt=""
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
