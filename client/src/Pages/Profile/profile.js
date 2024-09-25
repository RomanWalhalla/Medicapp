import React, { /* useContext, */ useEffect, /* useEffect, useMemo, */ useState } from 'react';
import "../../styles/profile.css"
import Login_foto_1 from "../../img/Login_foto_1.jpg"
import { AiOutlineEdit } from "react-icons/ai";
import ModalPersonalInf from './modalPersonalInf';
// import { fetchUserProfile } from '../../api/userApi';
// import Context from '../../context/Context';
import useLoadUserData from '../../api/loadUserData';

const Profile = () => {
    const [activeSection, setActiveSection] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    // const { loading /* setUserData, notifySuccess, notifyError,setLoading  */ } = useContext(Context)

    const { profileData } = useLoadUserData("Profile");

    useEffect(() => {
        setProfileDataChanged(profileData);
    }, [profileData]);

    const [profileDataChanged, setProfileDataChanged] = useState("")
    // const [loading, setLoading] = useState(false)
    // const userDataMemo = useMemo(() => userData, [userData]);

    const handleOpen = (section) => {
        setActiveSection(section)
        setOpenModal(true)
    }

    return (
        <div className="profile_container">
            <div className='name_page'>
                <h2>My Profile</h2>
                <span className='role_name'>{profileDataChanged?.role}</span>
            </div>
            <div className='profile_logo_div'>
                <div className='profile_logo_imgdiv'><img src={Login_foto_1} alt="account" className='profile_logo_img' />
                    <div className='profile_logo_text'>
                        <span>{profileDataChanged?.firstName}</span><br />
                        <span>{profileDataChanged?.email}</span>
                    </div>
                </div>
                <div /* className='profile_logo_divbtn' */><button className='profile_logo_button' onClick={() => handleOpen("Foto")}>Edit <AiOutlineEdit /></button></div>
            </div>
            <div className='personal_inf_div'>
                <div className='personal_inf_divbtn'>
                    <div><h3>Personal information</h3></div>
                    <div><button className='personal_inf_button' onClick={() => handleOpen("PersonalInf")}>Edit <AiOutlineEdit /></button></div>
                </div>
                <div className='data_information_div'>
                    <div className='data_information_all'>First Name
                        <br />
                        <span>{profileDataChanged?.firstName}</span>
                    </div>
                    <div className='data_information_all'>Last Name
                        <br />
                        <span>{profileDataChanged?.lastName}</span>
                    </div>
                    <div className='data_information_all'>Email Address
                        <br />
                        <span>{profileDataChanged?.email}</span>
                    </div>
                    <div className='data_information_all'>Phone
                        <br />
                        <span>{profileDataChanged?.phoneNumber}</span>
                    </div>
                    <div className='data_information_all'>Speciality
                        <br />
                        <span>{profileDataChanged?.speciality}</span>
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
                        <span>{profileDataChanged?.address?.country}</span>
                    </div>
                    <div className='data_address_all'>City
                        <br />
                        <span>{profileDataChanged?.address?.city}</span>
                    </div>
                    <div className='data_address_all'>State
                        <br />
                        <span>{profileDataChanged?.address?.state}</span>
                    </div>
                    <div className='data_address_all'>Street Name
                        <br />
                        <span>{profileDataChanged?.address?.streetName}</span>
                    </div>
                    <div className='data_address_all'>Postal Code
                        <br />
                        <span>{profileDataChanged?.address?.postalCode}</span>
                    </div>
                </div>
            </div>
            <ModalPersonalInf activeSection={activeSection} openModal={openModal} setOpenModal={setOpenModal} profileDataChanged={profileDataChanged} setProfileDataChanged={setProfileDataChanged} />
        </div>
    );
};

export default Profile;