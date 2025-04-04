import { useMemo, useState } from 'react'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface UseOperatingSystemByRegionProps {
	data: ComputerDashboardDto['operatingSystemByRegion']
}
export function useOperatingSystemByRegion({ data }: UseOperatingSystemByRegionProps) {
	const [viewBy, setViewBy] = useState<'region' | 'state' | 'city' | 'location'>('location')
	const [regionFilter, setRegionFilter] = useState<string>('')
	const [stateFilter, setStateFilter] = useState<string>('')
	const [cityFilter, setCityFilter] = useState<string>('')
	const [typeOfSiteFilter, setTypeOfSiteFilter] = useState<string>('')

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

	// Obtener lista unicas de Sistema Operativos
	const uniqueOperatingSystem = useMemo(() => {
		return [...new Set(data.map(item => item.name))].sort()
	}, [data])

	const uniqueRegions = useMemo(() => {
		return [...new Set(data.flatMap(os => os.region.flatMap(region => region.name)))].sort()
	}, [data])

	const allStates = useMemo(() => {
		return data.flatMap(os =>
			os.region.flatMap(region => region.states.flatMap(state => state.name))
		)
	}, [data])

	const uniqueStates = useMemo(() => {
		let states = allStates
		if (regionFilter) {
			states = data.flatMap(os =>
				os.region
					.filter(region => region.name === regionFilter)
					.flatMap(region => region.states.map(state => state.name))
			)
		}
		return [...new Set(states)].sort()
	}, [regionFilter, allStates])

	const allCities = useMemo(() => {
		return data.flatMap(operatingSystem =>
			operatingSystem.region.flatMap(region =>
				region.states.flatMap(state => state.cities.flatMap(city => city.name))
			)
		)
	}, [data])

	const uniqueCities = useMemo(() => {
		let cities = allCities

		if (regionFilter) {
			cities = data.flatMap(operatingSystem =>
				operatingSystem.region
					.filter(region => region.name === regionFilter)
					.flatMap(region =>
						region.states.flatMap(state => state.cities.map(city => city.name))
					)
			)
		}

		if (stateFilter) {
			cities = data.flatMap(operatingSystem =>
				operatingSystem.region.flatMap(region =>
					region.states
						.filter(state => state.name === stateFilter)
						.flatMap(state => state.cities.map(city => city.name))
				)
			)
		}

		return [...new Set(cities)].sort()
	}, [allCities, regionFilter, stateFilter])

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
		const result: Record<string, unknown>[] = []
		// filteredData.forEach(os => {
		// 	os.region.forEach(region => {
		// 		if (viewBy === 'region') {
		// 			// Buscar su ka region ya existe en el resultado
		// 			let regionData = result.find(item => item.name === region.name)

		// 			// si no existe, crear un nuevo objeto para la región
		// 			if (!regionData) {
		// 				regionData = { name: region.name }
		// 				result.push(regionData)
		// 			}

		// 			// agregar el conteio del sistema operativo para esta región
		// 			regionData[os.name] = os.count
		// 		} else {
		// 			region.states.forEach(state => {
		// 				if (viewBy === 'state') {
		// 					// Buscar si el estado ya existe en el resultado
		// 					let stateData = result.find(item => item.name === state.name)

		// 					// si no existe, crear un nuevo objeto para el estado
		// 					if (!stateData) {
		// 						stateData = { name: state.name }
		// 						result.push(stateData)
		// 					}

		// 					// agregar el conteo del sistema operativo para este estado
		// 					stateData[os.name] = os.count
		// 				} else {
		// 					state.cities.forEach(city => {
		// 						if (viewBy === 'city') {
		// 							// Buscar si la ciudad ya existe en el resultado
		// 							let cityData = result.find(item => item.name === city.name)

		// 							// si no existe, crear un nuevo objeto para la ciudad
		// 							if (!cityData) {
		// 								cityData = { name: city.name }
		// 								result.push(cityData)
		// 							}

		// 							// agregar el conteo del sistema operativo para esta ciudad
		// 							cityData[os.name] = os.count
		// 						} else if (viewBy === 'location') {
		// 							city.sites.forEach(sites => {
		// 								sites.locations.forEach(location => {
		// 									// Buscar si la ubicación ya existe en el resultado
		// 									let locationData = result.find(
		// 										item => item.name === location.name
		// 									)

		// 									// si no existe, crear un nuevo objeto para la ubicación
		// 									if (!locationData) {
		// 										locationData = { name: location.name }
		// 										result.push(locationData)
		// 									}

		// 									// agregar el conteo del sistema operativo para esta ubicación
		// 									locationData[os.name] = os.count
		// 								})
		// 							})
		// 						}
		// 					})
		// 				}
		// 			})
		// 		}
		// 	})
		// })
		filteredData.forEach(os => {
			os.region.forEach(region => {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				let dataToUse: any[] = []

				if (viewBy === 'region') {
					dataToUse = [region]
				} else if (viewBy === 'city') {
					dataToUse = region.states.flatMap(state => state.cities)
				} else if (viewBy === 'location') {
					dataToUse = region.states.flatMap(state =>
						state.cities.flatMap(city => city.sites.flatMap(site => site.locations))
					)
				}

				dataToUse.forEach(item => {
					const existing = result.find(r => r.name === item.name)
					if (existing) {
						existing[os.name] = os.count
					} else {
						result.push({ name: item.name, [os.name]: os.count })
					}
				})
			})
		})
		console.log(result)
		return result
	}, [filteredData, viewBy])

	// Clear filters
	const clearFilters = () => {
		setRegionFilter('')
		setStateFilter('')
		setCityFilter('')
	}

	// Determine if filters are active
	const hasActiveFilters = regionFilter !== null || stateFilter !== null || cityFilter !== null

	// Calculate dynamic height based on the number of bars and barSize
	const barHeight = 16 // Size of each bar
	const barSpacing = 10 // Spacing between bars and other elements
	const dynamicHeight = `${distributionData.length * (barHeight * 2) + barSpacing}px` // Add extra space for margins and labels

	return {
		viewBy,
		setViewBy,
		regionFilter,
		setRegionFilter,
		stateFilter,
		setStateFilter,
		cityFilter,
		setCityFilter,
		typeOfSiteFilter,
		setTypeOfSiteFilter,
		barName,
		uniqueOperatingSystem,
		clearFilters,
		hasActiveFilters,
		dynamicHeight,
		uniqueStates,
		uniqueCities,
		uniqueRegions
	}
}
