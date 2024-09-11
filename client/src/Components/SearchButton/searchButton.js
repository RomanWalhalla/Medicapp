import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useContext, useState } from "react"
import Select from "react-select"
import { searchDoctors } from "../../api/userApi"
import Context from "../../context/Context"
import "./searchButton.css"
// import Login_foto_3 from "../../img/Login_foto_3.jpg"

const SearchButton = () => {
    const [speciality, setSpeciality] = useState("")
    const [doctorName, setDoctorName] = useState("")
    const [doctors, setDoctors] = useState("")
    const [loading, setLoading] = useState(false)

    const { notifyError } = useContext(Context)

    const handleInputValue = (event) => {
        // console.log("event.target.value", event.target.value);
        setDoctorName(event.target.value)
    }

    console.log("doctors", doctors);

    const changeSpeciality = (option) => {
        // console.log("option", option);
        setSpeciality(option.value.toLowerCase())
    }
    const handleSearchDoctors = async () => {
        try {

            setLoading(true)
            const userDataFromStorage = JSON.parse(localStorage.getItem("userData"));
            const { userId } = userDataFromStorage || {};

            const data = await searchDoctors(userId, doctorName, speciality, notifyError)

            // console.log("data", data);

            setDoctors(data)
        } catch (error) {
            notifyError("handleSearchDoctors Error - SearchButton")
            console.log("handleSearchDoctors", error);
        }
        finally {
            setLoading(false)
        }
    }

    const options = [
        { value: "Psychologist", label: "Psychologist" },
        { value: "Dentist", label: "Dentist" },
        { value: "Gynecologist, obstetrician", label: "Gynecologist, obstetrician" },
        { value: "General Physician", label: "General Physician" },
        { value: "Dermatologist", label: "Dermatologist" },
        { value: "Ear-nose-throat", label: "Ear-nose-throat" },
        { value: "Homeopath", label: "Homeopath" },
        { value: "Ayurveda", label: "Ayurveda" },
    ]

    return (
        <>
            <form action="" className="form_search" onSubmit={e => e.preventDefault()}>
                <input
                    // type="search"
                    className="search_input"
                    placeholder="Search name or"
                    value={doctorName}
                    onChange={handleInputValue}
                />
                <Select
                    className="select_speciality"
                    value={speciality.label}
                    options={options}
                    onChange={changeSpeciality}
                    placeholder="Speciality"
                    formatOptionLabel={(option) =>
                        (option ? <><span>{option.label}</span></> : option.label)}
                >
                </Select>
                <button
                    type="submit"
                    className="search_button"
                    onClick={handleSearchDoctors}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
            {loading ? (<div>Loading</div>) : doctors.length > 0 ? doctors.map((doctor) => (
                <div className="doctor-card-container" key={doctor._id}>
                    <div className="doctor-card-details-container">
                        <div className="doctor-card-profile-image-container">
                            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" /* class="bi bi-person-fill" */ viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /> </svg>
                        </div>
                        <div className="doctor-card-details">
                            <div className="doctor-card-detail-name">{doctor.firstName}</div>
                            <div className="doctor-card-detail-speciality">{doctor.speciality}</div>
                            <div className="doctor-card-detail-experience">{doctor.experience} years experience</div>
                            {/* <div className="doctor-card-detail-consultationfees">Ratings: {doctor.ratings}</div> */}
                        </div>
                        {/* for reference  */}
                        <div>
                            <button className='book-appointment-btn'>
                                <div>Book Appointment</div>
                                <div>No Booking Fee</div>
                            </button>
                        </div>
                    </div>
                </div>
            )) : <div>No doctors found</div>
            }
        </>
    );
}

export default SearchButton;

// <li key={doctor._id}>
//     <span ><img src={Login_foto_3} id="fotoDoctor" alt="foto" /></span>
//     {doctor.firstName} - {doctor.speciality}
// </li>