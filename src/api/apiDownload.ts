import axios, { type AxiosRequestConfig } from 'axios'
import { api } from './axios.config'
import { fileSaver } from '@/utils/filseServer'
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
