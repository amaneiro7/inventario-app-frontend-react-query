import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { HardDriveCapacityGetAllService } from '../service/hardDriveCapacityGetAll.service'
import { HardDriveCapacityGetByCriteria } from '../../application/HardDriveCapacityGetByCriteria'
import { type HardDriveCapacityFilters } from '../../application/createHardDriveCapacityQueryParams'

/**
 * `useGetAllHardDriveCapacity`
 * @function
 * @description Hook personalizado para obtener todas las capacidades de disco duro o un subconjunto filtrado/paginado.
 * Utiliza `react-query` para la gestión de la caché y el estado de la petición.
 * @param {HardDriveCapacityFilters} query - Objeto de filtros para la consulta de capacidades de disco duro.
 * @returns {object} Un objeto con el estado de la consulta (`isLoading`, `refetch`, `isError`, `data`).
 * @property {boolean} isLoading - Indica si la consulta está en curso.
 * @property {Function} refetch - Función para re-ejecutar la consulta.
 * @property {boolean} isError - Indica si la consulta ha resultado en un error.
 * @property {import('@/entities/shared/domain/methods/Response').Response<import('../domain/dto/HardDriveCapacity.dto').HardDriveCapacityDto> | undefined} data - Los datos de las capacidades de disco duro obtenidos de la consulta.
 */
export const useGetAllHardDriveCapacity = (query: HardDriveCapacityFilters) => {
	const repository = useMemo(() => new HardDriveCapacityGetAllService(), [])
	const getAll = useMemo(() => new HardDriveCapacityGetByCriteria(repository), [repository])

	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['hardDriveCapacities', query],
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