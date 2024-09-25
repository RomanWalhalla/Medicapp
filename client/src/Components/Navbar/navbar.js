import "./navbar.css";
import logo from "../../img/logo.png"
import { Link, NavLink } from "react-router-dom";
import React, { useContext, useEffect, useRef, useState } from "react";
import Context from "../../context/Context";
import Login_foto_1 from "../../img/Login_foto_1.jpg"

import { FaRegUser } from "react-icons/fa6";
import { FcSettings } from "react-icons/fc";
import { TbReportSearch } from "react-icons/tb";
import { TbLogout } from "react-icons/tb";

// import useLoadUserData from "../../api/loadUserData";
import useLoadUserData from "../../api/loadUserData";

const Navbar = () => {
    const { logout, isLoggedIn, /* loading, setLoading  *//* notifyError, */ } = useContext(Context)

    // Menu Login //
    const [menuLoginOpen, setMenuLoginOpen] = useState(false)
    const menuRef = useRef(null)
    
    const { navbarData } = useLoadUserData("Navbar");
    
    const menuLoginHandler = () => {
        // event.stopPropagation()
        setMenuLoginOpen(prevState => !prevState)
    }
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuLoginOpen(false)
                closeBurger()
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    })

    // Burger menu //
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

    const closeBurger = () => {
        setIsMenuClicked(false);
        setBurgerClass("burger-bar unclicked");
        setBurgerMenu("menu hidden");
    }

    // -------------------------------------------------------------------------------

    // if (loading) {
    //     return <div>Loading...</div>; // Показываем индикатор загрузки, пока не загрузится начальное состояние
    // }

    if (!navbarData) {
        return <div>Loading user data...</div>;
    }
    // console.log("Navbar-userData", userData);

    return (
        <>
            <header>
                <nav>
                    <div className="nav_logo">
                        <NavLink to="/">
                            StayHealthy <span><img src={logo} id="logo" alt="Logo" /></span>
                        </NavLink>
                    </div>
                    <div className="nav_links">
                        <div className="link">
                            <NavLink to="/home">
                                Home
                            </NavLink>
                        </div>
                        <div className="link">
                            <NavLink to="/appointments">
                                Appointments
                            </NavLink>
                        </div>
                        <div className="link">
                            <NavLink to="/healthBlog">
                                Health Blog
                            </NavLink>
                        </div>
                        <div className="link">
                            <NavLink to="/reviews">
                                Reviews
                            </NavLink>
                        </div>
                    </div>
                    <div className="burger_account_logo">
                        <div><button type="button" className="burger_button" onClick={updateMenu}>
                            <span className={burger_class}></span>
                            <span className={burger_class}></span>
                            <span className={burger_class}></span>
                        </button>
                        </div>
                        {isLoggedIn ? (
                            <div>
                                <div className="logout_div">
                                    <span className="logout_text">Welcome, <span className="logout_name">{navbarData.firstName}</span>  </span>
                                    <span className="logout_foto" onClick={menuLoginHandler}><img src={Login_foto_1} alt="account" /></span>
                                </div>
                                {menuLoginOpen ? (
                                    <>
                                        <div className="menu_login_div" ref={menuRef}>
                                            <div className="menu_login_logo">
                                                <img src={Login_foto_1} alt="account" />
                                                <div className="menu_login_text">
                                                    <span style={{ color: "white" }}>{navbarData.firstName}</span> <br />
                                                    <span style={{ color: "darkblue" }}> {navbarData.email}</span>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="menu_login">
                                                <Link to="/profile" onClick={menuLoginHandler}>
                                                    <FaRegUser /> View profile
                                                </Link>
                                            </div>
                                            <div className="menu_login">
                                                <Link to="/profile/settings" onClick={menuLoginHandler}>
                                                    <FcSettings /> Account settings
                                                </Link>
                                            </div>
                                            <div className="menu_login">
                                                <Link to="/profile/reports" onClick={menuLoginHandler}>
                                                    <TbReportSearch /> Reports
                                                </Link>
                                            </div>
                                            <hr />
                                            <div className="menu_login">
                                                <Link to="" onClick={() => { logout(); closeBurger(); menuLoginHandler() }}>
                                                    <TbLogout /> Logout
                                                </Link>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                    </>
                                )
                                }
                            </div>
                        ) : (
                            <>
                                <div className="link_auth_div">
                                    <div className="link_auth">
                                        <NavLink to="/register">
                                            <button className="btn_signup_login">Sign Up</button>
                                        </NavLink>
                                    </div>
                                    <div className="link_auth">
                                        <NavLink to="/login">
                                            <button className="btn_signup_login">Login</button>
                                        </NavLink>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </nav >
            </header >
            <div className={burger_menu}>
                {isMenuClicked ? (
                    <>
                        <div className="burger_menu_text" ref={menuRef}>
                            <div className="burger_menu_links">
                                <NavLink to="/home" onClick={closeBurger}>
                                    Home
                                </NavLink>
                            </div>
                            <div className="burger_menu_links">
                                <NavLink to="/appointments" onClick={closeBurger}>
                                    Appointments
                                </NavLink>
                            </div>
                            <div className="burger_menu_links">
                                <NavLink to="/healthBlog" onClick={closeBurger}>
                                    Health Blog
                                </NavLink>
                            </div>
                            <div className="burger_menu_links">
                                <NavLink to="/reviews" onClick={closeBurger}>
                                    Reviews
                                </NavLink>
                            </div>
                            {isLoggedIn ? (
                                <>
                                    <div className="menu_login">
                                        <Link to="" onClick={() => { logout(); closeBurger(); menuLoginHandler() }}>
                                            <TbLogout /> Logout
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <NavLink to="/register">
                                            <button className="btn_burger_auth">Sign Up</button>
                                        </NavLink>
                                    </div>
                                    <div>
                                        <NavLink to="/login">
                                            <button className="btn_burger_auth">Login</button>
                                        </NavLink>
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                ) : (
                    <></>
                )
                }
            </div >
        </>
    );
}


export default Navbar;

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