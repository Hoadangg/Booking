import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import "./propertyList.css";

import imgGirl from "./assets/images/defaultImage.jpg";
import useFetch from "../../hooks/useFetch.js";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

function PropertyList() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const [defaultImage, setDefaultImage] = useState({});
  const [acType, setAcType] = useState("");
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
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
  const imgArr = [
    "https://www.ahstatic.com/photos/5451_ho_00_p_1024x768.jpg",
    "https://lh3.googleusercontent.com/YFa-f0a1kOiU0eEX6Q1dw6i8E1wMOyZUrQwI-zd8Na4-WIx1oqEdfW8jbUeGBFyRtXsYhPE6FwWH5NUqUeWzHsS48SaMNA9ZWg=w640-h426-n-rj-l90",
    "https://toancanhbatdongsan.com.vn/uploads/images/2022/04/12/resort-dep-nhat-viet-nam-six-senses-ninh-van-bay-khanh-hoa-min-1649730414.jpg",
    "https://e8rbh6por3n.exactdn.com/sites/uploads/2020/05/villa-la-gi-thumbnail.jpg?strip=all&lossy=1&ssl=1",
    "https://thecabinyeg.com/wp-content/uploads/2021/12/winter-cabin.jpg",
    "https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/8/2020/01/Chancellors-Swiss-Cottage.jpg",
    "https://static2.mansionglobal.com/production/media/article-images/b5416efec73037c3616699dbde7529ea/large_275.jpg",
  ];

  const typeArr = [
    "Hotel",
    "Aparment",
    "Resort",
    "Villas",
    "Cabin",
    "Cattage",
    "Vacation",
  ];
  const { data } = useFetch("http://localhost:8800/api/hotels/countByType");
  console.log(data);
  const handleErrorImage = (data) => {
    setDefaultImage((prev) => ({
      ...prev,
      [data.target.alt]: data.target.alt,
      linkDefault: imgGirl,
    }));
  };
  const navigate = useNavigate();
  const handleClick = (idx) => {
    setAcType(data[idx].type);
  };
  useEffect(() => {
    if (acType) {
      console.log(acType);
      navigate("/hotels", { state: { acType } });
    }
  }, [acType]);

  return (
    <div className="propertyList" data-aos= "fade-up">
      <Slider {...settings}>
        {imgArr.map((item, idx) => (
          <div
            key={idx}
            onClick={() => {
              handleClick(idx);
            }}
            className="cardList"
          >
            <div className="card-topList">
              <img
                src={
                  defaultImage[typeArr[idx]] === typeArr[idx]
                    ? defaultImage.linkDefault
                    : item
                }
                alt={typeArr[idx]}
                onError={handleErrorImage}
              />
              <h3>{typeArr[idx]}</h3>
            </div>
            <div className="card-bottomList">
              <p className="card-bottomList-p">
                {data[idx]?.count}{" "}
                <span className="category">{data[idx]?.type}</span>{" "}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default PropertyList;
