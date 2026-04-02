import { memo } from 'react'
import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	Legend,
	XAxis,
	YAxis,
	Tooltip
} from '@/shared/ui/Charts'
import { BASIC_COLORS } from '@/shared/lib/utils/colores'
import { type BrandData } from '../model/useBrandDistribution'

interface DeviceByBrandProps {
	brandData: BrandData[]
}

export const DeviceByBrand = memo(({ brandData }: DeviceByBrandProps) => {
	return (
		<BarChart
			data={brandData}
			style={{
				width: '100%',
				maxWidth: '800px',
				maxHeight: '80vh',
				aspectRatio: 1.618
			}}
			responsive
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
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar dataKey="count" fill={BASIC_COLORS.azulElectrico} name="Cantidad" barSize={30}>
				<LabelList dataKey="count" position="top" style={{ fontSize: '0.65rem' }} />
			</Bar>
		</BarChart>
	)
})

DeviceByBrand.displayName = 'DeviceByBrand'
