import { useMemo, useState } from 'react'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface UseOperatingSystemByRegionProps {
	data: ComputerDashboardDto['operatingSystemByRegion']
}
export function useOperatingSystemByRegion({ data }: UseOperatingSystemByRegionProps) {
	const [viewBy, setViewBy] = useState<'region' | 'state' | 'city' | 'location'>('region')
	const [regionFilter, setRegionFilter] = useState<string>('')
	const [stateFilter, setStateFilter] = useState<string>('')
	const [cityFilter, setCityFilter] = useState<string>('')
	const [typeOfSiteFilter, setTypeOfSiteFilter] = useState<string>('')
	const [searchFilter, setSearchFilter] = useState<string>('')
	const [sortOrder, setSortOrder] = useState<'name' | 'count'>('count')

	const barName = useMemo(() => {
		const names = {
			region: 'Regiones',
			state: 'Estdos',
			city: 'Ciudades',
			location: 'Ubicaciones'
		}
		const name = names[viewBy] || 'Regiones'

		return `Distribución de equipos por ${name.charAt(0).toUpperCase() + name.slice(1)}`
	}, [viewBy])

	// Determine if filters are active
	const hasActiveFilters = regionFilter !== '' || stateFilter !== '' || cityFilter !== ''
	const MAX_ITEMS_WITHOUT_FILTER = 15

	const allNames = useMemo(() => {
		const operatingSystem = [...new Set(data.map(item => item.name))].sort()
		const regions = [
			...new Set(data.flatMap(os => os.region.map(region => region.name)))
		].sort()
		const states = data
			.flatMap(os => os.region.flatMap(region => region.states.map(state => state.name)))
			.sort()
		const cities = data
			.flatMap(os =>
				os.region.flatMap(region =>
					region.states.flatMap(state => state.cities.map(city => city.name))
				)
			)
			.sort()
		const sites = data
			.flatMap(os =>
				os.region.flatMap(region =>
					region.states.flatMap(state =>
						state.cities.flatMap(city => city.sites.map(site => site.name))
					)
				)
			)
			.sort()

		return {
			operatingSystem,
			regions,
			states,
			cities,
			sites
		}
	}, [data])

	// Obtener lista unicas de Sistema Operativos
	const uniqueOperatingSystem = useMemo(() => {
		return allNames.operatingSystem.filter(
			os => !searchFilter || os.toLowerCase().includes(searchFilter.toLowerCase())
		)
	}, [allNames.operatingSystem, searchFilter])

	const uniqueRegions = useMemo(() => {
		return allNames.regions.filter(
			os => !searchFilter || os.toLowerCase().includes(searchFilter.toLowerCase())
		)
	}, [allNames.regions, searchFilter])

	const uniqueStates = useMemo(() => {
		let states = allNames.states
		if (regionFilter) {
			states = data.flatMap(os =>
				os.region
					.filter(region => region.name === regionFilter)
					.flatMap(region => region.states.map(state => state.name))
			)
		}
		return [...new Set(states)].sort()
	}, [data, regionFilter, allNames.states, searchFilter])

	const allCities = useMemo(() => {
		return data.flatMap(os =>
			os.region.flatMap(region =>
				region.states.flatMap(state => state.cities.flatMap(city => city.name))
			)
		)
	}, [data])

	const uniqueCities = useMemo(() => {
		let cities = allCities

		if (regionFilter) {
			cities = data.flatMap(os =>
				os.region
					.filter(region => region.name === regionFilter)
					.flatMap(region =>
						region.states.flatMap(state => state.cities.map(city => city.name))
					)
			)
		}

		if (stateFilter) {
			cities = data.flatMap(os =>
				os.region.flatMap(region =>
					region.states
						.filter(state => state.name === stateFilter)
						.flatMap(state => state.cities.map(city => city.name))
				)
			)
		}

		return [...new Set(cities)].sort()
	}, [data, regionFilter, stateFilter, allNames.cities, searchFilter])

	const filteredData = useMemo(() => {
		// 1. Copia superficial de 'data' y filtrado directo
		let filteredData = structuredClone(data)

		// 2. Aplicar los filtros de región
		if (regionFilter) {
			filteredData = filteredData
				.map(operatingSystem => ({
					...operatingSystem,
					region: operatingSystem.region.filter(region => region.name === regionFilter)
				}))
				.filter(operatingSystem => operatingSystem.region.length > 0)
		}

		// 3. Filtrado por estado
		if (stateFilter) {
			filteredData = filteredData
				.map(operatingSystem => ({
					...operatingSystem,
					region: operatingSystem.region
						.map(region => ({
							...region,
							states: region.states.filter(state => state.name === stateFilter)
						}))
						.filter(region => region.states.length > 0)
				}))
				.filter(operatingSystem => operatingSystem.region.length > 0)
		}

		// 4. Filtrado por ciudad
		if (cityFilter) {
			filteredData = filteredData
				.map(operatingSystem => ({
					...operatingSystem,
					region: operatingSystem.region
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
				}))
				.filter(operatingSystem => operatingSystem.region.length > 0)
		}
		return filteredData
	}, [data, regionFilter, stateFilter, cityFilter])

	const distributionData = useMemo(() => {
		// Crear un mapping para cada region por sistema operativos
		const aggregatedData: Record<string, Record<string, number>> = {}

		filteredData.forEach(os => {
			os.region.forEach(region => {
				let items: { name: string; count: number }[] = []

				if (viewBy === 'region') {
					items = [region]
				} else if (viewBy === 'state') {
					items = region.states
				} else if (viewBy === 'city') {
					items = region.states.flatMap(state => state.cities)
				} else if (viewBy === 'location') {
					items = region.states.flatMap(state =>
						state.cities.flatMap(city => city.sites.flatMap(site => site.locations))
					)
				}

				items.forEach(item => {
					if (!aggregatedData[item.name]) {
						aggregatedData[item.name] = {}
					}
					aggregatedData[item.name][os.name] =
						(aggregatedData[item.name][os.name] || 0) + item.count
				})
			})
		})

		let result = Object.entries(aggregatedData).map(([name, counts]) => ({ name, ...counts }))

		//Aplicar filter por searchFilter
		if (searchFilter) {
			result = result.filter(item =>
				item.name.toLowerCase().includes(searchFilter.toLowerCase())
			)
		}

		// Aplicar el ordenamiento
		if (sortOrder === 'name') {
			result.sort((a, b) => a.name.localeCompare(b.name))
		} else if (sortOrder === 'count') {
			result.sort((a, b) => {
				const countA = Object.values(a)
					.slice(1)
					.reduce((sum, val) => sum + (val as unknown as number), 0)
				const countB = Object.values(b)
					.slice(1)
					.reduce((sum, val) => sum + (val as unknown as number), 0)
				return countB - countA
			})
		}
		if (!hasActiveFilters) {
			result = result.slice(0, MAX_ITEMS_WITHOUT_FILTER)
		}
		return result
	}, [filteredData, viewBy, searchFilter, sortOrder])

	// Clear filters
	const clearFilters = () => {
		setRegionFilter('')
		setStateFilter('')
		setCityFilter('')
	}

	// Calculate dynamic height based on the number of bars and barSize
	const barHeight = 16 // Size of each bar
	const barSpacing = 10 // Spacing between bars and other elements
	const dynamicHeight = `${distributionData.length * (barHeight * 4) + barSpacing}px` // Add extra space for margins and labels

	return {
		distributionData,
		viewBy,
		regionFilter,
		stateFilter,
		cityFilter,
		typeOfSiteFilter,
		barName,
		uniqueOperatingSystem,
		hasActiveFilters,
		barHeight,
		dynamicHeight,
		uniqueStates,
		uniqueCities,
		uniqueRegions,
		searchFilter,
		sortOrder,
		setRegionFilter,
		setStateFilter,
		setCityFilter,
		setSearchFilter,
		setTypeOfSiteFilter,
		setViewBy,
		setSortOrder,
		clearFilters
	}
}
