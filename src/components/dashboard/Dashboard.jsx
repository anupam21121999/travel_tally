import React from "react";
import Dashboardui from "../dashboard_ui/Dashboardui";
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { x: "100vw", opacity: 0},
  in: { x: 0, opacity: 1 },
  out: { x: "-100vw", opacity: 0 },
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3,
};


const Dashboard = () => {
  return (
    <motion.div
  initial='initial'
  animate="in"
  exit="out"
  variants={pageVariants}
  transition={pageTransition}
>
      <Dashboardui />
    </motion.div>
  );
};

export default Dashboard;
