import { useQuery } from '@tanstack/react-query'
import { ComputerCountBrandDashboardService } from '../service/computerCountBrandGetDashboard.service'
import { ComputerCountBrandGetByCriteria } from '../../application/ComputerCountBrandGetByCriteria'
import { REFETCH_INTERVAL_IN_MS } from '@/entities/devices/devices/domain/entity/refetchIntervalInMs'
import { transformData } from '../lib/transformData'
import type { ComputerCountBrandDashboardFilters } from '../../application/createComputerCountBrandQueryParams'

const repository = new ComputerCountBrandDashboardService()
const get = new ComputerCountBrandGetByCriteria(repository)

/**
 * `useGetComputerCountBrandDashboard`
 * @function
 * @description Hook personalizado para obtener los datos del dashboard de computadoras.
 * Utiliza `react-query` para la gestión de la caché y el estado de la petición.
 * @property {boolean} isLoading - Indica si la consulta está en curso.
 * @property {Function} refetch - Función para re-ejecutar la consulta.
 * @property {boolean} isError - Indica si la consulta ha resultado en un error.
 * @property {import('../domain/dto/ComputerCountBrandDashboard.dto').ComputerCountBrandDashboardDto | undefined} computerDashboard - Los datos del dashboard de computadoras obtenidos de la consulta.
 */
export const useGetComputerCountBrandDashboard = (query: ComputerCountBrandDashboardFilters) => {
	const {
		isLoading,
		isFetching,
		refetch,
		isError,
		data: computerDashboard
	} = useQuery({
		queryKey: ['dashboard', 'computer-by-brand', query],
		queryFn: () => get.search(query),
		staleTime: 30 * 1000,
		refetchOnMount: true,
		refetchInterval: REFETCH_INTERVAL_IN_MS,
		select(res) {
			return {
				info: res.info,
				data: transformData(res?.data)
			}
		}
	})

	return {
		isLoading,
		isFetching,
		refetch,
		isError,
		computerDashboard
	}
}
