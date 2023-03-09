import "./App.css";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Toolbar from "./components/ToolBar/ToolBar";
import Login from "./pages/Login/Login";
import Customer from "./pages/myProfile/Customer/Customer";
import Company from "./pages/myProfile/Company/Company";
import Admin from "./pages/myProfile/Admin/Admin";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";


const App = () => {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const myProfile = useSelector(state => state.auth.customerType)
  return (
    <>
      {!isAuthenticated && <Toolbar />}
      <Routes>
         <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/customer" element={myProfile === "customer" ? <Customer />: <Login />}/>
        <Route path="/company" element={myProfile === "company" ? <Company />: <Login />}/>
        <Route path="/Admin" element={myProfile === "Admin" ? <Admin />: <Login />}/>

      </Routes>
    </>
  );
};

export default App;
