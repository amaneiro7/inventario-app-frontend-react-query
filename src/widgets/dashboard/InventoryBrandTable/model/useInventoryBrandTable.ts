import { useMemo } from 'react'
import { TypeOfSiteOptionsByName } from '@/entities/locations/typeOfSites/domain/entity/TypeOfSiteOptionsByName'
import { type ComputerDashboardDto } from '@/entities/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface FilterProps {
	data: ComputerDashboardDto['brand']
	filterBrand: string
	filterCategory: string
	searchTerm: string
}
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
export const useInventoryBrandTable = ({
	data,
	filterBrand,
	filterCategory,
	searchTerm
}: FilterProps) => {
	const uniqueBrands = useMemo(
		() => [...Array.from(new Set(data.map(item => item.name)))],
		[data]
	)

	// Obtener categorías únicas de todos los modelos
	const uniqueCategories = useMemo(() => {
		const categories = data.flatMap(brand => brand.model.map(m => m.category))
		return [...new Set(categories)].sort()
	}, [data])

	const dataMapped = useMemo(() => transformData(data), [data])

	const filteredData = useMemo(() => {
		const search = searchTerm.trim().toLowerCase()
		return dataMapped.filter(device => {
			const matchesBrand = filterBrand === 'All' || device.brand === filterBrand

			const matchesCategory = filterCategory === 'All' || device.category === filterCategory

			const matchesSearch =
				!search ||
				device.brand.toLowerCase().includes(search) ||
				device.name.toLowerCase().includes(search)

			return matchesBrand && matchesCategory && matchesSearch
		})
	}, [dataMapped, filterBrand, filterCategory, searchTerm])

	return { uniqueBrands, uniqueCategories, filteredData }
}

function transformData(data: ComputerDashboardDto['brand']): ModelData[] {
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

// Función auxiliar para calcular el estado
function calculateStatus(
	count: number,
	threshold: number
): 'In Stock' | 'Low Stock' | 'Out of Stock' {
	if (count === 0 || count === undefined) {
		return 'Out of Stock'
	} else if (count <= threshold) {
		return 'Low Stock'
	} else {
		return 'In Stock'
	}
}
