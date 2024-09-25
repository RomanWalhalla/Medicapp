import { useCallback, useEffect, useMemo, useState } from "react";

export const useAuth = () => {
    const initialState = useMemo(() => ({
        // userId: "",
        role: "",
        speciality: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
        // token: "",
        address: {
            country: "",
            city: "",
            state: "",
            streetName: "",
            postalCode: "",
        }
    }
    ), [])
    const [userData, setUserData] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // console.table(userData);

    const storageName = "userData"

    const login = useCallback((data) => {
        setUserData({
            ...initialState,
            // userId: data.userId,
            firstName: data.firstName,
            phoneNumber: data.phoneNumber,
            email: data.email,
        })

        localStorage.setItem(storageName, JSON.stringify({
            userId: data.userId,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken
        }))

        setIsLoggedIn(true)
    }, [initialState])


    const logout = useCallback(() => {
        setUserData(initialState)
        setIsLoggedIn(false)
        localStorage.removeItem(storageName)
    }, [initialState])

    useEffect(() => {
        try {
            setLoading(true)
            const storedData = JSON.parse(localStorage.getItem(storageName))

            // console.log("storedData", storedData);

            if (storedData) {
                // Проверяем, что данные являются строкой
                try {
                    // const parsedData = JSON.parse(storedData);

                    // console.log("parsedData", parsedData);


                    if (storedData && storedData.accessToken) {
                        login(storedData);
                    }
                } catch (e) {
                    console.log("Failed to parse stored data:", e);
                    // console.error("Failed to parse stored data:", e);
                } finally {
                    setLoading(false)
                }
            }
        } catch (error) {
            console.error("Failed to parse stored data:", error);
        }

        setLoading(false)
    }, [login])

    return { login, logout, loading, setLoading, userData, setUserData, initialState, isLoggedIn };
}

// export default useAuth;