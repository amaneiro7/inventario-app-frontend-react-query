import { lazy, Suspense } from 'react'
import { Filter } from 'lucide-react'
import { useOperatingSystemByRegion } from '../hooks/useOperatingSystemByRegion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/Card'
import Button from '@/components/Button'
import { MainOsFilter } from './MainOsFilter'
import { SecondaryFIlter } from './SecondaryFIlter'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface OSDIstributionByRegionProps {
	data: ComputerDashboardDto['operatingSystemByRegion']
}

const OSDistributionByRegionChart = lazy(() =>
	import('./OSDistributionByRegionChart').then(m => ({ default: m.OSDistributionByRegionChart }))
)

export const OSDIstributionByRegion = ({ data }: OSDIstributionByRegionProps) => {
	const {
		distributionData,
		hasActiveFilters,
		uniqueCities,
		uniqueRegions,
		uniqueStates,
		viewBy,
		uniqueOperatingSystem,
		cityFilter,
		regionFilter,
		searchFilter,
		stateFilter,
		dynamicHeight,
		barHeight,
		sortOrder,
		setViewBy,
		clearFilters,
		setCityFilter,
		setRegionFilter,
		setSearchFilter,
		setStateFilter,
		setSortOrder,
		admRegionFilter,
		setAdmRegionFilter,
		setTypeOfSiteFilter,
		siteFilter,
		setSiteFilter,
		typeOfSiteFilter,
		uniqueAdmRegions,
		uniqueSites,
		uniqueTypeOfSite
	} = useOperatingSystemByRegion({ data })
	return (
		<Card className="col-span-12">
			<CardHeader>
				<CardTitle>Distribución geográfica de sistemas operativos</CardTitle>
				<CardDescription>
					Distribución de sistemas operativos por regiones, estados, ciudades y ubicación
				</CardDescription>
			</CardHeader>
			<CardContent>
				<SecondaryFIlter
					sortOrder={sortOrder}
					searchFilter={searchFilter}
					setSortOrder={setSortOrder}
					viewBy={viewBy}
					setViewBy={setViewBy}
					setTypeOfSiteFilter={setTypeOfSiteFilter}
					typeOfSiteFilter={typeOfSiteFilter}
					setSearchFilter={setSearchFilter}
					uniqueTypeOfSite={uniqueTypeOfSite}
				/>
				<MainOsFilter
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
					siteFilter={siteFilter}
					setAdmRegionFilter={setAdmRegionFilter}
					setRegionFilter={setRegionFilter}
					setStateFilter={setStateFilter}
					setCityFilter={setCityFilter}
					setSiteFilter={setSiteFilter}
					clearFilters={clearFilters}
				/>

				<div style={{ height: dynamicHeight ?? '20rem', minHeight: '20rem' }}>
					{distributionData.length > 0 ? (
						<Suspense>
							<OSDistributionByRegionChart
								distributionData={distributionData}
								uniqueOperatingSystem={uniqueOperatingSystem}
								barHeight={barHeight}
							/>
						</Suspense>
					) : (
						<div className="flex h-full items-center justify-center">
							<div className="text-muted-foreground text-center">
								<Filter className="mx-auto mb-2 h-12 w-12 opacity-20" />
								<p>
									{data.length === 0
										? 'No hay datos iniciales para mostrar.'
										: 'No hay datos que coincidan con los filtros.'}
								</p>

								<Button
									text="Limpiar filtros"
									buttonSize="medium"
									size="content"
									color="blanco"
									onClick={clearFilters}
									className="mt-2"
								/>
							</div>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	)
}
