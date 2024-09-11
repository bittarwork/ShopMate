import React from "react";
import Sidebar from "../../components/navbar/sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../../components/addProduct/AddProduct";
import ListProduct from "../../components/listProduct/ListProduct";
import "./admin.css";

const Admin = () => {
  return (
    <div className="admin flex">
      <Sidebar />
      <main className="admin-content flex-1 p-[20px]">
        <Routes>
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/listproduct" element={<ListProduct />} />
        </Routes>
      </main>
    </div>
  );
};

export default Admin;
