import { lazy, memo } from 'react'
import { MapPin } from 'lucide-react'
import { useOperatingSystemAnalysys } from '../model/useOperatingSystemAnalysis'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { type ComputerDashboardDto } from '@/entities/devices/dashboard/domain/dto/ComputerDashboard.dto'

const PieCard = lazy(() =>
	import('@/shared/ui/PieChart/PieCard').then(m => ({ default: m.PieCard }))
)

const QuantityByOSArq = lazy(() =>
	import('./QuantityByOSArq').then(m => ({ default: m.QuantityByOSArq }))
)

interface OSAnalysisProps {
	data: ComputerDashboardDto['operatingSystem']
}
export const OSAnalysis: React.FC<OSAnalysisProps> = memo(({ data }) => {
	const { arqData, barHeight, prepareGroupedBarData, totalArq, totalOperatingSystem } =
		useOperatingSystemAnalysys({ data })

	return (
		<>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(550px,1fr))] gap-4">
				<ErrorBoundary
					fallback={({ onReset }) => (
						<WidgetErrorFallback
							message="Error al cargar la distribución de sistemas operativos."
							onReset={onReset}
						/>
					)}
				>
					<PieCard
						data={data}
						total={totalOperatingSystem}
						title="Distribución de Sistemas Operativos"
						desc="Proporción de equipos por sistema operativo instalado"
						dataKey="count"
						icon={<MapPin className="mx-auto mb-2 h-12 w-12 opacity-20" />}
					/>
				</ErrorBoundary>
				<ErrorBoundary
					fallback={({ onReset }) => (
						<WidgetErrorFallback
							message="Error al cargar la distribución por arquitectura de S.O."
							onReset={onReset}
						/>
					)}
				>
					<PieCard
						data={arqData}
						total={totalArq}
						title="Distribución por Arquitectura de Sistemas Operativos"
						desc="Proporción de sistemas operativos según su arquitectura"
						dataKey="count"
						icon={<MapPin className="mx-auto mb-2 h-12 w-12 opacity-20" />}
					/>
				</ErrorBoundary>
				<ErrorBoundary
					fallback={({ onReset }) => (
						<WidgetErrorFallback
							message="Error al cargar la cantidad por arquitectura de S.O."
							onReset={onReset}
						/>
					)}
				>
					<QuantityByOSArq
						arqData={arqData}
						barHeight={barHeight}
						prepareGroupedBarData={prepareGroupedBarData}
					/>
				</ErrorBoundary>
			</div>
		</>
	)
})
