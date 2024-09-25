import { useContext, useEffect, /* useMemo, */ useState, useReducer, useMemo, useCallback } from "react";
import Context from "../context/Context.js"
import { fetchDataPatient, fetchDataNavbar, fetchDataProfile, fetchAppointmentsData } from "./userApi";

const useLoadUserData = (status) => {

    const initialDataState = {
        profile: false,
        navbar: false,
        patient: false,
        appointments: false,
    };

    const { notifyError, notifySuccess, /* loading, */ setLoading, initialState } = useContext(Context)
    const [profileData, setProfileData] = useState(initialState)
    const [navbarData, setNavbarData] = useState(initialState)
    const [patientData, setPatientData] = useState(initialState)
    const [appointmentsData, setAppointmentsData] = useState("")

    const [profileStatus, setProfileStatus] = useState("")
    const [navbarStatus, setNavbarStatus] = useState("")
    const [patientStatus, setPatientStatus] = useState("")
    const [appointmentsStatus, setAppointmentsStatus] = useState("")

    const dataLoadedReducer = (state, action) => {
        switch (action.type) {
            case "PROFILE_LOADED":
                return { ...state, profile: true };
            case "NAVBAR_LOADED":
                return { ...state, navbar: true };
            case "PATIENT_LOADED":
                return { ...state, patient: true };
            case "APPOINTMENTS_LOADED":
                return { ...state, appointments: true };
            default:
                return { ...state }
        }
    };
    const [dataLoaded, dispatch] = useReducer(dataLoadedReducer, initialDataState);
    
    // console.log("profileStatus", profileStatus);
    // console.log("navbarStatus", navbarStatus);
    // console.log("patientStatus", patientStatus);

    const userDataFromStorage = useMemo(() => JSON.parse(localStorage.getItem("userData")), []);
    const { userId, accessToken } = userDataFromStorage || {};

    // Функция задержки
    // const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const loadUserData = useCallback(async (updateDataFunc, actionType, status) => {
        // console.log("Dispatching action:", actionType);
        try {
            setLoading(true);
            let userData
            const updateData = (userData) => updateDataFunc((prevData) => ({
                ...prevData,
                ...userData,
            }));
            if (status === "profile" && profileStatus !== "Loaded") {
                userData = await fetchDataProfile(userId, notifyError);
                updateData(userData);
                setProfileStatus("Loaded");
            }
            if (status === "navbar" && navbarStatus !== "Loaded") {
                // await delay(100);
                userData = await fetchDataNavbar(userId, notifyError);
                updateData(userData);
                setNavbarStatus("Loaded");
            }
            if (status === "patient" && patientStatus !== "Loaded") {
                // await delay(900);
                userData = await fetchDataPatient(userId, notifyError);
                updateData(userData);
                setPatientStatus("Loaded");
            }
            if (status === "appointments" && appointmentsStatus !== "Loaded") {
                // await delay(900);
                userData = await fetchAppointmentsData(userId, notifyError);
                setAppointmentsStatus("Loaded");
                updateDataFunc(userData);
            }
            // Задержка перед вызовом dispatch
            // await delay(100);
            dispatch({ type: actionType });
            notifySuccess("Data loaded successfully");

        } catch (error) {
            notifyError("Error loading user data - loadUserData");
            console.error("Error-loadUserData:", error);

        } finally {
            setLoading(false);
        }
    }, [userId, notifyError, notifySuccess, setLoading, profileStatus, navbarStatus, patientStatus, appointmentsStatus]);

    useEffect(() => {
        if (!userId || !accessToken) {
            notifyError("User not authorized");
            return;
        }
        if (status === "Profile" && !profileData.firstName && profileStatus !== "Loaded") {
            loadUserData(setProfileData, "PROFILE_LOADED", "profile");
        } if (status === "Navbar" && !navbarData.firstName && navbarStatus !== "Loaded") {
            loadUserData(setNavbarData, "NAVBAR_LOADED", "navbar");
        } if (status === "Patient" && !patientData.firstName && patientStatus !== "Loaded") {
            loadUserData(setPatientData, "PATIENT_LOADED", "patient");
        } if (status === "Appointments" && /* !appointmentsData._id && */ appointmentsStatus !== "Loaded") {
            loadUserData(setAppointmentsData, "APPOINTMENTS_LOADED", "appointments");
        }

    }, [status, userId, accessToken, profileData, navbarData, patientData, profileStatus, navbarStatus, patientStatus, appointmentsStatus, loadUserData, notifyError]);

    return { profileData, navbarData, patientData, profileStatus, navbarStatus, patientStatus, appointmentsData, appointmentsStatus, setProfileData };
};

