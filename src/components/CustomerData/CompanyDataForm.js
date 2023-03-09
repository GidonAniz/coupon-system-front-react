import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CompanyDataForm.css';
import { userAction } from '../../store/userDetails';
import { uiActions } from '../../store/ui-slice';


const CompanyDataForm = ({ companyInfo}) => {

  const myToken = useSelector((state) => state.auth.token);
   const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    console.log(companyInfo);

    const handleSave =  (event) => {
        event.preventDefault();
        switch (event.target.id) {
          case 'companyName':
          console.log(event.target.id);
          fetchCompanyNameSave();
          break;   
          case 'companyEmail':
            fetchCompanyEmailSave();
          break;
          case 'companyPassword':
            fetchCompanyPasswordSave();
            break;
            default:
            break;
        }
  }

  const fetchCompanyNameSave = async () =>{
    console.log(myToken);
    const response = await fetch(`http://localhost:8080/api/couponSystem/company/update_name/${name}/${myToken}`,{
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
      dispatch(
      uiActions.notify({
        status: "success",
        title: "",
        message: "Name updated",
  }))
      dispatch(userAction.cName(name));
    }
  }

  const fetchCompanyEmailSave = async () =>{
    console.log(myToken);
    const response = await fetch(`http://localhost:8080/api/couponSystem/company/update_email/${email}/${myToken}`,{
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
      console.log("Update company  email succeed");
      dispatch(
        uiActions.notify({
          status: "success",
          title: "",
          message: "Email updated",
    })
      );
  }
}

const fetchCompanyPasswordSave = async () =>{
  console.log(myToken);
  const response = await fetch(`http://localhost:8080/api/couponSystem/company/update_password/${password}/${myToken}`,{
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
    console.log("Update company password succeed");
    dispatch(
      uiActions.notify({
        status: "success",
        title: "",
        message: "Password updated",
  })
    );
}
}
    return (
        <form className="company-data-form">
          <label className="comapny-data-form__label">
            Company Name:
            <input className="company-data-form__input" type="text" defaultValue={companyInfo['name']} onChange={(e) => setName(e.target.value)} />
            <div style={{ display: "inline-block"}}>
            <button id="companyName" className="compny-data-form__button" onClick={handleSave}>
              Save
            </button>
            <div style={{ color: "gray", fontStyle: "italic", float: "right", fontSize: "12px" , paddingLeft:"10px"}}>
               You can change me, after just click on save
            </div>
          </div>
          </label>
          <br />
          <label className="company-data-form__label">
            Email:
            <input className="company-data-form__input" type="text" defaultValue={companyInfo['email']} onChange={(e) => setEmail(e.target.value)} />
            <div style={{ display: "inline-block"}}>
            <button id="companyEmail" className="company-data-form__button" onClick={handleSave}>
              Save
            </button>
            <div style={{ color: "gray", fontStyle: "italic", float: "right", fontSize: "12px" , paddingLeft:"10px"}}>
               You can change me, after just click on save
            </div>
          </div>
          </label>
          <label className="company-data-form__label">
            Password:
            <input className="company-data-form__input" type="password" defaultValue={companyInfo['password']} onChange={(e) => setPassword(e.target.value)} />
            <div style={{ display: "inline-block"}}>
            <button id="companyPassword" className="company-data-form__button" onClick={handleSave}>
              Save
            </button>
            <div style={{ color: "gray", fontStyle: "italic", float: "right", fontSize: "12px" , paddingLeft:"10px"}}>
              The password must contain at least 8 characters, an uppercase letter, a lowercase letter, and a symbol
            </div>
          </div>
          </label>
        </form>
    );
}

export default CompanyDataForm;