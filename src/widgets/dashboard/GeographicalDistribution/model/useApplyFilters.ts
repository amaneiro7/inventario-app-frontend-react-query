import {
	type Regions,
	type ComputerDashboardDto
} from '@/entities/devices/dashboard/domain/dto/ComputerDashboard.dto'

/**
 * Helper function to apply cascading filters to the geographical data.
 * @param data - The raw geographical data.
 * @param filters - An object containing the filter values.
 * @returns The filtered data.
 */
export const useApplyFilters = (
	data: ComputerDashboardDto['region'],
	filters: {
		admRegionFilter: string
		regionFilter: string
		stateFilter: string
		cityFilter: string
		siteFilter: string
	}
): Regions[] => {
	let currentData = data

	if (filters.admRegionFilter) {
		currentData = currentData.filter(admRegion => admRegion.name === filters.admRegionFilter)
	}

	if (filters.regionFilter) {
		currentData = currentData
			.map(admRegion => ({
				...admRegion,
				regions: admRegion.regions.filter(region => region.name === filters.regionFilter)
			}))
			.filter(admRegion => admRegion.regions.length > 0)
	}

	if (filters.stateFilter) {
		currentData = currentData
			.map(admRegion => ({
				...admRegion,
				regions: admRegion.regions
					.map(region => ({
						...region,
						states: region.states.filter(state => state.name === filters.stateFilter)
					}))
					.filter(region => region.states.length > 0)
			}))
			.filter(admRegion => admRegion.regions.length > 0)
	}

	if (filters.cityFilter) {
		currentData = currentData
			.map(admRegion => ({
				...admRegion,
				regions: admRegion.regions
					.map(region => ({
						...region,
						states: region.states
							.map(state => ({
								...state,
								cities: state.cities.filter(
									city => city.name === filters.cityFilter
								)
							}))
							.filter(state => state.cities.length > 0)
					}))
					.filter(region => region.states.length > 0)
			}))
			.filter(admRegion => admRegion.regions.length > 0)
	}

	if (filters.siteFilter) {
		currentData = currentData
			.map(admRegion => ({
				...admRegion,
				regions: admRegion.regions
					.map(region => ({
						...region,
						states: region.states
							.map(state => ({
								...state,
								cities: state.cities
									.map(city => ({
										...city,
										sites: city.sites.filter(
											site => site.name === filters.siteFilter
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

	return currentData
}
