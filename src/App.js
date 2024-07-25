import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";


import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import Appointments from "./Pages/Appointments";
import InstantConsultation from './Components/InstantConsultation/InstantConsultation';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Appointments" element={<Appointments />} />
          <Route path="/InstantConsultation" element={<InstantConsultation />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
