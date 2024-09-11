import React from "react";
import PropTypes from "prop-types";
import arrow_icon from "../assets/breadcrum_arrow.png";
import "./breadcrums.css";

const Breadcrums = ({ product }) => {
  return (
    <div className="breadcrum flex items-center gap-[8px] text-[#5e5e5e] text-[14px] font-medium m-[45px_150px] capitalize">
      HOME <img className="inline" src={arrow_icon} alt="Arrow" /> SHOP{" "}
      <img className="inline" src={arrow_icon} alt="Arrow" /> {product.category}{" "}
      <img className="inline" src={arrow_icon} alt="Arrow" /> {product.name}
    </div>
  );
};

Breadcrums.propTypes = {
  product: PropTypes.shape({
    category: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Breadcrums;
