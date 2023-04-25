import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./tours.css";
import Slider_Appp from "./Slider_App_Tour";
import Highlight from "../../share/Highlight/Highlight";
import Schedule from "../../share/Highlight/Schedule";
import adventure from "../../assets/adventure.png";
import departureImg from "../../assets/departure.png";
import destinationImg from "../../assets/destination.png";
import backintime from "../../assets/back-in-time.png";
import carImg from "../../assets/car.png";
import includeImg from "../../assets/right-arrow.png";
import Review from "../../share/Review/Review";
import cursor from "../../assets/cursor.png";

const Tours = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/tours/${id}`
  );
  console.log(data);

  const includeData = [
    { text: "4* hotel (2 guests/room)" },
    { text: "Tickets to visit the points in the program" },
    {
      text: "Enthusiastic and attentive tour guide, narrating throughout the route",
    },
    { text: "Package insurance 50,000,000 VND/case" },
    { text: "Eating meals program" },
    { text: " Mineral water 01 bottle/person/day" },
  ];

  return (
    <>
      <Navbar type="list" />
      <Header type="list" />
      <div className="tours">
        <div className="tours-container d-flex mt-3">
          <div className="toursPhoto">
            <Slider_Appp />
            <div className="toursPhoto-item d-flex">
              <div className="tourDestination">
                <div className="tourDeparture">
                  <h6 className="d-flex align-items-center gap-2">
                    <img
                      className="tourDeparture-img"
                      src={departureImg}
                      alt=""
                    />
                    Departure:{" "}
                  </h6>
                  <h5>{data.departure}</h5>
                </div>
                <div className="tourDeparture">
                  <h6 className="d-flex align-items-center gap-2">
                    <img
                      className="tourDeparture-img"
                      src={destinationImg}
                      alt=""
                    />
                    Destination:
                  </h6>
                  <h5>{data.destination}</h5>
                </div>
              </div>
              <div className="tourDestination">
                <div className="tourDeparture">
                  <h6 className="d-flex align-items-center gap-2">
                    <img
                      className="tourDeparture-img"
                      src={backintime}
                      alt=""
                    />
                    Time:{" "}
                  </h6>
                  <h5>{data.time}</h5>
                </div>
                <div className="tourDeparture">
                  <h6 className="d-flex align-items-center gap-2">
                    <img className="tourDeparture-img" src={carImg} alt="" />
                    Vehicles:{" "}
                  </h6>
                  <h5>{data.vehicles}</h5>
                </div>
              </div>
            </div>
            <div className="tourPrice mt-3 ">
              <h6 className="d-flex align-items-base-line gap-2 ">
                Price:
                <h5 className="d-flex mb-0">{data.price} USD</h5>{" "}
              </h6>
            </div>
            <div className="tourIncludes">
              <h6>
                The price of {data.title} on {data.time} includes:
              </h6>
              <ul>
                {includeData.map((item) => (
                  <li className="tourInclude-item">
                    <img
                      src={includeImg}
                      className="tourDeparture-img"
                      alt=""
                    />
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="toursInfo">
            <div className="toursTitle">
              <h2>{data.title}</h2>
            </div>
            <div className="toursDescription mt-3 mb-5">
              <h6>{data.desc}</h6>
              <span>Book your tickets now to get the best deals!!!</span>
              <button className="tourBtn-book">Book Now</button>
            </div>

            <div className="toursHighlights mt-3">
              <div className="subTitle-container">
                <h3 className="subTitle">Highlight</h3>
              </div>
              <Highlight highlight={data.hightlight} />
            </div>

            <div className="tourSchedule">
              <div className="tourSchedule-title">
                <h6>
                  Booking's travel programs are well researched and thoughtfully
                  planned from the resort, dining and entertainment stages,
                  ensuring that you have a truly fun and meaningful trip!
                </h6>
              </div>
              <div className="subTitle-container">
                <h3 className="subTitle">Schedule</h3>
              </div>
              <Schedule schedule={data.schedule} />
            </div>
          </div>
        </div>
        <Review />
      </div>

      <MailList />
      <Footer />
    </>
  );
};

export default Tours;
