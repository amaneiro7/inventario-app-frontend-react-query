import axios, { type AxiosRequestConfig } from 'axios'
import { api } from './axios.config'
import { PasswordExpiredError } from '@/entities/user/domain/errors/PasswordExpiredError'
// import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { fileSaver } from '../lib/utils/filseServer'
import { type Source } from '@/types/type'
import { NotFoundError } from '@/entities/shared/domain/errors/NotFoundError'
import { BadRequestError } from '@/entities/shared/domain/errors/BadRequestError'

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

		// Manejo de Timeouts (El servidor tardó más de lo configurado en axios.config.ts)
		if (axiosError && (error.code === 'ECONNABORTED' || error.message.includes('timeout'))) {
			throw new Error(
				'El servidor está tardando demasiado en responder. Por favor, intente nuevamente en unos momentos.'
			)
		}

		// Manejo de otros errores
		if (axiosError && error.response) {
			const { status, data } = error.response
			const message = data?.message ?? 'Error desconocido'

			if (status === 403 && data?.type === 'PasswordExpired') {
				const tempToken = data?.temporaryToken as string | undefined | null
				throw new PasswordExpiredError(message, tempToken)
			}

			switch (status) {
				case 401:
					throw new Error(message)
				case 400:
					throw new BadRequestError(message)
				case 403:
					throw new Error(message)
				case 404:
					throw new NotFoundError(`Recurso no encontrado. ${message}`)
				case 422:
					throw new Error(message)
				case 429:
					throw new Error(message)
				case 500:
					throw new Error(message)
				case 504:
					throw new Error('El servidor tardó demasiado en responder (Gateway Timeout).')
				default:
					throw new Error(`Error HTTP ${status}: ${message}`)
			}
		}
		throw new Error(
			'Ha ocurrido un error al realizar la petición. Por favor, inténtelo de nuevo más tarde.'
		)
	}
}
