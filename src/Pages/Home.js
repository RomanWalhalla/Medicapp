import { NavLink } from "react-router-dom";

import Instant_Consultation from "../img/vivid-female-blogger-streaming-from-her-flat.gif"
import Book_of_Appointment from "../img/3d-techny-signed-health-insurance-policy-on-clipboard.gif"
import Self_Checkup from "../img/kit-health-technology-and-digital-health-solutions.gif"
import Help_Tips_and_Guidance from "../img/kit-risk-management-forecasting-and-assessment.gif"
import "../styles/Home.css"

const Home = () => {
    return (
        <>
            <div className="container_home">
                <div className="slider_home">
                    <div className="image">
                        <NavLink to="/Home"> <img src={Instant_Consultation} className="Instant_Consultation" alt="Instant Consultation" />Instant
                            Consultation
                        </NavLink>
                    </div>
                    <div className="image">
                        <NavLink to="/Appointments"> <img src={Book_of_Appointment} className="Book_of_Appointment" alt="Book of Appointment" />Book of
                            Appointment
                        </NavLink>
                    </div>
                    <div className="image">
                        <NavLink to="/HealthBlog"> <img src={Self_Checkup} className="Self_Checkup" alt="Self Checkup" />Self Checkup
                        </NavLink>
                    </div>
                    <div className="image">
                        <NavLink to="/"> <img src={Help_Tips_and_Guidance} className="Help_Tips_and_Guidance" alt="Help Tips and Guidance" />Help Tips and
                            Guidance
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;