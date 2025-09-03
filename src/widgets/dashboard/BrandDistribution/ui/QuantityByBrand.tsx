import { lazy, Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/Card'
import { type BrandData } from '../model/useBrandDistribution'

const DeviceByBrand = lazy(() =>
	import('./DeviceByBrand').then(m => ({ default: m.DeviceByBrand }))
)

interface QuantityByBrandProps {
	brandData: BrandData[]
}

export const QuantityByBrand = ({ brandData }: QuantityByBrandProps) => {
	return (
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
	)
}
