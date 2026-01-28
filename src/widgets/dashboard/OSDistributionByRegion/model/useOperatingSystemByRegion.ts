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
import { useGeographicalFilters } from '../../shared/model/useGeographicalFilters'

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
	const [typeOfSiteFilter, setTypeOfSiteFilter] = useState<string>('')
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

	const combinedGeoData = useMemo(() => {
		const allRegions: Record<string, Regions> = {}

		data.forEach(os => {
			os.administrativeRegion.forEach(adm => {
				if (!allRegions[adm.name]) {
					allRegions[adm.name] = { ...adm, regions: [] } // Simplified structure for options
				}
			})
		})

		return Object.values(allRegions)
	}, [data])

	const {
		admRegionFilter,
		regionFilter,
		stateFilter,
		cityFilter,
		siteFilter,
		searchFilter,
		hasActiveFilters,
		clearFilters: clearGeoFilters,
		...geoFilters
	} = useGeographicalFilters({ data: combinedGeoData })

	const uniqueOperatingSystem = useMemo(() => {
		return [...new Set(data.map(item => item.name))].sort()
	}, [data])

	const uniqueTypeOfSite = useMemo(() => {
		return [...new Set(data.flatMap(os => Object.keys(os.typeOfSiteCount)))]
	}, [data])

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
		const MAX_ITEMS_WITHOUT_FILTER = 15
		if (!hasActiveFilters) {
			result = result.slice(0, MAX_ITEMS_WITHOUT_FILTER)
		}
		return result
	}, [filteredData, viewBy, searchFilter, sortOrder, hasActiveFilters])

	// Clear filters
	const clearFilters = () => {
		clearGeoFilters()
		setTypeOfSiteFilter('')
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
		sortOrder,
		setViewBy,
		setTypeOfSiteFilter,
		setSortOrder,
		clearFilters,
		...geoFilters
	}
}
