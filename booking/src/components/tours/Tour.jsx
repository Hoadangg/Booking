import React from "react";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { useLocation } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./tour.css";
import { Link,useNavigate } from "react-router-dom";

const Tour = () => {
 const navigate = useNavigate();
  const oid= "64259b828c4146ae7c15d6cf"
  const {data} = useFetch(
    `http://localhost:8800/api/tours/`
  );
  console.log(data[0])


  const gotoTour=(id)=>{
    navigate(`/tours/${id}`)
    window.location.reload();
    //`/hotels/${item._id}`
   }
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  // const dataa = [
  //   {
  //     id: 1,
  //     img: "https://booking.pystravel.vn/uploads/posts/avatar/1575277501.jpg",
  //     title: " ",
  //     address: " Ha Giang",
  //     mark: "9.9",
  //     text: "Very Good",
  //     price: 900,
  //   },
  //   {
  //     id: 2,
  //     img: "https://static-images.vnncdn.net/files/publish/2022/10/12/du-lich-phu-quoc-thang-10-1338.jpg",
  //     title: " Tour du lịch Phu Quoc",
  //     address: " Phu Quoc ",
  //     mark: "8.8",
  //     text: "Very Good",
  //     price: 860,
  //   },
  //   {
  //     id: 3,
  //     img: "https://media.baodautu.vn/Images/chicuong/2022/06/24/16-Bana_Hilss.jpg",
  //     title: " Tour du lịch Da Nang Cao Bằng 5 ngày 4 đêm từ TP HCM trọn gói",
  //     address: " Da Nang",
  //     mark: "8.9",
  //     text: "Very Good",
  //     price: 780,
  //   },
  //   {
  //     id: 4,
  //     img: "https://booking.pystravel.vn/uploads/posts/avatar/1575277501.jpg",
  //     title: " Tour du lịch Hà Giang Cao Bằng 5 ngày 4 đêm từ TP HCM trọn gói",
  //     address: " Ha Giang",
  //     mark: "9",
  //     text: "Very Good",
  //     price: 900,
  //   },
  //   {
  //     id: 5,
  //     img: "https://booking.pystravel.vn/uploads/posts/avatar/1575277501.jpg",
  //     title: " Tour du lịch Hà Giang Cao Bằng 5 ngày 4 đêm từ TP HCM trọn gói",
  //     address: " Ha Giang",
  //     mark: "9",
  //     text: "Very Good",
  //     price: 900,
  //   },
  // ];
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
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
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="tourContainer">
      <div className="tour">
        <div className="tourTitle" data-aos="fade-up">
          {/* <img
            src="https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/hot-icon.png"
            alt=""
          /> */}
          {/* <img src="https://www.freeiconspng.com/thumbs/travel-icon/travel-icon--be-found-online-9.png" alt="" /> */}

          <img
            src="https://www.andamandreamdestination.com/images/logo/Andaman-Dream-Destination.png"
            alt=""
          />
          <span>
            Hot <span className="tourText">TOUR</span>
          </span>
        </div>
        <div className="tourDes" data-aos="fade-left">
          Most searched and booked tours recommended by Booking
        </div>
        <Slider {...settings}>
          {data.map((item, idx) => (
            
            <div
              className="tourContent"
              data-aos="fade-up"
              key={idx}
              onClick={() => {}}
            >
              <div className="tourBox">
                <img src={item.photos[0]} alt="" className="image" />
                <div className="content">
                  <div className="title">
                    <h2>{item.title}</h2>
                    {console.log(item._id)}
                  </div>
                  <div className="address">
                    <img
                      src="https://freepngimg.com/thumb/map/62873-map-computer-location-icon-icons-free-transparent-image-hd.png"
                      alt=""
                    />
                    <span>{item.address}</span>
                  </div>
                  <div className="reward">
                    <div className="mark">
                      <img
                        src="https://cdn.iconscout.com/icon/free/png-256/umbrella-2156238-1816112.png"
                        alt=""
                      />
                      <span>{item.rating}</span>
                    </div>
                    <div className="text">{item.text}</div>
                  </div>
                  <div className="price">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/5579/5579187.png"
                      alt=""
                    />
                    <span>{item.price} USD</span>
                  </div>
                  <div className="detail">
                   
                      <button   onClick={()=>{gotoTour(item._id)}}>Detail</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Tour;
