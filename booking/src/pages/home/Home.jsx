import { useContext, useState } from "react";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
// import { Swiper, SwiperSlide } from 'swiper/react';
import UserContext from "../../globalState.js";

import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import Modal from "../../components/modal/modal.jsx";
import Famous from "../../components/famous/Famous.jsx";
import Tour from "../../components/tours/Tour.jsx";
import Why from "../../components/why/Why.jsx";
import "./home.css";
import App_slide from "../../components/slideshow/App_slide.js";

const Home = () => {
  const { modal } = useContext(UserContext);
  const [openDate, setOpenDate] = useState(false);

  const handleOpenDate = () => {
    console.log("inhere");
    setOpenDate(!openDate);
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <>
      <div
        onClick={openDate ? handleOpenDate : undefined}
        style={{ "overflow-x": "hidden" }}
      >
        <div className="showVideo">
          <div className="radian-overlay"></div>
          <App_slide />
          <Navbar />
          <Header openDate={openDate} handleOpenDate={handleOpenDate} />
        </div>
        <div className="homeContainer">
          <Famous />
          <Tour />
          <div className="homeTitle"data-aos= "fade-up">
            <img
              className="exploreImage"
              src="https://cdn-icons-png.flaticon.com/512/471/471012.png"
              alt=""
            />
            <span  >
              Explore <span className="homeTitle-text">Viet Nam</span>
            </span>
          </div>
          <div className="homeTitle-desc" data-aos="fade-left">
            Most searched and booked tours recommended by Booking
          </div>
          <Featured />
          <h1 className="homeTitle">Browse by property type</h1>
          <PropertyList />
          <Why />
          <MailList />
          <Footer />
          <marquee className="floating-text">
            <span style={{ fontSize: "20px", "margin-left": "30px" }}>
              Ho Chi Minh University of Technology and Education{" "}
            </span>
            <span style={{ "margin-left": "60px", fontSize: "20px" }}>
              Topic: Web design for booking using MERN Stack
            </span>
            <span style={{ "margin-left": "60px", fontSize: "20px" }}>
              GVHD: Truong Quang Phuc
            </span>
          </marquee>
        </div>
      </div>
      {modal && <Modal />}
    </>
  );
};

export default Home;
