import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CustomerDataForm.css';
import { uiActions } from '../../store/ui-slice';
import { userAction } from '../../store/userDetails';



const CustomerDataForm = ({ customerInfo}) => {

  const myToken = useSelector((state) => state.auth.token);
   const dispatch = useDispatch();


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    console.log(customerInfo);



    const handleSave = (event) => {
      event.preventDefault();

      switch (event.target.id) {
         case 'firstNameSave':
          console.log(event.target.id);
         fetchFirstNameSave();
          break;    
          case 'lastNameSave':
            console.log(event.target.id);
            fetchLastNameSave();
          break;
         case 'emailSave':
         fetchEmilSave();
         break;
         default:
          fetchPasswordSave();
        break;
      }
    };

    const fetchFirstNameSave = async () =>{
      console.log(myToken);
      const response = await fetch(`http://localhost:8080/api/couponSystem/customer/update_firstName/${firstName}/${myToken}`,{
      method: "POST"})
      if (!response.ok) {
        console.log("firstNameFailed");
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
        dispatch(userAction.fName(firstName));
        dispatch(
          uiActions.notify({
            status: "success",
            title: "",
            message: "First Name updated",     
      }))
      }
    }

    const fetchLastNameSave = async () =>{
      console.log(myToken);
      const response = await fetch(`http://localhost:8080/api/couponSystem/customer/update_lastName/${lastName}/${myToken}`,{
        method: "POST"})
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
        dispatch(userAction.lName(lastName));
        dispatch(
          uiActions.notify({
            status: "success",
            title: "",
            message: "Last Name updated",     
      }))
      }
    }

    const fetchEmilSave = async () =>{
      console.log(myToken);
      const response = await fetch(`http://localhost:8080/api/couponSystem/customer/update_email/${email}/${myToken}`,{
        method: "POST"})
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
        dispatch(
          uiActions.notify({
            status: "success",
            title: "",
            message: "Email updated",     
      }))
      }};
  

    const fetchPasswordSave = async () => {
      console.log(myToken);
    
      const response = await fetch(`http://localhost:8080/api/couponSystem/customer/update_password/${password}/${myToken}`, {
        method: "POST"
      });
    
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
      dispatch(
        uiActions.notify({
          status: "success",
          title: "",
          message: "Password updated", 
    }))
    }};


    return (
      <form className="customer-data-form">
        <label className="customer-data-form__label">
          First Name:
          <input
            className="customer-data-form__input"
            type="text"
            defaultValue={customerInfo['firstName']}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <div style={{ display: "inline-block"}}>
            <button id="firstNameSave" className="customer-data-form__button" onClick={handleSave}>
              Save
            </button>
            <div style={{ color: "gray", fontStyle: "italic", float: "right", fontSize: "12px" , paddingLeft:"10px"}}>
               You can change me, after just click on save
            </div>
          </div>
        </label>
        <br />
        <label className="customer-data-form__label">
          Last Name:
          <input
            className="customer-data-form__input"
            type="text"
            defaultValue={customerInfo['lastName']}
            onChange={(e) => setLastName(e.target.value)}
          />
          <div style={{ display: "inline-block"}}>
            <button id="lastNameSave" className="customer-data-form__button" onClick={handleSave}>
              Save
            </button>
            <div style={{ color: "gray", fontStyle: "italic", float: "right", fontSize: "12px" , paddingLeft:"10px"}}>
               You can change me, after just click on save
            </div>
          </div>
        </label>
        <br />
        <label className="customer-data-form__label">
          Email:
          <input
            className="customer-data-form__input"
            type="text"
            defaultValue={customerInfo['email']}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div style={{ display: "inline-block"}}>
            <button id="emailSave" className="customer-data-form__button" onClick={handleSave}>
              Save
            </button>
            <div style={{ color: "gray", fontStyle: "italic", float: "right", fontSize: "12px" , paddingLeft:"10px"}}>
               You can change me, after just click on save
            </div>
          </div>
        </label>
        <br />
        <label className="customer-data-form__label">
          Password:
          <input
            className="customer-data-form__input"
            type="password"
            defaultValue={customerInfo['password']}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div style={{ display: "inline-block"}}>
            <button id="passwordSave" className="customer-data-form__button" onClick={handleSave}>
              Save
            </button>
            <div style={{ color: "gray", fontStyle: "italic", float: "right", fontSize: "12px" , paddingLeft:"10px"}}>
              You can change me, after just click on save
              <br />
              The password must contain at least 8 characters, an uppercase letter, a lowercase letter, and a symbol
            </div>
          </div>
        </label>
        <br />
        </form>
    )           
}

export default CustomerDataForm;