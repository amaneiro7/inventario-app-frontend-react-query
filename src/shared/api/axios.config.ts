import axios, { type AxiosInstance } from 'axios'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { baseURL } from '../config'

export const api: AxiosInstance = axios.create({
	baseURL: baseURL,
	withCredentials: true,
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json'
	}
})

// Interceptor de PETICIÓN (se ejecuta antes de enviar la petición)
api.interceptors.request.use(
	config => {
		// Obtiene el token del store de Zustand
		const token = useAuthStore.getState().token
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

// Esto es un interceptor de RESPUESTA
api.interceptors.response.use(
	// La función de la izquierda se ejecuta si la petición es exitosa (status 2xx)
	response => response,

	// La función de la derecha se ejecuta si la petición falla
	async error => {
		const originalRequest = error.config

		// Define la ruta de login
		const LOGIN_URL = 'auth/login/local'
		const REFRESH_URL = 'auth/refresh-token'

		//		console.log(originalRequest.url)

		// Comprobar si la ruta original es la de Login, Refresh o ya es un reintento
		const isExcludedUrl =
			originalRequest.url === LOGIN_URL || originalRequest.url === REFRESH_URL

		// Si el error es 401, NO es un reintento y NO es la propia petición de refresco
		if (error.response.status === 401 && !originalRequest._retry && !isExcludedUrl) {
			originalRequest._retry = true // Marcar como reintento

			try {
				// Llama a la lógica para refrescar el token. El store se encargará de devolver la promesa existente si ya hay un refresco en curso.
				const newAccessToken = await useAuthStore.getState().refreshTokenValidity()

				if (newAccessToken) {
					// Actualiza el header de la petición original que falló
					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

					// Reintenta la petición original con el nuevo token
					return api(originalRequest)
				}
			} catch (refreshError) {
				// Si el refresh token falla, el store ya se encarga de hacer logout.
				// Simplemente rechazamos la promesa para que la petición original falle definitivamente.
				return Promise.reject(refreshError)
			}
		}

		// Para cualquier otro error, simplemente lo rechazamos para que sea manejado por el catch del query
		return Promise.reject(error)
	}
)