export default useLoadUserData



// const loadData = () => {
//     switch (status) {
//         case "Profile":
//             if (!profileData.firstName && !dataLoaded.profile) {
//                 loadUserData(setProfileData, "PROFILE_LOADED", "profile");
//             }
//             break;
//         case "Navbar":
//             if (!navbarData.firstName && !dataLoaded.navbar) {
//                 loadUserData(setNavbarData, "NAVBAR_LOADED", "navbar");
//             }
//             break;
//         case "Patient":
//             if (!patientData.firstName && !dataLoaded.patient) {
//                 loadUserData(setPatientData, "PATIENT_LOADED", "patient");
//             }
//             break;
//         default:
//             notifyError("Unknown status");
//     }
// };

//     useEffect(() => {
//         const loadUserData = async () => {
//             setLoading(true)

//             const userDataFromStorage = JSON.parse(localStorage.getItem("userData"));
//             const { userId, accessToken } = userDataFromStorage || {};

//             if (!userId || !accessToken) {
//                 notifyError("User not authorized")
//                 setLoading(false)
//                 return
//             }
//             try {
//                 if (status === "Profile") {
//                     const profileDataUpdate = await fetchUserProfile(userId, notifyError)
//                     // const data = await request("/api/auth/user/:id", "POST", { ...userData })
//                     setProfileData(prevDataUser => {
//                         if (profileDataUpdate) {
//                             return {
//                                 ...prevDataUser,
//                                 ...profileDataUpdate
//                             }
//                         }
//                     }
//                     )
//                 }

//                 if (status === "Navbar") {
//                     const navbarDataUpdate = await fetchUserProfile(userId, notifyError)
//                     setNavbarData(prevDataUser => {
//                         if (navbarDataUpdate) {
//                             return {
//                                 ...prevDataUser,
//                                 ...navbarDataUpdate
//                             }
//                         }
//                     }
//                     )
//                 }
//                 if (status === "Patient") {
//                     const navbarDataUpdate = await fetchUserProfile(userId, notifyError)
//                     setPatientData(prevDataUser => {
//                         if (navbarDataUpdate) {
//                             return {
//                                 ...prevDataUser,
//                                 ...navbarDataUpdate
//                             }
//                         }
//                     }
//                     )
//                 }
//                 notifySuccess("Datos loaded successful")
//                 setLoading(false)
//             } catch (error) {
//                 notifyError("Error-profileDataUpdate in profile.js")
//                 console.log("Error-loadUserData", error)

//                 // notifyError(error.ProfileDataUpdate.data.message)
//             } finally {
//                 setLoading(false)
//             }
//         }
//         if (!memoizedData || !memoizedData.firstName) {
//             loadUserData()
//         }

//     }, [notifyError, notifySuccess, setLoading, memoizedData, setNavbarData, setProfileData, status])


//     return { profileData, navbarData, patientData }
// }








// useEffect(() => {
//     // if (loading) return; // Prevent concurrent requests
//     if (!userId || !accessToken) {
//         notifyError("User not authorized");
//         // setLoading(false);
//         return;
//     }
//     const loadData = () => {
//         switch (status) {
//             case "Profile":
//                 if (!profileData.firstName && !dataLoaded.profile) {
//                     loadUserData(setProfileData, "PROFILE_LOADED", "profile");
//                 }
//                 break;
//             case "Navbar":
//                 if (!navbarData.firstName && !dataLoaded.navbar) {
//                     loadUserData(setNavbarData, "NAVBAR_LOADED", "navbar");
//                 }
//                 break;
//             case "Patient":
//                 if (!patientData.firstName && !dataLoaded.patient) {
//                     loadUserData(setPatientData, "PATIENT_LOADED"/* , "patient" */);
//                 }
//                 break;
//             default:
//                 notifyError("Unknown status");
//         }

//         setLoading(false);
//     };

// Проверяем, нужны ли данные для загрузки
// const dataToCheck = status === "Profile" ? profileData : status === "Navbar" ? navbarData : patientData;
// if (!dataToCheck || !dataToCheck.firstName) {
// }
// if (userId && accessToken) {
//     loadData();
// } else {
//     notifyError("User not authorized");
// }
// },