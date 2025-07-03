import { lazy, Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { useOccSiteMapChart } from '@/ui/monitoring/mcboSiteChart/useOccSiteMapChart'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import { Skeleton } from '@/components/Skeleton'
import { StatusLegend } from '@/ui/monitoring/mcboSiteChart/StatusLegend'
import Typography from '@/components/Typography'

const TowerVisualization = lazy(() =>
	import('@/ui/monitoring/mcboSiteChart/TowerVisualization').then(m => ({
		default: m.TowerVisualization
	}))
)
const LocationDetailsPanel = lazy(() =>
	import('@/ui/monitoring/mcboSiteChart/LocationDetailsPanel').then(m => ({
		default: m.LocationDetailsPanel
	}))
)

const MonitoringOccSiteMapChart = () => {
	const {
		deviceMonitoringDashboardByLocation,
		isLoading,
		selectedAdmRegion,
		setSelectedAdmRegion,
		selectedRegionData,
		selectedFloor,
		handleFloorClick
	} = useOccSiteMapChart()

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
								<Typography
									id={`site-title-${site.name}`}
									variant="h3"
									align="center"
									weight="semibold"
									color="azul"
									className="mb-2"
								>
									{site.name}
								</Typography>
								<Suspense
									fallback={
										<>
											<div className="h-3 rounded-t-md bg-slate-600 shadow-inner" />
											<div className="animate-pulse-fast h-28 min-w-64 bg-slate-400" />
											<div className="mt-1 h-4 rounded-b-lg bg-slate-700 shadow-md" />
										</>
									}
								>
									<TowerVisualization
										locations={site.locations}
										onLocationClick={handleFloorClick}
										selectedLocationName={selectedFloor}
									/>
								</Suspense>
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
