import React from "react";
import styles from "../../../styles/styles";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const Hero = () => {
  return (
    <div className="relative min-h-[85vh] 800px:min-h-[90vh] w-full overflow-hidden">
      {/* Background with gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className={`relative z-10 ${styles.section} ${styles.normalFlex} h-full`}>
        <div className="w-[90%] 800px:w-[55%] text-white">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
            <span className="text-sm font-semibold tracking-wide">NEW COLLECTION 2024</span>
          </div>
          
          <h1 className="text-[40px] leading-[1.1] 800px:text-[65px] font-bold mb-6 animate-fade-in">
            Discover Premium
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Home Decor
            </span>
          </h1>
          
          <p className="text-[16px] 800px:text-[18px] font-light text-gray-200 mb-8 leading-relaxed max-w-xl">
            Transform your living space into a masterpiece of elegance and comfort. 
            Discover stylish, high-quality home décor that reflects your unique taste. 
            From modern minimalism to timeless classics, create a home that truly inspires.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/products" className="group">
              <div className={`${styles.button} !bg-gradient-to-r !from-blue-600 !to-purple-600 !h-[50px] !rounded-full !px-8 !flex items-center gap-2 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1`}>
                <span className="text-white font-semibold text-[16px]">Shop Now</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            
            <Link to="/best-selling" className="group">
              <div className="!h-[50px] !rounded-full !px-8 !flex items-center gap-2 border-2 border-white/30 hover:border-white/60 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                <span className="text-white font-medium text-[16px]">Best Sellers</span>
              </div>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12 pt-8 border-t border-white/20">
            <div>
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-sm text-gray-300">Products</div>
            </div>
            <div>
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-sm text-gray-300">Customers</div>
            </div>
            <div>
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm text-gray-300">Sellers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
