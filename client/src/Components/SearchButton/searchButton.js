import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useContext, useState } from "react"
import Select from "react-select"
import { searchDoctors } from "../../api/userApi"
import Context from "../../context/Context"
import "./searchButton.css"
import ModalAppointments from "../../Pages/NavbarMenu/Appointments/modalAppointments"
// import UseLoadUserData from "../../api/loadUserData"

const SearchButton = ({ onAppointmentData }) => {
    const [openModal, setOpenModal] = useState(false)
    const [speciality, setSpeciality] = useState("")
    const [doctorName, setDoctorName] = useState("")
    const [doctors, setDoctors] = useState("")
    const [loading, setLoading] = useState(false)
    const { notifyError } = useContext(Context)
    const [selectedDoctor, setSelectedDoctor] = useState({
        icon: "",
        doctorId: "",
        doctorName: "",
        speciality: "",
        experience: "",
    });
    const [booked, setBooked] = useState(false)
    const [bookedDoctorId, setBookedDoctorId] = useState(null);
    // const [patientData, setPatientData] = useState("")
    // const [patientStatus, setPatientStatus] = useState("")

    const doctorSvgIcon = (<svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" /* class="bi bi-person-fill" */ viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /> </svg>)

    // console.log("selectedDoctor", selectedDoctor);

    const handleInputValue = (e) => {
        // console.log("event.target.value", event.target.value);
        setDoctorName(e.target.value)
    }

    const handleOpenModal = (doctor) => {
        setSelectedDoctor({
            ...selectedDoctor,
            icon: doctorSvgIcon,
            doctorId: doctor._id,
            doctorName: `${doctor.firstName || ""} ${doctor.lastName || ""}`,
            speciality: doctor.speciality,
            experience: doctor.expirience
        });
        setOpenModal(true)
        setBookedDoctorId(doctor._id); 
    }

    const handleCancelAppointment = () => {
        setBooked(false)
    }

    const changeSpeciality = (option) => {
        setSpeciality(option.value.toLowerCase())
    }
    const handleSearchDoctors = async () => {
        // const { /* profileData, navbarData,  */patientData, patientStatus } = UseLoadUserData("Patient");
        // setPatientData(patientData)
        // setPatientStatus(patientStatus)
        try {

            setLoading(true)
            const userDataFromStorage = JSON.parse(localStorage.getItem("userData"));
            const { userId } = userDataFromStorage || {};

            const data = await searchDoctors(userId, doctorName, speciality, notifyError)


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
        { value: "Cardiology", label: "Cardiology" },
        { value: "Dermatology", label: "Dermatology" },
        { value: "Neurology", label: "Neurology" },
        { value: "Oncology", label: "Oncology" },
        { value: "Pediatrics", label: "Pediatrics" },
        { value: "Orthopedics", label: "Orthopedics" },
        { value: "Gastroenterology", label: "Gastroenterology" },
        { value: "Endocrinology", label: "Endocrinology" },
        { value: "Rheumatology", label: "Rheumatology" },
        { value: "Nephrology", label: "Nephrology" },
        { value: "Pulmonology", label: "Pulmonology" },
        { value: "Hematology", label: "Hematology" },
        { value: "Urology", label: "Urology" },
        { value: "Ophthalmology", label: "Ophthalmology" },
        { value: "Psychiatry", label: "Psychiatry" },
        { value: "Radiology", label: "Radiology" },
        { value: "Anesthesiology", label: "Anesthesiology" },
        { value: "Geriatrics", label: "Geriatrics" },
        { value: "Infectious Disease", label: "Infectious Disease" },
        { value: "Physical Medicine and Rehabilitation", label: "Physical Medicine and Rehabilitation" },
    ]

    if (loading) return <p>Loading...</p>

    return (
        <div>
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
            <br />
            {loading ? (<div>Loading</div>) : doctors.length > 0 ? doctors.map((doctor) => (
                <div className="doctor-card-container" key={doctor._id}>
                    <div className="doctor-card-details-container">
                        <div className="doctor-card-profile-image-container">
                            {/* {doctor.fotoProfile} */}
                            {doctorSvgIcon}
                        </div>
                        <div className="doctor-card-details">
                            <div className="doctor-card-detail-name">{[doctor.firstName, " ", doctor.lastName]}</div>
                            <div className="doctor-card-detail-speciality">{doctor.speciality}</div>
                            <div className="doctor-card-detail-experience">{doctor.experience || doctor.expirience} years experience</div>
                            {/* <div className="doctor-card-detail-consultationfees">Ratings: {doctor.ratings}</div> */}
                        </div>
                        {/* for reference  */}
                        <div className="div-book-appointment-btn" >
                                {booked && bookedDoctorId === doctor._id?
                                    <button className='book-appointment-btn-cancel' onClick={handleCancelAppointment}>
                                        <div>Cancel Appointment</div>
                                        <div>No Booking Fee</div>
                                    </button>
                                    : <button className='book-appointment-btn-accept' onClick={() => handleOpenModal(doctor)}>
                                        <div>Book Appointment</div>
                                        <div>No Booking Fee</div>
                                    </button>
                                }
                        </div>
                    </div>
                </div>
            )) : <div>No doctors found</div>
            }
            <ModalAppointments /* activeSection={activeSection} */ openModal={openModal} setOpenModal={setOpenModal} onAppointmentData={onAppointmentData} 
            selectedDoctor={selectedDoctor} setBooked={setBooked} /* patientData={patientData} patientStatus={patientStatus} *//>
        </div>
    );
}

export default SearchButton;

// <li key={doctor._id}>
//     <span ><img src={Login_foto_3} id="fotoDoctor" alt="foto" /></span>
//     {doctor.firstName} - {doctor.speciality}
// </li>