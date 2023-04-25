import "./App_showRoom.css";
import { RoomData } from "./data_showRoom";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef, useContext } from "react";
import App_paypal from "./Paypal/App_paypal";
import { SearchContext } from "../../context/SearchContext.js";
import useFetch from "../../hooks/useFetch.js";
import axios from "axios";

var arr = [];
function App_showRoom({ hotelId }) {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState(0);

  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/hotels/room/${hotelId}`
  );
  const { dates } = useContext(SearchContext);

  let menuRef = useRef();
  const navigate = useNavigate();
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0]?.startDate, dates[0]?.endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);

  const handleSelect = (e, price) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
    if (checked) {
      setResult(result + parseInt(price * days));
    } else {
      setResult(result - parseInt(price * days));
    }
  };
  console.log(selectedRooms);
  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            `http://localhost:8800/api/rooms/availability/${roomId}`,
            {
              dates: alldates,
            }
          );
          return res.data;
        })
      );
      //setOpen(false);
      // navigate("/");
    } catch (err) {}
  };

  // const handleChange = (event) => {
  //   if (event.target.checked) {
  //     setResult(result + parseInt(event.target.value));
  //   } else {
  //     setResult(result - parseInt(event.target.value));
  //   }
  //   setIsSubscribed((current) => !current);
  // };
  // useEffect(() => {
  //   let handler = (e) => {
  //     if (!menuRef.current.contains(e.target)) {
  //       setOpen(false);
  //       console.log(menuRef.current);
  //     }
  //   };
  // });
  console.log(data);
  return (
    <div className="App_showRoom">
      <div className="menu-container" ref={menuRef}>
        <div
          className="menu-trigger"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <span className="showroom_container">Select Room</span>
        </div>

        <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
          <div className="dropdownmenu-item">
            {data.map((item, idx) => (
              <div key={idx} className="dropdown-item">
                <ul>
                  <DropdownItem
                    title={item.title}
                    maxpeople={item.maxpeople}
                    decs={item.desc}
                    price={item.price}
                  />
                </ul>
                <div className="roomSelectInp">
                  {item.roomNumbers.map((roomNumber, idx) => {
                    console.log(!isAvailable(roomNumber));
                    return (
                      <div className="roomSelectInpChild" key={idx}>
                        <label>{roomNumber.number}</label>
                        <input
                          type="checkbox"
                          value={roomNumber._id}
                          onChange={(e) => {
                            handleSelect(e, item.price);
                          }}
                          className="dropdown-item-checkbox"
                          name="subscribe"
                          disabled={!isAvailable(roomNumber)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="dropdown-item-bottom">
            {days > 0 ? (
              <div className="dropdown_result">
                Total Price for {days} days: ${result} USD
              </div>
            ) : (
              <div className="dropdown_result">
                Please choose amount of days
              </div>
            )}
            <div className="dropdown_checkpay">
              <div className="dropdown_checkpay-item check_paypal">
                <App_paypal price={result} handleClick={handleClick} />
              </div>
              <div>
                <button
                  onClick={handleClick}
                  className="dropdown_checkpay-item check_momo"
                >
                  MoMo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DropdownItem(props) {
  return (
    <li className="dropdownItem">
      <h3 className="dropdownItem-name">{props.title}</h3>
      <span>Max people: {props.maxpeople}</span>
      <span>Description: {props.decs}</span>
      <span>Price: {props.price}</span>
    </li>
  );
}

export default App_showRoom;
