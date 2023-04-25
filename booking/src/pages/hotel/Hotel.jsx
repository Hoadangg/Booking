import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import App_showRoom from "../../components/showRoom/App_showRoom.js";
import UserContext from "../../globalState.js";
import Modal from "../../components/modal/modal.jsx";
import Slider_Appp from "./Slider_App.jsx";
import Review from "./component/review.jsx";

// import App_showRoom from "../../components/showRoom/App_showRoom.js";

const Hotel = () => {
  const { modal } = useContext(UserContext);
  const { dates, options } = useContext(SearchContext);

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/hotels/find/${id}`
  );
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(dates);
  // console.log(data.review[0])
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber =
        slideNumber === 1 ? data.photos.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber =
        slideNumber === data.photos.length - 1 ? 1 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };
  const handleSubmit = () =>{
    
  }

  const content = [
    {
      img: "https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2016/12/21/1482301285653-0a04df7d3f807b32484ceec10d9681c6.png",
      text: "Air conditioning",
    },
    {
      img: "https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2017/06/07/1496833772013-929572dff57d1755878aa79dc46e6be5.png",
      text: "Swimming pool,",
    },
    {
      img: "https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2016/12/21/1482301381776-c014a3111a6de5236d903c93b7647e4c.png",
      text: "24-hour front desk",
    },
    {
      img: "https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2017/06/07/1496833756238-56e24fb64a964d38b8f393bf093a77a9.png",
      text: "Parking",
    },
    {
      img: "https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2017/06/07/1496833833458-7b6ab67bc5df6ef9f2caee150aae1f43.png",
      text: "WiFi",
    },
    {
      img: "https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2017/06/07/1496833714411-48c9b7565018d02dc32837738df1c917.png",
      text: "Elevator",
    },
  ];

  return (
    <div className="hotel-page" style={{ "overflow-x": "hidden" }}>
      <Navbar type="list" />
      {console.log(data)}
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            {/* <button className="bookNow">Reserve or Book Now!</button> */}
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddresContainer">
              <div className="hotelAddress">
                <img
                  src="https://uxwing.com/wp-content/themes/uxwing/download/location-travel-map/address-icon.png"
                  alt=""
                />
                <span>{data.address}</span>
              </div>
              <span className="freeChildren">Free of charge for children</span>
            </div>

            <span className="hotelDistance">
              Excellent location – {data.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>

            <div className="hotelImages-container">
              <div className="hotelImages">
                <div className="hotelImages-demo">
                  {/* {data.photos?.slice(1, 2)?.map((photo) => (
                    <div className="hotelImgWrapper">
                      <img src={photo} alt="" className="hotelImg" />
                    </div>
                  ))} */}

                  <Slider_Appp />

                  {/* {data.photos?.slice(1,data.photos.length)?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i+1)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))} */}

                  <div className="utilities">
                    <div className="utilitiesTitle">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/5969/5969490.png"
                        alt=""
                      />

                      <span>Convenient</span>
                    </div>
                    <ul className="utilities-Content">
                      {content.map((item) => (
                        <li className="content-item">
                          <img src={item.img} alt="" />
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="review">
                    <div className="reviewTop">
                      <h2>Rating ( 3 ratings) </h2>
                      <span>Overall rating</span>
                    </div>
                    <div className="reviewBox">
                      <div className="reviewBox-top">
                        <h1 className="mark">10</h1>
                        <span className="text flex">
                          Excellent
                          <img
                            className="imageStar"
                            src="https://img.icons8.com/fluency/512/star.png"
                            alt=""
                          />
                        </span>
                      </div>
                      <div className="reviewBox-mid">
                        <div className="userInfor">
                          <img
                            className="userAvt"
                            src="https://www.musicmundial.com/en/wp-content/uploads/2022/07/BLACKPINKs-Jennie-saves-a-store-from-bankruptcy-just-by-posting-it-on-Instagram.jpg"
                            alt="user avatar"
                          />
                        </div>
                        <div className="userComment">
                          <input
                            type="text"
                            className="contentt"
                            placeholder="Write your comment"
                          />
                          <button className="userComment-submit">Submit</button>
                        </div>
                      </div>
                      <div className="reviewBox-bot">
                        <div className="reviewTitle">
                          <span>All comments</span>
                        </div>

                        <Review review={data.review} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hotelBox">
                <div className="boxTop">
                  <div className="boxTop-left">
                    <img
                      src="https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/best-price-icon.png"
                      alt=""
                    />
                    <span className="price">{data.cheapestPrice} 000 VND</span>
                    <span>/per day</span>
                  </div>
                  <div className="boxTop-right"></div>
                </div>
                <div className="boxMid">
                  <h3>Information</h3>
                  <div className="midInfo flex">
                    <input type="text" id="name" placeholder="Full name" />
                    <label htmlFor="name"></label>
                    <input type="number" id="phone" placeholder="Phone" />
                    <label htmlFor="phone"></label>
                    <input type="date" id="date" />
                    <label htmlFor="date"></label>
                  </div>
                </div>
                <div className="boxBot">
                  <div className="botPrice flexx">
                    <div className="botPrice-left">
                      ${data.cheapestPrice} x day
                    </div>
                    <div className="botPrice-right">${data.cheapestPrice}</div>
                  </div>
                  <div className="botService flexx">
                    <div className="botService-left">Serice Change</div>
                    <div className="botService-right">$10</div>
                  </div>
                  <div className="botTotal flexx">
                    <div className="botTotal-left">Total</div>
                    <div className="botTotal-right">$110</div>
                  </div>
                </div>
                <button className="boxbtn">Book Now</button>
              </div>
            </div>

            {/* <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * options.room}</b> ({days}{" "}
                  nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div> */}
            {/* <App_showRoom hotelId={id} /> */}
          </div>
          <MailList />
          <div style={{ margin: "15px 0" }}></div>

          <Footer />
          <marquee className="floating-text">
            <img
              style={{ width: "40px", height: "40px" }}
              src="https://cdn.123job.vn/123job/uploads/2021/04/02/2021_04_02______54181f0453a11f33299f4bae14c12353.jpg"
              alt=""
            />

            <span style={{ fontSize: "20px", "margin-left": "30px" }}>
              University of Technology and Education{" "}
            </span>
            <span style={{ "margin-left": "60px", fontSize: "20px" }}>
              Đồ án 2:Website đạt phòng khách sạn
            </span>
            <span style={{ "margin-left": "60px", fontSize: "20px" }}>
              GVHD:Trương Quang Phúc
            </span>
          </marquee>
        </div>
      )}

      {/* {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>} */}
      {modal && <Modal />}
    </div>
  );
};

export default Hotel;
