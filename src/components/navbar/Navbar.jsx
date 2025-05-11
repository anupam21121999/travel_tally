import {useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const SlideTabs = () => {
  const [positon, setPosition] = useState({
    left: 0,
    width:0,
    opacity: 0,
  });
  return (
    <ul onMouseLeave={()=>{
      setPosition((pv)=>({
        ...pv,
        opacity: 0,
      }));
    }} className="relative mx-auto flex w-fit rounded-full border-2 bg-gray-900 border-white p-1.5">
      <Tab setPosition={setPosition} to="/">Home</Tab>
      <Tab setPosition={setPosition} to="/vehicle_dashboard">Vehicle Details</Tab>
      <Tab setPosition={setPosition} to="/driver_dashboard">Driver Details</Tab>
      <Tab setPosition={setPosition} to="/service_record">Service Records</Tab>
      <Tab setPosition={setPosition} to="/clients">Clients</Tab>
      <Tab setPosition={setPosition} to="/billing_system">Bills</Tab>
      <Cursor positon={positon}/>
    </ul>
  );
};

const Tab = ({children, setPosition, to}) =>{
  const {pathname} = useLocation();
  const isActive = pathname === to;
  console.log(isActive)
  const ref = useRef(null);
  return (
    <li ref={ref} onMouseEnter={()=>{
      if(!ref.current) return;
      const {width} = ref.current.getBoundingClientRect();
      setPosition({
        width,
        opacity: 1,
        left: ref.current.offsetLeft,
      });
    }} className={`relative z-10 block cursor-pointer px-3 py-1.5 uppercase text-white mix-blend-difference md:px-5 md:py-4 md:text-base ${ isActive ? 'font-extrabold underline underline-offset-[7px]' : 'text-xs'}`}>
      <Link to={to}>
        {children}
      </Link>
    </li>
  );
}

const Cursor = ({positon}) => {
  return (
    <motion.li
      animate={positon}
      className="absolute z-0 h-auto rounded-full bg-white md:h-12 m-1"
    />
  );
}

const Navbar = () => {
  const corpDetails = localStorage.getItem("corpName");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("corpName");
  };

  return (
    <nav className="fixed top-0 left-0 w-full place-content-center z-50 bg-gray-900 shadow-md p-1.5">
      <SlideTabs/>
    </nav>
    // <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-gray-900 to-gray-950 shadow-md">
    //   <ul className="flex flex-wrap items-center justify-between px-6 py-4 text-white text-lg font-semibold">
    //     <li className="text-xl font-bold">{corpDetails}</li>
    //     <div className="flex gap-10 flex-wrap justify-end">
    //       <li>
    //         <Link
    //           to="/billing_system"
    //           className="hover:text-yellow-200 transition-colors duration-200"
    //         >
    //           Billing System
    //         </Link>
    //       </li>
    //       <li>
    //         <Link
    //           to="/service_record"
    //           className="hover:text-yellow-200 transition-colors duration-200"
    //         >
    //           Service Record
    //         </Link>
    //       </li>
    //       <li>
    //         <Link
    //           to="/display_bills"
    //           className="hover:text-yellow-200 transition-colors duration-200"
    //         >
    //           Display Bills
    //         </Link>
    //       </li>
    //       <li>
    //         <Link
    //           to="/driver_dashboard"
    //           className="hover:text-yellow-200 transition-colors duration-200"
    //         >
    //           Driver Details
    //         </Link>
    //       </li>
    //       <li>
    //         <Link
    //           to="/vehicle_dashboard"
    //           className="hover:text-yellow-200 transition-colors duration-200"
    //         >
    //           Vehicle Details
    //         </Link>
    //       </li>
    //       <li>
    //         <Link
    //           to="/login"
    //           onClick={handleLogout}
    //           className="hover:text-red-200 transition-colors duration-200"
    //         >
    //           Logout
    //         </Link>
    //       </li>
    //     </div>
    //   </ul>
    // </nav>
  );
};

export default Navbar;
