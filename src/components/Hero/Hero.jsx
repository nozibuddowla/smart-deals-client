// Hero.jsx - Clean and Optimized
import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Hero.css";
import { BiSearch } from "react-icons/bi";
import bgWavePatternLeft from "../../assets/bg-hero-left.png";
import bgWavePatternRight from "../../assets/bg-hero-right.png";
import { NavLink } from "react-router";
import MyContainer from "../MyContainer";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="relative min-h-[400px] sm:min-h-[500px] lg:min-h-[535px] overflow-hidden hero-bg">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Left Wave Pattern - Responsive for all devices */}
        <div
          className="absolute left-0 top-0 bottom-0 w-20 sm:w-24 md:w-32 lg:w-40 xl:w-48 2xl:w-56bg-no-repeat bg-cover bg-left opacity-60 sm:opacity-70 md:opacity-80"
          style={{
            backgroundImage: `url(${bgWavePatternLeft})`,
            backgroundPosition: "left center",
            backgroundSize: "contain",
          }}
        />

        {/* Right Wave Pattern - Responsive for all devices */}
        <div
          className="absolute right-0 top-0 bottom-0 w-20 sm:w-24 md:w-32 lg:w-40 xl:w-48 2xl:w-56 bg-no-repeat bg-cover bg-right opacity-60 sm:opacity-70 md:opacity-80"
          style={{
            backgroundImage: `url(${bgWavePatternRight})`,
            backgroundPosition: "right center",
            backgroundSize: "contain",
          }}
        />
      </div>

      {/* Hero Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20"
      >
        <div className="text-center space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Main Heading */}
          <motion.div
            variants={itemVariants}
            className="space-y-2 sm:space-y-3 lg:space-y-4"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800 leading-tight">
              Deal Your{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600">
                Products
              </span>
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800 leading-tight">
              In A{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-blue-600">
                Smart
              </span>{" "}
              Way !
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-[#627382] max-w-xl lg:max-w-3xl mx-auto px-4"
          >
            SmartDeals helps you sell, resell, and shop from trusted local
            sellers — all in one place!
          </motion.p>

          {/* Search Bar */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="max-w-full sm:max-w-xl lg:max-w-2xl mx-auto px-2"
          >
            <div className="flex w-full relative z-10">
              <div className="relative flex items-center bg-white rounded-l-full shadow-lg lg:shadow-xl overflow-hidden flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Search for Products, Categories..."
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-gray-700 focus:outline-none bg-transparent"
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-4 sm:px-6 py-2 sm:py-3 search-btn text-white rounded-r-full transition-colors"
              >
                <BiSearch className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center px-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base search-btn text-white font-semibold rounded-lg shadow-lg transition-all"
            >
              <NavLink to="/all-products">Watch All Products</NavLink>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-white text-[#632EE3] font-semibold rounded-lg shadow-lg border-2 border-[#632EE3] hover:bg-purple-50 transition-all"
            >
              Post an Product
            </motion.button>
          </motion.div>

          {/* Floating decorative elements */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-10 hidden lg:block"
          >
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-linear-to-br from-purple-400 to-pink-400 rounded-lg transform rotate-12 opacity-80" />
          </motion.div>

          <motion.div
            animate={{
              y: [10, -10, 10],
              rotate: [5, -5, 5],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute top-1/3 right-20 hidden lg:block"
          >
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-linear-to-br from-blue-400 to-purple-400 rounded-full opacity-80" />
          </motion.div>

          <motion.div
            animate={{
              y: [-15, 15, -15],
              rotate: [-8, 8, -8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-1/6 xl:bottom-1/4 left-1/4 xl:left-1/6 hidden lg:block"
          >
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-linear-to-br from-blue-400 to-purple-400 rounded-lg transform -rotate-12 opacity-80" />
          </motion.div>

          <motion.div
            animate={{
              y: [-15, 15, -15],
              rotate: [5, -5, 5],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute bottom-1/6 xl:bottom-1/4 right-1/4 xl:right-1/6 hidden lg:block"
          >
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-linear-to-br from-purple-400 to-pink-400 rounded-full opacity-80" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
