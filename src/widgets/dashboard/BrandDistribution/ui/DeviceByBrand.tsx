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
import { BASIC_COLORS } from '@/shared/lib/utils/colores'
import { type BrandData } from '../model/useBrandDistribution'

interface DeviceByBrandProps {
	brandData: BrandData[]
}

export const DeviceByBrand = memo(({ brandData }: DeviceByBrandProps) => {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<BarChart data={brandData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					dataKey="name"
					tick={{
						fontSize: '0.75rem' // Reduce el tamaño de la fuente de las etiquetas del eje X
					}}
				/>
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="count" fill={BASIC_COLORS.naranja} name="Cantidad" barSize={30}>
					<LabelList dataKey="count" position="top" style={{ fontSize: '0.65rem' }} />
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	)
})

DeviceByBrand.displayName = 'DeviceByBrand'
