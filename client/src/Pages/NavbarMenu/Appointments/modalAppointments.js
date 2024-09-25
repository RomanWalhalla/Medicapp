import { Modal, Box, Button, TextField, Typography } from "@mui/material"
// import { alpha } from '@mui/material/styles';
import { useContext, useEffect, useState } from "react";
import Context from "../../../context/Context";
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import useLoadUserData from "../../../api/loadUserData";
import { createAppointments } from "../../../api/userApi";

const ModalAppointments = ({ openModal, setOpenModal, onAppointmentData, selectedDoctor, setBooked/* , patientData, patientStatus */ }) => {
    const { notifyError, notifySuccess } = useContext(Context)
    const [appointmentsPatient, setAppointmentsPatient] = useState({
        doctorId: "",
        doctorName: "",
        speciality: "",
        patientName: "",
        phoneNumber: "",
        date: "",
        booked: "",
        openModal: "",
        // time: ""
    })
    const { patientData, patientStatus } = useLoadUserData("Patient");

    // console.log("patientStatus",patientStatus);
    // console.log("appointmentsPatient", appointmentsPatient);
    // console.log("patientData", patientData);

    useEffect(() => {
        const fetchData = async () => {
            // if (patientStatus !== "Loaded") { return }
            if (patientData) {
                try {
                    // const patientData = await loadUserData("Patient");
                    // console.log("patientData", patientData);
                    setAppointmentsPatient((prevState) => ({
                        ...prevState,
                        doctorId: selectedDoctor.doctorId,
                        doctorName: `${selectedDoctor?.doctorName || ""}`,
                        speciality: selectedDoctor?.speciality || "",
                        patientName: `${patientData.firstName || ""} ${patientData.lastName || ""}`,
                        phoneNumber: patientData.phoneNumber || "",
                    }));
                }
            /* } */ catch (error) {
                    console.error("Error fetching patient data:", error);
                }
            }
        };
        fetchData();
    }, [patientData, patientStatus, selectedDoctor]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setAppointmentsPatient({ ...appointmentsPatient, [name]: value })
    }

    const onCloseModal = () => {
        setOpenModal(false)
    }

    const handleSaveClick = async () => {
        // setAppointmentsPatient((prev) => ({ ...prev, fullName: `${patientData.firstName || ""} ${patientData.lastName || ""}`, phoneNumber: patientData.phoneNumber }))
        const updatedPatientData = {
            ...appointmentsPatient,
            booked: true,
            openModal: true
        };
        // console.log("handleSaveClick", updatedPatientData);
        
        setOpenModal(false)
        onAppointmentData(updatedPatientData)
        if (updatedPatientData) {
            const userDataFromStorage = JSON.parse(localStorage.getItem("userData"));
                    const { userId } = userDataFromStorage || {};
            try {
                await createAppointments(userId, updatedPatientData, notifyError)
                notifySuccess("Datos loaded successful")
            } catch (error) {
                notifyError("Error-createUserAppointments in ModalAppointments.js")
                console.log(error);
                
            }
            
        }
        setBooked(true)
    }

    const { loading } = useContext(Context)

    if (loading) return <p>Loading...</p>

    return (
        <div>
            <Modal open={openModal} onClose={onCloseModal}>
                <Box /* className="modal-box-appointment" */
                    sx={{
                        position: "absolute",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        left: "50%",
                        height: "400",
                        width: 300,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor: "teal",
                        boxShadow: 24,
                        p: 3,
                        borderRadius: 2,
                    }}>
                    <Box sx={{ mb: 3, textAlign: 'center' }}>
                        {/* <Typography variant="h6" component="div"><b>Doctor</b></Typography> */}
                        <Box>{selectedDoctor.icon}</Box>
                        <Typography>Dr. {selectedDoctor.doctorName}</Typography>
                        <Typography>{selectedDoctor.speciality}</Typography>
                        <Typography>{selectedDoctor.experience} years experience</Typography>
                    </Box>
                    <TextField
                        label="Full name"
                        name="fullName"
                        value={appointmentsPatient.patientName || ""}
                        onChange={handleChange}
                        required
                        disabled
                        sx={{ mb: 2, textAlign: "center" }}
                    />
                    <TextField
                        label="Number phone"
                        name="phoneNumber"
                        value={appointmentsPatient.phoneNumber || ""}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />
                    <DatePicker
                        selected={appointmentsPatient.date ? new Date(appointmentsPatient.date) : null}
                        onChange={(date) => setAppointmentsPatient((prev) => ({ ...prev, date: date }))}
                        dateFormat="dd/MM/yyyy h:mm aa"
                        timeFormat="HH:mm"
                        timeIntervals={10}
                        showTimeSelect
                        placeholderText="Select a date"
                        required
                    />
                    <Button
                        variant="contained"
                        onClick={handleSaveClick}
                        sx={{ mt: 2 }}
                    >
                        Book Now
                    </Button>
                </Box>
            </Modal>
        </div >
    );
}

export default ModalAppointments;
