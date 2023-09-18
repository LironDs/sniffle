import { useState, useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CreateCard from "./components/CreateCard";
import UserCards from "./components/UserCards";
import Footer from "./components/Footer";
import UpdateCard from "./components/UpdateCard";
import CardInfo from "./components/CardInfo";
import UserProfile from "./components/UserProfile";
import About from "./components/About";
import Crm from "./components/Crm";
import FavCards from "./components/FavCards";
import { ToastContainer } from "react-toastify";
import PageNotFound404 from "./components/PageNotFound404";
import jwtDecode from "jwt-decode";

function App() {
  let [userInfo, setUserInfo] = useState(
    JSON.parse(sessionStorage.getItem("userInfo") as string) == null
      ? { email: false }
      : JSON.parse(sessionStorage.getItem("userInfo") as string)
  );

  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Navbar setUserInfo={setUserInfo} userInfo={userInfo} />
        <Routes>
          <Route path="/" element={<Home userInfo={userInfo} />} />
          <Route path="/aboutSniffle" element={<About />} />
          <Route path="/favorites" element={<FavCards userInfo={userInfo} />} />
          <Route path="/crm" element={<Crm />} />
          <Route path="/login" element={<Login setUserInfo={setUserInfo} userInfo={userInfo} />} />
          <Route path="/register" element={<Register setUserInfo={setUserInfo} />} />
          <Route path="/cards/new" element={<CreateCard userInfo={userInfo} />} />
          <Route path="/user-cards" element={<UserCards userInfo={userInfo} />} />
          <Route path="/cards/update/:_id" element={<UpdateCard />} />
          <Route path="/cards/:_id" element={<CardInfo />} />
          <Route
            path="users/user-profile/:_id"
            element={<UserProfile setUserInfo={setUserInfo} userInfo={userInfo} />}
          />
          <Route path="*" element={<PageNotFound404 />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
