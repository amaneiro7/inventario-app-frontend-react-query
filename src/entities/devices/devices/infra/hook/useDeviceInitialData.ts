import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { DeviceGetService } from '../service/deviceGet.service'
import { DeviceGetter } from '../../application/DeviceGetter'
import { useFormRoutingContext } from '@/shared/lib/hooks/useFormRoutingContext'
import { mapDeviceToState } from '../../lib/mapDeviceToState'
import { NotFoundError } from '@/entities/shared/domain/errors/NotFoundError'
import { type AxiosError } from 'axios'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'
import { type DefaultDevice } from '../reducers/devicesFormReducer'

// Instancias de los servicios y el getter fuera del componente para evitar recreaciones innecesarias.
const repository = new DeviceGetService() // Servicio para obtener datos de dispositivos.
const get = new DeviceGetter(repository) // Getter para obtener datos de un dispositivo específico.

/**
 * Hook personalizado para manejar el estado inicial de un dispositivo en un formulario.
 * @param defaultState Estado inicial por defecto del dispositivo.
 * @returns Un objeto con el estado inicial, la función para resetear el estado y el modo del formulario.
 */
export function useDeviceInitialData(defaultState: DefaultDevice): {
	initialData: DefaultDevice
	refreshInitialData: () => void
	mode: FormMode
	isLoading: boolean
	isNotFound: boolean
	isError: boolean
	onRetry: () => void
} {
	const { id, location, navigate, mode, isNotFound, setNotFound, checkIsNotFound } =
		useFormRoutingContext()

	const initialDataFromState = location.state?.device
		? mapDeviceToState(location.state.device)
		: undefined

	// Consulta para obtener los datos del dispositivo si el modo es editar y no hay datos en el estado de la ubicación.
	const {
		data: deviceData,
		refetch,
		error,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['device', id], // Clave de la consulta para la caché.
		queryFn: () => {
			if (!id) {
				// El chequeo de !id es crucial aquí si quieres tipar el error.
				throw new Error('ID is missing in edit mode.')
			}
			return get.execute({ id })
		},
		enabled: mode === 'edit' && !!id && !initialDataFromState, // No habilitar si ya tenemos datos iniciales
		retry: (failureCount, error: AxiosError) => {
			// No reintentar si es un error 404
			if (error.response?.status === 404) {
				return false
			}
			// No reintentar si es un error 401 (el interceptor ya lo maneja, pero un reintento de RQ no haría daño)
			// O si el interceptor falla, permitir que RQ lo intente de nuevo.
			if (error.response?.status === 401) {
				return failureCount < 2 // Intentar solo una vez más, por ejemplo
			}
			// Para otros errores, usar el comportamiento por defecto (hasta 3 reintentos)
			return failureCount < 3
		},
		select: data => mapDeviceToState(data)
	})

	const [state, setState] = useState<DefaultDevice>(initialDataFromState || defaultState) // Estado local del dispositivo.

	// Efecto secundario para manejar el estado inicial y la actualización del estado cuando cambian las dependencias.
	useEffect(() => {
		// Si el modo es agregar o no estamos en la ruta de dispositivos, resetea el estado al estado por defecto.
		if (mode === 'add' || !location.pathname.includes('device')) {
			setState(defaultState)
			return
		}

		// Si no hay un ID, navega a la página de error.
		if (!id) {
			navigate('/error')
			return
		}

		// Si hay error (no 404), resetear el estado isNotFound
		if (isError && !(error instanceof NotFoundError)) {
			setNotFound(false)
		}
		checkIsNotFound(error)
		// Si hay datos en el estado de la ubicación, actualiza el estado con esos datos.
		if (deviceData) {
			// Si hay datos de la API, mapea los datos al estado.
			setState(deviceData)
		}
	}, [mode, deviceData, location.state, defaultState, navigate, id])

	/**
	 * Función para resetear el estado del dispositivo.
	 */
	const refreshInitialData = useCallback(async () => {
		// Si no estamos en la ruta de dispositivos, no hace nada.
		if (!location.pathname.includes('device')) return
		// Si el modo es agregar, resetea el estado al estado por defecto.
		if (mode === 'add') {
			setState({
				id: undefined,
				...defaultState
			})
		} else {
			// Si el modo es editar, vuelve a obtener los datos del dispositivo de la API y actualiza el estado.
			await refetch()
		}
	}, [defaultState, location.pathname, mode, refetch])

	// 6. Función de Reintento
	const onRetry = useCallback(() => {
		setNotFound(false) // Limpiamos el error 404 antes de reintentar
		refetch()
	}, [refetch, setNotFound])

	// Retorna el modo del formulario, el estado inicial y la función para resetear el estado.
	return {
		mode,
		initialData: state,
		isLoading,
		isError,
		isNotFound,
		refreshInitialData,
		onRetry
	}
}
