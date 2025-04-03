import { useMemo, useState } from 'react'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface UseGeographicalDistributionProps {
	data: ComputerDashboardDto['region']
}
export function useGeographicalDistribution({ data }: UseGeographicalDistributionProps) {
	const [viewBy, setViewBy] = useState<'region' | 'state' | 'city' | 'location'>('region')
	const [regionFilter, setRegionFilter] = useState<string>('')
	const [stateFilter, setStateFilter] = useState<string>('')
	const [cityFilter, setCityFilter] = useState<string>('')
	const [searchFilter, setSearchFilter] = useState<string>('')

	const barName = useMemo(() => {
		let name
		switch (viewBy) {
			case 'region':
				name = 'Regiones'
				break
			case 'state':
				name = 'Estados'
				break
			case 'city':
				name = 'Ciudades'
				break
			case 'location':
				name = 'Ubicaciones'
				break
			default:
				name = 'Regiones'
				break
		}

		return `Distribución de equipos por ${name.charAt(0).toUpperCase() + name.slice(1)}`
	}, [viewBy])

	// Get unique regions, states, and cities from data
	const uniqueRegions = useMemo(() => {
		return [...new Set(data.map(item => item.name))].sort()
	}, [data])

	const allStates = useMemo(() => {
		return data.flatMap(region => region.states.map(state => state.name))
	}, [data])

	const uniqueStates = useMemo(() => {
		const states = regionFilter
			? data.find(region => region.name === regionFilter)?.states.map(state => state.name) ||
			  []
			: allStates
		return [...new Set(states)].sort()
	}, [regionFilter, allStates])

	const uniqueCities = useMemo(() => {
		let cities = data.flatMap(region =>
			region.states.flatMap(state => state.cities.map(city => city.name))
		)

		if (regionFilter) {
			cities =
				data
					.find(region => region.name === regionFilter)
					?.states.flatMap(state => state.cities.map(city => city.name)) || []
		}

		if (stateFilter) {
			cities = data.flatMap(region =>
				region.states
					.filter(state => state.name === stateFilter)
					.flatMap(state => state.cities.map(city => city.name))
			)
		}

		return [...new Set(cities)].sort()
	}, [data, regionFilter, stateFilter])

	const distributionData = useMemo(() => {
		// 1. Copia superficial de 'data' y filtrado directo
		let filteredData = structuredClone(data)

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
		const locationMap = new Map()

		filteredData.forEach(region => {
			if (viewBy === 'region') {
				locationMap.set(region.name, (locationMap.get(region.name) || 0) + region.count)
			} else {
				region.states.forEach(state => {
					if (viewBy === 'state') {
						locationMap.set(
							state.name,
							(locationMap.get(state.name) || 0) + state.count
						)
					} else {
						state.cities.forEach(city => {
							if (viewBy === 'city') {
								locationMap.set(
									city.name,
									(locationMap.get(city.name) || 0) + city.count
								)
							} else if (viewBy === 'location') {
								city.sites.forEach(site => {
									site.locations.forEach(location => {
										locationMap.set(
											location.name,
											(locationMap.get(location.name) || 0) + location.count
										)
									})
								})
							}
						})
					}
				})
			}
		})

		// 6. Conversión a array y ordenamiento
		const resultArray = Array.from(locationMap, ([name, value]) => ({ name, value })).sort(
			(a, b) => b.value - a.value
		)

		return resultArray
	}, [data, regionFilter, stateFilter, cityFilter, viewBy])

	// Clear filters
	const clearFilters = () => {
		setRegionFilter('')
		setStateFilter('')
		setCityFilter('')
		setSearchFilter('')
	}

	// Determine if filters are active
	const hasActiveFilters =
		regionFilter !== null || stateFilter !== null || cityFilter !== null || searchFilter !== ''

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
		regionFilter,
		stateFilter,
		cityFilter,
		searchFilter,
		clearFilters,
		setViewBy,
		setRegionFilter,
		setStateFilter,
		setCityFilter,
		setSearchFilter
	}
}
