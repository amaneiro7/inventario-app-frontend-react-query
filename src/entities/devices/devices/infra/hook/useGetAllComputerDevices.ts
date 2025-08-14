import { useQuery } from '@tanstack/react-query'
import { DeviceComputerFilter } from '@/entities/devices/devices/application/computerFilter/DeviceComputerFilter'
import { DeviceGetAllService } from '@/entities/devices/devices/infra/service/deviceGetAll.service'
import { REFETCH_INTERVAL_IN_MS } from '@/entities/devices/devices/domain/entity/refetchIntervalInMs'
import { type DeviceBaseFilters } from '@/entities/devices/devices/application/createDeviceQueryParams'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { type DeviceDto } from '@/entities/devices/devices/domain/dto/Device.dto'

const repository = new DeviceGetAllService()
const getAll = new DeviceComputerFilter(repository)

/**
 * `useGetAllComputerDevices`
 * @function
 * @description Hook personalizado para obtener todos los dispositivos de tipo 'computadora' o un subconjunto filtrado/paginado.
 * Utiliza `react-query` para la gestión de la caché y el estado de la petición, con refetching automático.
 * @param {object} props - Las propiedades del hook.
 * @param {DeviceBaseFilters} props.query - Objeto de filtros para la consulta de dispositivos de computadora.
 * @returns {object} Un objeto con el estado de la consulta (`isLoading`, `refetch`, `isError`, `devices`).
 * @property {boolean} isLoading - Indica si la consulta está en curso.
 * @property {Function} refetch - Función para re-ejecutar la consulta.
 * @property {boolean} isError - Indica si la consulta ha resultado en un error.
 * @property {Response<DeviceDto> | undefined} devices - Los datos de los dispositivos de computadora obtenidos de la consulta.
 */
export const useGetAllComputerDevices = ({
	query
}: {
	query: DeviceBaseFilters
}): {
	isLoading: boolean
	isFetching: boolean
	isError: boolean
	refetch: () => void
	devices: Response<DeviceDto> | undefined
} => {
	const {
		isLoading,
		isFetching,
		refetch,
		isError,
		data: devices
	} = useQuery({
		queryKey: ['devices', 'computers', query],
		queryFn: () => getAll.search(query),
		staleTime: 30 * 1000,
		refetchOnMount: true,
		refetchInterval: REFETCH_INTERVAL_IN_MS
	})

	return {
		isLoading,
		isFetching,
		refetch,
		isError,
		devices
	}
}
