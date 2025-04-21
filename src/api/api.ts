import axios, { type AxiosRequestConfig } from 'axios'
import { api } from './axios.config'
import { useAuthStore } from '@/store/useAuthStore'

export async function fetching<T>(config: AxiosRequestConfig & { _retry?: boolean }): Promise<T> {
	try {
		const response = await api(config)
		if (!response.data) {
			throw new Error('Ha ocurrido un error inesperado')
		}
		return response.data as T
	} catch (error) {
		const axiosError = axios.isAxiosError(error)
		const originalRequest = config as AxiosRequestConfig & { _retry?: boolean }

		if (axiosError && error?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true

			const accessToken = await useAuthStore.getState().refreshTokenValidity()

			originalRequest.headers = originalRequest.headers ?? {}
			originalRequest.headers.Authorization = `Bearer ${accessToken}`
			originalRequest._retry = true
		}

		// Manejo de otros errores
		if (axiosError && error.response) {
			const { status, data } = error.response
			switch (status) {
				case 403:
					throw new Error('Acceso denegado.')
				case 404:
					throw new Error('Recurso no encontrado.')
				case 500:
					throw new Error('Error interno del servidor.')
				default:
					throw new Error(data || `Error HTTP ${status}: Error desconocido`)
			}
		}
		throw new Error(
			'Ha ocurrido un error al realizar la petición. Por favor, inténtelo de nuevo más tarde.'
		)
	}
}
