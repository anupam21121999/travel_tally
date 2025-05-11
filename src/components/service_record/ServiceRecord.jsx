import React from "react";
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { x: "100vw", opacity: 0 },
  in: { x: 0, opacity: 1 },
  out: { x: "-100vw", opacity: 0 },
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.5,
};

const ServiceRecord = () => {
  return <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  ><h1 className="text-3xl font-bold">Service Record</h1>
  </motion.div>;
};

export default ServiceRecord;
