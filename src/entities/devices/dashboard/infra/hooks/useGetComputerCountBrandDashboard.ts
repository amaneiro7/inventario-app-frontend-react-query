import { useQuery } from '@tanstack/react-query'
import { ComputerCountBrandDashboardService } from '../service/computerCountBrandGetDashboard.service'
import { GetComputerCountBrandDashboard } from '../../application/GetComputerCountBrandDashboard'
import { REFETCH_INTERVAL_IN_MS } from '@/entities/devices/devices/domain/entity/refetchIntervalInMs'

const repository = new ComputerCountBrandDashboardService()
const get = new GetComputerCountBrandDashboard(repository)

/**
 * `useGetComputerCountBrandDashboard`
 * @function
 * @description Hook personalizado para obtener los datos del dashboard de computadoras.
 * Utiliza `react-query` para la gestión de la caché y el estado de la petición.
 * @returns {object} Un objeto con el estado de la consulta (`isLoading`, `refetch`, `isError`, `computerDashboard`).
 * @property {boolean} isLoading - Indica si la consulta está en curso.
 * @property {Function} refetch - Función para re-ejecutar la consulta.
 * @property {boolean} isError - Indica si la consulta ha resultado en un error.
 * @property {import('../domain/dto/ComputerCountBrandDashboard.dto').ComputerCountBrandDashboardDto | undefined} computerDashboard - Los datos del dashboard de computadoras obtenidos de la consulta.
 */
export const useGetComputerCountBrandDashboard = ({ query }: { query: string }) => {
	const {
		isLoading,
		isFetching,
		refetch,
		isError,
		data: computerDashboard
	} = useQuery({
		queryKey: ['dashboard', 'computer-by-brand', query],
		queryFn: () => get.execute(query),
		staleTime: 30 * 1000,
		refetchOnMount: true,
		refetchInterval: REFETCH_INTERVAL_IN_MS
	})

	return {
		isLoading,
		isFetching,
		refetch,
		isError,
		computerDashboard
	}
}
