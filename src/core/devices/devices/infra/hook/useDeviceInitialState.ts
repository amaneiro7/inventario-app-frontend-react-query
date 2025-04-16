import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { DeviceGetService } from '../service/deviceGet.service'
import { DeviceGetter } from '../../application/DeviceGetter'
import { useGetFormMode } from '@/hooks/useGetFormMode'
import { type DefaultDevice } from '../reducers/devicesFormReducer'
import { type DeviceDto } from '../../domain/dto/Device.dto'

// Instancias de los servicios y el getter fuera del componente para evitar recreaciones innecesarias.
const repository = new DeviceGetService() // Servicio para obtener datos de dispositivos.
const get = new DeviceGetter(repository) // Getter para obtener datos de un dispositivo específico.

/**
 * Hook personalizado para manejar el estado inicial de un dispositivo en un formulario.
 * @param defaultState Estado inicial por defecto del dispositivo.
 * @returns Un objeto con el estado inicial, la función para resetear el estado y el modo del formulario.
 */
export function useDeviceInitialState(defaultState: DefaultDevice): {
	initialState: DefaultDevice
	resetState: () => void
	mode: 'edit' | 'add'
} {
	const { id } = useParams() // Obtiene el ID del dispositivo de los parámetros de la URL.
	const location = useLocation() // Obtiene la ubicación actual de la URL.
	const navigate = useNavigate() // Función para navegar a otras rutas.
	const [state, setState] = useState<DefaultDevice>(defaultState) // Estado local del dispositivo.

	const mode = useGetFormMode() // Obtiene el modo del formulario (editar o agregar).

	// Consulta para obtener los datos del dispositivo si el modo es editar y no hay datos en el estado de la ubicación.
	const { data: deviceData, refetch } = useQuery({
		queryKey: ['device', id], // Clave de la consulta para la caché.
		queryFn: () => (id ? get.execute({ id }) : Promise.reject('ID is missing')), // Función para obtener los datos del dispositivo.
		enabled: !!id && mode === 'edit' && !location?.state?.device, // Habilita la consulta solo si hay un ID, el modo es editar y no hay datos en el estado de la ubicación.
		retry: false // Deshabilita los reintentos automáticos en caso de error.
	})

	const setMemoryRamValues = useCallback(
		(computer: DeviceDto['computer'], memoryRamSlotQuantity?: number): number[] => {
			if (!computer || !memoryRamSlotQuantity) {
				return [0]
			}

			const { memoryRam } = computer
			const currentRamCount = memoryRam.length

			if (currentRamCount === memoryRamSlotQuantity) {
				return memoryRam
			}

			if (currentRamCount < memoryRamSlotQuantity) {
				return [...memoryRam, ...Array(memoryRamSlotQuantity - currentRamCount)]
			}

			// Caso donde currentRamCount > memoryRamSlotQuantity
			console.error(
				'Error: memoryRamSlotQuantity es menor que la cantidad actual de módulos de RAM.'
			)
			return memoryRam.slice(0, memoryRamSlotQuantity)
		},
		[]
	)

	const mappedDeviceState = useCallback(
		(device: DeviceDto): void => {
			const { computer, model, hardDrive, mfp } = device
			const memoryRamSlotQuantity = model?.modelComputer?.memoryRamSlotQuantity
			const memoryRamType = model?.modelComputer?.memoryRamType?.name ?? ''
			const memoryRam = setMemoryRamValues(computer, memoryRamSlotQuantity)

			// Si la capacidad de la RAM está definida y el número de slots no coincide, actualiza el primer slot.
			if (
				computer &&
				computer.memoryRamCapacity > 0 &&
				computer.memoryRam.length !== memoryRamSlotQuantity
			) {
				memoryRam[0] = Number(computer.memoryRamCapacity)
			}

			setState({
				...defaultState,
				id: device.id,
				statusId: device.statusId,
				mainCategoryId: device.category.mainCategoryId,
				categoryId: device.categoryId,
				serial: device.serial ?? '',
				activo: device.activo ?? '',
				brandId: device.brandId,
				modelId: device.modelId,
				genericModel: model?.generic,
				employeeId: device.employeeId ?? '',
				locationId: device.locationId ?? '',
				typeOfSiteId: device.location?.typeOfSiteId ?? '',
				observation: device.observation ?? '',
				stockNumber: device.stockNumber ?? '',
				computerName: computer?.computerName ?? '',
				processorId: computer?.processorId ?? '',
				memoryRamCapacity: computer?.memoryRamCapacity ?? 0,
				hardDriveCapacityId:
					computer?.hardDriveCapacityId || hardDrive?.hardDriveCapacityId || '',
				hardDriveTypeId: computer?.hardDriveTypeId || hardDrive?.hardDriveTypeId || '',
				operatingSystemArqId: computer?.operatingSystemArqId ?? '',
				operatingSystemId: computer?.operatingSystemId ?? '',
				ipAddress: computer?.ipAddress || mfp?.ipAddress || '',
				macAddress: computer?.macAddress ?? '',
				health: hardDrive?.health ?? 100,
				memoryRam: memoryRam,
				memoryRamSlotQuantity,
				memoryRamType,
				history: device.history,
				updatedAt: device.updatedAt
			})
		},
		[defaultState, setMemoryRamValues]
	)

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
		// Si hay datos en el estado de la ubicación, actualiza el estado con esos datos.
		if (location.state?.data) {
			setState(location.state.data)
		} else if (deviceData) {
			// Si hay datos de la API, mapea los datos al estado.
			mappedDeviceState(deviceData)
		}
	}, [mode, deviceData, location.state, defaultState, navigate, id, mappedDeviceState])

	/**
	 * Función para resetear el estado del dispositivo.
	 */
	const resetState = useCallback(async () => {
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
			const { data } = await refetch()
			if (data) {
				mappedDeviceState(data)
			}
		}
	}, [defaultState, location.pathname, mode, refetch, mappedDeviceState])

	// Retorna el modo del formulario, el estado inicial y la función para resetear el estado.
	return {
		mode,
		initialState: state,
		resetState
	}
}
