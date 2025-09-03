import { Suspense, lazy } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/Card'
import { type BrandData } from '../model/useBrandDistribution'

const ModelQuantityByModels = lazy(() =>
	import('./ModelQuantityByModels').then(m => ({ default: m.ModelQuantityByModels }))
)

interface DistributionByQuantityModelsProps {
	brandData: BrandData[]
}

export const DistributionByQuantityModels = ({ brandData }: DistributionByQuantityModelsProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Distribución por cantidad de modelos</CardTitle>
				<CardDescription>Número de modelos por marca</CardDescription>
			</CardHeader>
			<CardContent className="mb-6 h-80">
				<Suspense
					fallback={<div className="h-96 min-h-96 w-full animate-pulse bg-gray-200" />}
				>
					<ModelQuantityByModels brandData={brandData} />
				</Suspense>
			</CardContent>
		</Card>
	)
}
