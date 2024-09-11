import { useContext/* , useState  */ } from "react";
// import { useNavigate } from "react-router-dom"
import { Modal, Box, Button, TextField } from "@mui/material"
// import { useHttp } from "../../hooks/http.hook";
// import { useMessage } from "../../hooks/message.hook";
import { Context } from "../../context/Context";
import { updateUserProfile } from "../../api/userApi";
import { useHttp } from "../../hooks/http.hook";


const ModalPersonalInf = ({ activeSection, openModal, setOpenModal }) => {
    // const navigate = useNavigate();
    // const { notifySuccess, notifyError, /* notifyWarn */ } = useMessage()
    const { loading, /* error, clearError, request, */ } = useHttp()
    const { userData, setUserData, setLoading, notifyError, notifySuccess } = useContext(Context)

    const handleClose = () => setOpenModal(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })

        if (["country", "city", "state", "streetName", "postalCode"].includes(name)) {
            setUserData(prevState => ({
                ...prevState,
                address: { ...prevState.address, [name]: value }
            }))
        }
    }

    const handleSaveClick = async () => {
        try {
            setLoading(true)
            const { password, ...updatedData } = userData
            const userDataFromStorage = JSON.parse(localStorage.getItem("userData"));
            const { userId } = userDataFromStorage || {};

            await updateUserProfile(userId, updatedData, notifyError)
            // const data = await request("/api/auth/updateProfile", "PUT", { ...userData })

            setUserData(prevDataUser =>
            ({
                ...prevDataUser,
                firstName: updatedData.firstName,
                lastName: updatedData.lastName,
                phoneNumber: updatedData.phoneNumber,
                email: updatedData.email,
                address: {
                    country: updatedData.address.country,
                    city: updatedData.address.city,
                    state: updatedData.address.state,
                    streetName: updatedData.address.streetName,
                    postalCode: updatedData.address.postalCode,

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
                        <Box>
                            <h2>Edit profile</h2>
                            <TextField
                                label="FirstName"
                                name="firstName"
                                value={userData.firstName}
                                onChange={handleChange}
                            // fullWidth
                            />
                            <TextField
                                label="LastName"
                                name="lastName"
                                value={userData.lastName}
                                onChange={handleChange}
                            // fullWidth
                            />
                            <TextField
                                label="Email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                            // fullWidth
                            />
                            <TextField
                                label="Phone"
                                name="phoneNumber"
                                value={userData.phoneNumber}
                                onChange={handleChange}
                            // fullWidth
                            />
                            <Button variant="contained" onClick={handleSaveClick}>Save</Button>
                        </Box>
                    </Modal>
                </div>
            ) : activeSection === "Address" ? (
                <div>
                    <Modal open={openModal} onClose={handleClose}>
                        <Box>
                            <h2>Edit profile</h2>
                            <TextField
                                label="Country"
                                name="country"
                                value={userData.address.country}
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                label="City"
                                name="city"
                                value={userData.address.city}
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                label="State"
                                name="state"
                                value={userData.address.state}
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                label="Street Name"
                                name="streetName"
                                value={userData.address.streetName}
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                label="Postal Code"
                                name="postalCode"
                                value={userData.address.postalCode}
                                onChange={handleChange}
                                fullWidth
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