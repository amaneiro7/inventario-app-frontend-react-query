import { useMemo, useState } from 'react'
import {
	type Regions,
	type Region,
	type State,
	type City,
	type Site,
	type Location,
	type ComputerDashboardDto
} from '@/entities/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface UseOperatingSystemByRegionProps {
	data: ComputerDashboardDto['operatingSystemByRegion']
}

interface AggregatedData {
	[locationKey: string]: Record<string, number>
}

export interface DistributionItem {
	name: string
	[osName: string]: string | number
}
export function useOperatingSystemByRegion({ data }: UseOperatingSystemByRegionProps) {
	const [viewBy, setViewBy] = useState<
		'admRegion' | 'region' | 'state' | 'city' | 'site' | 'location'
	>('admRegion')
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
			site: 'Sitios',
			location: 'Ubicaciones'
		}
		const name = names[viewBy] || 'Zonas Administrativas'

		return `Distribución total de equipos por ${name.charAt(0).toUpperCase() + name.slice(1)}`
	}, [viewBy])

	// Determine if filters are active
	const hasActiveFilters = useMemo(() => {
		return !!(
			admRegionFilter ||
			regionFilter ||
			stateFilter ||
			cityFilter ||
			siteFilter ||
			searchFilter
		)
	}, [admRegionFilter, regionFilter, stateFilter, cityFilter, siteFilter, searchFilter])

	const MAX_ITEMS_WITHOUT_FILTER = 15

	const typeOfSiteFilteredData = useMemo(() => {
		if (!typeOfSiteFilter) {
			return data
		}

		return data.map(os => ({
			...os,
			administrativeRegion: os.administrativeRegion.map(adm => ({
				...adm,
				regions: adm.regions.map(region => ({
					...region,
					states: region.states.map(state => ({
						...state,
						cities: state.cities.map(city => ({
							...city,
							sites: city.sites.map(site => ({
								...site,
								locations: site.locations.filter(location => {
									return location.typeOfSite === typeOfSiteFilter
								})
							}))
						}))
					}))
				}))
			}))
		}))
	}, [data, typeOfSiteFilter])

	const allNames = useMemo(() => {
		const operatingSystem = [...new Set(data.map(item => item.name))].sort()
		const typeOfSites = [...new Set(data.flatMap(os => Object.keys(os.typeOfSiteCount)))]
		const administrativeRegions = [
			...new Set(data.flatMap(os => os.administrativeRegion.map(adm => adm.name)))
		].sort()

		const regions = [
			...new Set(
				typeOfSiteFilteredData.flatMap(os =>
					os.administrativeRegion.flatMap(adm => adm.regions.map(region => region.name))
				)
			)
		].sort()

		const states = [
			...new Set(
				typeOfSiteFilteredData.flatMap(os =>
					os.administrativeRegion.flatMap(adm =>
						adm.regions.flatMap(region => region.states.map(state => state.name))
					)
				)
			)
		].sort()

		const cities = [
			...new Set(
				typeOfSiteFilteredData.flatMap(os =>
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
				typeOfSiteFilteredData.flatMap(os =>
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
	}, [typeOfSiteFilteredData])

	const uniqueOperatingSystem = useMemo(() => {
		return allNames.operatingSystem.filter(
			os => !searchFilter || os.toLowerCase().includes(searchFilter.toLowerCase())
		)
	}, [allNames.operatingSystem, searchFilter])

	const uniqueTypeOfSite = useMemo(() => {
		return allNames.typeOfSites
	}, [allNames.typeOfSites])

	const uniqueAdmRegions = useMemo(() => {
		return allNames.administrativeRegions.filter(
			os => !searchFilter || os.toLowerCase().includes(searchFilter.toLowerCase())
		)
	}, [allNames.administrativeRegions, searchFilter])

	const uniqueRegions = useMemo(() => {
		let regions = allNames.regions
		if (admRegionFilter) {
			regions = typeOfSiteFilteredData.flatMap(os =>
				os.administrativeRegion
					.filter(adm => adm.name === admRegionFilter)
					.flatMap(adm => adm.regions.map(region => region.name))
			)
		}
		return [...new Set(regions)]
			.sort()
			.filter(
				region => !searchFilter || region.toLowerCase().includes(searchFilter.toLowerCase())
			)
	}, [allNames.regions, typeOfSiteFilteredData, admRegionFilter, searchFilter])

	const uniqueStates = useMemo(() => {
		let states = allNames.states
		if (regionFilter) {
			states = typeOfSiteFilteredData.flatMap(os =>
				os.administrativeRegion.flatMap(adm =>
					adm.regions
						.filter(region => region.name === regionFilter)
						.flatMap(region => region.states.map(state => state.name))
				)
			)
		} else if (admRegionFilter) {
			states = typeOfSiteFilteredData.flatMap(os =>
				os.administrativeRegion
					.filter(adm => adm.name === admRegionFilter)
					.flatMap(adm =>
						adm.regions.flatMap(region => region.states.map(state => state.name))
					)
			)
		}
		return [...new Set(states)].sort()
	}, [typeOfSiteFilteredData, admRegionFilter, regionFilter, allNames.states, searchFilter])

	const uniqueCities = useMemo(() => {
		let cities = allNames.cities

		if (stateFilter) {
			cities = typeOfSiteFilteredData.flatMap(os =>
				os.administrativeRegion.flatMap(adm =>
					adm.regions.flatMap(region =>
						region.states
							.filter(state => state.name === stateFilter)
							.flatMap(state => state.cities.map(city => city.name))
					)
				)
			)
		} else if (regionFilter) {
			cities = typeOfSiteFilteredData.flatMap(os =>
				os.administrativeRegion.flatMap(adm =>
					adm.regions
						.filter(region => region.name === regionFilter)
						.flatMap(region =>
							region.states.flatMap(state => state.cities.map(city => city.name))
						)
				)
			)
		} else if (admRegionFilter) {
			cities = typeOfSiteFilteredData.flatMap(os =>
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
	}, [
		typeOfSiteFilteredData,
		admRegionFilter,
		regionFilter,
		stateFilter,
		allNames.cities,
		searchFilter
	])

	const uniqueSites = useMemo(() => {
		let sites = allNames.sites

		if (cityFilter) {
			sites = typeOfSiteFilteredData.flatMap(os =>
				os.administrativeRegion.flatMap(adm =>
					adm.regions.flatMap(region =>
						region.states.flatMap(state =>
							state.cities
								.filter(city => city.name === cityFilter)
								.flatMap(city => city.sites.map(site => site.name))
						)
					)
				)
			)
		} else if (stateFilter) {
			sites = typeOfSiteFilteredData.flatMap(os =>
				os.administrativeRegion.flatMap(adm =>
					adm.regions.flatMap(region =>
						region.states
							.filter(state => state.name === stateFilter)
							.flatMap(state =>
								state.cities.flatMap(city => city.sites.map(site => site.name))
							)
					)
				)
			)
		} else if (regionFilter) {
			sites = typeOfSiteFilteredData.flatMap(os =>
				os.administrativeRegion.flatMap(adm =>
					adm.regions
						.filter(region => region.name === regionFilter)
						.flatMap(region =>
							region.states.flatMap(state =>
								state.cities.flatMap(city => city.sites.map(site => site.name))
							)
						)
				)
			)
		} else if (admRegionFilter) {
			sites = typeOfSiteFilteredData.flatMap(os =>
				os.administrativeRegion
					.filter(adm => adm.name === admRegionFilter)
					.flatMap(adm =>
						adm.regions.flatMap(region =>
							region.states.flatMap(state =>
								state.cities.flatMap(city => city.sites.map(site => site.name))
							)
						)
					)
			)
		}

		return [...new Set(sites)].sort()
	}, [
		typeOfSiteFilteredData,
		admRegionFilter,
		regionFilter,
		stateFilter,
		cityFilter,
		allNames.sites,
		searchFilter
	])

	const filteredData = useMemo(() => {
		// 1. Copia superficial de 'typeOfSiteFilteredData' y filtrado directo
		let filteredData = structuredClone(typeOfSiteFilteredData)

		// 2. Filtrado por sitio
		if (siteFilter) {
			filteredData = filteredData
				.map(operatingSystem => ({
					...operatingSystem,
					administrativeRegion: operatingSystem.administrativeRegion
						.map(adm => ({
							...adm,
							regions: adm.regions
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
						.filter(adm => adm.regions.length > 0)
				}))
				.filter(operatingSystem => operatingSystem.administrativeRegion.length > 0)
		}
		// 3. Filtrado por ciudad
		else if (cityFilter) {
			filteredData = filteredData
				.map(operatingSystem => ({
					...operatingSystem,
					administrativeRegion: operatingSystem.administrativeRegion
						.map(adm => ({
							...adm,
							regions: adm.regions
								.map(region => ({
									...region,
									states: region.states
										.map(state => ({
											...state,
											cities: state.cities.filter(
												city => city.name === cityFilter
											)
										}))
										.filter(state => state.cities.length > 0)
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
					administrativeRegion: operatingSystem.administrativeRegion
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
					administrativeRegion: operatingSystem.administrativeRegion
						.map(adm => ({
							...adm,
							regions: adm.regions.filter(region => region.name === regionFilter)
						}))
						.filter(adm => adm.regions.length > 0)
				}))
				.filter(operatingSystem => operatingSystem.administrativeRegion.length > 0)
		}
		// 5. Aplicar los filtros de región
		else if (admRegionFilter) {
			filteredData = filteredData
				.map(operatingSystem => ({
					...operatingSystem,
					administrativeRegion: operatingSystem.administrativeRegion.filter(
						adm => adm.name === admRegionFilter
					)
				}))
				.filter(operatingSystem => operatingSystem.administrativeRegion.length > 0)
		}

		return filteredData
	}, [typeOfSiteFilteredData, admRegionFilter, siteFilter, cityFilter, stateFilter, regionFilter])

	const distributionData = useMemo(() => {
		// Crear un mapping para cada region por sistema operativos
		const aggregatedData: AggregatedData = {}

		filteredData.forEach(os => {
			os.administrativeRegion.forEach(admRegion => {
				let dataToUse: (Regions | Region | State | City | Site | Location)[] = []

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
				} else if (viewBy === 'site') {
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
					const locationKey = item.name
					const osName = os.name
					const count = item.count
					const typeOfSiteCount = (item as Exclude<typeof item, Location>)
						?.typeOfSiteCount

					if (!aggregatedData[locationKey]) {
						aggregatedData[locationKey] = {}
					}
					aggregatedData[locationKey][osName] =
						(aggregatedData[locationKey][osName] || 0) +
						(typeOfSiteFilter === '' || 'locations' in item
							? count
							: // @ts-ignore
								typeOfSiteCount?.[typeOfSiteFilter] !== undefined
								? // @ts-ignore
									typeOfSiteCount[typeOfSiteFilter]
								: count)
				})
			})
		})

		let result = Object.entries(aggregatedData).map(([name, counts]) => ({
			name,
			...counts
		}))

		// Aplicar filter por searchFilter
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
		setTypeOfSiteFilter('')
		setSearchFilter('')
	}

	// Calculate dynamic height based on the number of bars and barSize
	const barHeight = useMemo(() => 16, [])
	const barSpacing = useMemo(() => 10, [])
	const dynamicHeight = useMemo(
		() => `${distributionData.length * (barHeight * 4) + barSpacing}px`, // Add extra space for margins and labels
		[distributionData, barHeight, barSpacing]
	)

	return {
		distributionData,
		barHeight,
		barName,
		hasActiveFilters,
		viewBy,
		admRegionFilter,
		regionFilter,
		stateFilter,
		cityFilter,
		siteFilter,
		typeOfSiteFilter,
		searchFilter,
		dynamicHeight,
		uniqueTypeOfSite,
		uniqueOperatingSystem,
		uniqueStates,
		uniqueCities,
		uniqueRegions,
		uniqueSites,
		uniqueAdmRegions,
		sortOrder,
		setViewBy,
		setAdmRegionFilter,
		setRegionFilter,
		setStateFilter,
		setCityFilter,
		setSiteFilter,
		setTypeOfSiteFilter,
		setSearchFilter,
		setSortOrder,
		clearFilters
	}
}
