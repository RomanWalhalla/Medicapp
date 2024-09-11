import Search_doctors from "../../img/clip-medical-consultation-online.gif"
import Search_doctors_shield from "../../img/sammy-shield-medical-protection.gif"

import "../../styles/appointments.css"
import SearchButton from "../../Components/SearchButton/searchButton"

// import "font-awesome/css/font-awesome.min.css"

const Appointments = () => {
    return (
        <div className="container_appointments">
            <div className="content_appointments">
                <div className="search_doctors">
                    <h1>Find a doctor at your own ease</h1>
                    <h2>Search doctors by speciality</h2>
                    <img src={Search_doctors} className="search_doctors-img" alt="Search doctors" />
                    <img src={Search_doctors_shield} className="search_doctors-shield" alt="Shield" />
                    <SearchButton />
                </div>
            </div>
        </div>
    );
}

export default Appointments;