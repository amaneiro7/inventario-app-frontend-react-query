import { lazy, memo, Suspense } from 'react'
import { HardDrive } from 'lucide-react'
import { useHardDriveAnalysys } from '../hooks/useHardDriveAnalysys'
import { PieCard } from '../PieCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'

interface HardDriveAnalysisProps {
	data: ComputerDashboardDto['hardDrive']
}

const HardDriveByType = lazy(() =>
	import('./HardDriveByType').then(m => ({ default: m.HardDriveByType }))
)

export const HardDriveAnalysis: React.FC<HardDriveAnalysisProps> = memo(({ data }) => {
	const { typeData, barHeight, prepareGroupedBarData, totalDrivesByCapacity, totalDrivesByType } =
		useHardDriveAnalysys({ data })

	return (
		<div className="grid grid-cols-[repeat(auto-fit,minmax(550px,1fr))] gap-4">
			<PieCard
				data={typeData}
				total={totalDrivesByType}
				title="Analisis Tipos de Disco Duros"
				desc="Distribución de Discos por tipo"
				dataKey="count"
				icon={<HardDrive className="mx-auto mb-2 h-12 w-12 opacity-20" />}
			/>
			<PieCard
				data={data}
				total={totalDrivesByCapacity}
				title="Analisis de Discos Duros"
				desc="Distribución de Discos por capacidad"
				dataKey="count"
				icon={<HardDrive className="mx-auto mb-2 h-12 w-12 opacity-20" />}
			/>
			<Card className="col-span-2">
				<CardHeader>
					<CardTitle>Distribución de Discos Duros por tipo</CardTitle>
					<CardDescription></CardDescription>
				</CardHeader>
				<CardContent className="h-80">
					<Suspense
						fallback={
							<div className="h-80 min-h-80 w-full animate-pulse bg-gray-200" />
						}
					>
						<HardDriveByType
							typeData={typeData}
							barHeight={barHeight}
							prepareGroupedBarData={prepareGroupedBarData}
						/>
					</Suspense>
				</CardContent>
			</Card>
		</div>
	)
})
