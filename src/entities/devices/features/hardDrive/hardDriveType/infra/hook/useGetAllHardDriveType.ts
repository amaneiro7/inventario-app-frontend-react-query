import { useQuery } from '@tanstack/react-query'
import { HardDriveTypeGetAllService } from '../service/hardDriveTypeGetAll.service'
import { HardDriveTypeGetByCriteria } from '../../application/HardDriveTypeGetByCriteria'
import { type HardDriveTypeFilters } from '../../application/createHardDriveTypeQueryParams'

const repository = new HardDriveTypeGetAllService()
const getAll = new HardDriveTypeGetByCriteria(repository)

/**
 * `useGetAllHardDriveType`
 * @function
 * @description Hook personalizado para obtener todos los tipos de disco duro o un subconjunto filtrado/paginado.
 * Utiliza `react-query` para la gestión de la caché y el estado de la petición.
 * @param {HardDriveTypeFilters} query - Objeto de filtros para la consulta de tipos de disco duro.
 * @returns {object} Un objeto con el estado de la consulta (`isLoading`, `refetch`, `isError`, `data`).
 * @property {boolean} isLoading - Indica si la consulta está en curso.
 * @property {Function} refetch - Función para re-ejecutar la consulta.
 * @property {boolean} isError - Indica si la consulta ha resultado en un error.
 * @property {import('@/entities/shared/domain/methods/Response').Response<import('../domain/dto/HardDriveType.dto').HardDriveTypeDto> | undefined} data - Los datos de los tipos de disco duro obtenidos de la consulta.
 */
export const useGetAllHardDriveType = (query: HardDriveTypeFilters) => {
	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['hardDriveTypes', query],
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
