import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ShipmentGetter } from '@/entities/shipment/application/ShipmentGetter'
import { ShipmentGetService } from '@/entities/shipment/infra/service/shipmentGet.service'
import { useGetFormMode } from '@/shared/lib/hooks/useGetFormMode'
import { convetDateForInputs } from '@/shared/lib/utils/convertDateForInput'
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
 * @returns {{ initialState: DefaultShipment; resetState: () => void; mode: 'edit' | 'add' }}
 * Un objeto con el estado inicial de la marca, una función para resetear el estado y el modo actual del formulario.
 */
export function useShipmentInitialState(defaultState: DefaultShipment): {
	initialState: DefaultShipment
	shipmentData: ShipmentDto | undefined
	resetState: () => void
	mode: 'edit' | 'add'
	isLoading: boolean
	isNotFound: boolean
	isError: boolean
	onRetry: () => void
} {
	const { id } = useParams() // Obtiene el ID de la marca de los parámetros de la URL.
	const location = useLocation() // Obtiene la ubicación actual de la URL.
	const navigate = useNavigate() // Función para navegar a otras rutas.
	const [state, setState] = useState<DefaultShipment>(defaultState) // Estado local de la marca.
	const [isNotFound, setIsNotFound] = useState<boolean>(false)

	const mode = useGetFormMode() // Obtiene el modo del formulario (editar o agregar).

	// Consulta para obtener los datos de la marca si el modo es editar y no hay datos en el estado de la ubicación.
	const {
		data: shipmentData,
		refetch,
		error,
		isError,
		isLoading
	} = useQuery({
		queryKey: ['shipment', id], // Clave de la consulta para la caché.
		queryFn: () => (id ? get.execute({ id }) : Promise.reject('ID is missing')), // Función para obtener los datos de la marca.
		enabled: !!id && mode === 'edit' && !location?.state?.Shipment, // Habilita la consulta solo si hay un ID, el modo es editar y no hay datos en el estado de la ubicación.
		retry: false // Deshabilita los reintentos automáticos en caso de error.
	})

	/**
	 * Mapea un objeto `ShipmentDto` a la estructura `DefaultShipment` para el estado del formulario.
	 * @param {ShipmentDto} Shipment - El objeto `ShipmentDto` a mapear.
	 */
	const mapShipmentToState = useCallback((shipment: ShipmentDto): void => {
		const deviceIds = [...shipment?.shipmentDevice.map(device => device.deviceId)]
		const shipmentDate = convetDateForInputs(shipment.shipmentDate)
		const deliveryDate = convetDateForInputs(shipment.deliveryDate)
		const sentBy = `${shipment?.fromUser?.name} ${shipment?.fromUser.lastName}`
		setState({
			id: shipment.id,
			origin: shipment.origin,
			destination: shipment.destination,
			shipmentDate,
			deliveryDate,
			sentBy,
			receivedBy: shipment.receivedBy ?? '',
			trackingNumber: shipment.trackingNumber ?? '',
			observation: shipment.observation ?? '',
			status: shipment.status,
			reason: shipment.reason,
			deviceIds,
			updatedAt: shipment?.updatedAt
		})
	}, [])

	// Efecto secundario para manejar el estado inicial y la actualización del estado cuando cambian las dependencias.
	useEffect(() => {
		// Si el modo es agregar o no estamos en la ruta de marcas, resetea el estado al estado por defecto.
		if (mode === 'add' || !location.pathname.includes('shipment')) {
			setState(defaultState)
			return
		}

		if (error?.message.includes('Recurso no encontrado.')) {
			setIsNotFound(true)
		} else {
			setIsNotFound(false)
		}

		// Si hay datos en el estado de la ubicación, actualiza el estado con esos datos.

		if (location?.state?.shipment) {
			setState(location.state.shipment)
		} else if (shipmentData) {
			// Si hay datos de la API, actualiza el estado con esos datos.
			mapShipmentToState(shipmentData)
		}
	}, [mode, shipmentData, location.state, defaultState, navigate, id, error])

	/**
	 * Resetea el estado del formulario a su valor inicial o a los datos obtenidos de la API en modo edición.
	 * @returns {Promise<void>} Una promesa que se resuelve cuando el estado ha sido reseteado.
	 */ const resetState = useCallback(async () => {
		// Si no estamos en la ruta de marcas, no hace nada.
		if (!location.pathname.includes('shipment')) return
		if (mode === 'add') {
			setState({
				id: undefined,
				...defaultState
			})
			// Si el modo es agregar, resetea el estado al estado por defecto creando un nuevo objeto.
		} else if (id) {
			// Si el modo es editar, vuelve a obtener los datos de la marca de la API y actualiza el estado.
			const { data } = await refetch()
			if (data) {
				mapShipmentToState(data)
			}
		}
	}, [defaultState, location.pathname, mode, refetch, id])

	// Retorna el modo del formulario, el estado inicial y la función para resetear el estado.
	return {
		mode,
		initialState: state,
		shipmentData,
		isLoading,
		isError,
		isNotFound,
		resetState,
		onRetry: refetch
	}
}
