import React from 'react';
import './Coupon.css'
import { uiActions } from '../../store/ui-slice';
import { useDispatch, useSelector } from 'react-redux';

const OfferedCoupon = ({ title, price, description, startDate, endDate, image, id}) => {
  console.log({title, price, description, startDate, endDate,id})
 
  const myToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const dataEndDate = new Date(endDate);
  const dataStartdDate = new Date(startDate);
  
  const formattedStartDate = dataStartdDate.toLocaleDateString();
  const formattedEndtDate = dataEndDate.toLocaleDateString();



  const fetcBuyCoupon = async () => {
    console.log(myToken);
    const response = await fetch(`http://localhost:8080/api/couponSystem/customer/purchase/${id}/${myToken}`,{
      method: "POST"})
    if (!response.ok) {
      const data = await response.json();
      const errorMessage = data.message|| "Unknown error"; 
      console.log(errorMessage);
      dispatch(
        uiActions.notify({
          status: "error",
          title: "",
          message: errorMessage,
        })
      );
    }else{
      dispatch(
        uiActions.notify({
          status: "success",
          title: "",
          message: "Purchase coupon succeedd",
        })
      );
    console.log("succeed to buy coupon");
  }}

  return (
    <div className="coupon-card">
        <div className="coupon-card__buttons">
        <button id="buyCoupon" className="coupon-card__button" onClick={fetcBuyCoupon}>
          Buy
        </button>
      </div>
      <h1>Title: {title}</h1>
      <p>Price: {price}</p>
      <p>Description: {description}</p>
      <p>Start Date: {formattedStartDate}</p>
      <p>End Date: {formattedEndtDate}</p>
      <img src={image} alt={title} />
    </div>
  );
}

export default OfferedCoupon;