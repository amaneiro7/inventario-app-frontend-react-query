import { useQuery } from '@tanstack/react-query'
import { ComputerDashboardService } from '../service/computerGetDashboard.service'
import { GetComputerDashboard } from '../../application/GetComputerDashboard'

const repository = new ComputerDashboardService()
const get = new GetComputerDashboard(repository)

/**
 * `useGetComputerDashboard`
 * @function
 * @description Hook personalizado para obtener los datos del dashboard de computadoras.
 * Utiliza `react-query` para la gestión de la caché y el estado de la petición.
 * @returns {object} Un objeto con el estado de la consulta (`isLoading`, `refetch`, `isError`, `computerDashboard`).
 * @property {boolean} isLoading - Indica si la consulta está en curso.
 * @property {Function} refetch - Función para re-ejecutar la consulta.
 * @property {boolean} isError - Indica si la consulta ha resultado en un error.
 * @property {import('../domain/dto/ComputerDashboard.dto').ComputerDashboardDto | undefined} computerDashboard - Los datos del dashboard de computadoras obtenidos de la consulta.
 */
export const useGetComputerDashboard = () => {
	const {
		isLoading,
		refetch,
		isError,
		data: computerDashboard
	} = useQuery({
		queryKey: ['dashboard', 'computer'],
		queryFn: () => get.execute()
	})

	return {
		isLoading,
		refetch,
		isError,
		computerDashboard
	}
}
