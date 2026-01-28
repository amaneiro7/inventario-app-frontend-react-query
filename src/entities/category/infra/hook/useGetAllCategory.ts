import { useQuery } from '@tanstack/react-query'
import { CategoryGetByCriteria } from '@/entities/category/application/CategoryGetByCriteria'
import { CategoryGetAllService } from '../service/categoryGetAll.service'
import { type CategoryFilters } from '@/entities/category/application/CreateCategoryQueryParams'

const repository = new CategoryGetAllService()
const getAll = new CategoryGetByCriteria(repository)

/**
 * `useGetAllCategory`
 * @function
 * @description Hook personalizado para obtener todas las categorías o un subconjunto filtrado/paginado.
 * Utiliza `react-query` para la gestión de la caché y el estado de la petición.
 * @param {CategoryFilters} query - Objeto de filtros para la consulta de categorías.
 * @returns {object} Un objeto con el estado de la consulta (`isLoading`, `refetch`, `isError`, `data`).
 * @property {boolean} isLoading - Indica si la consulta está en curso.
 * @property {Function} refetch - Función para re-ejecutar la consulta.
 * @property {boolean} isError - Indica si la consulta ha resultado en un error.
 * @property {import('@/entities/shared/domain/methods/Response').Response<import('../domain/dto/Category.dto').CategoryDto> | undefined} data - Los datos de las categorías obtenidos de la consulta.
 */
export const useGetAllCategory = (query: CategoryFilters) => {
	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['categories', query],
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
