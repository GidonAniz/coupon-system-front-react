import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import '../../../components/CustomerData/CustomerDataForm';
import '../../../components/ToolBar/ToolBarCustomer.css';
import CustomerDataForm from '../../../components/CustomerData/CustomerDataForm';
import Coupons from '../../../components/Coupon/Coupons';
import OfferedCoupons from '../../../components/Coupon/OfferedCoupons';
import {useNavigate } from "react-router";
import { uiActions } from '../../../store/ui-slice';
import Notification from '../../../components/Notification/Notification';
import { authActions } from '../../../store/auth';

const Customer = () => {

const myToken = useSelector((state) => state.auth.token);
const { firstName, lastName} = useSelector(state => state.user);
const navigate = useNavigate();
const dispatch = useDispatch();

const [customerData, setCustomerData] = useState([]);
const [customerCoupons, setCustomerCoupons] = useState([]);
const [offeredCoupons, setOfferedCoupons] = useState([]);
const [activeButton, setActiveButton] = useState("My profile");


const fetchCustomerData = async () => {
  console.log(myToken);
  setActiveButton("My profile")
  setCustomerData([]);
  const response = await fetch(`http://localhost:8080/api/couponSystem/getCustomer/${myToken}`);
  if (!response.ok) {
    const data = await response.json();
    const errorMessage = data.message|| "Unknown error"; 
    dispatch(
      uiActions.notify({
        status: "error",
        title: "",
        message: errorMessage
      })
    );
  }else{
    const customerInfo = await response.json()
    setCustomerData(customerInfo);
    console.log({customerData});

};}


const fetchCustomerCoupons = async () =>{
  console.log(myToken);
  setActiveButton("My coupons")
  setCustomerCoupons([]);
  const response = await fetch(`http://localhost:8080/api/couponSystem/customers/all/purchased/${myToken}`);
  if (!response.ok) {
    const data = await response.json();
    const errorMessage = data.message|| "Unknown error"; 
    dispatch(
      uiActions.notify({
        status: "error",
        title: "",
        message: errorMessage,
      })
    );
  }else {
  const coupons = await response.json();
  if (coupons.length ===0){
    dispatch(
      uiActions.notify({
        status: "error",
        title: "",
        message: "No coupons found :(",
      })
    );
  }else{
    setCustomerCoupons(coupons);
    console.log(coupons);
  }}
}

const fetchOfferedCoupons = async () => {
  console.log(myToken);
  setActiveButton("Offered Coupons")
  setOfferedCoupons([]);
  const response = await fetch(`http://localhost:8080/api/couponSystem/customers/all/not-purchased/${myToken}`);
  if (!response.ok) {
    const data = await response.json();
    const errorMessage = data.message|| "Unknown error"; 
    dispatch(
      uiActions.notify({
        status: "error",
        title: "",
        message: errorMessage,
      })
    );
  }else{
  const theOfferedCoupons = await response.json()
  if (theOfferedCoupons.length ===0){
    console.log("make dispatch");
    dispatch(
      uiActions.notify({
        status: "error",
        title: "",
        message: "No coupons found :(",
      })
    );
   }else{
  setOfferedCoupons (theOfferedCoupons);
  console.log(theOfferedCoupons);
}}
}

const handleLogOut = () => { 
  setActiveButton("Logout")
  dispatch(
    uiActions.notify({
      status: "sucess",
      title: "",
      message: "Logout completed successfully",
    })
  );
  dispatch(authActions.logout())
  navigate ("/login")
}

useEffect(() => {
  fetchCustomerData();
}, [firstName,lastName]);

        return (
            <>
              <div className="toolbarcustomer">
              <Button className="toolbar__button" onClick={fetchCustomerData} >My profile</Button>
              <Button className="toolbar__button" onClick={fetchCustomerCoupons}>My coupons</Button>
              <Button className="toolbar__button" onClick={fetchOfferedCoupons}>Offered Coupons</Button>
              <Button className="toolbar__button" onClick={handleLogOut}>Logout</Button>
              <div className="toolbar__sentence">Hello {customerData['firstName']} {customerData['lastName']}, hope this day smiles for you.</div>
              </div>
              {(activeButton !== "Logout") && <Notification/>}
              {(activeButton ==="My profile") &&<CustomerDataForm customerInfo={customerData} />}
              {(activeButton ==="My coupons") &&<Coupons couponList={customerCoupons}/>  }
              {(activeButton ==="Offered Coupons") &&<OfferedCoupons couponList={offeredCoupons} activeButton={activeButton}/>}
              <div style={{textAlign: 'center', fontSize: '60px'}}>
              </div>
              </>
          );
}
 
export default Customer;