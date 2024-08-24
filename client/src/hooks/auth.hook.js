import { useCallback, useEffect, useState } from "react";


export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [isReady, setIsReady] = useState(false)
    const [userName, setUserName] = useState("")
    const storageName = "userData"

    const login = useCallback((id, name, jwtToken) => {
        setUserId(id)
        setUserName(name)
        setToken(jwtToken)
        localStorage.setItem(storageName, JSON.stringify({
            userId: id,
            userName: name,
            token: jwtToken

        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) {
            login(data.userId, data.userName, data.token)


        }
        setIsReady(true)
    }, [login, token])

    return { login, logout, token, userId, isReady, userName };
}

// export default useAuth;