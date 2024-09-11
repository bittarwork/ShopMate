import React, { useEffect, useState } from "react";
import cross_icon from "../../assets/cross_icon.png";
import "./listproduct.css";

const ListProduct = () => {
  const [allproducts, setAllproducts] = useState([]);

  // Function to fetch all products from the server
  const fetchInfo = async () => {
    try {
      const response = await fetch("http://localhost:5000/allproducts");
      const data = await response.json();
      setAllproducts(data);
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  // Function to remove a product by ID
  const removeProduct = async (id) => {
    try {
      await fetch("http://localhost:5000/removeproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      await fetchInfo(); // Refresh the product list
    } catch (error) {
      alert("Failed to remove product");
    }
  };

  useEffect(() => {
    fetchInfo(); // Fetch products when the component mounts
  }, []);

  return (
    <>
      <div className="list-product flex flex-col items-center w-full h-[740px] p-[10px_50px] m-[30px] rounded-[6px] bg-white">
        <h1>All Products in ShopMate</h1>
        <div className="listproduct-format-main grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] text-[15px] font-medium gap-[10px] w-full py-[20px] text-[#454545]">
          <p>Product Image</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <div className="listproduct-allproducts w-full overflow-y-auto">
          <hr />
          {allproducts.map((product, index) => (
            <React.Fragment key={index}>
              <div className="listproduct-format-main listproduct-format grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] text-[15px] font-medium gap-[10px] w-full py-[20px] text-[#454545] items-center">
                <img
                  src={product.image}
                  alt={`${product.name} image`}
                  className="listproduct-product-icon h-[80px] m-auto"
                />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img
                  onClick={() => removeProduct(product.id)}
                  className="listproduct-remove-icon cursor-pointer m-auto"
                  src={cross_icon}
                  alt="Remove icon"
                />
              </div>
              <hr />
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListProduct;
