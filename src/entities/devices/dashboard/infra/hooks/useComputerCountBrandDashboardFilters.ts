import { useGenericFilter } from '../../../../../shared/lib/hooks/useHookFilter'
import type { ComputerCountBrandDashboardFilters } from '../../application/createComputerCountBrandQueryParams'

/**
 * `useComputerCountBrandDashboardFilter`
 * @function
 * @description Hook personalizado para gestionar los filtros de monitoreo de dispositivos.
 * Utiliza `useGenericFilter` para integrar la lógica de filtrado, paginación y ordenación con la URL.
 * @returns {ComputerCountBrandDashboardFilters} Un objeto que contiene los valores de los filtros y las funciones para manipularlos.
 */
export function useComputerCountBrandDashboardFilter() {
	const filters = useGenericFilter<ComputerCountBrandDashboardFilters>({
		filterKeys: [
			'modelName',
			'locationId',
			'categoryId',
			'brandId',
			'modelId',
			'typeOfSiteId',
			'cityId',
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
