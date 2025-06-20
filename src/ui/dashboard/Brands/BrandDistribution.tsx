import { lazy, memo, Suspense } from 'react'
import { useBrandDistribution } from '../hooks/useBrandDistribution'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { PieCard } from '../../../components/PieChart/PieCard'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'
interface BrandDistributionProps {
	brandData: ComputerDashboardDto['brand']
}

const DeviceByBrand = lazy(() =>
	import('./DeviceByBrand').then(m => ({ default: m.DeviceByBrand }))
)
const ModelQuantityByModels = lazy(() =>
	import('./ModelQuantityByModels').then(m => ({ default: m.ModelQuantityByModels }))
)
export const BrandDistribution = memo(({ brandData: data }: BrandDistributionProps) => {
	const { brandData, total } = useBrandDistribution({ data })
	return (
		<div className="grid gap-4 md:grid-cols-2">
			<Card>
				<CardHeader>
					<CardTitle>Cantidad de equipos por marca</CardTitle>
					<CardDescription>Total de equipos por marca</CardDescription>
					<CardContent className="mb-6 h-80">
						<Suspense
							fallback={
								<div className="h-96 min-h-96 w-full animate-pulse bg-gray-200" />
							}
						>
							<DeviceByBrand brandData={brandData} />
						</Suspense>
					</CardContent>
				</CardHeader>
			</Card>
			<PieCard
				data={brandData}
				desc="Distribución de equipos por marca"
				title="Marca"
				dataKey="count"
				total={total}
			/>

			<Card>
				<CardHeader>
					<CardTitle>Distribución por cantidad de modelos</CardTitle>
					<CardDescription>Número de modelos por marca</CardDescription>
				</CardHeader>
				<CardContent className="mb-6 h-80">
					<Suspense
						fallback={
							<div className="h-96 min-h-96 w-full animate-pulse bg-gray-200" />
						}
					>
						<ModelQuantityByModels brandData={brandData} />
					</Suspense>
				</CardContent>
			</Card>
		</div>
	)
})
