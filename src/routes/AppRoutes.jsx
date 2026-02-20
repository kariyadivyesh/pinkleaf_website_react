import { BrowserRouter, Routes, Route } from "react-router-dom";

import Guest from "../pages/Guest";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/user/Home";
import Profile from "../pages/user/Profile";
import EditProfile from "../pages/user/Editprofile";


export default function AppRoutes(){

  return(

    <BrowserRouter>

      <Routes>

        {/* Guest Page (without login) */}
        <Route path="/" element={<Guest />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />

        {/* Home Page (after login) */}
        <Route path="/home" element={<Home />} />

        {/* Profile Page */}
        <Route path="/profile" element={<Profile />} />

        {/* Edit Profile Page */}
        <Route path="/editprofile" element={<EditProfile />} />

      </Routes>

    </BrowserRouter>

  );
}
