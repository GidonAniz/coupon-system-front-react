import React from 'react';
import './Coupon.css'

const Coupon = ({ title, price, description, startDate, endDate, image }) => {
  console.log({title, price, description, startDate, endDate})

  const dataEndDate = new Date(endDate);
  const dataStartdDate = new Date(startDate);

  const formattedStartDate = dataStartdDate.toLocaleDateString();
  const formattedEndtDate = dataEndDate.toLocaleDateString();
  const now = new Date();
  const timeDiff = dataEndDate.getTime() - now.getTime(); 
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

  const isEndingSoon = daysDiff <= 7 && daysDiff >= 0;
  console.log(isEndingSoon)
  return (
    <div className="coupon-card">
      <h1>Title: {title}</h1>
      <p>Price: {price}</p>
      <p>Description: {description}</p>
      <p>Start Date: {formattedStartDate}</p>
      <p>End Date: <span className={isEndingSoon ? "ending-soon" : ""}>{formattedEndtDate}</span></p>
      <img src={image} alt={title} />
    </div>
  );
}

export default Coupon;