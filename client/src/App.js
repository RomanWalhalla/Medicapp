import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navbar/navbar.js";
import Footer from "./Components/Footer/Footer";

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { Context } from "./context/Context.js";
import { useAuth } from "./hooks/auth.hook.js"
import { useRoutes } from "./routes/routes.js";

import LandingPage from "./Pages/NavbarMenu/landingPage.js";
import HomePage from "./Pages/NavbarMenu/home.js";
import HealthBlogPage from "./Pages/NavbarMenu/healthBlog.js";
import ReviewsPage from "./Pages/NavbarMenu/reviews.js";
import AuthPage from "./Pages/NavbarMenu/auth.js";
import { useMessage } from "./hooks/message.hook.js";
import { useEffect, useState, /* useRef */ } from "react";

function App() {
  const { login, logout, loading, setLoading, userData, setUserData, initialState, isLoggedIn } = useAuth()
  const { notifySuccess, notifyError, notifyWarn, notifyInfo } = useMessage()
  const routes = useRoutes(isLoggedIn, loading)

  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    setInitialLoading(false);
  }, []);

  if (initialLoading) {
    return <div>Loading...</div>; // Показываем индикатор загрузки, пока не загрузится начальное состояние
  }

  return (
    <Context.Provider value={{ login, logout, userData, setUserData, loading, setLoading, isLoggedIn, initialState, notifySuccess, notifyError, notifyWarn, notifyInfo }}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/healthBlog" element={<HealthBlogPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
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
// {routes}
// {routes.map((route) => route)}

// useEffect(() => {
//   if (loading) {
//     // Example of how you might handle a loading notification
//     toast.info("Loading...");
//   }
// }, [loading]);

// if (loading) {
//   return <div>Loading...isReady</div>;
// }

// if (loading) {
//   toast.info("Loading...");
//   return null; // Avoid rendering the rest of the app while loading
// }

// {routes.length > 0 && routes.map((route) => route)}

// {isLoggedIn ? (
//   <>
//     <Route path="/profile" element={<Profile />} />
//     <Route path="/profile/settings" element={<Settings />} />
//     <Route path="/Home/InstantConsultation" element={<InstantConsultation />} />
//   </>
// ) : (
//   <Route path="*" element={<Navigate to="/Login" replace />} />
// )}