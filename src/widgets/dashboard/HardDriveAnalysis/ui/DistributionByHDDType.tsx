import { lazy, Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/Card'
import { type HDDPrepareGroupedBarData, type HDDTypeData } from '../model/useHardDriveAnalysis'

const HardDriveByType = lazy(() =>
	import('./HardDriveByType').then(m => ({ default: m.HardDriveByType }))
)

interface DistributionByHDDTypeProps {
	prepareGroupedBarData: HDDPrepareGroupedBarData
	typeData: HDDTypeData[]
	barHeight: number
}
export const DistributionByHDDType = ({
	barHeight,
	prepareGroupedBarData,
	typeData
}: DistributionByHDDTypeProps) => {
	return (
		<Card className="col-span-2">
			<CardHeader>
				<CardTitle>Distribución de Discos Duros por tipo</CardTitle>
				<CardDescription></CardDescription>
			</CardHeader>
			<CardContent className="h-80">
				<Suspense
					fallback={<div className="h-80 min-h-80 w-full animate-pulse bg-gray-200" />}
				>
					<HardDriveByType
						typeData={typeData}
						barHeight={barHeight}
						prepareGroupedBarData={prepareGroupedBarData}
					/>
				</Suspense>
			</CardContent>
		</Card>
	)
}
