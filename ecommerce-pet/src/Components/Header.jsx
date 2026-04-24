import React from 'react';
import { motion } from 'framer-motion';
import petShopIcon from './pet-shop.png'; // Import the image from the components folder

const Header = () => {
  // Framer-motion animation properties
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.5, duration: 1, ease: 'easeOut' } }
  };

  const hoverEffect = {
    hover: { scale: 1.1, transition: { duration: 0.3 } }
  };

  const taglineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, bounce: 0.4 } }
  };

  return (
    <header className="relative bg-gradient-to-r from-blue-950 via-teal-600 to-blue-950 text-white py-12 px-6 sm:px-8 lg:px-12 overflow-hidden">
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center h-full text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center space-y-4 mb-6"
        >
          <motion.div
            initial={{ rotate: -10, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            whileHover="hover"
            variants={hoverEffect}
          >
            <img src={petShopIcon} alt="Pet Shop Icon" className="w-20 h-20" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.1, color: '#66b2ff', transition: { duration: 0.3 } }} // Light blue color
            className="text-5xl font-extrabold drop-shadow-2xl text-white"
          >
            Pet Product Store
          </motion.h1>
        </motion.div>
        <motion.p
          variants={taglineVariants}
          initial="hidden"
          animate="visible"
          className="text-lg font-semibold text-white"
        >
          Find the best products for your furry friends!
        </motion.p>
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className="absolute bottom-0 left-0 right-0 flex justify-center"
        >
          {/* You can add an animated background image or element here */}
        </motion.div>
      </motion.div>
    </header>
  );
};

export default Header;
