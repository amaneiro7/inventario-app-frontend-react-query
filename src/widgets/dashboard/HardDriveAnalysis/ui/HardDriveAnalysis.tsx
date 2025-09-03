import { lazy, memo } from 'react'
import { HardDrive } from 'lucide-react'
import { useHardDriveAnalysys } from '../model/useHardDriveAnalysys'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { type ComputerDashboardDto } from '@/entities/devices/dashboard/domain/dto/ComputerDashboard.dto'

const DistributionByHDDType = lazy(() =>
	import('./DistributionByHDDType').then(m => ({ default: m.DistributionByHDDType }))
)

const PieCard = lazy(() =>
	import('@/shared/ui/PieChart/PieCard').then(m => ({ default: m.PieCard }))
)
interface HardDriveAnalysisProps {
	data: ComputerDashboardDto['hardDrive']
}

export const HardDriveAnalysis: React.FC<HardDriveAnalysisProps> = memo(({ data }) => {
	const { typeData, barHeight, prepareGroupedBarData, totalDrivesByCapacity, totalDrivesByType } =
		useHardDriveAnalysys({ data })

	return (
		<div className="grid grid-cols-[repeat(auto-fit,minmax(550px,1fr))] gap-4">
			<ErrorBoundary
				fallback={({ onReset }) => (
					<WidgetErrorFallback
						message="Error al cargar el análisis de tipos de disco duro."
						onReset={onReset}
					/>
				)}
			>
				<PieCard
					data={typeData}
					total={totalDrivesByType}
					title="Analisis Tipos de Disco Duros"
					desc="Distribución de Discos por tipo"
					dataKey="count"
					icon={<HardDrive className="mx-auto mb-2 h-12 w-12 opacity-20" />}
				/>
			</ErrorBoundary>
			<ErrorBoundary
				fallback={({ onReset }) => (
					<WidgetErrorFallback
						message="Error al cargar el análisis de capacidad de disco duro."
						onReset={onReset}
					/>
				)}
			>
				<PieCard
					data={data}
					total={totalDrivesByCapacity}
					title="Analisis de Discos Duros"
					desc="Distribución de Discos por capacidad"
					dataKey="count"
					icon={<HardDrive className="mx-auto mb-2 h-12 w-12 opacity-20" />}
				/>
			</ErrorBoundary>
			<ErrorBoundary
				fallback={({ onReset }) => (
					<WidgetErrorFallback
						message="Error al cargar la distribución por tipo de disco duro."
						onReset={onReset}
					/>
				)}
			>
				<DistributionByHDDType
					barHeight={barHeight}
					prepareGroupedBarData={prepareGroupedBarData}
					typeData={typeData}
				/>
			</ErrorBoundary>
		</div>
	)
})
