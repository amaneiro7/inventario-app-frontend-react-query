import { memo } from 'react'
import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	Legend,
	Tooltip,
	XAxis,
	YAxis
} from '@/shared/ui/Charts'
import { BASIC_COLORS } from '@/shared/lib/utils/colores'
import { type BrandData } from '../model/useBrandDistribution'

interface ModelQuantityByModelsProps {
	brandData: BrandData[]
}

export const ModelQuantityByModels = memo(({ brandData }: ModelQuantityByModelsProps) => {
	return (
		<BarChart
			style={{
				width: '100%',
				maxWidth: '800px',
				maxHeight: '80vh',
				aspectRatio: 1.618
			}}
			responsive
			data={brandData}
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis
				dataKey="name"
				intercept={0}
				angle={-45}
				textAnchor="end"
				height={80}
				tickMargin={10}
				style={{
					fontSize: '0.75rem'
				}}
			/>
			<YAxis
				width="auto"
				label={{
					value: 'Cantidad de modelos',
					angle: -90,
					position: 'insideLeft',
					dx: 0,
					dy: 90
				}}
			/>
			<Tooltip />
			<Legend />
			<Bar dataKey="models" fill={BASIC_COLORS.verde} name="Modelos" barSize={30}>
				<LabelList dataKey="models" position="top" style={{ fontSize: '0.65rem' }} />
			</Bar>
		</BarChart>
	)
})

ModelQuantityByModels.displayName = 'ModelQuantityByModels'
