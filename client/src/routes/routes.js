import { Route, Navigate } from "react-router-dom"
import InstantConsultation from "../Pages/InstantConsultation.js";
// import LandingPage from "../Pages/NavbarMenu/LandingPage.js";

import AuthPage from "../Pages/NavbarMenu/Auth.js";

export const useRoutes = (isLoggedIn) => {
    if (isLoggedIn) {
        return (
            <>
                <Route path="/Home/InstantConsultation" element={<InstantConsultation />} />
                {/* <Route path="/Home/InstantConsultation" element={<Navigate to="/InstantConsultation" replace />} /> */}
                {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
            </>
        );
    }

    return (
        <>
            <Route path="/Login" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/Login" replace />} />
        </>
    )
}

// export default useRoutes;