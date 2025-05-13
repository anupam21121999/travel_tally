// components/AnimatedRoutes.jsx
import { AnimatePresence } from "framer-motion";
import ServiceRecord from "../service_record/ServiceRecord";
import DisplayBills from "../display_bills/DisplayBills";
import ImgToPdf from "../img_to_pdf/ImgToPdf";
import Login from "../login_page/Login";
import Signup from "../signup_page/Signup";
import ForgotPassword from "../forgot_password/ForgotPassword";
import ChangePassword from "../change_password/ChangePassword";
import CorporationInfo from "../corporation_info/CorporationInfo";
import Driverdetails1 from "../driver_detail/Driverdetails1";
import Driverdetails2 from "../driver_detail/Driverdetails2";
import Driverdashboard from "../driver_detail/Driverdashboard";
import ProtectedRoute from "../protected/protected";
import Vehicledashboard from "../vehicle_details/Vehicledashboard";
import Vehicledetail from "../vehicle_details/Vehicledetail";
import BillingSystem from "../billing_system/BillingSystem";
import Dashboard from "../dashboard/Dashboard";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Client from "../client_page/Client";
import ClientDetail from "../client_page/ClientDetail";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/billing_system" element={<BillingSystem />} />
          <Route path="/service_record" element={<ServiceRecord />} />
          <Route path="/display_bills" element={<DisplayBills />} />
          <Route path="/img_to_pdf" element={<ImgToPdf />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/change_password" element={<ChangePassword />} />
          <Route path="/corporation_info" element={<CorporationInfo />} />
          <Route path="/driver_details1" element={<Driverdetails1 />} />
          <Route path="/driver_details2/:id" element={<Driverdetails2 />} />
          <Route path="/driver_dashboard" element={<Driverdashboard />} />
          <Route path="/vehicle_dashboard" element={<Vehicledashboard />} />
          <Route path="/vehicle_detail" element={<Vehicledetail />} />
          <Route path="/clients" element={<Client />} />
          <Route path="/client_register" element={<ClientDetail />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
