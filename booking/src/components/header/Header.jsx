import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useState, useContext, useRef } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

import { SearchContext } from "../../context/SearchContext.js";

import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const Header = ({ type, openDate, handleOpenDate }) => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const [destination, setDestination] = useState("");
  // const [openDate, setOpenDate] = useState(false);
  const [dates, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [message, setMessage] = useState("Please enter your destination");

  const inputRef = useRef(null);
  const tipsRef = useRef(null);

  // const [isNameValid, setIsNameValid] = useState(false);

  const isNameValid = (cityName) => {
    const citiesArr = [
      "hanoi",
      "danang",
      "dalat",
      "vungtau",
      "hochiminh",
      "hcm",
    ];
    return citiesArr.includes(cityName);
  };

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    if (isNameValid(destination)) {
      dispatch({
        type: "NEW_SEARCH",
        payload: { destination, dates, options },
      });
      navigate("/hotels", { state: { destination, dates, options } });
    } else {
      inputRef.current.value !== ""
        ? setMessage(
            "we currently not don't have that location available on our website yet.Please choose another location or refer to the locations below"
          )
        : setMessage("Please enter your destination");
      inputRef.current.value = "";
      inputRef.current.focus();
      tipsRef.current.click();

      setDestination("");
    }
  };

  return (
    <div
      className="header"
      style={
        type === "list"
          ? { backgroundColor: "#003580" }
          : { backgroundColor: "transparent" }
      }
    >
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList" data-aos="fade-down">
          <div className="headerListItem active">
            <FontAwesomeIcon className="iconHeader" icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon className="iconHeader" icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon className="iconHeader" icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon className="iconHeader" icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon className="iconHeader" icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <div className="headerSearch-subTitle">
              <h4 className="headerTitle" data-aos="fade-left">
                Available until 3 Jan 2023
              </h4>
              <h1 className="headerSave" data-aos="fade-left">
                {" "}
                Save 15% with Late Escape Deals{" "}
              </h1>
              <p className="headerDesc" data-aos="fade-left">
                There’s still time to tick one more destination off your
                wishlist
              </p>
              <button className="headerBtn" data-aos="fade-up">
                Explore deal
              </button>
            </div>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />

                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={(e) =>
                    setDestination(
                      e.target.value.split(" ").join("").toLowerCase()
                    )
                  }
                />
              </div>

              {/* <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => handleOpenDate()}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
                  dates[0].endDate,
                  "dd/MM/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
                          
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div> */}
              <div className="headerSearchItem headertb">
                <button
                  id="myButton"
                  className="headerBtn"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
              <Tippy
                content={message}
                trigger="click"
                className="search-tooltip"
                theme={"light"}
                animation={"shift-away"}
              >
                <span ref={tipsRef}></span>
              </Tippy>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
