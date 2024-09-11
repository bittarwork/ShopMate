import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import add_product_icon from "../../../assets/Product_Cart.svg"; // Assuming this is the icon for adding a product
import list_product_icon from "../../../assets/Product_list_icon.svg"; // Assuming this is the icon for listing products

const Sidebar = () => {
  return (
    <>
      <div className="sidebar flex flex-col bg-white py-[30px] gap-[20px] w-full max-w-[250px] h-screen">
        <Link to={"/addproduct"} className="">
          <div className="sidebar-item flex items-center justify-center gap-[20px] cursor-pointer mx-[20px] p-[5px_10px] rounded-[6px] bg-[#f6f6f6]">
            <img src={add_product_icon} alt="Add Product Icon" />
            <p>Add Product</p>
          </div>
        </Link>
        <Link to={"/listproduct"} className="">
          <div className="sidebar-item flex items-center justify-center gap-[20px] cursor-pointer mx-[20px] p-[5px_10px] rounded-[6px] bg-[#f6f6f6]">
            <img src={list_product_icon} alt="Product List Icon" />
            <p>Product List</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
