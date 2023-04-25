import React from "react";
import "./Highlight.css";
import highlightImg from "../../assets/award.png"
const Highlight = ({ highlight }) => {
  return (
    <ul>
      {console.log(highlight)}
      <div className="highlight-container">
        {highlight?.map((item) => (
          <li>
            <img className="highlightImg" src={highlightImg} alt="" />
           <span> {item}</span>
          </li>
        ))}
      </div>
    </ul>
  );
};

export default Highlight;
