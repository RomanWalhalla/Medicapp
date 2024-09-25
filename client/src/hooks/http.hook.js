// import chalk from "chalk";
import { useCallback, useContext, useState } from "react";
import Context from "../context/Context";

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const { notifyError } = useContext(Context)

    // const [error, setError] = useState(null)

    const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
        try {
            setLoading(true)
            if (body) {
                body = JSON.stringify(body)
                headers["Content-Type"] = "application/json"
            }
            const response = await fetch(url, { method, body, headers })

            // console.log("useHttp-response", response);

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Something wrong")
            }
            setLoading(false)
            // notifySuccess("Loaded request")
            return data
        } catch (error) {
            setLoading(false)
            notifyError(error.message)
            throw error
        }
    }, [notifyError])
    // const clearError = useCallback(() => setError(null), [])

    return { loading, request, /* error, clearError */ }
}