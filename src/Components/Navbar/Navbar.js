import "./Navbar.css";
import logo from "../../img/logo.png"
// import "./Navbar_burger"


const Navbar = () => {
    return (
        <>
            <header>
                <nav>
                    <div className="nav_logo">
                        <a href="./LandingPage.html">
                            StayHealthy <span><img src={logo} id="logo" alt="Logo" /></span></a>
                    </div>
                    <button type="button" className="burger_button">
                        <span></span><span></span>
                        <span></span>
                    </button>
                    <ul className="nav_links">
                        <li className="link">
                            <a href="./Menu.html">Home</a>
                        </li>
                        <li className="link">
                            <a href="./Appointments.html">Appointments</a>
                        </li>
                        <li className="link">
                            <a href="./HealthBlog.html">Health Blog</a>
                        </li>
                        <li className="link">
                            <a href="./Reviews.html">Reviews</a>
                        </li>
                        <li className="link">
                            <a href="./Sign_Up.html">
                                <button className="btn_signup_login">Sign Up</button>
                            </a>
                        </li>
                        <li className="link">
                            <a href="./Login.html">
                                <button className="btn_signup_login">Login</button>
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
            <ul className="burger_links">
                <li className="link">
                    <a href="./Menu.html">Home</a>
                </li>
                <li className="link">
                    <a href="./Appointments.html">Appointments</a>
                </li>
                <li className="link">
                    <a href="./HealthBlog.html">Health Blog</a>
                </li>
                <li className="link">
                    <a href="./Reviews.html">Reviews</a>
                </li>
                <li className="link">
                    <a href="./Sign_Up.html">
                        <button className="btn_signup_login">Sign Up</button>
                    </a>
                </li>
                <li className="link">
                    <a href="./Login.html">
                        <button className="btn_signup_login">Login</button>
                    </a>
                </li>
            </ul>
        </>
    );
}

export default Navbar;
