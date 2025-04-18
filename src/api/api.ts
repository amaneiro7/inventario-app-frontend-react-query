import axios, { type AxiosRequestConfig } from 'axios'
import { mode } from '../config'
import { api } from './axios.config'

export async function fetching<T>(config: AxiosRequestConfig & { _retry?: boolean }): Promise<T> {
	try {
		const response = await api(config)
		if (!response.data) {
			throw new Error('Ha ocurrido un error inesperado')
		}
		return response.data as T
	} catch (error) {
		const axiosError = axios.isAxiosError(error)

		if (mode === 'development') {
			if (axiosError && error.response) {
				throw new Error(
					error.response.data || `Error HTTP ${error.response.status}: Error desconocido`
				)
			} else if (error instanceof Error) {
				throw new Error(`Error de petición: ${error.message}`)
			} else {
				throw new Error('Error desconocido en la petición.')
			}
		}

		if (axiosError && error.response) {
			const { status, data } = error.response

			switch (status) {
				case 401:
					throw new Error('No autorizado.')
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
