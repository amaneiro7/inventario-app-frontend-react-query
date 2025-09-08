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
		const categories = new Set<string>()
		data.forEach(brand => {
			brand.model.forEach(model => {
				categories.add(model.category)
			})
		})
		return [...Array.from(categories)].sort()
	}, [data])

	const dataMapped = useMemo(() => {
		return transformData(data)
	}, [data])

	const filteredData = useMemo(() => {
		return dataMapped.filter(brand => {
			const matchesBrand = filterBrand === 'All' || brand.name === filterBrand

			const matchesCategory = filterCategory === 'All' || brand.category === filterCategory

			const matchesSearch =
				brand.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
				brand.name.toLowerCase().includes(searchTerm.toLowerCase())

			return matchesBrand && matchesCategory && matchesSearch
		})
	}, [dataMapped, filterBrand, filterCategory, searchTerm])

	return { uniqueBrands, uniqueCategories, filteredData }
}

function transformData(data: ComputerDashboardDto['brand']): ModelData[] {
	const LOW_STOCK_THRESHOLD = 10
	const result: ModelData[] = []
	data.forEach(brand => {
		brand.model.forEach(model => {
			const inAlmacen = model.typeOfSite.reduce(
				(acc, site) =>
					site.name === TypeOfSiteOptionsByName.ALMACEN ? (acc += site.count) : acc,
				0
			)
			const inUse = model.typeOfSite.reduce(
				(acc, site) =>
					site.name !== TypeOfSiteOptionsByName.ALMACEN ? (acc += site.count) : acc,
				0
			)
			result.push({
				id: `${brand.name}-${brand.name}`,
				name: model.name,
				category: model.category,
				brand: brand.name,
				count: model.count,
				inUse,
				inAlmacen,
				status: calculateStatus(inAlmacen, LOW_STOCK_THRESHOLD)
			})
		})
	})

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
