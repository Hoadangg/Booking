import React from "react";
import daynImg from "../../assets/day-and-night.png";
import "./Highlight.css";

const Schedule = ({ schedule }) => {
  return (
    <ul>
      {console.log(schedule)}
      <div className="schedule-container">
        {schedule?.map((item, ind) => (
          <>
            <span className="scheduleDay">
              {/* <img className="highlightImg" src={daynImg} alt="" /> */}
              Day {ind + 1}
            </span>
            <li>{item}</li>
          </>
        ))}
      </div>
    </ul>
  );
};
export default Schedule;
