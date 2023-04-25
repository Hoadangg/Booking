import { useState } from "react";
import "./footer.css";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const toRotate = ["Truong Quang Phuc"];
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [text, setText] = useState("");
  const period = 1000;
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
  return (
    <>
      <div className="footer">
        <div className="footer-wrapper">
          <div className="footer-school">
            {/* <h5 className="footer-school-name">University of Technology and Education</h5>
            
            <img className="footer-img" src="https://dongphucvina.vn/wp-content/uploads/2022/09/Logo-DH-Su-Pham-Ky-Thuat-TP-Ho-Chi-Minh-HCMUTE-623x800.webp" alt="" /> */}

            <img
              src="https://khaosat.hcmute.edu.vn/assets/img/login-banner.png"
              alt="hcmute logo"
            />

            <h3 className="topicTitle" data-aos= "fade-up">
              Topic: Web design for booking using MERN Stack
            </h3>
          </div>
          <div className="devider"></div>
          <div className="footer-sv">
            <div className="gvhd" data-aos= "fade-down">GVHD: {text}</div>

            <div className="sv-info">
              <div className="sv1_info sv" data-aos= "fade-right">
                <h3>Nguyen The Dung</h3>
                <ul>
                  <li>
                    <small>MSV: 19119161</small>{" "}
                  </li>
                  <li>
                    <small>Phone: 0378071717</small>
                  </li>
                  <li>
                    <small>Email: 19119161@student.hcmute.edu.vn</small>
                  </li>
                </ul>
              </div>
              <div className="sv2_info sv" data-aos= "fade-left">
                <h3>Dang Thi Huynh Hoa</h3>
                <ul>
                  <li>
                    <small>MSV: 19119178</small>{" "}
                  </li>
                  <li>
                    <small>Phone: 0352241881</small>
                  </li>
                  <li>
                    <small>Email: 19119178@student.hcmute.edu.vn</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
