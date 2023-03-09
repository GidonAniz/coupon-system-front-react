import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import '../../../components/CustomerData/CompanyDataForm';
import '../../../components/ToolBar/ToolBarCustomer.css';
import InsertCouponForm from '../../../components/CustomerData/InserCouponForm';
import CompanyDataForm from '../../../components/CustomerData/CompanyDataForm';
import CompanyCoupons from '../../../components/Coupon/CompanyCoupons';
import {useNavigate } from "react-router";
import { authActions } from '../../../store/auth';
import Notification from '../../../components/Notification/Notification';
import { uiActions } from '../../../store/ui-slice';


const Company = () => {

const myToken = useSelector((state) => state.auth.token);

const companyName = useSelector(state => state.user.companyName);

const navigate = useNavigate();
const dispatch = useDispatch();


const [companyData, setCompanyData] = useState([]);
const [companyCoupons, setCompanyCoupons] = useState([]);
const [activeButton, setActiveButton] = useState("");


const fetchCompanyData = async () => {
  console.log(myToken);
  setActiveButton("My profile")
  const response = await fetch(`http://localhost:8080/api/couponSystem/getCompany/${myToken}`);
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
    const data = await response.json()
    setCompanyData(data);
    console.log(data);
}}


const fetchCompanyCoupons = async () => {
  console.log(myToken);
  setActiveButton("Company coupons")
  const response = await fetch(`http://localhost:8080/api/couponSystem/company/couponAll/${myToken}`);
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
    const theCompanyCoupons = await response.json()
    setCompanyCoupons(theCompanyCoupons);
    console.log(theCompanyCoupons);
 }
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


const handleCreateCoupon =() =>{
  setActiveButton("Create new coupon")
}

useEffect(() => {
  fetchCompanyData();
}, [companyName]);

useEffect(() => {
  fetchCompanyCoupons();
}, []);

        return (
            <>
              <div className="toolbarcustomer">
              <Button className="toolbar__button" onClick={fetchCompanyData} >My profile</Button>
              <Button className="toolbar__button" onClick={fetchCompanyCoupons}>Company coupons</Button>
              <Button className="toolbar__button" onClick={handleCreateCoupon}>Create new coupon</Button>
              <Button className="toolbar__button" onClick={handleLogOut}>Logout</Button>
              <div className="toolbar__sentence">Hello {companyData['name']}, Hope your coupons business running well </div>
              </div>
              {(activeButton !== "Logout") && <Notification/>}
              {(activeButton ==="My profile") &&<CompanyDataForm companyInfo={companyData} />}
              {(activeButton ==="Company coupons") &&<CompanyCoupons couponList={companyCoupons}/>}
              {(activeButton ==="Create new coupon") && <InsertCouponForm/>}
              </>
              
          );
}
 
export default Company;