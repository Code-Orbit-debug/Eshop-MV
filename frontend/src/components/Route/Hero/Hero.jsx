import React from "react";
import styles from "../../../styles/styles";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.normalFlex}`}
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className={`${styles.section} w-[90%]   800px:w-[60%] `}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
          Best Collections for <br />
          Home Decoration
        </h1>
        <p className="pt-5 text-[16px] font-[poppins] font-[400] text-slate-900 ">
          Transform your living space into a masterpiece of elegance and
          comfort. Discover stylish, high-quality home décor <br /> that
          reflects your unique taste. From modern minimalism to timeless
          classics, create a home that truly inspires.
          <br /> Enhance every room with exquisite designs, luxurious textures,
          and artistic details. Your dream home starts here!
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-5 `}>
            <span className="text-[#fff] font-[poppins] text-[18px]">
              Shop Now !
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Hero;
