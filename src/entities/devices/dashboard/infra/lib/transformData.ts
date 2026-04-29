import { TypeOfSiteOptionsByName } from '@/entities/locations/typeOfSites/domain/entity/TypeOfSiteOptionsByName'
import { calculateStatus } from './calculatedStatus'
import type { ComputerCountBrandDashboardDto } from '../../domain/dto/ComputerCountBrandDashboard'

export interface ModelData {
	id: string
	name: string
	category: string
	brand: string
	count: number
	inUse: number
	inAlmacen: number
	status: 'In Stock' | 'Low Stock' | 'Out of Stock'
}

export function transformData(data: ComputerCountBrandDashboardDto[]): ModelData[] {
	const THRESHOLD = 10
	const result = data.flatMap(brand =>
		brand.model.map(model => {
			const { inAlmacen, inUse } = model.typeOfSite.reduce(
				(acc, site) => {
					if (site.name === TypeOfSiteOptionsByName.ALMACEN) {
						acc.inAlmacen += site.count
					} else {
						acc.inUse += site.count
					}
					return acc
				},
				{ inAlmacen: 0, inUse: 0 }
			)

			return {
				id: `${brand.name}-${model.name}-${model.category}`,
				name: model.name,
				category: model.category,
				brand: brand.name,
				count: model.count,
				inUse,
				inAlmacen,
				status: calculateStatus(inAlmacen, THRESHOLD)
			}
		})
	)

	return result.sort((a, b) => b.count - a.count)
}
