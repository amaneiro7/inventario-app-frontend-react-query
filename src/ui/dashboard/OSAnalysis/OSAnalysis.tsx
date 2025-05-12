import { lazy, memo, Suspense } from 'react'
import { MapPin } from 'lucide-react'
import { useOperatingSystemAnalysys } from '../hooks/useOperatingSystemAnalysis'
import { PieCard } from '../PieCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface OSAnalysisProps {
	data: ComputerDashboardDto['operatingSystem']
}

const OSAnalysisChart = lazy(() =>
	import('./OSAnalysisChart').then(m => ({ default: m.OSAnalysisChart }))
)

export const OSAnalysis: React.FC<OSAnalysisProps> = memo(({ data }) => {
	const { arqData, barHeight, prepareGroupedBarData, totalArq, totalOperatingSystem } =
		useOperatingSystemAnalysys({ data })

	return (
		<>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(550px,1fr))] gap-4">
				<PieCard
					data={data}
					total={totalOperatingSystem}
					title="Distribución de Sistemas Operativos"
					desc="Proporción de equipos por sistema operativo instalado"
					dataKey="count"
					icon={<MapPin className="mx-auto mb-2 h-12 w-12 opacity-20" />}
				/>
				<PieCard
					data={arqData}
					total={totalArq}
					title="Distribución por Arquitectura de Sistemas Operativos"
					desc="Proporción de sistemas operativos según su arquitectura"
					dataKey="count"
					icon={<MapPin className="mx-auto mb-2 h-12 w-12 opacity-20" />}
				/>
				<Card className="col-span-2">
					<CardHeader>
						<CardTitle>Relación entre Sistema Operativo y Arquitectura</CardTitle>
						<CardDescription>
							Cantidad de sistemas operativos por tipo de arquitectura.
						</CardDescription>
					</CardHeader>
					<CardContent className="h-80">
						<Suspense
							fallback={
								<div className="h-80 min-h-80 w-full animate-pulse bg-gray-200" />
							}
						>
							<OSAnalysisChart
								barHeight={barHeight}
								prepareGroupedBarData={prepareGroupedBarData}
								arqData={arqData}
							/>
						</Suspense>
					</CardContent>
				</Card>
			</div>
		</>
	)
})
