import React from 'react';
import './Coupon.css'
import { uiActions } from '../../store/ui-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';

const CompanyCoupon = ({ title, price, description, startDate, endDate, image, id}) => {
  console.log({title, price, description, startDate, endDate})

  const myToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const dataEndDate = new Date(endDate);
  const dataStartdDate = new Date(startDate);

  const formattedStartDate = dataStartdDate.toLocaleDateString();
  const formattedEndtDate = dataEndDate.toLocaleDateString();
  const now = new Date();
  const timeDiff = dataEndDate.getTime() - now.getTime(); 
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

  const isEndingSoon = daysDiff <= 7 && daysDiff >= 0;
  console.log(isEndingSoon)

  const [isDeleted, setIsDeleted] = useState(false);

  const fetcDeleteCoupon = async () => {
    console.log(myToken);
    const response = await fetch(`http://localhost:8080/api/couponSystem/company/delete_coupon/${id}/${myToken}`,{
      method: "POST"})
      if (!response.ok) {
        const data = await response.json();
        const errorMessage = data.message|| "Unknown error"; 
        console.log(errorMessage);
        dispatch(
          uiActions.notify({
            status: "error",
            title: "",
            message: errorMessage
          })
        );
       }else{
      dispatch(
        uiActions.notify({
          status: "success",
          title: "",
          message: "Coupon deleted",
        })
      );
      setIsDeleted(true);
      console.log("succeed delete coupon");
  }}

  useEffect(() => {
    
  },[fetcDeleteCoupon]);

  useEffect(() => {
    console.log('isDeleted changed:', isDeleted);
  },[isDeleted]);

  if (isDeleted) {
    return null;
  }
  return (
    <div className="coupon-card">
        <button id="deleteCoupon"  className="coupon-card__button" onClick={fetcDeleteCoupon}>
          Delete coupon
        </button>
      <h1>Title: {title}</h1>
      <p>Price: {price}</p>
      <p>Description: {description}</p>
      <p>Start Date: {formattedStartDate}</p>
      <p>End Date: <span className={isEndingSoon ? "ending-soon" : ""}>{formattedEndtDate}</span></p>
      <img src={image} alt={title} />
    </div>
  );
}

export default CompanyCoupon;