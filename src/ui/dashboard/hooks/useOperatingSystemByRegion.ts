import { useMemo, useState } from 'react'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface UseOperatingSystemByRegionProps {
	data: ComputerDashboardDto['operatingSystemByRegion']
}
export function useOperatingSystemByRegion({ data }: UseOperatingSystemByRegionProps) {
	const [viewBy, setViewBy] = useState<'admRegion' | 'region' | 'state' | 'city' | 'location'>(
		'admRegion'
	)
	const [admRegionFilter, setAdmRegionFilter] = useState<string>('')
	const [regionFilter, setRegionFilter] = useState<string>('')
	const [stateFilter, setStateFilter] = useState<string>('')
	const [siteFilter, setSiteFilter] = useState<string>('')
	const [cityFilter, setCityFilter] = useState<string>('')
	const [typeOfSiteFilter, setTypeOfSiteFilter] = useState<string>('')
	const [searchFilter, setSearchFilter] = useState<string>('')
	const [sortOrder, setSortOrder] = useState<'name' | 'count'>('count')

	const barName = useMemo(() => {
		const names = {
			admRegion: 'Zonas Administrativas',
			region: 'Regiones',
			state: 'Estdos',
			city: 'Ciudades',
			location: 'Ubicaciones'
		}
		const name = names[viewBy] || 'Regiones'

		return `Distribución total de equipos por ${name.charAt(0).toUpperCase() + name.slice(1)}`
	}, [viewBy])

	// Determine if filters are active
	const hasActiveFilters =
		admRegionFilter !== '' ||
		regionFilter !== '' ||
		stateFilter !== '' ||
		cityFilter !== '' ||
		siteFilter !== '' ||
		searchFilter !== ''
	const MAX_ITEMS_WITHOUT_FILTER = 15

	const allNames = useMemo(() => {
		const operatingSystem = [...new Set(data.map(item => item.name))].sort()
		const typeOfSites = [...new Set(data.map(os => Object.keys(os.typeOfSiteCount)))]
		const administrativeRegions = [
			...new Set(data.flatMap(os => os.administrativeRegion.map(adm => adm.name)))
		].sort()

		const regions = [
			...new Set(
				data.flatMap(os =>
					os.administrativeRegion.flatMap(adm => adm.regions.map(region => region.name))
				)
			)
		].sort()

		const states = [
			...new Set(
				data.flatMap(os =>
					os.administrativeRegion.flatMap(adm =>
						adm.regions.flatMap(region => region.states.map(state => state.name))
					)
				)
			)
		].sort()

		const cities = [
			...new Set(
				data.flatMap(os =>
					os.administrativeRegion.flatMap(adm =>
						adm.regions.flatMap(region =>
							region.states.flatMap(region => region.cities.map(city => city.name))
						)
					)
				)
			)
		].sort()

		const sites = [
			...new Set(
				data.flatMap(os =>
					os.administrativeRegion.flatMap(adm =>
						adm.regions.flatMap(region =>
							region.states.flatMap(state =>
								state.cities.flatMap(city => city.sites.map(site => site.name))
							)
						)
					)
				)
			)
		].sort()

		return {
			operatingSystem,
			typeOfSites,
			administrativeRegions,
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

	const uniqueAdmRegions = useMemo(() => {
		return allNames.administrativeRegions.filter(
			os => !searchFilter || os.toLowerCase().includes(searchFilter.toLowerCase())
		)
	}, [allNames.administrativeRegions, searchFilter])

	const uniqueRegions = useMemo(() => {
		let regions = allNames.regions
		if (admRegionFilter) {
			regions = data.flatMap(os =>
				os.administrativeRegion
					.filter(adm => adm.name === admRegionFilter)
					.flatMap(adm => adm.regions.map(region => region.name))
			)
		}
	}, [allNames.regions, data, admRegionFilter, searchFilter])

	const uniqueStates = useMemo(() => {
		let states = allNames.states
		if (regionFilter) {
			states = data.flatMap(os =>
				os.administrativeRegion.flatMap(adm =>
					adm.regions
						.filter(region => region.name === regionFilter)
						.flatMap(region => region.states.map(state => state.name))
				)
			)
		} else if (admRegionFilter) {
			states = data.flatMap(os =>
				os.administrativeRegion
					.filter(adm => adm.name === admRegionFilter)
					.flatMap(adm =>
						adm.regions.flatMap(region => region.states.map(state => state.name))
					)
			)
		}
		return [...new Set(states)].sort()
	}, [data, admRegionFilter, regionFilter, allNames.states, searchFilter])

	const uniqueCities = useMemo(() => {
		let cities = allNames.cities

		if (stateFilter) {
			cities = data.flatMap(os =>
				os.administrativeRegion.flatMap(adm =>
					adm.regions.flatMap(region =>
						region.states
							.filter(state => state.name === stateFilter)
							.flatMap(state => state.cities.map(city => city.name))
					)
				)
			)
		} else if (regionFilter) {
			cities = data.flatMap(os =>
				os.administrativeRegion.flatMap(adm =>
					adm.regions
						.filter(region => region.name === regionFilter)
						.flatMap(region =>
							region.states.flatMap(state => state.cities.map(city => city.name))
						)
				)
			)
		} else if (admRegionFilter) {
			cities = data.flatMap(os =>
				os.administrativeRegion
					.filter(adm => adm.name === admRegionFilter)
					.flatMap(adm =>
						adm.regions.flatMap(region =>
							region.states.flatMap(state => state.cities.map(city => city.name))
						)
					)
			)
		}

		return [...new Set(cities)].sort()
	}, [data, admRegionFilter, regionFilter, stateFilter, allNames.cities, searchFilter])

	const filteredData = useMemo(() => {
		// 1. Copia superficial de 'data' y filtrado directo
		let filteredData = structuredClone(data)

		// 2. Filtrado por ciudad
		if (cityFilter) {
			filteredData = filteredData
				.map(operatingSystem => ({
					...operatingSystem,
					region: operatingSystem.administrativeRegion
						.map(adm => ({
							...adm,
							regions: adm.regions
								.map(region => ({
									...region,
									states: region.states
										.map(state =>
											state.cities.filter(city => city.name === cityFilter)
										)
										.filter(state => state.length > 0)
								}))
								.filter(region => region.states.length > 0)
						}))
						.filter(adm => adm.regions.length > 0)
				}))
				.filter(operatingSystem => operatingSystem.administrativeRegion.length > 0)
		}

		// 3. Filtrado por estado
		else if (stateFilter) {
			filteredData = filteredData
				.map(operatingSystem => ({
					...operatingSystem,
					region: operatingSystem.administrativeRegion
						.map(adm => ({
							...adm,
							regions: adm.regions
								.map(region => ({
									...region,
									states: region.states.filter(
										state => state.name === stateFilter
									)
								}))
								.filter(region => region.states.length > 0)
						}))
						.filter(adm => adm.regions.length > 0)
				}))
				.filter(operatingSystem => operatingSystem.administrativeRegion.length > 0)
		}

		// 4. Aplicar los filtros de región
		else if (regionFilter) {
			filteredData = filteredData
				.map(operatingSystem => ({
					...operatingSystem,
					region: operatingSystem.administrativeRegion
						.map(adm => ({
							...adm,
							regions: adm.regions.filter(region => region.name === regionFilter)
						}))
						.filter(adm => adm.regions.length > 0)
				}))
				.filter(operatingSystem => operatingSystem.administrativeRegion.length > 0)
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
		setAdmRegionFilter('')
		setRegionFilter('')
		setStateFilter('')
		setCityFilter('')
		setSiteFilter('')
		setSearchFilter('')
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
