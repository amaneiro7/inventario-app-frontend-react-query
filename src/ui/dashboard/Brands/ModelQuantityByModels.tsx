import { memo } from 'react'
import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts'
import { BASIC_COLORS } from '@/utils/colores'
import { type BrandData } from '../hooks/useBrandDistribution'

interface ModelQuantityByModelsProps {
	brandData: BrandData[]
}

export const ModelQuantityByModels = memo(({ brandData }: ModelQuantityByModelsProps) => {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<BarChart data={brandData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="models" fill={BASIC_COLORS.verde} name="Model Count" barSize={45}>
					<LabelList dataKey="models" position="top" style={{ fontSize: '0.65rem' }} />
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	)
})

ModelQuantityByModels.displayName = 'ModelQuantityByModels'
