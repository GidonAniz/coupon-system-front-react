import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './InsertCouponForm.css';
import { uiActions } from '../../store/ui-slice';




const InsertCouponForm = () => {

  const randomUuid = generateUUID();
  const initialCouponInfoState = {
    id: randomUuid,
    title: "",
    category: "",
    startDate: "",
    endDate: "",
    amount: "",
    description: "",
    price: "",
    imageUrl: "",
  };

  const myToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  
  const [couponInfo, setCouponInfo] = useState(initialCouponInfoState);
  
  useEffect(() => {
    
  },[randomUuid]);

   function generateUUID() {
    let uuid = "";
    const chars = "abcdef0123456789";
    for (let i = 0; i < 32; i++) {
      uuid += chars.charAt(Math.floor(Math.random() * chars.length));
      if (i === 7 || i === 11 || i === 15 || i === 19) {
        uuid += "-";
      }
    }
    return uuid;
  }

  const handleSave = async (event) => {
    event.preventDefault();
      console.log(myToken);
      const response = await fetch(`http://localhost:8080/api/couponSystem/company/create_coupon/${myToken}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(couponInfo)
      });
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
       }else {
        console.log("errorMessage");
        dispatch(
          uiActions.notify({
            status: "success",
            title: "",
            message: "Coupon successfuly added to the company"
          })
        );
        setCouponInfo(initialCouponInfoState);
        document.getElementById("title").value = "";
        document.getElementById("category").value = "";
        document.getElementById("startDate").value = "";
        document.getElementById("endDate").value = "";
        document.getElementById("amount").value = "";
        document.getElementById("description").value = "";
        document.getElementById("price").value = "";
        document.getElementById("imageUrl").value = "";
        document.getElementById("id").value = randomUuid;
      }
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setCouponInfo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  
    return (
      <form className="coupon-data-form">
          <button
         className="coupon-data-form__button"
         type="submit"
         onClick={handleSave}
         >
        Save Coupon
       </button>
        <label className="coupon-data-form__label">
          Code coupon:
          <input
           defaultValue={randomUuid}
            className="coupon-data-form__input"
            type="text"
            name="id"
            id="id"
            onChange={handleChange}
          />
        </label>
        <div style={{ color: "gray", fontStyle: "italic", float: "right", fontSize: "12px", paddingLeft: "10px" }}>
        Automatic
          <br />
        </div>
        <br />
        <label className="coupon-data-form__label">
          *Title:
          <input
            className="coupon-data-form__input"
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
          />
        </label>
        <div style={{ color: "gray", fontStyle: "italic", float: "right", fontSize: "12px", paddingLeft: "10px" }}>
        Required field
        </div>
        <br />
        <label className="coupon-data-form__label">
          *Category:
          <input
            className="coupon-data-form__input"
            type="number"
            name="category"
            id="category"
            onChange={handleChange}
          />
        </label>
        <div style={{ color: "gray", fontStyle: "italic", float: "right", fontSize: "12px", paddingLeft: "10px" }}>
        Required field
        </div>
        <br />
        <label className="coupon-data-form__label">
           *Start Date:
          <input
            className="coupon-data-form__input"
            type="date"
            name="startDate"
            id="startDate"
            onChange={handleChange}
          />
        </label>
        <br />
        <div style={{ color: "gray", fontStyle: "italic", float: "right", fontSize: "12px", paddingLeft: "10px" }}>
        Required field
        </div>
        <label className="coupon-data-form__label">
           *End Date:
          <input
            className="coupon-data-form__input"
            type="date"
            name="endDate"
            id="endDate"
            onChange={handleChange}
          />
        </label>
        <div style={{ color: "gray", fontStyle: "italic", float: "right", fontSize: "12px", paddingLeft: "10px" }}>
        Required field
        </div>
        <br />
        <label className="coupon-data-form__label">
           *Amount:
          <input
            className="coupon-data-form__input"
            type="number"
            name="amount"
            id="amount"
            onChange={handleChange}
          />
        </label>
        <div style={{ color: "gray", fontStyle: "italic", float: "right", fontSize: "12px", paddingLeft: "10px" }}>
        Required field
        </div>
        <br />
        <label className="coupon-data-form__label">
           Description:
          <input
            className="coupon-data-form__input"
            type="text"
            name="description"
            id="description"
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="coupon-data-form__label">
           *Price:
          <input
            className="coupon-data-form__input"
            type="price"
            name="price"
            id="price"
            onChange={handleChange}
          />
        </label>
        <div style={{ color: "gray", fontStyle: "italic", float: "right", fontSize: "12px", paddingLeft: "10px" }}>
        Required field
        </div>
        <br />
        <label className="coupon-data-form__label">
           Image Url:
          <input
            className="coupon-data-form__input"
            type="url"
            name="imageUrl"
            id="imageUrl"
            onChange={handleChange}
          />
        </label>
      </form>
    );
  }

export default InsertCouponForm;