import { lazy, Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/Card'
import { ArqData, OSPrepareGroupedBarData } from '../model/useOperatingSystemAnalysis'

const OSAnalysisChart = lazy(() =>
	import('./OSAnalysisChart').then(m => ({ default: m.OSAnalysisChart }))
)

interface QuantityByOSArqProps {
	barHeight: number
	arqData: ArqData[]
	prepareGroupedBarData: OSPrepareGroupedBarData[]
}

export const QuantityByOSArq = ({
	barHeight,
	arqData,
	prepareGroupedBarData
}: QuantityByOSArqProps) => {
	return (
		<Card className="col-span-2">
			<CardHeader>
				<CardTitle>Relación entre Sistema Operativo y Arquitectura</CardTitle>
				<CardDescription>
					Cantidad de sistemas operativos por tipo de arquitectura.
				</CardDescription>
			</CardHeader>
			<CardContent className="h-80">
				<Suspense
					fallback={<div className="h-80 min-h-80 w-full animate-pulse bg-gray-200" />}
				>
					<OSAnalysisChart
						barHeight={barHeight}
						prepareGroupedBarData={prepareGroupedBarData}
						arqData={arqData}
					/>
				</Suspense>
			</CardContent>
		</Card>
	)
}
