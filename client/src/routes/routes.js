import { Navigate, Route, /* Routes */ } from "react-router-dom"
import InstantConsultation from "../Pages/InstantConsultation.js";
import Profile from "../Pages/Profile/profile.js";
import Settings from "../Pages/Profile/settings.js";
import Appointments from "../Pages/NavbarMenu/appointments.js";

export const useRoutes = (isLoggedIn, loading) => {
    if (isLoggedIn) {
        return [
            <Route key="profile" path="/profile" element={<Profile />} />,
            <Route key="settings" path="/profile/settings" element={<Settings />} />,
            <Route key="InstantConsultation" path="/Home/InstantConsultation" element={<InstantConsultation />} />,
            <Route key="appointments" path="/appointments" element={<Appointments />} />
        ];
    }

    if (!isLoggedIn) {
        return [
            <Route key="/login" path="*" element={<Navigate to="/login" replace />} />
        ]
    }

}

// export default useRoutes;

/* <Route path="*" element={<NotFound />} /> */
/* <Route path="/Home/InstantConsultation" element={<Navigate to="/InstantConsultation" replace />} /> */
/* <Route path="*" element={<Navigate to="/" replace />} /> */
/* <Route path="*" element={<Navigate to="/Login" replace />} /> */