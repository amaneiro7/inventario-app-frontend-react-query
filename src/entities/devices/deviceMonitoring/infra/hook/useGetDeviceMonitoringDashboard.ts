import { useQuery } from '@tanstack/react-query'
import { DeviceMonitoringDashboardService } from '../service/deviceMonitoringGetDashboard.service'
import { GetDeviceMonitoringDashboard } from '../../application/GetDeviceMonitoringDashboard'
import { type DeviceMonitoringFilters } from '../../application/createDeviceMonitoringQueryParams'

const repository = new DeviceMonitoringDashboardService()
const get = new GetDeviceMonitoringDashboard(repository)

/**
 * `useGetDeviceMonitoringDashboard`
 * @function
 * @description Hook personalizado para obtener los datos del dashboard de monitoreo de dispositivos.
 * Utiliza `react-query` para la gestión de la caché y el estado de la petición, con refetching automático.
 * @param {DeviceMonitoringFilters} query - Objeto de filtros para la consulta del dashboard.
 * @returns {object} Un objeto con el estado de la consulta (`isLoading`, `refetch`, `isError`, `error`, `dataUpdatedAt`, `isFetching`, `deviceMonitoringDashboard`).
 * @property {boolean} isLoading - Indica si la consulta está en curso.
 * @property {Function} refetch - Función para re-ejecutar la consulta.
 * @property {boolean} isError - Indica si la consulta ha resultado en un error.
 * @property {Error | null} error - Objeto de error si la consulta falló.
 * @property {number | undefined} dataUpdatedAt - Marca de tiempo de la última actualización exitosa de los datos.
 * @property {boolean} isFetching - Indica si la consulta está en proceso de obtención de datos (incluyendo re-obtenciones).
 * @property {import('../domain/dto/DeviceMonitoringDashboard.dto').DeviceMonitoringDashboardDto | undefined} deviceMonitoringDashboard - Los datos del dashboard de monitoreo de dispositivos obtenidos de la consulta.
 */
export const useGetDeviceMonitoringDashboard = (query: DeviceMonitoringFilters) => {
	const ONE_MINUTE_IN_MS = 60 * 1000
	const {
		isLoading,
		refetch,
		isError,
		error,
		dataUpdatedAt,
		isFetching,
		data: deviceMonitoringDashboard
	} = useQuery({
		queryKey: ['deviceMonitoringDashboard', query],
		queryFn: () => get.execute(query),
		staleTime: ONE_MINUTE_IN_MS,
		refetchInterval: ONE_MINUTE_IN_MS,
		refetchOnReconnect: true,
		refetchOnWindowFocus: true
	})

	return {
		isLoading,
		refetch,
		isError,
		error,
		isFetching,
		dataUpdatedAt,
		deviceMonitoringDashboard
	}
}