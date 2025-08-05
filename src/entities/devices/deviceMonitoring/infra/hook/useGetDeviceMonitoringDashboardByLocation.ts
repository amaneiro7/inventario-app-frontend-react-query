import { useQuery } from '@tanstack/react-query'
import { DeviceMonitoringDashboardByLocationService } from '../service/deviceMonitoringGetDashboardByLocation.service'
import { GetDeviceMonitoringDashboardByLocation } from '../../application/GetDeviceMonitoringDashboardByLocation'
import { type DeviceMonitoringFilters } from '../../application/createDeviceMonitoringQueryParams'

const repository = new DeviceMonitoringDashboardByLocationService()
const get = new GetDeviceMonitoringDashboardByLocation(repository)

/**
 * `useGetDeviceMonitoringDashboardByLocation`
 * @function
 * @description Hook personalizado para obtener los datos del dashboard de monitoreo de dispositivos agrupados por ubicación.
 * Utiliza `react-query` para la gestión de la caché y el estado de la petición, con refetching automático.
 * @param {DeviceMonitoringFilters} query - Objeto de filtros para la consulta del dashboard.
 * @returns {object} Un objeto con el estado de la consulta (`isLoading`, `refetch`, `isError`, `error`, `dataUpdatedAt`, `isFetching`, `deviceMonitoringDashboardByLocation`).
 * @property {boolean} isLoading - Indica si la consulta está en curso.
 * @property {Function} refetch - Función para re-ejecutar la consulta.
 * @property {boolean} isError - Indica si la consulta ha resultado en un error.
 * @property {Error | null} error - Objeto de error si la consulta falló.
 * @property {number | undefined} dataUpdatedAt - Marca de tiempo de la última actualización exitosa de los datos.
 * @property {boolean} isFetching - Indica si la consulta está en proceso de obtención de datos (incluyendo re-obtenciones).
 * @property {import('../domain/dto/DeviceMonitoringDashboardByLocation.dto').DeviceMonitoringDashboardByLocationDto[] | undefined} deviceMonitoringDashboardByLocation - Los datos del dashboard de monitoreo de dispositivos por ubicación obtenidos de la consulta.
 */
export const useGetDeviceMonitoringDashboardByLocation = (query: DeviceMonitoringFilters) => {
	const ONE_MINUTE_IN_MS = 60 * 1000
	const {
		isLoading,
		refetch,
		isError,
		error,
		dataUpdatedAt,
		isFetching,
		data: deviceMonitoringDashboardByLocation
	} = useQuery({
		queryKey: ['deviceMonitoringDashboardByLocation', query],
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
		deviceMonitoringDashboardByLocation
	}
}