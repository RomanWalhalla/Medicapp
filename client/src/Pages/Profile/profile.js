import React, { useContext, useEffect, useMemo, useState } from 'react';
import "../../styles/profile.css"
import Login_foto_1 from "../../img/Login_foto_1.jpg"
import { AiOutlineEdit } from "react-icons/ai";
import ModalPersonalInf from './modalPersonalInf';
import { fetchUserProfile } from '../../api/userApi';
import { Context } from '../../context/Context';

const Profile = () => {
    const [activeSection, setActiveSection] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const { userData, setUserData, notifySuccess, notifyError, loading, setLoading } = useContext(Context)

    // console.log("userData", userData);


    // const [loading, setLoading] = useState(false)
    const userDataMemo = useMemo(() => userData, [userData]);

    const handleOpen = (section) => {
        setActiveSection(section)
        setOpenModal(true)
    }

    useEffect(() => {
        const loadUserData = async () => {
            setLoading(true)
            const userDataFromStorage = JSON.parse(localStorage.getItem("userData"));
            const { userId, accessToken } = userDataFromStorage || {};

            // console.log("loadUserData-userId", userId);
            // console.log("loadUserData-accessToken", accessToken);

            if (!userId || !accessToken) {
                notifyError("User not authorized")
                setLoading(false)
                return
            }
            try {
                const profileDataUpdate = await fetchUserProfile(userId, notifyError)
                // const data = await request("/api/auth/user/:id", "POST", { ...userData })
                // console.log("ProfileDataUpdate", ProfileDataUpdate);

                setUserData(prevDataUser => {
                    if (profileDataUpdate) {
                        return {
                            ...prevDataUser,
                            ...profileDataUpdate
                        }
                    }
                }
                )
                notifySuccess("Datos loaded successful")
                setLoading(false)
            } catch (error) {
                notifyError("Error-profileDataUpdate in profile.js")
                console.log("Error-loadUserData", error)

                // notifyError(error.ProfileDataUpdate.data.message)
            } finally {
                setLoading(false)
            }
        }
        if (!userDataMemo.firstName) {
            loadUserData()
        }
    }, [setUserData, notifyError, notifySuccess, setLoading, userDataMemo])

    if (loading) return <p>Loading...</p>

    return (
        <div className="profile_container">
            <div className='name_page'>
                <h2>My Profile</h2>
                <span className='role_name'>{userData.role}</span>
            </div>
            <div className='profile_logo_div'>
                <div className='profile_logo_imgdiv'><img src={Login_foto_1} alt="account" className='profile_logo_img' />
                    <div className='profile_logo_text'>
                        <span>{userData.firstName}</span><br />
                        <span>{userData.email}</span>
                    </div>
                </div>
                <div className='profile_logo_divbtn'><button className='profile_logo_button' onClick={() => handleOpen("Foto")}>Edit<AiOutlineEdit /></button></div>
            </div>
            <div className='personal_inf_div'>
                <div className='personal_inf_divbtn'>
                    <div><h3>Personal information</h3></div>
                    <div><button className='personal_inf_button' onClick={() => handleOpen("PersonalInf")}>Edit <AiOutlineEdit /></button></div>
                </div>
                <div className='data_information_div'>
                    <div className='data_information_all'>First Name
                        <br />
                        <span>{userData.firstName}</span>
                    </div>
                    <div className='data_information_all'>Last Name
                        <br />
                        <span>{userData.lastName}</span>
                    </div>
                    <div className='data_information_all'>Email Address
                        <br />
                        <span>{userData.email}</span>
                    </div>
                    <div className='data_information_all'>Phone
                        <br />
                        <span>{userData.phoneNumber}</span>
                    </div>
                    <div className='data_information_all'>Speciality
                        <br />
                        <span>{userData.speciality}</span>
                    </div>
                </div>
            </div>
            <div className='address_div'>
                <div className='address_divbtn'>
                    <div><h3>Address</h3></div>
                    <div><button className='address_button' onClick={() => handleOpen("Address")}>Edit <AiOutlineEdit /></button></div>
                </div>
                <div className='address_inf_div'>
                    <div className='data_address_all'>Country
                        <br />
                        <span>{userData.address.country}</span>
                    </div>
                    <div className='data_address_all'>City
                        <br />
                        <span>{userData.address.city}</span>
                    </div>
                    <div className='data_address_all'>State
                        <br />
                        <span>{userData.address.state}</span>
                    </div>
                    <div className='data_address_all'>Street Name
                        <br />
                        <span>{userData.address.streetName}</span>
                    </div>
                    <div className='data_address_all'>Postal Code
                        <br />
                        <span>{userData.address.postalCode}</span>
                    </div>
                </div>
            </div>
            <ModalPersonalInf activeSection={activeSection} openModal={openModal} setOpenModal={setOpenModal} />
        </div>
    );
};

export default Profile;