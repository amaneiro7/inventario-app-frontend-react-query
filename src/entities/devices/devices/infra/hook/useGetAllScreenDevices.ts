import { useQuery } from '@tanstack/react-query'
import { DeviceGetAllService } from '@/entities/devices/devices/infra/service/deviceGetAll.service'
import { DeviceScreenFilter } from '../../application/screenFilter/DeviceScreenFilter'
import { REFETCH_INTERVAL_IN_MS } from '../../domain/entity/refetchIntervalInMs'
import { type DeviceBaseFilters } from '../../application/createDeviceQueryParams'

const repository = new DeviceGetAllService()
const getAll = new DeviceScreenFilter(repository)

/**
 * `useGetAllScreenDevices`
 * @function
 * @description Hook personalizado para obtener todos los dispositivos de tipo 'pantalla' o un subconjunto filtrado/paginado.
 * Utiliza `react-query` para la gestión de la caché y el estado de la petición, con refetching automático.
 * @param {DeviceBaseFilters} query - Objeto de filtros para la consulta de pantallas.
 * @returns {object} Un objeto con el estado de la consulta (`isLoading`, `refetch`, `isError`, `devices`).
 * @property {boolean} isLoading - Indica si la consulta está en curso.
 * @property {Function} refetch - Función para re-ejecutar la consulta.
 * @property {boolean} isError - Indica si la consulta ha resultado en un error.
 * @property {import('@/entities/shared/domain/methods/Response').Response<import('../../domain/dto/Device.dto').DeviceDto> | undefined} devices - Los datos de los dispositivos de pantalla obtenidos de la consulta.
 */
export const useGetAllScreenDevices = (query: DeviceBaseFilters) => {
	const {
		isLoading,
		refetch,
		isError,
		data: devices
	} = useQuery({
		queryKey: ['devices', 'screens', query],
		queryFn: () => getAll.search(query),
		staleTime: 60 * 1000,
		refetchOnMount: true,
		refetchInterval: REFETCH_INTERVAL_IN_MS
	})

	return {
		isLoading,
		refetch,
		isError,
		devices
	}
}
