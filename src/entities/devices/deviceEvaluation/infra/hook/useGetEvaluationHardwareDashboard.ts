import { useQuery } from '@tanstack/react-query'
import { REFETCH_INTERVAL_IN_MS } from '@/entities/devices/devices/domain/entity/refetchIntervalInMs'
import { EvaluationHardwareDashboardService } from '../service/evaluationHardwareGetDashboard.service'
import { EvaluationHardwareDashboardGetByCriteria } from '../../application/EvalutionHardwareDashboardGetByCriteria'
import type { EvaluationHardwareDashboardFilters } from '../../application/createEvaluationHardwareQueryParams'

const repository = new EvaluationHardwareDashboardService()
const get = new EvaluationHardwareDashboardGetByCriteria(repository)

/**
 * `useGetEvaluationHardwareDashboard`
 * @function
 * @description Hook personalizado para obtener los datos del dashboard de computadoras.
 * Utiliza `react-query` para la gestión de la caché y el estado de la petición.
 * @property {boolean} isLoading - Indica si la consulta está en curso.
 * @property {Function} refetch - Función para re-ejecutar la consulta.
 * @property {boolean} isError - Indica si la consulta ha resultado en un error.
 * @property {import('../domain/dto/EvaluationHardwareDashboard.dto').EvaluationHardwareDashboardResponse | undefined} computerDashboard - Los datos del dashboard de computadoras obtenidos de la consulta.
 */
export const useGetEvaluationHardwareDashboard = (query: EvaluationHardwareDashboardFilters) => {
	return useQuery({
		queryKey: ['dashboard', 'evaluation-hardware', query],
		queryFn: () => get.search(query),
		staleTime: 30 * 1000,
		refetchOnMount: true,
		refetchInterval: REFETCH_INTERVAL_IN_MS
	})
}
