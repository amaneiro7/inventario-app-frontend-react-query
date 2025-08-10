import axios, { type AxiosInstance } from 'axios'
// import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { baseURL } from '../config'

export const api: AxiosInstance = axios.create({
	baseURL: baseURL,
	withCredentials: true,
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json'
	}
})

// Esto es un interceptor de RESPUESTA
// api.interceptors.response.use(
// 	// La función de la izquierda se ejecuta si la petición es exitosa (status 2xx)
// 	response => response,

// 	// La función de la derecha se ejecuta si la petición falla
// 	async error => {
// 		const originalRequest = error.config

// 		// Si el error es 401 y NO es un reintento
// 		if (error.response.status === 401 && !originalRequest._retry) {
// 			originalRequest._retry = true // Marcar como reintento

// 			try {
// 				// Llama a tu lógica para refrescar el token
// 				const newAccessToken = await useAuthStore.getState().refreshTokenValidity()

// 				// Actualiza el header de autorización en la instancia de axios
// 				axios.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken
// 				originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken

// 				// Reintenta la petición original con el nuevo token
// 				return api(originalRequest)
// 			} catch (refreshError) {
// 				// Si el refresh token falla, desloguea al usuario
// 				useAuthStore.getState().logout()
// 				return Promise.reject(refreshError)
// 			}
// 		}

// 		// Para cualquier otro error, simplemente lo rechazamos para que sea manejado por el catch del query
// 		return Promise.reject(error)
// 	}
// )
