import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

import imgGirl from "./assets/images/defaultImage.jpg";

function FeaturedProperties() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const {data} = useFetch("http://localhost:8800/api/hotels?featured=true")
  const [defaultImage, setDefaultImage] = useState({});
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleErrorImage = (data) => {
    setDefaultImage((prev) => ({
      ...prev,
      [data.target.alt]: data.target.alt,
      linkDefault: imgGirl,
    }));
  };
  const navigate= useNavigate()
  const handleClick=(id)=>{
    navigate(`/hotels/${id}`)
  }
  return (
    <div className="featuredProperties  ">
      <Slider {...settings}>
        {data.map((item,idx) => (
          <div  key={idx} onClick={()=>{handleClick(item._id)}} className="cardPro" data-aos= "fade-up">
            <div className="card-topPro">
              <img
                src={
                  item.photos[0]
                }
                alt="img"
                onError={handleErrorImage}
              />
              <h1>{item.title}</h1>
            </div>
            <div className="card-bottomPro">
              <h3>{item.property}</h3>
              {/* <span className="category">{item.category}</span> */}
            </div>
            <div className="ratingPro">
              {/* <span className="fpName">{item.name}</span> */}
              <span className="fpCity">{item.city}</span>
              <br></br>
              <span className="fpPrice">{item.cheapestPrice}</span>
              <div className="fpRating">
                <button>{item.rating ||"8.9"}</button>
                <span>{( item.rating > 8) ? "excellent" :"good"}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default FeaturedProperties;
