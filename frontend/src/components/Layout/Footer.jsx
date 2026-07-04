import React from "react";
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import {
  footerCompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="text-white bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Newsletter Section */}
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-gradient-to-r from-blue-600 to-purple-600 py-10">
        <div className="lg:w-2/5">
          <h1 className="lg:text-3xl font-bold text-2xl md:mb-0 mb-4 lg:leading-normal">
            <span className="text-yellow-300">Subscribe</span> for Latest News,
            <br />
            Events & Exclusive Offers
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            className="text-gray-800 sm:w-80 w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
            required
            placeholder="Enter your email..."
          />
          <button className="bg-yellow-400 hover:bg-yellow-300 duration-300 px-6 py-3 rounded-lg text-gray-900 font-semibold sm:w-auto w-full transition-all hover:shadow-lg">
            Subscribe
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:px-12 px-6 py-16">
        {/* Brand Section */}
        <ul className="flex flex-col">
          <div className="mb-6">
            <img
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"
              alt="logo"
              className="h-10 filter brightness-0 invert mb-4"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Your premium destination for home decor and lifestyle products. 
              Quality meets elegance in every product we offer.
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <a
              href="https://twitter.com/RihaShehzadi"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-500 transition-all duration-300"
            >
              <FaTwitter size={18} />
            </a>
            <a
              href="https://github.com/codingwithriha"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gray-600 transition-all duration-300"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://instagram.com/riha_shahzadi"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-600 transition-all duration-300"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://linkedin.com/in/riha-shahzadi"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-700 transition-all duration-300"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="https://facebook.com/100077588075894"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-all duration-300"
            >
              <FaFacebook size={18} />
            </a>
          </div>
        </ul>

        {/* Company Links */}
        <ul className="flex flex-col">
          <h1 className="mb-6 font-bold text-lg text-white">Company</h1>
          {footerProductLinks &&
            footerProductLinks.map((i, index) => {
              return (
                <li key={index}>
                  <Link
                    className="text-gray-400 hover:text-yellow-300 duration-300 text-sm cursor-pointer leading-7 block transition-colors"
                    to={i.link}
                  >
                    {i.name}
                  </Link>
                </li>
              );
            })}
        </ul>

        {/* Shop Links */}
        <ul className="flex flex-col">
          <h1 className="mb-6 font-bold text-lg text-white">Shop</h1>
          {footerCompanyLinks &&
            footerCompanyLinks.map((i, index) => {
              return (
                <li key={index}>
                  <Link
                    className="text-gray-400 hover:text-yellow-300 duration-300 text-sm cursor-pointer leading-7 block transition-colors"
                    to={i.link}
                  >
                    {i.name}
                  </Link>
                </li>
              );
            })}
        </ul>

        {/* Support Links */}
        <ul className="flex flex-col">
          <h1 className="mb-6 font-bold text-lg text-white">Support</h1>
          {footerSupportLinks &&
            footerSupportLinks.map((i, index) => {
              return (
                <li key={index}>
                  <Link
                    className="text-gray-400 hover:text-yellow-300 duration-300 text-sm cursor-pointer leading-7 block transition-colors"
                    to={i.link}
                  >
                    {i.name}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center pt-8 text-gray-400 text-sm pb-8 sm:px-12 px-6">
          <span className="text-left sm:text-center">
            © Codingwithriha {new Date().getFullYear()}. All rights reserved.
          </span>
          <div className="flex justify-center gap-6">
            <Link to="#" className="hover:text-yellow-300 transition-colors">Terms</Link>
            <Link to="#" className="hover:text-yellow-300 transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-yellow-300 transition-colors">Policy</Link>
          </div>
          <div className="flex justify-center sm:justify-end items-center">
            <img
              src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
              alt="payment-methods"
              className="h-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
