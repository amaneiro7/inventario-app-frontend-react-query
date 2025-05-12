import { useMemo, useState } from 'react'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface UseOperatingSystemByRegionProps {
	data: ComputerDashboardDto['operatingSystemByRegion']
}

export interface DistributionItem {
	name: string
	[osName: string]:
		| {
				total: number
				[typeOfSite: string]: number | undefined
		  }
		| string
		| number
		| undefined
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
		return [...new Set(regions)]
			.sort()
			.filter(
				region => !searchFilter || region.toLowerCase().includes(searchFilter.toLowerCase())
			)
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

	const uniqueSites = useMemo(() => {
		let sites = allNames.sites

		if (cityFilter) {
			sites = data.flatMap(os =>
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
			sites = data.flatMap(os =>
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
			sites = data.flatMap(os =>
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
			sites = data.flatMap(os =>
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
	}, [data, admRegionFilter, regionFilter, stateFilter, cityFilter, allNames.sites, searchFilter])

	const filteredData = useMemo(() => {
		// 1. Copia superficial de 'data' y filtrado directo
		let filteredData = structuredClone(data)

		// 2. Filtrado por sitio
		if (siteFilter) {
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
		const aggregatedData: Record<string, any> = {}

		filteredData.forEach(os => {
			let dataToUse: any[] = []

			if (viewBy === 'admRegion') {
				dataToUse = [os.administrativeRegion]
			} else if (viewBy === 'region') {
				dataToUse = os.administrativeRegion.flatMap(adm => adm.regions)
			} else if (viewBy === 'state') {
				dataToUse = os.administrativeRegion.flatMap(adm =>
					adm.regions.flatMap(region => region.states)
				)
			} else if (viewBy === 'city') {
				dataToUse = os.administrativeRegion.flatMap(adm =>
					adm.regions.flatMap(region => region.states).flatMap(state => state.cities)
				)
			} else if (viewBy === 'site') {
				dataToUse = os.administrativeRegion.flatMap(adm =>
					adm.regions
						.flatMap(region => region.states)
						.flatMap(state => state.cities.flatMap(city => city.sites))
				)
			} else if (viewBy === 'location') {
				dataToUse = os.administrativeRegion.flatMap(adm =>
					adm.regions
						.flatMap(region => region.states)
						.flatMap(state =>
							state.cities.flatMap(city => city.sites.flatMap(site => site.locations))
						)
				)
			}

			dataToUse.forEach(item => {
				const locationKey = item.name
				const osName = os.name
				const count = item.count
				const typeOfSiteCounts = item.typeOfSiteCounts

				if (locationKey && count !== undefined && osName) {
					if (!aggregatedData[locationKey]) {
						aggregatedData[locationKey] = {}
					}
					if (!aggregatedData[locationKey][osName]) {
						aggregatedData[locationKey][osName] = { total: 0 }
					}
					aggregatedData[locationKey][osName].total += count

					if (typeOfSiteCounts) {
						Object.entries(typeOfSiteCounts).forEach(([type, siteCount]) => {
							aggregatedData[locationKey][osName][type] =
								(aggregatedData[locationKey][osName][type] || 0) + siteCount
						})
					}
				}
			})
		})

		let result: DistributionItem[] = Object.entries(aggregatedData).map(([name, osData]) => {
			const item: DistributionItem = { name }
			Object.entries(osData).forEach(([osName, counts]) => {
				item[osName] = counts
			})
			return item
		})

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
					.filter(val => typeof val === 'object' && val !== null && 'total' in val)
					.reduce((sum, val) => sum + ((val as { total: number }).total || 0), 0)
				const countB = Object.values(b)
					.filter(val => typeof val === 'object' && val !== null && 'total' in val)
					.reduce((sum, val) => sum + ((val as { total: number }).total || 0), 0)
				return countB - countA
			})
		}
		if (!hasActiveFilters) {
			result = result.slice(0, MAX_ITEMS_WITHOUT_FILTER)
		}
		return result
	}, [filteredData, viewBy, searchFilter, sortOrder])
	// const distributionData = useMemo(() => {
	// 	const aggregatedData: Record<string, Record<string, number>> = {}

	// 	filteredData.forEach(os => {
	// 		const traverse = (items: any[], currentView: string) => {
	// 			items.forEach(item => {
	// 				let locationKey: string | undefined
	// 				let typeOfSiteCounts: Record<string, number> | undefined
	// 				let count: number | undefined

	// 				if (currentView === 'admRegion') {
	// 					locationKey = item.name
	// 					typeOfSiteCounts = item.typeOfSiteCount
	// 					count = item.count
	// 					traverse(item.regions, 'region')
	// 				} else if (currentView === 'region') {
	// 					locationKey = item.name
	// 					typeOfSiteCounts = item.typeOfSiteCount
	// 					count = item.count
	// 					traverse(item.states, 'state')
	// 				} else if (currentView === 'state') {
	// 					locationKey = item.name
	// 					typeOfSiteCounts = item.typeOfSiteCount
	// 					count = item.count
	// 					traverse(item.cities, 'city')
	// 				} else if (currentView === 'city') {
	// 					locationKey = item.name
	// 					typeOfSiteCounts = item.typeOfSiteCount
	// 					count = item.count
	// 					traverse(item.sites, 'site')
	// 				} else if (currentView === 'site') {
	// 					locationKey = item.name
	// 					typeOfSiteCounts = item.typeOfSiteCount
	// 					count = item.count
	// 					traverse(item.locations, 'location')
	// 				} else if (currentView === 'location') {
	// 					locationKey = item.name
	// 					count = item.count
	// 					typeOfSiteCounts = { [item.typeOfSite as string]: item.count }
	// 				}

	// 				if (locationKey && count !== undefined && os.name) {
	// 					if (!aggregatedData[locationKey]) {
	// 						aggregatedData[locationKey] = {}
	// 					}
	// 					if (!aggregatedData[locationKey][os.name]) {
	// 						aggregatedData[locationKey][os.name] = { total: 0 }
	// 					}
	// 					aggregatedData[locationKey][os.name].total += count

	// 					if (typeOfSiteCounts) {
	// 						Object.entries(typeOfSiteCounts).forEach(([type, siteCount]) => {
	// 							aggregatedData[locationKey][os.name][type] =
	// 								(aggregatedData[locationKey][os.name][type] || 0) + siteCount
	// 						})
	// 					}
	// 				}
	// 			})
	// 		}

	// 		// traverse(os.administrativeRegion, 'admRegion')
	// 	})

	// 	let result: DistributionItem[] = Object.entries(aggregatedData).map(([name, osData]) => {
	// 		const item: DistributionItem = { name }
	// 		Object.entries(osData).forEach(([osName, counts]) => {
	// 			item[osName] = counts
	// 		})
	// 		return item
	// 	})

	// 	// Aplicar filter por searchFilter
	// 	if (searchFilter) {
	// 		result = result.filter(item =>
	// 			item.name.toLowerCase().includes(searchFilter.toLowerCase())
	// 		)
	// 	}

	// 	// Aplicar el ordenamiento
	// 	if (sortOrder === 'name') {
	// 		result.sort((a, b) => a.name.localeCompare(b.name))
	// 	} else if (sortOrder === 'count') {
	// 		result.sort((a, b) => {
	// 			const countA = Object.values(a)
	// 				.filter(val => typeof val === 'object' && val !== null && 'total' in val)
	// 				.reduce((sum, val) => sum + ((val as { total: number }).total || 0), 0)
	// 			const countB = Object.values(b)
	// 				.filter(val => typeof val === 'object' && val !== null && 'total' in val)
	// 				.reduce((sum, val) => sum + ((val as { total: number }).total || 0), 0)
	// 			return countB - countA
	// 		})
	// 	}

	// 	if (!hasActiveFilters) {
	// 		result = result.slice(0, MAX_ITEMS_WITHOUT_FILTER)
	// 	}
	// 	return result
	// }, [filteredData, viewBy, searchFilter, sortOrder, hasActiveFilters])

	console.log('filteredData', filteredData)
	console.log('distributionData', distributionData)

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
		uniqueAdmRegions,
		setViewBy,
		setAdmRegionFilter,
		setRegionFilter,
		setStateFilter,
		setCityFilter,
		setTypeOfSiteFilter,
		setSearchFilter,
		setSortOrder,
		clearFilters
	}
}
