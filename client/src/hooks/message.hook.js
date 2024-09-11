import { useCallback } from "react"
import { toast } from "react-toastify"

export const useMessage = () => {
    const notifySuccess = useCallback((message) => toast.success(message), [])
    const notifyError = useCallback((message) => toast.error(message), [])
    const notifyWarn = useCallback((message) => toast.warn(message), [])
    const notifyInfo = useCallback((message) => toast.info(message), [])

    return { notifySuccess, notifyError, notifyWarn, notifyInfo }
}














// import { useCallback } from "react"

// export const useMessage = () => {
//     return useCallback(text => {
//         if (window.M && text) {
//             window.M.toast({html: text})
//         } 
//     }, [])
// }
