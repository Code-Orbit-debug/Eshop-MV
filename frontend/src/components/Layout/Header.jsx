import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { categoriesData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const { wishlist } = useSelector((state) => state.wishlist);
  const handleSearchChange = (e) => {
    e.preventDefault();
    const term = e.target.value;
    setSearchTerm(term);
    const filterProductData =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filterProductData);
  };
  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });
  const handleSuggestionClick = () => {
    setSearchTerm("");
    setSearchData([]);
  };

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="home-logo"
                className="mt-2 cursor-pointer"
              />
            </Link>
          </div>
          {/* Search Box Working */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Your Accessries..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    console.log(i);
                    return (
                      <Link
                        to={`/product/${i._id}`}
                        key={index}
                        onClick={handleSuggestionClick}
                      >
                        <div className="w-full flex  items-start py-3 ">
                          <img
                            src={i.images[0].url}
                            className="w-[40px] h-[40px] mr-[10px] "
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
            {/* ending searchBox styling */}
          </div>
          {/* Styling for seller button */}
          <div className={`${styles.button}`}>
            <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
              <h1 className="text-white flex items-center">
                {isSeller ? "DASHBOARD" : "CREATE SHOP"}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
          {/* ending styling for selling button */}
        </div>
      </div>
      {/* styling for fixed navbar  only for big screen*/}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
      >
        <div
          className={`${styles.section} ${styles.normalFlex} relative justify-between`}
        >
          {/* Categeories Dropdown */}
          <div
            onClick={() => {
              setDropDown(!dropDown);
            }}
          >
            <div className="relative mt-[10px] h-[50px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft className="absolute top-3 left-2" size={30} />
              <button className="h-[100%] w-full flex justify-between items-center pl-10 bg-white text-lg font-sans font-[500] select-none rounded-t-md">
                All Categories
              </button>
              {/* dropdown Arrow |Type| */}
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
              {/* Complete Categories DropDown  */}
            </div>
          </div>
          {/* Staring navItems styling */}
          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeading} />
          </div>
          {/* Speacial Icons */}
          <div className={`${styles.normalFlex}`}>
            {/* Wishlist Clicking */}
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative mr-[15px] cursor-pointer"
                onClick={() => setOpenWishlist(!openWishlist)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255/83%)" />
                <span className="absolute  right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4  p-0 m-0 text-white font-monospace text-center  font-[12px] leading-tight ">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>
            {/* Shoping Cart clicking */}
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative mr-[15px] cursor-pointer"
                onClick={() => setOpenCart(!openCart)}
              >
                <AiOutlineShoppingCart size={30} color="rgb(255 255 255/83%)" />
                <span className="absolute  right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4  p-0 m-0 text-white font-monospace text-center  font-[12px] leading-tight ">
                  {cart && cart.length}
                </span>
              </div>
            </div>
            {/* Profile Picture styling */}
            <div className={`${styles.normalFlex}`}>
              <div className="relative mr-[15px] cursor-pointer">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      className="h-[35px] w-[35px] rounded-full"
                      src={`${user?.avatar?.url}`}
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255/83%)" />
                  </Link>
                )}
              </div>
            </div>
            {/* OpenCart  Fixed Positend PopUp*/}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
            {/* Wishlist  Fixed Positend PopUp*/}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>
      {/* Header for small screens */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="home-logo"
                className="mt-3 cursor-pointer"
              />
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px] cursor-pointer"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span className="absolute  right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4  p-0 m-0 text-white font-monospace text-center  font-[12px] leading-tight ">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {/* OpenCart  Fixed Positend PopUp*/}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
          {/* Wishlist  Fixed Positend PopUp*/}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>
        {/* sidebar menu */}
        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div
                    className="relative mr-[15px] cursor-pointer"
                    onClick={() => setOpenWishlist(true) || setOpen(false)}
                  >
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute   right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="my-8 w-[98%] m-auto h-[40px] relative">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchData && (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData.map((i, index) => {
                      return (
                        <Link to={`/product/${i._id}`} key={index}>
                          <div className="flex items-center">
                            <img
                              src={`${i.images[0]?.url}`}
                              alt=""
                              className="w-[50px] mr-2"
                            />
                            <h5>{i.name}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
              <Navbar active={activeHeading} />
              <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
                  <h1 className="text-white flex items-center">
                    {isSeller ? "DASHBOARD" : "CREATE SHOP"}
                    <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />
              <div className="flex w-full justify-center">
                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/login"
                      className="text-[18px] pr-[10px] text-[#0008]"
                    >
                      Login/
                    </Link>
                    <Link to="/signup" className="text-[18px] text-[#0008]">
                      SignUp
                    </Link>
                  </>
                ) : (
                  <>
                    <div>
                      <Link to={"/profile"}>
                        <img
                          src={`${user.avatar?.url}`}
                          alt=""
                          className="w-[60px] h-[60px] rounded-full border-[3px] border-[#3ddad2]"
                        />
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
