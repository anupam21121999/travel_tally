import {useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FaSignOutAlt, FaCar} from 'react-icons/fa';
import { useNavTitle } from './NavTitleContext';

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
  const { navTitle, clearNavTitle } = useNavTitle();
  const [showConfirm, setShowConfirm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearNavTitle();
    setShowConfirm(false);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 shadow-md p-1.5 flex justify-between items-center">
      <div className="flex items-center space-x-2 text-white text-lg font-semibold tracking-wide ml-3 pt-2 pb-2">
          <FaCar className="text-white text-2xl"/>
          <span className="font-sans font-bold text-2xl">{navTitle}</span>
        </div>
      {navTitle!="Travel Tally" && <SlideTabs/>}
      {navTitle!="Travel Tally" && <button
          onClick={() => setShowConfirm(true)}
          className="text-white p-3 bg-gray-900 hover:bg-gray-500 transition rounded-full mr-3"
          title="Log out"
        >
          <FaSignOutAlt size={30} />
        </button>}
    </nav>

    {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-md p-6 max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to log out?</h2>
            <div className="flex justify-around mt-4">
              <Link
                onClick={handleLogout}
                to="/login"
                className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition"
              >
                Yes, Log Out
              </Link>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-400 px-4 py-2 rounded-xl hover:bg-gray-900 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
