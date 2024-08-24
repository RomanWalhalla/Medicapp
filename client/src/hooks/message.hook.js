import { toast } from "react-toastify"

export const useMessage = () => {

    const notifySuccess = (message) => toast.success(message)
    const notifyError = (message) => toast.error(message)
    const notifyWarn = (message) => toast.warn(message)

    return { notifySuccess, notifyError, notifyWarn }
}














// import { useCallback } from "react"

// export const useMessage = () => {
//     return useCallback(text => {
//         if (window.M && text) {
//             window.M.toast({html: text})
//         } 
//     }, [])
// }
