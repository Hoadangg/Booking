import React from "react";

function review({ review }) {
  return (
    <div>
      {console.log(review)}
      {review?.map((item, idx) => (
        
         <div className="reviewUser">
         <div className="userInfor">
           <img
             classNawme="userAvt"
             src="https://kbizoom.com/wp-content/uploads/2022/09/rose-instagram-11092022-4.webp"
             alt="user avatar"
           />
           <div className="userName">{item[0]}</div>
         </div>
         <div className="userReview">
           <div className="userMark">
             <span>10</span>
             <img
               className="imageStar"
               src="https://img.icons8.com/fluency/512/star.png"
               alt=""
             />
           </div>
           <div className="reviewContent">
        
             <span>
               {item[1]}
             </span>
           </div>
         </div>
       </div>



      ))}
    </div>
  );
}

export default review;
