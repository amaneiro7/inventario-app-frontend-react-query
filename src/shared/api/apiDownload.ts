import axios, { type AxiosRequestConfig } from 'axios'
import { api } from '@/shared/api/axios.config'
import { fileSaver } from '@/shared/lib/utils/filseServer'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { type Source } from '@/types/type'

export async function apiDownload(
	config: AxiosRequestConfig & {
		_retry?: boolean
	},
	source: Source
): Promise<void> {
	try {
		const response = await api({
			...config,
			headers: {
				'Content-Type': 'application/vnc.ms-excel'
			},
			responseType: 'blob'
		})

		if (!response.data) {
			throw new Error('Ha ocurrido un error inesperado')
		}
		fileSaver(response.data, source)
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
