import React from 'react'
import { LocationMonitoringSummary } from './LocationMonitoringSummary'
import { DetailsBoxWrapper } from '@/components/DetailsWrapper/DetailsBoxWrapper'
import { FilterSection } from '@/ui/List/FilterSection'
import { MainLocationMonitoringFilter } from './MainLocationMonitoringFilter'
import { type LocationMonitoringFilters } from '@/core/locations/locationMonitoring/application/createLocationMonitoringQueryParams'

interface TableMapWrapperProps {
	query: LocationMonitoringFilters
	handleChange: (name: string, value: string | number) => void
}

export const TableMapWrapper = ({
	query,
	handleChange,
	children
}: React.PropsWithChildren<TableMapWrapperProps>) => {
	return (
		<>
			<LocationMonitoringSummary query={query} />
			<DetailsBoxWrapper>
				<FilterSection>
					<MainLocationMonitoringFilter
						subnet={query.subnet}
						status={query.status}
						locationId={query.locationId}
						typeOfSiteId={query.typeOfSiteId}
						cityId={query.cityId}
						stateId={query.stateId}
						regionId={query.regionId}
						administrativeRegionId={query.administrativeRegionId}
						handleChange={handleChange}
					/>
				</FilterSection>
			</DetailsBoxWrapper>
			{children}
		</>
	)
}
