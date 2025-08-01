import { lazy, memo, Suspense } from 'react'
import { useGetAllLocationMonitorings } from '@/entities/locations/locationMonitoring/infra/hook/useGetAllLocationMonitoring'
import { TabsContent } from '@/shared/ui/Tabs'
import { type LocationMonitoringFilters } from '@/entities/locations/locationMonitoring/application/createLocationMonitoringQueryParams'

const TableLocationMonitoringWrapper = lazy(() =>
	import('./TableLocationMonitoringWrapper').then(m => ({
		default: m.TableLocationMonitoringWrapper
	}))
)
const LocationMonitoringMap = lazy(() =>
	import('./LocationMonitoringMap').then(m => ({ default: m.LocationMonitoringMap }))
)
const LocationMonitoringChart = lazy(() =>
	import('./LocationMonitoringChart').then(m => ({ default: m.LocationMonitoringChart }))
)

interface LocationMonitoringTabsContentProps {
	query: LocationMonitoringFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
	handleChange: (name: string, value: string | number) => void
}

export const LocationMonitoringTabsContent = memo(
	({
		handleChange,
		handlePageClick,
		handlePageSize,
		handleSort,
		query
	}: LocationMonitoringTabsContentProps) => {
		const { locationMonitorings, isError, isLoading, isFetching } =
			useGetAllLocationMonitorings(query)
		return (
			<>
				<TabsContent value="table" className="mt-4">
					<Suspense>
						<TableLocationMonitoringWrapper
							handlePageSize={handlePageSize}
							handlePageClick={handlePageClick}
							handleChange={handleChange}
							handleSort={handleSort}
							query={query}
							locationMonitorings={locationMonitorings}
							isError={isError}
							isLoading={isLoading}
						/>
					</Suspense>
				</TabsContent>
				<TabsContent value="map" className="mt-4">
					<Suspense>
						<LocationMonitoringMap
							locationMonitorings={locationMonitorings}
							pageSize={query.pageSize}
							handlePageSize={handlePageSize}
							handlePageClick={handlePageClick}
							isError={isError}
							isLoading={isLoading}
							isFetching={isFetching}
						/>
					</Suspense>
				</TabsContent>
				<TabsContent value="chart" className="mt-4">
					<Suspense>
						<LocationMonitoringChart query={query} />
					</Suspense>
				</TabsContent>
			</>
		)
	}
)
LocationMonitoringTabsContent.displayName = 'LocationMonitoringTabsContent'
