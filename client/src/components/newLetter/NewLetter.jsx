import React, { useEffect, useRef, useState } from "react";
import "./newletter.css";
import axios from "axios";

const NewLetter = () => {
  const [email, setEmail] = useState("");
  const mailRef = useRef();
  const URL = import.meta.env.VITE_APP_API;

  const changeHandler = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!email) {
      alert("Please enter a valid email.");
      return;
    }
    try {
      // Make POST request to the API endpoint to save the email
      await axios.post(`${URL}/subscribe`, { email });
      alert("Successfully subscribed. Thank you for subscribing!");
      setEmail(""); // Clear input field after submission
      mailRef.current.focus(); // Optional: refocus input field
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("There was an error subscribing. Please try again later.");
    }
  };

  useEffect(() => {
    // Optional: Check or fetch any initial data if needed
    axios(`${URL}/`)
      .then((res) => console.log(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, [URL]);

  return (
    <div className="newsletter w-[80%] h-[40vh] flex flex-col bg-gradient-to-b from-[#E9EAE3] to-[#e1ffea22] items-center justify-center m-auto px-[140px] lg:mb-[90px] md:mb-[70px] sm:mb-[50px] mb-[45px] gap-[35px]">
      <div className="flex flex-col items-center gap-[10px]">
        <h1 className="text-[#171717] text-[40px] font-semibold">
          Get Exclusive Offers On Your Email
        </h1>
        <p className="text-red-600 text-[18px] font-semibold">
          Subscribe to our newsletter and stay updated
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between bg-white w-[730px] h-[70px] rounded-[80px] border-solid border-[1px] border-[#e3e3e3]"
      >
        <input
          ref={mailRef}
          onChange={changeHandler}
          className="w-[500px] ml-[30px] border-none outline-none text-[#616161] text-[14px]"
          name="email"
          value={email}
          type="email"
          placeholder="Your email"
          required
        />
        <button
          type="submit"
          className="w-[210px] h-[70px] rounded-[80px] bg-black tracking-[1px] text-white text-[15px] font-bold cursor-pointer hover:text-[#adadad]"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewLetter;
