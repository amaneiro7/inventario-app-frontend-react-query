import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ShipmentGetter } from '@/entities/shipment/application/ShipmentGetter'
import { ShipmentGetService } from '@/entities/shipment/infra/service/shipmentGet.service'
import { mapShipmentToState } from '../../lib/mapShipmentToState'
import { useFormRoutingContext } from '@/shared/lib/hooks/useFormRoutingContext'
import { NotFoundError } from '@/entities/shared/domain/errors/NotFoundError'
import { type AxiosError } from 'axios'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'
import { type DefaultShipment } from '@/entities/shipment/infra/reducers/shipmentFormReducers'
import { type ShipmentDto } from '../../domain/dto/Shipment.dto'

// Instancias de los servicios y el getter fuera del componente para evitar recreaciones innecesarias.
const repository = new ShipmentGetService()
const get = new ShipmentGetter(repository)

/**
 * `useShipmentInitialState`
 * @function
 * @description Hook personalizado para manejar el estado inicial de una marca en un formulario (creación o edición).
 * Obtiene los datos de la marca desde la API si el formulario está en modo edición o desde el estado de la ubicación.
 * @param {DefaultShipment} defaultState - El estado inicial por defecto de la marca.
 * @returns {{ initialState: DefaultShipment; resetInitialData: () => void; mode: 'edit' | 'add' }}
 * Un objeto con el estado inicial de la marca, una función para resetear el estado y el modo actual del formulario.
 */
export function useShipmentInitialData(defaultState: DefaultShipment): {
	initialData: DefaultShipment
	shipmentData: ShipmentDto | undefined
	mode: FormMode
	isLoading: boolean
	isNotFound: boolean
	isError: boolean
	refreshInitialData: () => void
	onRetry: () => void
} {
	const { id, location, navigate, mode, isNotFound, setNotFound, checkIsNotFound } =
		useFormRoutingContext()

	// 1. Datos iniciales del estado de la ruta (si existen)
	const initialDataFromState = location.state?.brand
		? mapShipmentToState(location.state.brand).mappedData
		: undefined

	// Consulta para obtener los datos de la marca si el modo es editar y no hay datos en el estado de la ubicación.
	const { data, refetch, error, isError, isLoading } = useQuery({
		queryKey: ['shipment', id], // Clave de la consulta para la caché.
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
		select: data => mapShipmentToState(data)
	})

	const [initialData, setInitialData] = useState<DefaultShipment>(
		initialDataFromState || defaultState
	) // Estado local de la marca.

	// Efecto secundario para manejar el estado inicial y la actualización del estado cuando cambian las dependencias.
	useEffect(() => {
		// Si el modo es agregar o no estamos en la ruta de marcas, resetea el estado al estado por defecto.
		if (mode === 'add' || !location.pathname.includes('shipment')) {
			setInitialData(defaultState)
			return
		}

		// Si hay error (no 404), resetear el estado isNotFound
		if (isError && !(error instanceof NotFoundError)) {
			setNotFound(false)
		}
		checkIsNotFound(error)

		// Si hay datos en el estado de la ubicación, actualiza el estado con esos datos.

		if (data) {
			// Si hay datos de la API, actualiza el estado con esos datos.
			setInitialData(data.mappedData)
		}
	}, [mode, data, location.state, defaultState, navigate, id, error])

	/**
	 * Resetea el estado del formulario a su valor inicial o a los datos obtenidos de la API en modo edición.
	 * @returns {Promise<void>} Una promesa que se resuelve cuando el estado ha sido reseteado.
	 */
	const refreshInitialData = useCallback(async () => {
		// Si no estamos en la ruta de marcas, no hace nada.
		if (!location.pathname.includes('shipment')) return
		if (mode === 'add') {
			setInitialData({
				...defaultState,
				id: undefined
			})
			// Si el modo es agregar, resetea el estado al estado por defecto creando un nuevo objeto.
		} else if (id) {
			// Si el modo es editar, vuelve a obtener los datos de la marca de la API y actualiza el estado.
			await refetch()
		}
	}, [defaultState, location.pathname, mode, refetch, id])

	// 6. Función de Reintento
	const onRetry = useCallback(() => {
		setNotFound(false) // Limpiamos el error 404 antes de reintentar
		refetch()
	}, [refetch, setNotFound])

	// Retorna el modo del formulario, el estado inicial y la función para resetear el estado.
	return {
		mode,
		initialData,
		shipmentData: data?.originalData,
		isLoading,
		isError,
		isNotFound,
		refreshInitialData,
		onRetry
	}
}
