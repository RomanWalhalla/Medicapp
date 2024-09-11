// export const fetchUserProfile = async (userId, accessToken, refreshToken, notifyError) => {
//     try {
//         let response
//         try {
//             response = await fetch(`/api/auth/user/${userId}`, {
//                 method: "GET",
//                 headers: {
//                     "Authorization": accessToken,
//                     "Content-Type": "application/json",
//                     body: JSON.stringify({ refreshToken: refreshToken })
//                 },
//             })
//             // if (response.status === 400) {
//             //     accessToken = await RefreshAccessToken()
//             //     response = await fetch(`/api/auth/user/${userId}`, {
//             //         method: "GET",
//             //         headers: {
//             //             "Authorization": accessToken,
//             //             "Content-Type": "application/json"
//             //         },
//             //     })
//             // }
//         } catch (error) {
//             console.error("Initial fetch failed:", error);
//             notifyError(error)
//             throw new Error("Network error or server is unreachable");
//         }

//         if (!response.ok) {
//             notifyError(new Error("Error loading user data"))
//             // const errorDetails = await response.text(); // Логирование ошибки
//             // console.error("Server response:", errorDetails);
//             throw new Error(`Error loading user data: ${response.statusText} `)
//         }
//         return response.json()
//     } catch (error) {
//         notifyError(error)
//         throw new Error(error)
//     }
// }

// export const UpdateUserProfile = async (updatedData, notifyError) => {
//     try {
//         let { accessToken } = JSON.parse(localStorage.getItem("userData"))

//         let response = await fetch(`/api/auth/updateProfile`, {
//             method: "PUT",
//             headers: {
//                 "Authorization": accessToken,
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(updatedData)
//         })

//         // if (response.status === 401) {
//         //     accessToken = await RefreshAccessToken()
//         //     response = await fetch(`/api/auth/updateProfile`, {
//         //         method: "GET",
//         //         headers: {
//         //             "Authorization": accessToken,
//         //             "Content-Type": "application/json"
//         //         },
//         //         body: JSON.stringify()
//         //     })
//         // }
//         if (!response.ok) {
//             notifyError(new Error("Error updating user data"))
//             throw new Error("Error updating user data")
//         }
//         return response.json()
//     } catch (error) {
//         notifyError(error)
//         throw new Error(error)
//     }
// }
const refreshTokenIfNeeded = async (refreshToken, notifyError) => {
    const response = await fetch('/api/auth/refreshToken', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ refreshToken })
    });

    if (!response.ok) {
        notifyError("Не удалось обновить токен - refreshTokenIfNeeded");
        throw new Error("Не удалось обновить токен");
    }

    const { newAccessToken } = await response.json();
    if (!newAccessToken) {
        notifyError("Не получен новый токен");
        throw new Error("Не получен новый токен - refreshTokenIfNeeded");
    }

    return newAccessToken;
};

const makeRequest = async (url, method, accessToken, body) => {
    return fetch(url, {
        method: method,
        headers: {
            "Authorization": accessToken,
            "Content-Type": "application/json"
        },
        body: body ? JSON.stringify(body) : undefined
    });
};

const fetchWithToken = async (url, method, body, notifyError) => {
    let { accessToken, refreshToken, userId } = JSON.parse(localStorage.getItem("userData"));

    let response = await makeRequest(url, method, accessToken, body);

    if (response.status === 401 || response.status === 403) {
        notifyError("Token is obsolete or invalid - fetchWithToken")

        try {
            const newAccessToken = await refreshTokenIfNeeded(refreshToken, notifyError);
            // Обновляем токен в localStorage
            accessToken = newAccessToken;
            localStorage.setItem("userData", JSON.stringify({ accessToken, refreshToken, userId }));

            // Повторный запрос с новым токеном
            response = await makeRequest(url, method, accessToken, body);
        } catch (error) {
            notifyError("Не удалось обновить токен. Пожалуйста, повторите вход. - refreshTokenIfNeeded");
            throw error;
        }
    }
    if (!response.ok) {
        const errorData = await response.json();
        notifyError(errorData.message || "Произошла ошибка при запросе"); // Выводим сообщение с сервера
        const error = new Error(`Error: ${response.statusText}`);
        throw error;
    }
    return response.json();
};

// Использование в fetchUserProfile
export const fetchUserProfile = async (userId, notifyError) => {
    return fetchWithToken(`/api/auth/user/${userId}`, "GET", null, notifyError);
};

// Использование в UpdateUserProfile
export const updateUserProfile = async (userId, updatedData, notifyError) => {
    return fetchWithToken(`/api/auth/updateProfile/${userId}`, "PUT", updatedData, notifyError);
};

// Использование в UpdateUserProfile
export const searchDoctors = async (userId, firstName, speciality, notifyError) => {
    return fetchWithToken(`/api/auth/searchDoctors/${userId}?doctorName=${firstName}&speciality=${speciality}`, "GET", null, notifyError);
};







// export const RefreshAccessToken = async () => {
//     const { /* notifySuccess, */ notifyError, } = useMessage()
//     try {
//         const userDataString = localStorage.getItem("userData");
//         if (!userDataString) {
//             notifyError(new Error("No user data available"))
//             throw new Error("No user data available");
//         }

//         let userData;
//         try {
//             userData = JSON.parse(userDataString);
//         } catch (error) {
//             notifyError(new Error("Failed to parse user data from localStorage"))
//             throw new Error("Failed to parse user data from localStorage");
//         }

//         const { refreshToken } = userData;
//         if (!refreshToken) {
//             notifyError(new Error("No refresh token available"))
//             throw new Error("No refresh token available");
//         }
//         // Запрашиваем новый access token
//         const response = await fetch("/api/auth/token", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ refreshToken: refreshToken })
//         });
//         if (!response.ok) {
//             notifyError(new Error("Failed to refresh access token"))
//             throw new Error("Failed to refresh access token");
//         }

//         const data = await response.json();
//         userData.accessToken = data.accessToken;

//         // Обновляем данные в localStorage
//         localStorage.setItem("userData", JSON.stringify(userData));
//         return data.accessToken;

//     } catch (error) {
//         notifyError(error)
//         console.error("Error refreshing access token:", error);
//         throw new Error(error);
//     }
// }

//         const { refreshToken } = JSON.parse(localStorage.getItem("userData"))
//         if (!refreshToken) { throw new Error("No refresh token available") }

//         const response = await fetch("/api/auth/token", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ refreshToken: refreshToken })
//         })
//         if (!response.ok) { throw new Error("Failed to refresh access token") }
//         const data = await response.json()
//         const userData = JSON.parse(localStorage.getItem("userData"))
//         userData.accessToken = data.accessToken
//         console.log("userData", userData);
//         console.log("userData.accessToken", userData.accessToken);

//         localStorage.setItem("userData", JSON.stringify(userData))

//         return data.accessToken
//     } catch (error) {
//         throw new Error(error)
//     }
// }
