import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { Context } from "./context/Context.js";
import { useAuth } from "./hooks/auth.hook.js"
import { useRoutes } from "./routes/routes.js";

import LandingPage from "./Pages/NavbarMenu/LandingPage.js";
import HomePage from "./Pages/NavbarMenu/Home.js";
import Appointments from "./Pages/NavbarMenu/Appointments.js";
import HealthBlogPage from "./Pages/NavbarMenu/HealthBlog.js";
import ReviewsPage from "./Pages/NavbarMenu/Reviews.js";
import AuthPage from "./Pages/NavbarMenu/Auth.js";


function App() {
  const { login, logout, token, userId, isReady, userName } = useAuth()
  const isLoggedIn = !!token
  const routes = useRoutes(isLoggedIn)

  return (
    <Context.Provider value={{ login, logout, token, userId, isReady, isLoggedIn, userName }}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Login" element={<AuthPage />} />
            <Route path="/Register" element={<AuthPage />} />
            <Route path="/Home" element={<HomePage />} />
            <Route path="/Appointments" element={<Appointments />} />
            <Route path="/HealthBlog" element={<HealthBlogPage />} />
            <Route path="/Reviews" element={<ReviewsPage />} />
            {routes}
          </Routes>
          <Footer />
          <ToastContainer />
        </BrowserRouter>
      </div>
    </Context.Provider>
  );
}

export default App;

// import 'materialize-css/dist/css/materialize.min.css';
// import 'materialize-css/dist/js/materialize.min.js';