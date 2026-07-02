import React from "react";
import styles from "../../styles/styles";
import { navItems } from "../../static/data";
import { Link } from "react-router-dom";

const Navbar = ({ active }) => {
  return (
    <div className={`block 800px:${styles.normalFlex}`}>
      {navItems.map((i, index) => (
        <div className="flex" key={index}>
          <Link
            to={i.url}
            className={`${
              active === index + 1
                ? "text-[#17dd1f]"
                : "text-[#000] 800px:text-[#fff]"
            }  !pb-[30px] mt-8 800px:pb-0 font-[500] cursor-pointer px-6 `}
          >
            {i.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
