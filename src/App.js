import "./App.css";
import BillingSystem from "./components/billing_system/BillingSystem";
import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import ServiceRecord from "./components/service_record/ServiceRecord";
import Logout from "./components/logout/Logout";
import DisplayBills from "./components/display_bills/DisplayBills";
import ImgToPdf from "./components/img_to_pdf/ImgToPdf";
import Login from "./components/login_page/Login";
import Signup from "./components/signup_page/Signup";
import ForgotPassword from "./components/forgot_password/ForgotPassword";
import ChangePassword from "./components/change_password/ChangePassword";
import CorporationInfo from "./components/corporation_info/CorporationInfo";
import Driverdetails1 from "./components/driver_detail/Driverdetails1";
import Driverdetails2 from "./components/driver_detail/Driverdetails2";
import Driverdashboard from "./components/driver_detail/Driverdashboard";
import ProtectedRoute from "./components/protected/protected";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/billing_system" element={<BillingSystem />} />
            <Route path="/service_record" element={<ServiceRecord />} />
            <Route path="/display_bills" element={<DisplayBills />} />
            <Route path="/img_to_pdf" element={<ImgToPdf />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route path="/change_password" element={<ChangePassword />} />
            <Route path="/corporation_info" element={<CorporationInfo />} />
            <Route path="/driver_details1" element={<Driverdetails1 />} />
            <Route path="/driver_details2/:id" element={<Driverdetails2 />} />
            <Route path="/driver_dashboard" element={<Driverdashboard />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
