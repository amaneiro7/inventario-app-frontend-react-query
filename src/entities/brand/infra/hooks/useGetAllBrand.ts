import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BrandGetAllService } from '@/entities/brand/infra/service/brandGetAll.service'
import { BrandGetByCriteria } from '../../application/BrandGetByCriteria'
import { type BrandFilters } from '../../application/createBrandQueryParams'

/**
 * `useGetAllBrands`
 * @function
 * @description Hook personalizado para obtener todas las marcas o un subconjunto filtrado/paginado.
 * Utiliza `react-query` para la gestión de la caché y el estado de la petición.
 * @param {BrandFilters} query - Objeto de filtros para la consulta de marcas.
 * @returns {object} Un objeto con el estado de la consulta (`isLoading`, `refetch`, `isError`, `data`).
 * @property {boolean} isLoading - Indica si la consulta está en curso.
 * @property {Function} refetch - Función para re-ejecutar la consulta.
 * @property {boolean} isError - Indica si la consulta ha resultado en un error.
 * @property {import('@/entities/shared/domain/methods/Response').Response<import('../domain/dto/Brand.dto').BrandDto> | undefined} data - Los datos de las marcas obtenidos de la consulta.
 */
export const useGetAllBrands = (query: BrandFilters) => {
	const repository = useMemo(() => new BrandGetAllService(), [])
	const getAll = useMemo(() => new BrandGetByCriteria(repository), [repository])
	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['brands', query],
		queryFn: () => getAll.search(query)
	})

	return {
		isLoading,
		refetch,
		isError,
		data
	}
}
