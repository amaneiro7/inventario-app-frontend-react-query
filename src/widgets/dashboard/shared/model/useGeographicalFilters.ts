import { useCallback, useMemo, useState } from 'react'
import { applyGeoFilters } from '../../GeographicalDistribution/model/applyGeoFilters'
import { type ComputerDashboardDto } from '@/entities/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface UseGeographicalFiltersProps {
	data: ComputerDashboardDto['region']
}

export function useGeographicalFilters({ data }: UseGeographicalFiltersProps) {
	const [admRegionFilter, setAdmRegionFilter] = useState<string>('')
	const [regionFilter, setRegionFilter] = useState<string>('')
	const [stateFilter, setStateFilter] = useState<string>('')
	const [siteFilter, setSiteFilter] = useState<string>('')
	const [cityFilter, setCityFilter] = useState<string>('')
	const [searchFilter, setSearchFilter] = useState<string>('')

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

	const filteredHierarchy = useMemo(
		() =>
			applyGeoFilters(data, {
				admRegionFilter,
				regionFilter,
				stateFilter,
				cityFilter,
				siteFilter
			}),
		[data, admRegionFilter, regionFilter, stateFilter, cityFilter, siteFilter]
	)

	const uniqueAdmRegions = useMemo(() => {
		const names = filteredHierarchy.map(item => item.name)
		return [...new Set(names)]
			.sort()
			.filter(
				admRegion =>
					!searchFilter || admRegion.toLowerCase().includes(searchFilter.toLowerCase())
			)
	}, [filteredHierarchy, searchFilter])

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

	const clearFilters = useCallback(() => {
		setAdmRegionFilter('')
		setRegionFilter('')
		setStateFilter('')
		setCityFilter('')
		setSiteFilter('')
		setSearchFilter('')
	}, [])

	return {
		filteredHierarchy,
		hasActiveFilters,
		uniqueAdmRegions,
		uniqueRegions,
		uniqueStates,
		uniqueCities,
		uniqueSites,
		admRegionFilter,
		regionFilter,
		stateFilter,
		cityFilter,
		siteFilter,
		searchFilter,
		clearFilters,
		setRegionFilter,
		setStateFilter,
		setCityFilter,
		setSiteFilter,
		setSearchFilter,
		setAdmRegionFilter
	}
}
