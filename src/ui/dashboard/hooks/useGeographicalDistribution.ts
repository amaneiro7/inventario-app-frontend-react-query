import { useMemo, useState } from 'react'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface UseGeographicalDistributionProps {
	data: ComputerDashboardDto['region']
}
export function useGeographicalDistribution({ data }: UseGeographicalDistributionProps) {
	const [viewBy, setViewBy] = useState<'region' | 'state' | 'city' | 'sites' | 'location'>(
		'region'
	)
	const [regionFilter, setRegionFilter] = useState<string>('')
	const [stateFilter, setStateFilter] = useState<string>('')
	const [cityFilter, setCityFilter] = useState<string>('')
	const [searchFilter, setSearchFilter] = useState<string>('')
	const [sortOrder, setSortOrder] = useState<'name' | 'count'>('count')

	const barName = useMemo(() => {
		const names = {
			region: 'Regiones',
			state: 'Estdos',
			city: 'Ciudades',
			sites: 'Sitios',
			location: 'Ubicaciones'
		}
		const name = names[viewBy] || 'Regiones'

		return `Distribución de equipos por ${name.charAt(0).toUpperCase() + name.slice(1)}`
	}, [viewBy])

	// Determine if filters are active
	const hasActiveFilters =
		regionFilter !== '' || stateFilter !== '' || cityFilter !== '' || searchFilter !== ''
	const MAX_ITEMS_WITHOUT_FILTER = 15

	const allNames = useMemo(() => {
		const regions = [...new Set(data.map(item => item.name))].sort()
		const states = data.flatMap(region => region.states.map(state => state.name))
		const cities = data
			.flatMap(region => region.states.flatMap(state => state.cities.map(city => city.name)))
			.sort()
		const sites = data
			.flatMap(region =>
				region.states.flatMap(state =>
					state.cities.flatMap(city => city.sites.map(site => site.name))
				)
			)
			.sort()

		return {
			regions,
			states,
			sites,
			cities
		}
	}, [data])

	// Get unique regions, states, and cities from data
	const uniqueRegions = useMemo(() => {
		return allNames.regions.filter(
			region => !searchFilter || region.toLowerCase().includes(searchFilter.toLowerCase())
		)
	}, [allNames.regions, searchFilter])

	const uniqueStates = useMemo(() => {
		let states = allNames.states
		if (regionFilter) {
			states = data
				.filter(region => region.name === regionFilter)
				.flatMap(region => region.states.map(state => state.name))
		}

		return [...new Set(states)]
			.sort()
			.filter(
				state => !searchFilter || state.toLowerCase().includes(searchFilter.toLowerCase())
			)
	}, [data, regionFilter, allNames.states, searchFilter])

	const uniqueCities = useMemo(() => {
		let cities = allNames.cities

		if (regionFilter) {
			cities = data
				.filter(region => region.name === regionFilter)
				.flatMap(region => region.states.flatMap(city => city.name))
		}

		if (stateFilter) {
			cities = data.flatMap(region =>
				region.states
					.filter(state => state.name === stateFilter)
					.flatMap(state => state.cities.map(city => city.name))
			)
		}

		return [...new Set(cities)]
			.sort()
			.filter(
				city => !searchFilter || city.toLowerCase().includes(searchFilter.toLowerCase())
			)
	}, [data, regionFilter, stateFilter, allNames.cities, searchFilter])

	const filteredData = useMemo(() => {
		// 1. Copia superficial de 'data' y filtrado directo
		// let filteredData = structuredClone(data)
		let filteredData = data

		// 2. Aplicar los filtros de región
		if (regionFilter) {
			filteredData = filteredData.filter(region => region.name === regionFilter)
		}

		// 3. Filtrado por estado
		if (stateFilter) {
			filteredData = filteredData
				.map(region => ({
					...region,
					states: region.states.filter(state => state.name === stateFilter)
				}))
				.filter(region => region.states.length > 0)
		}

		// 4. Filtrado por ciudad
		if (cityFilter) {
			filteredData = filteredData
				.map(region => ({
					...region,
					states: region.states
						.map(state => ({
							...state,
							cities: state.cities.filter(city => city.name === cityFilter)
						}))
						.filter(state => state.cities.length > 0)
				}))
				.filter(region => region.states.length > 0)
		}
		return filteredData
	}, [data, regionFilter, stateFilter, cityFilter])

	const distributionData = useMemo(() => {
		const locationMap = new Map<string, number>()

		// 6. Conversión a array y ordenamiento
		filteredData.forEach(region => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			let dataToUse: any[] = []

			if (viewBy === 'region') {
				dataToUse = [region]
			} else if (viewBy === 'state') {
				dataToUse = region.states
			} else if (viewBy === 'city') {
				dataToUse = region.states.flatMap(state => state.cities)
			} else if (viewBy === 'sites') {
				dataToUse = region.states.flatMap(state => state.cities).flatMap(city => city.sites)
			} else if (viewBy === 'location') {
				dataToUse = region.states
					.flatMap(state => state.cities)
					.flatMap(city => city.sites.flatMap(site => site.locations))
			}

			dataToUse.forEach(item => {
				locationMap.set(item.name, (locationMap.get(item.name) || 0) + item.count)
			})
		})
		let resultArray = Array.from(locationMap, ([name, value]) => ({ name, value })).filter(
			item => !searchFilter || item.name.toLowerCase().includes(searchFilter.toLowerCase())
		)
		// Aplicar el ordenamiento
		if (sortOrder === 'name') {
			resultArray.sort((a, b) => a.name.localeCompare(b.name))
		} else if (sortOrder === 'count') {
			resultArray.sort((a, b) => b.value - a.value)
		}

		if (!hasActiveFilters) {
			resultArray = resultArray.slice(0, MAX_ITEMS_WITHOUT_FILTER)
		}
		return resultArray
	}, [filteredData, viewBy, searchFilter, sortOrder])
	// Clear filters
	const clearFilters = () => {
		setRegionFilter('')
		setStateFilter('')
		setCityFilter('')
		setSearchFilter('')
	}

	// Calculate dynamic height based on the number of bars and barSize
	const barHeight = 16 // Size of each bar
	const barSpacing = 10 // Spacing between bars and other elements
	const dynamicHeight = `${distributionData.length * (barHeight * 2) + barSpacing}px` // Add extra space for margins and labels

	return {
		distributionData,
		barHeight,
		barName,
		dynamicHeight,
		hasActiveFilters,
		uniqueRegions,
		uniqueStates,
		uniqueCities,
		viewBy,
		sortOrder,
		regionFilter,
		stateFilter,
		cityFilter,
		searchFilter,
		clearFilters,
		setViewBy,
		setRegionFilter,
		setStateFilter,
		setCityFilter,
		setSearchFilter,
		setSortOrder
	}
}
