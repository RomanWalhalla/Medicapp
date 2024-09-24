import { useEffect, useState } from "react";
import "../../../styles/bookingInforme.css"
import { RiCloseLargeLine } from "react-icons/ri";
// import ModalAppointments from "./modalAppointments";

const BookingInforme = ({ appointmentsPatient, setAppointmentsPatient }) => {
    const [isModalOpen, setIsModalOpen] = useState((appointmentsPatient?.openModal) || false);
    // const [isModalOpen, setIsModalOpen] = useState(appointmentsPatient?.openModal || false);
    // console.log("BookingInforme", appointmentsPatient);
    // const [inform, setInform] = useState()

    const handleOnClose = () => {
        setIsModalOpen(false)
    // setAppointmentsPatient((prev) => ({
    //     ...prev,
    //     booked: false, // Сброс состояния booked
    // }));
    }

    // const handleOnClick = () => {
    //     setIsModalOpen(false);
    //     setAppointmentsPatient((prev) => ({
    //         ...prev,
    //         booked: false, // Сброс состояния booked
    //     }));
    // };

    // Открываем модальное окно, если оно должно быть открытым


    // Сбрасываем значение booked на false при закрытии окна
    // useEffect(() => {
    //     if (!isModalOpen && appointmentsPatient?.booked) {
    //         setAppointmentsPatient((prev) => ({
    //             ...prev,
    //             booked: false, // Сбрасываем booked на false
    //         }));
    //     }
    // }, [isModalOpen, appointmentsPatient, setAppointmentsPatient]);


    useEffect(() => {
        if (appointmentsPatient?.openModal && appointmentsPatient?.booked) {
            setIsModalOpen(true);
        }
    }, [appointmentsPatient]);

    if (!isModalOpen || !appointmentsPatient?.booked) {
        return null;
    }


    return (
        <>
            <div>
                <div className="informe-container">
                    <span><b>Appointments Details</b></span>
                    <button className="btn-close-appointment-modal" onClick={handleOnClose}><RiCloseLargeLine /></button>
                    <div className="informe-content"><b>Doctor:</b> {appointmentsPatient?.doctorName}</div>
                    <div className="informe-content"><b>Speciality:</b> {appointmentsPatient?.speciality}</div>
                    <div className="informe-content"><b>Name:</b> {appointmentsPatient?.patientName}</div>
                    <div className="informe-content"><b>Phone:</b> {appointmentsPatient?.phoneNumber}</div>
                    <div className="informe-content"><b>Date:</b> {appointmentsPatient?.date?.toLocaleString()}</div>
                </div>
            </div>
        </>
    );
}

export default BookingInforme;

