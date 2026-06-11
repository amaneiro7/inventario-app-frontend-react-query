import { useGenericFilter } from '@/shared/lib/hooks/useHookFilter'
import type { EvaluationHardwareDashboardFilters } from '@/entities/devices/deviceEvaluation/application/createEvaluationHardwareQueryParams'
/**
 * `useEvaluationHardwareDashboardFilter`
 * @function
 * @description Hook personalizado para gestionar los filtros de monitoreo de dispositivos.
 * Utiliza `useGenericFilter` para integrar la lógica de filtrado, paginación y ordenación con la URL.
 * @returns {EvaluationHardwareDashboardFilters} Un objeto que contiene los valores de los filtros y las funciones para manipularlos.
 */
export function useEvaluationHardwareDashboardFilter() {
	const filters = useGenericFilter<EvaluationHardwareDashboardFilters>({
		filterKeys: [
			'isApto',
			'isNoApto',
			'isRamApto',
			'isDiskApto',
			'isProcessorApto',
			'memoryRamCapacity',
			'locationId',
			'categoryId',
			'brandId',
			'modelId',
			'typeOfSiteId',
			'cityId',
			'serial',
			'mainCategoryId',
			'stateId',
			'siteId',
			'administrativeRegionId',
			'regionId',
			'orderBy',
			'orderType'
		]
	})

	return {
		...filters
	}
}
