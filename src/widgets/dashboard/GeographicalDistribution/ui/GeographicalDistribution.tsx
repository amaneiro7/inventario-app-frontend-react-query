/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy, memo, Suspense } from 'react'
import { useGeographicalDistribution } from '../model/useGeographicalDistribution'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/Card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/Select'
import { FilterSection } from './FilterSection'
import { type ComputerDashboardDto } from '@/entities/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface GeographicalDistributionProps {
	/**
	 * The raw geographical distribution data for computers.
	 */
	data: ComputerDashboardDto['region']
}

const GeoCharts = lazy(() => import('./GeoCharts').then(m => ({ default: m.GeoCharts })))

/**
 * `GeographicalDistribution` is a memoized functional component that displays a geographical distribution
 * of equipment based on provided data. It includes filtering options by administrative region, region, state, city, and site,
 * and visualizes the data using a bar chart.
 */
export const GeographicalDistribution = memo(({ data }: GeographicalDistributionProps) => {
	const {
		distributionData,
		hasActiveFilters,
		uniqueAdmRegions,
		uniqueRegions,
		uniqueStates,
		uniqueCities,
		viewBy,
		barName,
		admRegionFilter,
		regionFilter,
		stateFilter,
		cityFilter,
		searchFilter,
		dynamicHeight,
		barHeight,
		setViewBy,
		clearFilters,
		setAdmRegionFilter,
		setRegionFilter,
		setStateFilter,
		setCityFilter,
		setSearchFilter,
		setSiteFilter,
		siteFilter,
		uniqueSites
	} = useGeographicalDistribution({ data })

	return (
		<Card className="fade-in-5 col-span-12">
			<CardHeader>
				<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
					<div>
						<CardTitle>Distribución geográfica</CardTitle>
						<CardDescription>
							Distribución de equipos por regiones, estados y ciudades
						</CardDescription>
					</div>
					<Select value={viewBy} onValueChange={value => setViewBy(value as any)}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Ver por..." />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="admRegion">Por zona</SelectItem>
							<SelectItem value="region">Por región</SelectItem>
							<SelectItem value="state">Por estado</SelectItem>
							<SelectItem value="city">Por ciudad</SelectItem>
							<SelectItem value="sites">Por sitio</SelectItem>
							<SelectItem value="location">Por ubicación</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</CardHeader>
			<CardContent>
				<FilterSection
					viewBy={viewBy}
					hasActiveFilters={hasActiveFilters}
					uniqueAdmRegions={uniqueAdmRegions}
					uniqueRegions={uniqueRegions}
					uniqueStates={uniqueStates}
					uniqueCities={uniqueCities}
					uniqueSites={uniqueSites}
					admRegionFilter={admRegionFilter}
					regionFilter={regionFilter}
					stateFilter={stateFilter}
					cityFilter={cityFilter}
					searchFilter={searchFilter}
					siteFilter={siteFilter}
					setAdmRegionFilter={setAdmRegionFilter}
					setRegionFilter={setRegionFilter}
					setStateFilter={setStateFilter}
					setCityFilter={setCityFilter}
					setSiteFilter={setSiteFilter}
					setSearchFilter={setSearchFilter}
					clearFilters={clearFilters}
				/>
				<Suspense fallback={<div className="min-h-80 w-full animate-pulse bg-gray-200" />}>
					<GeoCharts
						clearFilters={clearFilters}
						distributionData={distributionData}
						barName={barName}
						dynamicHeight={dynamicHeight}
						barHeight={barHeight}
					/>
				</Suspense>
			</CardContent>
		</Card>
	)
})

GeographicalDistribution.displayName = 'GeographicalDistribution'