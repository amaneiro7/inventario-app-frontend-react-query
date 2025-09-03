import { lazy, Suspense, useMemo } from 'react'
import { useInventoryOverview } from '../model/useInventoryOverview'
import { BASIC_COLORS_MAP } from '@/shared/lib/utils/colores'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { InventoryOverviewSkeleton } from './InventoryOverviewSkeleton'
import { type ComputerDashboardDto } from '@/entities/devices/dashboard/domain/dto/ComputerDashboard.dto'

const PieCard = lazy(() =>
	import('@/shared/ui/PieChart/PieCard').then(m => ({ default: m.PieCard }))
)

const DeviceByTypeOfSite = lazy(() =>
	import('./DeviceByTypeOfSite').then(m => ({ default: m.DeviceByTypeOfSite }))
)
const DeviceDistributionByCategory = lazy(() =>
	import('./DeviceDistributionByCategory').then(m => ({
		default: m.DeviceDistributionByCategory
	}))
)
const DistributionByTypeOfSite = lazy(() =>
	import('./DistributionByTypeOfSite').then(m => ({
		default: m.DistributionByTypeOfSite
	}))
)

interface InventoryOverviewProps {
	categoryData: ComputerDashboardDto['category']
	statusData: ComputerDashboardDto['status']
}

export const InventoryOverview = ({ categoryData, statusData }: InventoryOverviewProps) => {
	const {
		barHeight,
		selectedCategory,
		prepareGroupedBarData,
		getTotalCount,
		getSelectedCategoryData,
		handleCategorySelect
	} = useInventoryOverview({ categoryData })

	const totalStatus = useMemo(() => {
		return statusData.reduce((sum, cat) => sum + cat.count, 0)
	}, [statusData])
	return (
		<Suspense fallback={<InventoryOverviewSkeleton />}>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-4">
				<ErrorBoundary
					fallback={({ onReset }) => (
						<WidgetErrorFallback
							message="No se pudo cargar la distribución por tipo de sitio."
							onReset={onReset}
						/>
					)}
				>
					<DeviceByTypeOfSite
						categoryData={categoryData}
						selectedCategory={selectedCategory}
						getTotalCount={getTotalCount}
						barHeight={barHeight}
						getSelectedCategoryData={getSelectedCategoryData}
						handleCategorySelect={handleCategorySelect}
					/>
				</ErrorBoundary>
				<ErrorBoundary
					fallback={({ onReset }) => (
						<WidgetErrorFallback
							message="No se pudo cargar la distribución por estatus."
							onReset={onReset}
						/>
					)}
				>
					<PieCard
						data={statusData}
						title="Distribución por estatus de equipos"
						desc="Porcentaje de equipos según su estatus"
						colors={BASIC_COLORS_MAP}
						dataKey="count"
						total={totalStatus}
					/>
				</ErrorBoundary>
				<ErrorBoundary
					fallback={({ onReset }) => (
						<WidgetErrorFallback
							message="No se pudo cargar la distribución por categoría."
							onReset={onReset}
						/>
					)}
				>
					<DeviceDistributionByCategory categoryData={categoryData} />
				</ErrorBoundary>
				{/* New Triple Bar Chart showing all equipment by category and site type */}
				<ErrorBoundary
					fallback={({ onReset }) => (
						<WidgetErrorFallback
							message="No se pudo cargar la distribución detallada por sitio."
							onReset={onReset}
						/>
					)}
				>
					<DistributionByTypeOfSite
						barHeight={barHeight}
						prepareGroupedBarData={prepareGroupedBarData}
					/>
				</ErrorBoundary>
			</div>
		</Suspense>
	)
}
