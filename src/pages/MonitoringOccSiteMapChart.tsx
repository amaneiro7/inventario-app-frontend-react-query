import { Suspense, useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { TowerVisualization } from '@/ui/monitoring/mcboSiteChart/TowerVisualization'
import { useOccSiteMapChart } from '@/ui/monitoring/mcboSiteChart/useOccSiteMapChart'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import { Skeleton } from '@/components/Skeleton'
import { StatusLegend } from '@/ui/monitoring/mcboSiteChart/StatusLegend'
import { LocationDetailsPanel } from '@/ui/monitoring/mcboSiteChart/LocationDetailsPanel'

const MonitoringOccSiteMapChart = () => {
	const { deviceMonitoringDashboardByLocation, isLoading } = useOccSiteMapChart()
	const [selectedFloor, setSelectedFloor] = useState<string | null>(null)
	const [selectedAdmRegion, setSelectedAdmRegion] = useState<string | null>(null)

	if (deviceMonitoringDashboardByLocation && !selectedAdmRegion) {
		setSelectedAdmRegion(deviceMonitoringDashboardByLocation[0]?.name)
	}

	const handleFloorClick = (floorNumber: string) => {
		setSelectedFloor(floorNumber)
	}

	const selectedRegionData = useMemo(() => {
		return deviceMonitoringDashboardByLocation?.find(
			admRegion => admRegion.name === selectedAdmRegion
		)
	}, [deviceMonitoringDashboardByLocation, selectedAdmRegion])

	if (isLoading) {
		return (
			<Card>
				<CardHeader>
					<Skeleton className="h-8 w-2/3" />
					<Skeleton className="h-4 w-1/2" />
				</CardHeader>
				<CardContent>
					<Skeleton className="h-96 w-full" />
				</CardContent>
			</Card>
		)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Visualización de Sedes por Región Administrativa</CardTitle>
				<CardDescription>
					Seleccione una región para ver el estado de los equipos en cada sede.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="flex flex-col flex-wrap">
					<div className="max-w-sm flex-grow">
						<Select
							onValueChange={value => setSelectedAdmRegion(value)}
							value={selectedAdmRegion ?? ''}
						>
							<SelectTrigger
								id="region-select"
								aria-label="Seleccionar región administrativa"
							>
								<SelectValue placeholder="Seleccione una región..." />
							</SelectTrigger>
							<SelectContent>
								{deviceMonitoringDashboardByLocation?.map(admRegion => (
									<SelectItem key={admRegion.name} value={admRegion.name}>
										{admRegion.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="flex-shrink-0 pt-7">
						<StatusLegend />
					</div>
				</div>
				<div className="grid grid-cols-1 gap-6 overflow-hidden lg:grid-cols-[1fr_410px]">
					<section
						aria-labelledby="sites-title"
						className="grid grid-cols-1 gap-6 md:grid-cols-2"
					>
						<h2 id="sites-title" className="sr-only">
							Sedes en {selectedAdmRegion}
						</h2>
						{selectedRegionData?.sites.map(site => (
							<article key={site.name} aria-labelledby={`site-title-${site.name}`}>
								<h3
									id={`site-title-${site.name}`}
									className="mb-2 text-center font-semibold"
								>
									{site.name}
								</h3>
								<TowerVisualization
									locations={site.locations}
									onLocationClick={handleFloorClick}
									selectedLocationName={selectedFloor}
								/>
							</article>
						))}
					</section>

					<Suspense>
						<LocationDetailsPanel
							locations={selectedRegionData}
							selectedFloor={selectedFloor}
						/>
					</Suspense>
				</div>
			</CardContent>
		</Card>
	)
}

export default MonitoringOccSiteMapChart
