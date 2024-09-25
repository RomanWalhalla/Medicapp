import { useContext/* , useState  */ } from "react";
// import { useNavigate } from "react-router-dom"
import { Modal, Box, Button, TextField } from "@mui/material"
// import { useHttp } from "../../hooks/http.hook";
// import { useMessage } from "../../hooks/message.hook";
import Context from "../../context/Context";
import { updateDataProfile } from "../../api/userApi";
import { useHttp } from "../../hooks/http.hook";


const ModalPersonalInf = ({ activeSection, openModal, setOpenModal, profileDataChanged, setProfileDataChanged }) => {
    // const navigate = useNavigate();
    // const { notifySuccess, notifyError, /* notifyWarn */ } = useMessage()
    const { loading, /* error, clearError, request, */ } = useHttp()
    const { /* userData, setUserData, */ setLoading, notifyError, notifySuccess } = useContext(Context)

    const handleClose = () => setOpenModal(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setProfileDataChanged({ ...profileDataChanged, [name]: value })
        if (["country", "city", "state", "streetName", "postalCode"].includes(name)) {
            setProfileDataChanged(prevState => ({
                ...prevState,
                address: { ...prevState.address, [name]: value }
            }))
        }
    }

    const handleSaveClick = async () => {
        try {
            setLoading(true)
            const userDataFromStorage = JSON.parse(localStorage.getItem("userData"));
            const { userId } = userDataFromStorage || {};

            await updateDataProfile(userId, profileDataChanged, notifyError)

            setProfileDataChanged(prevDataUser =>
            ({
                ...prevDataUser,
                firstName: profileDataChanged.firstName,
                lastName: profileDataChanged.lastName,
                phoneNumber: profileDataChanged.phoneNumber,
                email: profileDataChanged.email,
                address: {
                    country: profileDataChanged.address.country || "",
                    city: profileDataChanged.address.city || "",
                    state: profileDataChanged.address.state || "",
                    streetName: profileDataChanged.address.streetName || "",
                    postalCode: profileDataChanged.address.postalCode || "",
                }
            })
            )
            notifySuccess("You changed datos")
            setLoading(false)
            handleClose()
            // navigate('/profile')
        } catch (error) {
            setLoading(false)
            notifyError(error)
        }
        finally {
            handleClose()
            setLoading(false)
        }
    }

    if (loading) return <div>Loading...</div>

    return (
        <>
            {activeSection === "Foto" ? (
                []
            ) : activeSection === "PersonalInf" ? (
                <div>
                    <Modal open={openModal} onClose={handleClose}>
                        <Box
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
                            }}
                        >
                            <h2>Edit profile</h2>
                            <TextField
                                label="FirstName"
                                name="firstName"
                                value={profileDataChanged.firstName}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            // fullWidth
                            />
                            <TextField
                                label="LastName"
                                name="lastName"
                                value={profileDataChanged.lastName}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            // fullWidth
                            />
                            <TextField
                                label="Email"
                                name="email"
                                value={profileDataChanged.email}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            // fullWidth
                            />
                            <TextField
                                label="Phone"
                                name="phoneNumber"
                                value={profileDataChanged.phoneNumber}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            // fullWidth
                            />
                            <Button
                                variant="contained"
                                onClick={handleSaveClick}
                                disabled={!profileDataChanged.firstName || !profileDataChanged.lastName || !profileDataChanged.email || !profileDataChanged.phoneNumber}
                            >
                                Save
                            </Button>
                        </Box>
                    </Modal>
                </div>
            ) : activeSection === "Address" ? (
                <div>
                    <Modal open={openModal} onClose={handleClose}>
                        <Box
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
                            }}
                        >
                            <h2>Edit profile</h2>
                            <TextField
                                label="Country"
                                name="country"
                                value={profileDataChanged.address.country}
                                onChange={handleChange}
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="City"
                                name="city"
                                value={profileDataChanged.address.city}
                                onChange={handleChange}
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="State"
                                name="state"
                                value={profileDataChanged.address.state}
                                onChange={handleChange}
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Street Name"
                                name="streetName"
                                value={profileDataChanged.address.streetName}
                                onChange={handleChange}
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Postal Code"
                                name="postalCode"
                                value={profileDataChanged.address.postalCode}
                                onChange={handleChange}
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                            <Button variant="contained" onClick={handleSaveClick}>Save</Button>
                        </Box>
                    </Modal>
                </div>
            ) : (
                <></>
            )
            }
        </>
    );
}

export default ModalPersonalInf;