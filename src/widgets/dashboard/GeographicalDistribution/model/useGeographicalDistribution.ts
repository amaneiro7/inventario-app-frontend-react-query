import { useMemo, useState } from 'react'
import { useGeographicalFilters } from '../../shared/model/useGeographicalFilters'
import { type ComputerDashboardDto } from '@/entities/devices/dashboard/domain/dto/ComputerDashboard.dto'

/**
 * Props for the useGeographicalDistribution hook.
 */
interface UseGeographicalDistributionProps {
	/** The raw geographical distribution data from the computer dashboard DTO. */
	data: ComputerDashboardDto['region']
}

/**
 * Represents a single item in the geographical distribution data.
 */
export interface DistributionItem {
	/** The name of the geographical entity (e.g., region, state, city). */
	name: string
	/** The total count of devices in this entity. */
	value: number
	/** Optional: Count of devices in 'Agencia' type sites within this entity. */
	Agencia?: number
	/** Optional: Count of devices in 'Sede Administrativa' type sites within this entity. */
	'Sede Administrativa'?: number
}

export function useGeographicalDistribution({ data }: UseGeographicalDistributionProps) {
	const [viewBy, setViewBy] = useState<
		'admRegion' | 'region' | 'state' | 'city' | 'sites' | 'location'
	>('admRegion')
	const [sortOrder, setSortOrder] = useState<'name' | 'count'>('count')

	const { filteredHierarchy, hasActiveFilters, searchFilter, ...filters } =
		useGeographicalFilters({ data })

	const barName = useMemo(() => {
		const names = {
			admRegion: 'Zonas Administrativas',
			region: 'Regiones',
			state: 'Estados',
			city: 'Ciudades',
			sites: 'Sitios',
			location: 'Ubicaciones'
		}
		const name = names[viewBy] || 'Regiones'

		return `Distribución total de equipos por ${name.charAt(0).toUpperCase() + name.slice(1)}`
	}, [viewBy])

	const MAX_ITEMS_WITHOUT_FILTER = 15

	const distributionData = useMemo(() => {
		const locationMap = new Map<string, DistributionItem>()

		filteredHierarchy.forEach(admRegion => {
			let dataToAggregate: any[] = [] // eslint-disable-line @typescript-eslint/no-explicit-any

			if (viewBy === 'admRegion') {
				dataToAggregate = [admRegion]
			} else if (viewBy === 'region') {
				dataToAggregate = admRegion.regions
			} else if (viewBy === 'state') {
				dataToAggregate = admRegion.regions.flatMap(region => region.states)
			} else if (viewBy === 'city') {
				dataToAggregate = admRegion.regions
					.flatMap(region => region.states)
					.flatMap(state => state.cities)
			} else if (viewBy === 'sites') {
				dataToAggregate = admRegion.regions
					.flatMap(region => region.states)
					.flatMap(state => state.cities.flatMap(city => city.sites))
			} else if (viewBy === 'location') {
				dataToAggregate = admRegion.regions
					.flatMap(region => region.states)
					.flatMap(state =>
						state.cities.flatMap(city => city.sites.flatMap(site => site.locations))
					)
			}

			dataToAggregate.forEach(item => {
				const name = item.name
				const count = item.count
				const agenciaCount = (item.typeOfSiteCount as { Agencia?: number })?.Agencia
				const sedeCount = (item.typeOfSiteCount as { 'Sede Administrativa'?: number })?.[ // eslint-disable-line
					'Sede Administrativa'
				]

				if (locationMap.has(name)) {
					const existingItem = locationMap.get(name)!
					locationMap.set(name, {
						name: existingItem.name,
						value: existingItem.value + count,
						Agencia: (existingItem.Agencia || 0) + (agenciaCount || 0),
						'Sede Administrativa':
							(existingItem['Sede Administrativa'] || 0) + (sedeCount || 0)
					})
				} else {
					locationMap.set(name, {
						name,
						value: count,
						Agencia: agenciaCount,
						'Sede Administrativa': sedeCount
					})
				}
			})
		})

		let resultArray = Array.from(locationMap.values()).filter(
			item => !searchFilter || item.name.toLowerCase().includes(searchFilter.toLowerCase())
		)
		// Apply sorting
		if (sortOrder === 'name') {
			resultArray.sort((a, b) => a.name.localeCompare(b.name))
		} else if (sortOrder === 'count') {
			resultArray.sort((a, b) => b.value - a.value)
		}

		if (!hasActiveFilters) {
			resultArray = resultArray.slice(0, MAX_ITEMS_WITHOUT_FILTER)
		}
		return resultArray
	}, [filteredHierarchy, viewBy, searchFilter, sortOrder, hasActiveFilters])

	// Calculate dynamic height based on the number of bars and barSize
	const barHeight = useMemo(() => 16, [])
	const barSpacing = useMemo(() => 10, [])
	const dynamicHeight = useMemo(
		() => `${distributionData.length * (barHeight * 5) + barSpacing}px`, // Add extra space for margins and labels
		[distributionData, barHeight, barSpacing]
	)

	return {
		distributionData,
		barHeight,
		barName,
		dynamicHeight,
		hasActiveFilters,
		viewBy,
		sortOrder,
		searchFilter,
		setViewBy,
		setSortOrder,
		...filters
	}
}
