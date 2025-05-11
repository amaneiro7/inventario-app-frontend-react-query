import { lazy, Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { PieContentFallback } from './PieContentFallback'
import { BASIC_COLORS_MAP } from '@/utils/colores'
import { type PieProps } from 'recharts'

interface PieCardProps {
	data: PieProps['data']
	dataKey?: PieProps['dataKey']
	title: string
	desc: string
	total: number
	icon?: React.ReactNode
	colors?: string[]
	selectSection?: React.ReactNode
}

const PieContent = lazy(() => import('./PieContent').then(m => ({ default: m.PieContent })))

export const PieCard = ({
	data,
	title,
	desc,
	total,
	icon,
	colors = BASIC_COLORS_MAP,
	dataKey = 'value',
	selectSection
}: PieCardProps) => {
	return (
		<Card>
			<CardHeader>
				<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
					<div>
						<CardTitle>{title}</CardTitle>
						<CardDescription>{desc}</CardDescription>
					</div>
					{selectSection}
				</div>
			</CardHeader>
			<CardContent>
				<Suspense fallback={<PieContentFallback />}>
					<PieContent
						data={data}
						total={total}
						icon={icon}
						colors={colors}
						dataKey={dataKey}
					/>
				</Suspense>
			</CardContent>
		</Card>
	)
}
