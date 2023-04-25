import React from "react";
import { useState, useContext } from "react";
import "./famous.css";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext.js";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import SubTitle from "../../share/SubTitle/SubTitle";

function Famous() {
  const [destination, setDestination] = useState("");
  const imgArr = [
    "https://vietnamnomad.com/wp-content/uploads/2021/01/Ho-Chi-Minh-City-Travel-Guide-2021-Vietnamnomad.jpg",
    "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/08/hoi-an-quang-nam-vntrip-1.jpg",
    "https://a.cdn-hotels.com/gdcs/production166/d669/8236d066-1b7a-4c8b-a58a-08190a9738db.jpg?impolicy=fcrop&w=800&h=533&q=medium",
    "https://vietnam.travel/sites/default/files/styles/top_banner/public/2017-06/vietnam-travel-5.jpg?itok=XVnHP3ty",
    "https://content.r9cdn.net/rimg/dimg/30/0c/6318617a-city-35982-163ff913019.jpg?crop=true&width=1366&height=768&xhint=2421&yhint=1876",
  ];

  const { dispatch } = useContext(SearchContext);
  const navigate = useNavigate();
  const handleClick = (targetName) => {
    setDestination(targetName);
  };
  useEffect(() => {
    if (destination) {
      dispatch({ type: "NEW_SEARCH", payload: { destination } });
      navigate("/hotels", { state: { destination } });
      // setDestination('')
    }
  }, [destination]);
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const titleArr = ["Ho Chi Minh", "Hoi An", "Ha Noi", "Da Nang", "Vung Tau"];
  const Arrdb = ["hochiminh", "hoian", "hanoi", "danang", "vungtau"];
  return (
    <div className="famous">
      <div className="famousTitle-container">
        <div className="famousTitle" data-aos="fade-up">
          <img
            src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/1555444/beach-umbrella-clipart-xl.png"
            alt=""
          />
          <span>Favorite </span>
          <span className="desText">Destination</span>
        </div>
        <div className="famousText" data-aos="fade-left">
          <span>The hottest place recommended by Booking</span>
        </div>
        <div className="textFamous-lastTitle">
          <span className="lastText">
            Traveling opens the door to creating  
             <SubTitle subTitle={' memories'}/>
          </span>

          <span className="lastTextt">
            Book now 
            to enjoy great moments
            Sign in to get extra 15% off hotel booking
          </span>
        </div>
      </div>
      <div className="famous-item">
        {/* <div
          className="newFamous-item"
          onClick={() => {
            handleClick(Arrdb[0]);
          }}
        >
          <h2 className="itemTitle">{titleArr[0]}</h2>
          <img src={imgArr[0]} alt="" />
        </div> */}
        <div
          className="newFamous-item"
          onClick={() => {
            handleClick(Arrdb[1]);
          }}
        >
          <h2 className="itemTitle">{titleArr[1]}</h2>
          <img src={imgArr[1]} alt="" />
        </div>
        {/* <div
          className="newFamous-item"
          onClick={() => {
            handleClick(Arrdb[2]);
          }}
        >
          <h2 className="itemTitle">{titleArr[2]}</h2>
          <img src={imgArr[2]} alt="" />
        </div>{" "} */}
        <div
          className="newFamous-item mt-3"
          onClick={() => {
            handleClick(Arrdb[3]);
          }}
        >
          <h2 className="itemTitle">{titleArr[3]}</h2>
          <img src={imgArr[3]} alt="" />
        </div>{" "}
        <div
          className="newFamous-item mt-5"
          onClick={() => {
            handleClick(Arrdb[4]);
          }}
        >
          <h2 className="itemTitle">{titleArr[4]}</h2>
          <img src={imgArr[4]} alt="" />
        </div>
      </div>

      {/* <div className="famous-item famous-line1" data-aos="fade-up">
        <div
          onClick={() => {
            handleClick(Arrdb[0]);
          }}
          className="famous-line1-item "
        >
          <h2
            className="famous-line1-item-first famous-img"
            style={{ "background-image": `url(${imgArr[0]})` }}
          >
            <p className="fmgray-bg">{titleArr[0]}</p>
          </h2>
        </div>
        <div
          onClick={() => {
            handleClick(Arrdb[1]);
          }}
          className="famous-line1-item"
        >
          <h2
            className="famous-line1-item-second famous-img"
            style={{ "background-image": `url(${imgArr[1]})` }}
          >
            <p className="fmgray-bg">{titleArr[1]}</p>
          </h2>
        </div>
      </div>
      <div className="famous-item famous-line2" data-aos="fade-up">
        <div
          onClick={() => {
            handleClick(Arrdb[2]);
          }}
          className="famous-line2-item"
        >
          <h2
            className="famous-line2-item-first famous-img"
            style={{ "background-image": `url(${imgArr[2]})` }}
          >
            <p className="fmgray-bg">{titleArr[2]}</p>
          </h2>
        </div>
        <div
          onClick={() => {
            handleClick(Arrdb[3]);
          }}
          className="famous-line2-item"
        >
          <h2
            className="famous-line2-item-second famous-img"
            style={{ "background-image": `url(${imgArr[3]})` }}
          >
            <p className="fmgray-bg">{titleArr[3]}</p>
          </h2>
        </div>
        <div
          onClick={() => {
            handleClick(Arrdb[4]);
          }}
          className="famous-line2-item"
        >
          <h2
            className="famous-line2-item-third famous-img"
            style={{ "background-image": `url(${imgArr[4]})` }}
          >
            <p className="fmgray-bg">{titleArr[4]}</p>
          </h2>
        </div>
      </div> */}
    </div>
  );
}

export default Famous;
