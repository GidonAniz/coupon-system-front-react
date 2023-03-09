import { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import "./Login.css";
import { uiActions } from "../../store/ui-slice";
import {useNavigate } from "react-router";
import Notification from "../../components/Notification/Notification";



const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const loginHandler = (event) => {
    event.preventDefault();
    return checkLogIn(email, password);
  };

  const checkLogIn = async (email, password) => {
    console.log(email, password)
    const response = await fetch(`http://localhost:8080/api/login`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password}),
    });
    console.log(response)
    if (!response.ok) {
      dispatch(
        uiActions.notify({
          status: "error",
          title: "",
          message: "Incorrect Usernmae/Password",
        })
      );
    } else {
      const data = await response.json();
      dispatch(authActions.login(data))
      console.log(data[1]);
      if(data[1] === "customer") {
      navigate ("/customer")
      }else  if(data[1] === "company"){
        navigate ("/company")
      }else {navigate ("/admin")}
    }
  };
  
  return (
    <main className="login">
            <Notification />
      <section>
        <form onSubmit={loginHandler}>
          <div className="control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button>Login</button>
        </form>
      </section>
      <div className="notification-container">
        </div>
    </main>
  );
};
export default Login;
