import React from "react";
import "./Slider_App_Tour.css";

import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import App_showRoom from "../../components/showRoom/App_showRoom.js";
import UserContext from "../../globalState.js";

import Slideshow from "./component/slideshow.js";
// import Slideshow from '../../components/slideshow/component/slideshow';
let img1 =
  "https://ik.imagekit.io/tvlk/image/imageResource/2017/05/10/1494407528373-a0e2c450b5cfac244d687d6fa8f5dd98.png?tr=h-150,q-75,w-150";
let img2 =
  "https://ik.imagekit.io/tvlk/image/imageResource/2017/05/10/1494407536280-ddcb70cab4907fa78468540ba722d25b.png?tr=h-150,q-75,w-150";
let img3 =
  "https://assets.mixkit.co/videos/preview/mixkit-white-sand-beach-background-1564-large.mp4";
let img4 =
  "https://assets.mixkit.co/videos/preview/mixkit-countryside-meadow-4075-large.mp4";
let img5 =
  "https://assets.mixkit.co/videos/preview/mixkit-landscape-of-mountains-and-sunset-3128-large.mp4";
let img6 =
  "https://assets.mixkit.co/videos/preview/mixkit-top-aerial-shot-of-seashore-with-rocks-1090-large.mp4";

const collection = [{ src: img1 }, { src: img2 }];

const Slider_Appp = () => {
  const { modal } = useContext(UserContext);
  const { dates, options } = useContext(SearchContext);

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/tours/${id}`
  );
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  let img11 = data.photos?.slice(1, 2);

  const coll = [
    { src: data.photos?.slice(0, 1) },
    { src: data.photos?.slice(1, 2) },
    { src: data.photos?.slice(2, 3) },
    { src: data.photos?.slice(3, 4) },
    { src: data.photos?.slice(4, 5) },
  ];
  return (
    <div className="App-sl">
      <Slideshow
        input={coll}
        ratio={`9:5`}
        mode={`automatic`}
        timeout={`2000`}
      />
    </div>
  );
};


export default Slider_Appp;
