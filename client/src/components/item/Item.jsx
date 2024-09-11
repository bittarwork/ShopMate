import React from "react";
import "./item.css";
import { Link } from "react-router-dom";

const Item = (props) => {
  // Handle image click to scroll to top
  const handleImageClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="item w-[280px]">
      <div className="item-wrap overflow-hidden w-full relative">
        <img
          className="w-full hover:scale-[1.05] transition duration-[0.6s] object-cover"
          onClick={handleImageClick}
          src={props.image}
          alt={props.name}
        />
        <Link to={`/product/${props.id}`}>
          <button className="cursor-pointer absolute left-[50%] transform -translate-x-[50%] bottom-[10px] transition duration-[0.3s] ease-in-out flex items-center justify-center w-[130px] h-[40px] rounded-[75px] bg-[#e6e6e6] text-[#111111] text-[15px] font-normal hover:bg-black hover:text-white">
            Quick View
          </button>
        </Link>
      </div>
      <p className="my-[6px] text-[#858585]">{props.name}</p>
      <div className="item-prices flex gap-[20px]">
        <div className="item-price-new text-[#666666] text-[16px] font-semibold">
          ${props.new_price}
        </div>
        {props.old_price && (
          <div className="item-price-old text-[#666666] text-[16px] font-medium line-through">
            ${props.old_price}
          </div>
        )}
      </div>
    </div>
  );
};

export default Item;
