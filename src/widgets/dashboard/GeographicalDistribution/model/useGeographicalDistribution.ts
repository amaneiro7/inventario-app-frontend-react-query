import { useCallback, useMemo, useState } from 'react'
import { useApplyFilters } from './useApplyFilters'
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

/**
 * `useGeographicalDistribution` Hook
 *
 * A custom React hook that manages and processes geographical distribution data
 * for computer dashboards. It provides filtering capabilities by administrative region,
 * region, state, city, and site, along with sorting and dynamic data aggregation.
 * The hook memoizes processed data and filter options for performance optimization.
 *
 * @param {UseGeographicalDistributionProps} { data } - The initial geographical data.
 * @returns {object} An object containing the processed distribution data, filter states,
 *   and functions to update them.
 * @property {DistributionItem[]} distributionData - The aggregated and filtered data ready for display.
 * @property {number} barHeight - The calculated height for each bar in the chart. (Currently fixed at 16px)
 * @property {string} barName - A descriptive name for the current view (e.g., "Distribución total de equipos por Regiones").
 * @property {string} dynamicHeight - The calculated dynamic height for the chart container.
 * @property {boolean} hasActiveFilters - Indicates if any filters are currently active.
 * @property {string[]} uniqueAdmRegions - List of unique administrative regions based on current filters.
 * @property {string[]} uniqueRegions - List of unique regions based on current filters.
 * @property {string[]} uniqueStates - List of unique states based on current filters.
 * @property {string[]} uniqueCities - List of unique cities based on current filters.
 * @property {string[]} uniqueSites - List of unique sites based on current filters.
 * @property {'admRegion' | 'region' | 'state' | 'city' | 'sites' | 'location'} viewBy - The current level of geographical aggregation.
 * @property {'name' | 'count'} sortOrder - The current sorting order for the distribution data.
 * @property {string} admRegionFilter - The currently selected administrative region filter.
 * @property {string} regionFilter - The currently selected region filter.
 * @property {string} stateFilter - The currently selected state filter.
 * @property {string} cityFilter - The currently selected city filter.
 * @property {string} siteFilter - The currently selected site filter.
 * @property {string} searchFilter - The current search filter string.
 * @property {() => void} clearFilters - Function to reset all filters.
 * @property {React.Dispatch<React.SetStateAction<'admRegion' | 'region' | 'state' | 'city' | 'sites' | 'location'>>} setViewBy - Setter for `viewBy`.
 * @property {React.Dispatch<React.SetStateAction<string>>} setRegionFilter - Setter for `regionFilter`.
 * @property {React.Dispatch<React.SetStateAction<string>>} setStateFilter - Setter for `stateFilter`.
 * @property {React.Dispatch<React.SetStateAction<string>>} setCityFilter - Setter for `cityFilter`.
 * @property {React.Dispatch<React.SetStateAction<string>>} setSiteFilter - Setter for `siteFilter`.
 * @property {React.Dispatch<React.SetStateAction<string>>} setSearchFilter - Setter for `searchFilter`.
 * @property {React.Dispatch<React.SetStateAction<string>>} setAdmRegionFilter - Setter for `admRegionFilter`.
 * @property {React.Dispatch<React.SetStateAction<'name' | 'count'>>} setSortOrder - Setter for `sortOrder`.
 */
