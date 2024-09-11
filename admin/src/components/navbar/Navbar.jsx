import React from "react";
import navlogo from "../../assets/nav-logo.svg"; // Assuming this is your project's logo
import navProfile from "../../assets/nav-profile.svg"; // Assuming this is for user profile
import "./navbar.css";

const Navbar = () => {
  return (
    <>
      <div className="navbar flex items-center justify-between mb-[1px] bg-white p-[15px_60px] shadow-[0px_1px_3px_-2px_#000]">
        <img
          className="nav-logo w-[200px]"
          src={navlogo}
          alt="ShopMate Logo" // Updated alt text
        />
        <img
          className="nav-profile w-[75px]"
          src={navProfile}
          alt="User Profile Icon" // Updated alt text
        />
      </div>
    </>
  );
};

export default Navbar;
