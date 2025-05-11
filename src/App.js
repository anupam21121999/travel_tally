import "./App.css";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import AnimatedRoutes from './components/animated/AnimatedRoutes';
import Navbar from './components/navbar/Navbar';
import { NavTitleProvider } from "./components/navbar/NavTitleContext"
function App() {
  return (
    <NavTitleProvider>
      <Router>
        <Navbar />
        <AnimatedRoutes />
      </Router>
    </NavTitleProvider>
  );
}

export default App;
