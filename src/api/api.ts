import axios, { type AxiosRequestConfig, type AxiosInstance } from 'axios'
import { type Source } from '../types/type'
import { baseURL, mode } from '../config'
import { fileSaver } from '../utils/filseServer'

export const api: AxiosInstance = axios.create({
	baseURL: baseURL,
	withCredentials: true,
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json'
	}
})

export async function fetching<T>(config: AxiosRequestConfig & { _retry?: boolean }): Promise<T> {
	try {
		const response = await api(config)
		if (!response.data) throw new Error('Ha ocurrido un error inesperado')
		return response.data as T
	} catch (error) {
		if (mode === 'development') {
			if (axios.isAxiosError(error) && error.response) {
				throw new Error(error.response.data || 'Error desconocido')
			} else if (error instanceof Error) {
				throw new Error('No se ha podido realizar la petición')
			} else {
				throw new Error('No se ha podido realizar la petición')
			}
		}
		if (axios.isAxiosError(error) && error.response) {
			const { status } = error.response
			if (status === 401) {
				throw new Error('No autorizado')
			}
			if (status === 403) {
				throw new Error('Acceso Denegado')
			}
			if (status === 404) {
				throw new Error('No encontrado')
			}
			if (status === 500) {
				throw new Error('Error interno del servidor')
			}

			throw new Error(error.response.data || 'Error desconocido')
		}
		throw new Error('Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde')
	}
}
export async function makeDownloadRequest(
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
		if (axios.isAxiosError(error) && error.response) {
			const { status } = error.response
			if (status === 401) {
				throw new Error('No autorizado')
			}
			if (status === 403) {
				throw new Error('Acceso Denegado')
			}
			if (status === 404) {
				throw new Error('No encontrado')
			}
			if (status === 500) {
				throw new Error('Error interno del servidor')
			}

			throw new Error(error.response.data || 'Error desconocido')
		}
		throw new Error('Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde')
	}
}
