import { useQuery } from '@tanstack/react-query'
import { OperatingSystemArqGetByCriteria } from '@/entities/devices/features/operatingSystem/operatingSystemArq/application/OperatingSystemArqGetByCriteria'
import { OperatingSystemArqGetAllService } from '../service/operatingSystemArqGetAll.service'
import { type OperatingSystemArqFilters } from '../../application/createOperatingSystemArqQueryParams'

const repository = new OperatingSystemArqGetAllService()
const getAll = new OperatingSystemArqGetByCriteria(repository)

/**
 * `useGetAllOperatingSystemArq`
 * @function
 * @description Hook personalizado para obtener todas las arquitecturas de sistema operativo o un subconjunto filtrado/paginado.
 * Utiliza `react-query` para la gestión de la caché y el estado de la petición.
 * @param {OperatingSystemArqFilters} query - Objeto de filtros para la consulta de arquitecturas de sistema operativo.
 * @returns {object} Un objeto con el estado de la consulta (`isLoading`, `refetch`, `isError`, `data`).
 * @property {boolean} isLoading - Indica si la consulta está en curso.
 * @property {Function} refetch - Función para re-ejecutar la consulta.
 * @property {boolean} isError - Indica si la consulta ha resultado en un error.
 * @property {import('@/entities/shared/domain/methods/Response').Response<import('../domain/dto/OperatingSystemArq.dto').OperatingSystemArqDto> | undefined} data - Los datos de las arquitecturas de sistema operativo obtenidos de la consulta.
 */
export const useGetAllOperatingSystemArq = (query: OperatingSystemArqFilters) => {
	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['operatingSystemArqs', query],
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
