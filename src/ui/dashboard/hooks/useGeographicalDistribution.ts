import { useMemo, useState } from 'react'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface UseGeographicalDistributionProps {
	data: ComputerDashboardDto['region']
}

export interface DistributionItem {
	name: string
	value: number
	Agencia?: number
	'Sede Administrativa'?: number
}
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
			state: 'Estdos',
			city: 'Ciudades',
			sites: 'Sitios',
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
		const administrativeRegions = [...new Set(data.map(item => item.name))].sort()
		const regions = data.flatMap(admRegion => admRegion.regions.map(region => region.name))

		const states = data.flatMap(admRegion =>
			admRegion.regions.flatMap(region => region.states.map(state => state.name))
		)
		const cities = data
			.flatMap(admRegion =>
				admRegion.regions.flatMap(region =>
					region.states.flatMap(state => state.cities.map(city => city.name))
				)
			)
			.sort()
		const sites = data
			.flatMap(admRegion =>
				admRegion.regions.flatMap(region =>
					region.states.flatMap(state =>
						state.cities.flatMap(city => city.sites.map(site => site.name))
					)
				)
			)
			.sort()

		return {
			administrativeRegions,
			regions,
			states,
			sites,
			cities
		}
	}, [data])
	// Get unique regions, states, and cities from data
	const uniqueAdmRegions = useMemo(() => {
		return allNames.administrativeRegions.filter(
			admRegion =>
				!searchFilter || admRegion.toLowerCase().includes(searchFilter.toLowerCase())
		)
	}, [allNames.administrativeRegions, searchFilter])

	const uniqueRegions = useMemo(() => {
		let regions = allNames.regions
		if (admRegionFilter) {
			regions = data
				.filter(admRegion => admRegion.name === admRegionFilter)
				.flatMap(admRegion => admRegion.regions.map(region => region.name))
		}
		return [...new Set(regions)]
			.sort()
			.filter(
				region => !searchFilter || region.toLowerCase().includes(searchFilter.toLowerCase())
			)
	}, [allNames.regions, admRegionFilter, searchFilter])

	const uniqueStates = useMemo(() => {
		let states = allNames.states
		if (regionFilter) {
			states = data.flatMap(admRegion =>
				admRegion.regions
					.filter(region => region.name === regionFilter)
					.flatMap(region => region.states.map(state => state.name))
			)
		} else if (admRegionFilter) {
			states = data
				.filter(admRegion => admRegion.name === admRegionFilter)
				.flatMap(admRegion =>
					admRegion.regions.flatMap(region => region.states.map(state => state.name))
				)
		}

		return [...new Set(states)]
			.sort()
			.filter(
				state => !searchFilter || state.toLowerCase().includes(searchFilter.toLowerCase())
			)
	}, [data, regionFilter, admRegionFilter, allNames.states, searchFilter])

	const uniqueCities = useMemo(() => {
		let cities = allNames.cities

		if (stateFilter) {
			cities = data.flatMap(admRegion =>
				admRegion.regions.flatMap(region =>
					region.states
						.filter(state => state.name === stateFilter)
						.flatMap(state => state.cities.map(city => city.name))
				)
			)
		} else if (regionFilter) {
			cities = data.flatMap(admRegion =>
				admRegion.regions
					.filter(region => region.name === regionFilter)
					.flatMap(region =>
						region.states.flatMap(state => state.cities.map(city => city.name))
					)
			)
		} else if (admRegionFilter) {
			cities = data
				.filter(admRegion => admRegion.name === admRegionFilter)
				.flatMap(admRegion =>
					admRegion.regions.flatMap(region =>
						region.states.flatMap(state => state.cities.map(city => city.name))
					)
				)
		}

		return [...new Set(cities)]
			.sort()
			.filter(
				city => !searchFilter || city.toLowerCase().includes(searchFilter.toLowerCase())
			)
	}, [data, regionFilter, stateFilter, admRegionFilter, allNames.cities, searchFilter])

	const uniqueSites = useMemo(() => {
		let sites = allNames.sites

		if (cityFilter) {
			sites = data.flatMap(admRegion =>
				admRegion.regions.flatMap(region =>
					region.states.flatMap(state =>
						state.cities
							.filter(city => city.name === cityFilter)
							.flatMap(city => city.sites.map(site => site.name))
					)
				)
			)
		} else if (stateFilter) {
			sites = data.flatMap(admRegion =>
				admRegion.regions.flatMap(region =>
					region.states
						.filter(state => state.name === stateFilter)
						.flatMap(state =>
							state.cities.flatMap(city => city.sites.map(site => site.name))
						)
				)
			)
		} else if (regionFilter) {
			sites = data.flatMap(admRegion =>
				admRegion.regions
					.filter(region => region.name === regionFilter)
					.flatMap(region =>
						region.states.flatMap(state =>
							state.cities.flatMap(city => city.sites.map(site => site.name))
						)
					)
			)
		} else if (admRegionFilter) {
			sites = data
				.filter(admRegion => admRegion.name === admRegionFilter)
				.flatMap(admRegion =>
					admRegion.regions.flatMap(region =>
						region.states.flatMap(state =>
							state.cities.flatMap(city => city.sites.map(site => site.name))
						)
					)
				)
		}

		return [...new Set(sites)]
			.sort()
			.filter(
				city => !searchFilter || city.toLowerCase().includes(searchFilter.toLowerCase())
			)
	}, [data, regionFilter, stateFilter, admRegionFilter, cityFilter, allNames.sites, searchFilter])

	const filteredData = useMemo(() => {
		// 1. Copia superficial de 'data' y filtrado directo
		// let filteredData = structuredClone(data)
		let filteredData = data

		// 2. Filtrado por sitio
		if (siteFilter) {
			filteredData = filteredData
				.map(amdRegion => ({
					...amdRegion,
					regions: amdRegion.regions
						.map(region => ({
							...region,
							states: region.states
								.map(state => ({
									...state,
									cities: state.cities
										.map(city => ({
											...city,
											sites: city.sites.filter(
												site => site.name === siteFilter
											)
										}))
										.filter(city => city.sites.length > 0)
								}))
								.filter(state => state.cities.length > 0)
						}))
						.filter(region => region.states.length > 0)
				}))
				.filter(admRegion => admRegion.regions.length > 0)
		}
		// 3. Filtrado por ciudad
		else if (cityFilter) {
			filteredData = filteredData
				.map(amdRegion => ({
					...amdRegion,
					regions: amdRegion.regions
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
				.filter(admRegion => admRegion.regions.length > 0)
		}
		// 4. Filtrado por estado
		else if (stateFilter) {
			filteredData = filteredData
				.map(admRegion => ({
					...admRegion,
					regions: admRegion.regions
						.map(region => ({
							...region,
							states: region.states.filter(state => state.name === stateFilter)
						}))
						.filter(region => region.states.length > 0)
				}))
				.filter(admRegion => admRegion.regions.length > 0)
		}
		// 5. Filtrado por región
		else if (regionFilter) {
			filteredData = filteredData
				.map(admRegion => ({
					...admRegion,
					regions: admRegion.regions.filter(region => region.name === regionFilter)
				}))
				.filter(admRegion => admRegion.regions.length > 0)
		}
		// 6. Aplicar los filtros de región administrativa
		else if (admRegionFilter) {
			filteredData = filteredData.filter(admRegion => admRegion.name === admRegionFilter)
		}

		return filteredData
	}, [data, admRegionFilter, regionFilter, stateFilter, cityFilter, siteFilter])

	const distributionData = useMemo(() => {
		const locationMap = new Map<string, DistributionItem>()

		// 6. Conversión a array y ordenamiento
		filteredData.forEach(admRegion => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			let dataToUse: any[] = []

			if (viewBy === 'admRegion') {
				dataToUse = [admRegion]
			} else if (viewBy === 'region') {
				dataToUse = admRegion.regions
			} else if (viewBy === 'state') {
				dataToUse = admRegion.regions.flatMap(region => region.states)
			} else if (viewBy === 'city') {
				dataToUse = admRegion.regions
					.flatMap(region => region.states)
					.flatMap(state => state.cities)
			} else if (viewBy === 'sites') {
				dataToUse = admRegion.regions
					.flatMap(region => region.states)
					.flatMap(state => state.cities.flatMap(city => city.sites))
			} else if (viewBy === 'location') {
				dataToUse = admRegion.regions
					.flatMap(region => region.states)
					.flatMap(state =>
						state.cities.flatMap(city => city.sites.flatMap(site => site.locations))
					)
			}

			dataToUse.forEach(item => {
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

				// locationMap.set(item.name, (locationMap.get(item.name) || 0) + item.count)
			})
		})
		let resultArray = Array.from(locationMap.values()).filter(
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
		setAdmRegionFilter('')
		setRegionFilter('')
		setStateFilter('')
		setCityFilter('')
		setSiteFilter('')
		setSearchFilter('')
	}

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
