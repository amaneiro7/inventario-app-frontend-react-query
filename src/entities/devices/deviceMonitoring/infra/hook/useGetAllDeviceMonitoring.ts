import { useQuery } from '@tanstack/react-query'
import { DeviceMonitoringGetByCriteria } from '../../application/DeviceMonitoringGetByCriteria'
import { DeviceMonitoringGetAllService } from '../service/deviceMonitoringGetAll.service'
import { type DeviceMonitoringFilters } from '../../application/createDeviceMonitoringQueryParams'

const repository = new DeviceMonitoringGetAllService()
const getAll = new DeviceMonitoringGetByCriteria(repository)

/**
 * `useGetAllDeviceMonitorings`
 * @function
 * @description Hook personalizado para obtener todas las monitorizaciones de dispositivos o un subconjunto filtrado/paginado.
 * Utiliza `react-query` para la gestión de la caché y el estado de la petición, con refetching automático.
 * @param {DeviceMonitoringFilters} query - Objeto de filtros para la consulta de monitorizaciones de dispositivos.
 * @returns {object} Un objeto con el estado de la consulta (`isLoading`, `isFetching`, `refetch`, `isError`, `error`, `deviceMonitorings`).
 * @property {boolean} isLoading - Indica si la consulta está en curso.
 * @property {boolean} isFetching - Indica si la consulta está en proceso de obtención de datos (incluyendo re-obtenciones).
 * @property {Function} refetch - Función para re-ejecutar la consulta.
 * @property {boolean} isError - Indica si la consulta ha resultado en un error.
 * @property {Error | null} error - Objeto de error si la consulta falló.
 * @property {import('@/entities/shared/domain/methods/Response').Response<import('../domain/dto/DeviceMonitoring.dto').DeviceMonitoringDto> | undefined} deviceMonitorings - Los datos de las monitorizaciones de dispositivos obtenidos de la consulta.
 */
export const useGetAllDeviceMonitorings = (query: DeviceMonitoringFilters) => {
	const ONE_MINUTE_IN_MS = 60 * 1000
	const {
		isLoading,
		isFetching,
		refetch,
		isError,
		error,
		data: deviceMonitorings
	} = useQuery({
		queryKey: ['deviceMonitorings', query],
		queryFn: () => getAll.search(query),
		staleTime: ONE_MINUTE_IN_MS,
		refetchInterval: ONE_MINUTE_IN_MS,
		refetchOnReconnect: true,
		refetchOnWindowFocus: true
	})

	return {
		isLoading,
		refetch,
		error,
		isFetching,
		isError,
		deviceMonitorings
	}
}