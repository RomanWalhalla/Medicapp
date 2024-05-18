import "./Navbar.css";
import logo from "../../img/logo.png"

import { NavLink } from "react-router-dom";
import React, { useState } from "react";

const Navbar = () => {

    // Burger menu
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [burger_menu, setBurgerMenu] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    const updateMenu = () => {
        if (!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setBurgerMenu("menu visible")
        }
        else {
            setBurgerClass("burger-bar unclicked")
            setBurgerMenu("menu hidden")
        }
        setIsMenuClicked(!isMenuClicked)
    }

    // Logged

    // const [click, setClick] = useState(false);

    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [username, setUsername] = useState("");
    // const [email, setEmail] = useState("");
    // const [showDropdown, setShowDropdown] = useState(false);
    // const handleClick = () => setClick(!click);


    // const handleLogout = () => {
    //     sessionStorage.removeItem("auth-token");
    //     sessionStorage.removeItem("name");
    //     sessionStorage.removeItem("email");
    //     sessionStorage.removeItem("phone");
    //     // remove email phone
    //     localStorage.removeItem("doctorData");
    //     setIsLoggedIn(false);
    //     // setUsername("");

    //     // Remove the reviewFormData from local storage
    //     for (let i = 0; i < localStorage.length; i++) {
    //         const key = localStorage.key(i);
    //         if (key.startsWith("reviewFormData_")) {
    //             localStorage.removeItem(key);
    //         }
    //     }
    //     setEmail('');
    //     window.location.reload();
    // }
    // const handleDropdown = () => {
    //     setShowDropdown(!showDropdown);
    // }
    // useEffect(() => {
    //     const storedemail = sessionStorage.getItem("email");

    //     if (storedemail) {
    //         setIsLoggedIn(true);
    //         setUsername(storedemail);
    //     }
    // }, []);

    return (
        <>
            <header>
                <nav>
                    <div className="nav_logo">
                        <NavLink to="/">
                            StayHealthy <span><img src={logo} id="logo" alt="Logo" /></span>
                        </NavLink>
                    </div>
                    <button type="button" className="burger_button" onClick={updateMenu}>
                        <span className={burger_class}></span>
                        <span className={burger_class}></span>
                        <span className={burger_class}></span>
                    </button>
                    <div className="nav_links">
                         {/* onClick={handleClick}> */}
                        <div className="link">
                        <NavLink to="/Home">
                            Home
                        </NavLink>
                    </div>
                    <div className="link">
                        <NavLink to="/Appointments">
                            Appointments
                        </NavLink>
                    </div>
                    <div className="link">
                        <NavLink to="/Health Blog">
                            Health Blog
                        </NavLink>
                    </div>
                    <div className="link">
                        <NavLink to="/Reviews">
                            Reviews
                        </NavLink>
                    </div>
                    <div className="link">
                        <NavLink to="/SignUp">
                            <button className="btn_signup_login">Sign Up</button>
                        </NavLink>
                    </div>
                    <div className="link">
                        <NavLink to="/Login">
                            <button className="btn_signup_login">Login</button>
                        </NavLink>
                    </div>
                </div>
            </nav>
        </header >
            <div className={burger_menu}>
                <div className="link">
                    <NavLink to="/">
                        Home
                    </NavLink>
                </div>
                <div className="link">
                    <NavLink to="/Appointments">
                        Appointments
                    </NavLink>
                </div>
                <div className="link">
                    <NavLink to="/Health Blog">
                        Health Blog
                    </NavLink>
                </div>
                <div className="link">
                    <NavLink to="/Reviews">
                        Reviews
                    </NavLink>
                </div>
                {/* {isLoggedIn ? (
                    <>
                        <div>
                            <button className="btn_logout" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </>
                ) : ( */}
                        <div className="link">
                            <NavLink to="/SignUp">
                                <button className="btn_signup_login">Sign Up</button>
                            </NavLink>
                        </div>
                        <div className="link">
                            <NavLink to="/Login">
                                <button className="btn_signup_login">Login</button>
                            </NavLink>
                        </div>
                {/* )} */}
            </div >
        </>
    );
}

export default Navbar;
