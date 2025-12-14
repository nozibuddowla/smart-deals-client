import React from "react";
import { Link } from "react-router";
import smartDealsLogo from "../../assets/smart_deals_logo.png";
import MyContainer from "../MyContainer";
import { CgMail } from "react-icons/cg";
import { FiPhone } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#001529] text-gray-300 py-12 mt-20">
      <MyContainer className="px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start gap-8 pb-8 border-b border-gray-700">
          {/* Brand Section */}
          <div className="flex flex-col space-y-4">
            <Link to="/">
              <img src={smartDealsLogo} alt="" />
            </Link>
            <p className="leading-6 text-[#a1a1aa]">
              Your trusted marketplace for authentic local products. Discover
              the best deals from across Bangladesh.
            </p>
          </div>

          <div className="flex justify-between items-center gap-4">
            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-white text-xl font-medium">Quick Links</h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/all-products"
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/myProducts"
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="text-white text-xl font-medium">Categories</h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                  >
                    Electronics
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                  >
                    Fashion
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                  >
                    Home & Living
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                  >
                    Groceries
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact & Support */}
          <div className="space-y-4">
            <h3 className="text-white text-xl font-medium">
              Contact & Support
            </h3>
            <ul className="space-y-5">
              <li className="flex items-center gap-3">
                <CgMail size={20} color="#AB47BC" />
                <a
                  href="mailto:support@smartdeals.com"
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                >
                  support@smartdeals.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone size={20} color="#AB47BC" />
                <a
                  href="tel:+8801234567890"
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                >
                  +880 123 456 789
                </a>
              </li>
              <li className="flex items-start gap-3">
                <CiLocationOn size={20} color="#AB47BC" />
                <span className="text-gray-400">
                  123 Commerce Street,
                  <br />
                  Dhaka, Bangladesh
                </span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-white text-xl font-medium">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white hover:bg-purple-600 hover:text-white flex items-center justify-center transition-colors duration-200"
                aria-label="Twitter"
              >
                <FaXTwitter size={20} color="#000" />
              </a>
              <a
                href="https://www.linkedin.com/in/nozibuddowla/"
                target="_blank"
                className="w-10 h-10 rounded-full bg-white hover:bg-purple-600 flex items-center justify-center transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={20} color="#000" />
              </a>
              <a
                href="https://www.facebook.com/nozibuddowla/"
                target="_blank"
                className="w-10 h-10 rounded-full bg-white hover:bg-purple-600 flex items-center justify-center transition-colors duration-200"
                aria-label="Facebook"
              >
                <FaFacebookF size={20} color="#000" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} SmartDeals. All rights reserved.
          </p>
        </div>
      </MyContainer>
    </footer>
  );
};

export default Footer;