export function useGeographicalDistribution({ data }: UseGeographicalDistributionProps) {
	const [viewBy, setViewBy] = useState<
		'admRegion' | 'region' | 'state' | 'city' | 'sites' | 'location'
	>('admRegion')
	const [admRegionFilter, setAdmRegionFilter] = useState<string>('')
	const [regionFilter, setRegionFilter] = useState<string>('')
	const [stateFilter, setStateFilter] = useState<string>('')
	const [siteFilter, setSiteFilter] = useState<string>('')
	const [cityFilter, setCityFilter] = useState<string>('')
	const [searchFilter, setSearchFilter] = useState<string>('')
	const [sortOrder, setSortOrder] = useState<'name' | 'count'>('count')

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

	const hasActiveFilters = useMemo(
		() =>
			admRegionFilter !== '' ||
			regionFilter !== '' ||
			stateFilter !== '' ||
			cityFilter !== '' ||
			siteFilter !== '' ||
			searchFilter !== '',
		[admRegionFilter, regionFilter, stateFilter, cityFilter, siteFilter, searchFilter]
	)
	const MAX_ITEMS_WITHOUT_FILTER = 15

	/**
	 * Memoized filtered hierarchy based on active filters.
	 * This memo applies filters in a cascading manner to optimize data processing.
	 */
	const filteredHierarchy = useMemo(
		() =>
			useApplyFilters(data, {
				admRegionFilter,
				regionFilter,
				stateFilter,
				cityFilter,
				siteFilter
			}),
		[data, admRegionFilter, regionFilter, stateFilter, cityFilter, siteFilter]
	)

	/**
	 * Derives unique administrative regions from the filtered hierarchy.
	 */
	const uniqueAdmRegions = useMemo(() => {
		const names = filteredHierarchy.map(item => item.name)
		return [...new Set(names)]
			.sort()
			.filter(
				admRegion =>
					!searchFilter || admRegion.toLowerCase().includes(searchFilter.toLowerCase())
			)
	}, [filteredHierarchy, searchFilter])

	/**
	 * Derives unique regions from the filtered hierarchy.
	 */
	const uniqueRegions = useMemo(() => {
		const names = filteredHierarchy.flatMap(admRegion =>
			admRegion.regions.map(region => region.name)
		)
		return [...new Set(names)]
			.sort()
			.filter(
				region => !searchFilter || region.toLowerCase().includes(searchFilter.toLowerCase())
			)
	}, [filteredHierarchy, searchFilter])

	/**
	 * Derives unique states from the filtered hierarchy.
	 */
	const uniqueStates = useMemo(() => {
		const names = filteredHierarchy.flatMap(admRegion =>
			admRegion.regions.flatMap(region => region.states.map(state => state.name))
		)
		return [...new Set(names)]
			.sort()
			.filter(
				state => !searchFilter || state.toLowerCase().includes(searchFilter.toLowerCase())
			)
	}, [filteredHierarchy, searchFilter])

	/**
	 * Derives unique cities from the filtered hierarchy.
	 */
	const uniqueCities = useMemo(() => {
		const names = filteredHierarchy.flatMap(admRegion =>
			admRegion.regions.flatMap(region =>
				region.states.flatMap(state => state.cities.map(city => city.name))
			)
		)
		return [...new Set(names)]
			.sort()
			.filter(
				city => !searchFilter || city.toLowerCase().includes(searchFilter.toLowerCase())
			)
	}, [filteredHierarchy, searchFilter])

	/**
	 * Derives unique sites from the filtered hierarchy.
	 */
	const uniqueSites = useMemo(() => {
		const names = filteredHierarchy.flatMap(admRegion =>
			admRegion.regions.flatMap(region =>
				region.states.flatMap(state =>
					state.cities.flatMap(city => city.sites.map(site => site.name))
				)
			)
		)
		return [...new Set(names)]
			.sort()
			.filter(
				site => !searchFilter || site.toLowerCase().includes(searchFilter.toLowerCase())
			)
	}, [filteredHierarchy, searchFilter])

	/**
	 * Aggregates and sorts the distribution data based on the current view and filters.
	 */
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
				const sedeCount = (item.typeOfSiteCount as { 'Sede Administrativa'?: number })?.[
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

	/**
	 * Resets all filters to their initial empty state.
	 */
	const clearFilters = useCallback(() => {
		setAdmRegionFilter('')
		setRegionFilter('')
		setStateFilter('')
		setCityFilter('')
		setSiteFilter('')
		setSearchFilter('')
	}, [])

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
		uniqueAdmRegions,
		uniqueRegions,
		uniqueStates,
		uniqueCities,
		uniqueSites,
		viewBy,
		sortOrder,
		admRegionFilter,
		regionFilter,
		stateFilter,
		cityFilter,
		siteFilter,
		searchFilter,
		clearFilters,
		setViewBy,
		setRegionFilter,
		setStateFilter,
		setCityFilter,
		setSiteFilter,
		setSearchFilter,
		setAdmRegionFilter,
		setSortOrder
	}
}
