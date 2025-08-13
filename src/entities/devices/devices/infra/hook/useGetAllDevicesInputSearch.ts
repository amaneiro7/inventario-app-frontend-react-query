import { useQuery } from '@tanstack/react-query'
import { DeviceGetAllService } from '@/entities/devices/devices/infra/service/deviceGetAll.service'
import { DeviceGetByCriteria } from '../../application/inputSearch/DeviceGetByCriteria'
import { type DeviceBaseFilters } from '../../application/createDeviceQueryParams'

const repository = new DeviceGetAllService()
const getAll = new DeviceGetByCriteria(repository)
/**
 * `useGetAllDevicesInputSearch`
 * @function
 * @description Hook personalizado para buscar dispositivos por serial en un input de búsqueda.
 * Utiliza `react-query` para la gestión de la caché y el estado de la petición.
 * @param {DeviceBaseFilters} query - Objeto de filtros para la consulta de dispositivos (principalmente por serial).
 * @returns {object} Un objeto con el estado de la consulta (`isLoading`, `refetch`, `isError`, `data`).
 * @property {boolean} isLoading - Indica si la consulta está en curso.
 * @property {Function} refetch - Función para re-ejecutar la consulta.
 * @property {boolean} isError - Indica si la consulta ha resultado en un error.
 * @property {import('@/entities/shared/domain/methods/Response').Response<import('../../domain/dto/Device.dto').DeviceDto> | undefined} data - Los datos de los dispositivos obtenidos de la consulta.
 */
export const useGetAllDevicesInputSearch = (query: DeviceBaseFilters) => {
	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['devices', 'serialInputSearch', query],
		queryFn: () => getAll.search(query)
	})

	return {
		isLoading,
		refetch,
		isError,
		data
	}
}
