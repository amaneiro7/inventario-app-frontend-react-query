import { lazy, memo } from 'react'
import { useBrandDistribution } from '../model/useBrandDistribution'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { type ComputerDashboardDto } from '@/entities/devices/dashboard/domain/dto/ComputerDashboard.dto'
interface BrandDistributionProps {
	brandData: ComputerDashboardDto['brand']
}

const PieCard = lazy(() =>
	import('@/shared/ui/PieChart/PieCard').then(m => ({ default: m.PieCard }))
)

const QuantityByBrand = lazy(() =>
	import('./QuantityByBrand').then(m => ({ default: m.QuantityByBrand }))
)
const DistributionByQuantityModels = lazy(() =>
	import('./DistributionByQuantityModels').then(m => ({
		default: m.DistributionByQuantityModels
	}))
)

export const BrandDistribution = memo(({ brandData: data }: BrandDistributionProps) => {
	const { brandData, total } = useBrandDistribution({ data })
	return (
		<div className="grid gap-4 md:grid-cols-2">
			<ErrorBoundary
				fallback={({ onReset }) => (
					<WidgetErrorFallback
						message="Error al cargar la cantidad por marca."
						onReset={onReset}
					/>
				)}
			>
				<QuantityByBrand brandData={brandData} />
			</ErrorBoundary>

			<ErrorBoundary
				fallback={({ onReset }) => (
					<WidgetErrorFallback
						message="Error al cargar el gráfico de distribución por marca."
						onReset={onReset}
					/>
				)}
			>
				<PieCard
					data={brandData}
					desc="Distribución de equipos por marca"
					title="Marca"
					dataKey="count"
					total={total}
				/>
			</ErrorBoundary>
			<ErrorBoundary
				fallback={({ onReset }) => (
					<WidgetErrorFallback
						message="Error al cargar la distribución por modelos."
						onReset={onReset}
					/>
				)}
			>
				<DistributionByQuantityModels brandData={brandData} />
			</ErrorBoundary>
		</div>
	)
})
