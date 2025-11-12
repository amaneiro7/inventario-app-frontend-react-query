import axios, { type AxiosRequestConfig } from 'axios'
import { api } from './axios.config'
import { PasswordExpiredError } from '@/entities/user/domain/errors/PasswordExpiredError'
// import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { fileSaver } from '../lib/utils/filseServer'
import { type Source } from '@/types/type'

type ApiConfig = AxiosRequestConfig & { _retry?: boolean }

// Sobrecarga 1: Para descarga de archivos (cuando 'souerce' está presente)
export function fetching<T>(config: ApiConfig, source: Source): Promise<void>

//Sobrecarga 2: Para obtener datos (cuando 'source' está ausente)
export function fetching<T>(config: ApiConfig, source?: undefined): Promise<T>

export async function fetching<T>(config: ApiConfig, source?: Source): Promise<T | void> {
	try {
		const apiConfig: ApiConfig = source
			? {
					...config,
					headers: {
						'Content-Type': 'application/vnc.ms-excel'
					},
					responseType: 'blob'
				}
			: config
		const response = await api(apiConfig)
		if (!response.data) {
			throw new Error('Ha ocurrido un error inesperado')
		}
		return source ? fileSaver(response.data, source) : (response.data as T)
	} catch (error) {
		const axiosError = axios.isAxiosError(error)

		console.log('axios', error)
		// Manejo de otros errores
		if (axiosError && error.response) {
			const { status, data } = error.response
			const message = data?.message ?? 'Error desconocido'

			// -- ESTE ES EL PUNTO CLAVE DE LA TRADUCCIÓN --
			if (status === 403 && data?.type === 'PasswordExpired') {
				throw new PasswordExpiredError(data.tempToken)
			}

			switch (status) {
				case 403:
					throw new Error(message)
				case 401:
					throw new Error(message)
				case 404:
					throw new Error(`Recurso no encontrado. ${message}`)
				case 422:
					throw new Error(message)
				case 429:
					throw new Error(message)
				case 500:
					throw new Error(message)
				default:
					throw new Error(`Error HTTP ${status}: ${message}`)
			}
		}
		throw new Error(
			'Ha ocurrido un error al realizar la petición. Por favor, inténtelo de nuevo más tarde.'
		)
	}
}
