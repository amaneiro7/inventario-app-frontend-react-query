import { useQuery } from '@tanstack/react-query'
import { GeneralDashboardService } from '../service/generalGetDashboard.service'
import { GetGeneralDashboard } from '../../application/GetGeneralDashboard'

const repository = new GeneralDashboardService()
const get = new GetGeneralDashboard(repository)

/**
 * `useGetGeneralDashboard`
 * @function
 * @description Hook personalizado para obtener los datos del dashboard general.
 * Utiliza `react-query` para la gestión de la caché y el estado de la petición.
 * @returns {object} Un objeto con el estado de la consulta (`isLoading`, `refetch`, `isError`, `generalDashboard`).
 * @property {boolean} isLoading - Indica si la consulta está en curso.
 * @property {Function} refetch - Función para re-ejecutar la consulta.
 * @property {boolean} isError - Indica si la consulta ha resultado en un error.
 * @property {import('../domain/dto/GeneralDashboard.dto').GeneralDashboardDto | undefined} generalDashboard - Los datos del dashboard general obtenidos de la consulta.
 */
export const useGetGeneralDashboard = () => {
	const {
		isLoading,
		refetch,
		isError,
		data: generalDashboard
	} = useQuery({
		queryKey: ['dashboard', 'general'],
		queryFn: () => get.execute()
	})

	return {
		isLoading,
		refetch,
		isError,
		generalDashboard
	}
}
