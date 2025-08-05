import { useQuery } from '@tanstack/react-query'
import { OperatingSystemGetByCriteria } from '@/entities/devices/features/operatingSystem/operatingSystem/application/OperatingSystemGetByCriteria'
import { OperatingSystemGetAllService } from '../service/operatingSystemGetAll.service'
import { type OperatingSystemFilters } from '../../application/createOperatingSystemQueryParams'

const repository = new OperatingSystemGetAllService()
const getAll = new OperatingSystemGetByCriteria(repository)

/**
 * `useGetAllOperatingSystem`
 * @function
 * @description Hook personalizado para obtener todos los sistemas operativos o un subconjunto filtrado/paginado.
 * Utiliza `react-query` para la gestión de la caché y el estado de la petición.
 * @param {OperatingSystemFilters} query - Objeto de filtros para la consulta de sistemas operativos.
 * @returns {object} Un objeto con el estado de la consulta (`isLoading`, `refetch`, `isError`, `data`).
 * @property {boolean} isLoading - Indica si la consulta está en curso.
 * @property {Function} refetch - Función para re-ejecutar la consulta.
 * @property {boolean} isError - Indica si la consulta ha resultado en un error.
 * @property {import('@/entities/shared/domain/methods/Response').Response<import('../domain/dto/OperatingSystem.dto').OperatingSystemDto> | undefined} data - Los datos de los sistemas operativos obtenidos de la consulta.
 */
export const useGetAllOperatingSystem = (query: OperatingSystemFilters) => {
	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['operatingSystems', query],
		queryFn: () => getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		data
	}
}
