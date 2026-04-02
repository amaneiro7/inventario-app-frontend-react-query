import { memo } from 'react'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from '@/shared/ui/Charts'
import { BASIC_COLORS } from '@/shared/lib/utils/colores'
import { type ComputerDashboardDto } from '@/entities/devices/dashboard/domain/dto/ComputerDashboard.dto'

export const BrandChart = memo(({ data }: { data: ComputerDashboardDto['brand'] }) => {
	return (
		<BarChart
			data={data}
			style={{
				width: '100%',
				height: '400px',
				maxWidth: '800px',
				maxHeight: '80vh'
			}}
			responsive
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis
				dataKey="count"
				intercept={0}
				angle={-45}
				textAnchor="end"
				height={80}
				tickMargin={10}
				style={{
					fontSize: '0.75rem'
				}}
			/>
			<YAxis dataKey="name" type="category" />
			<Tooltip />
			<Bar dataKey="count" fill={BASIC_COLORS.duraznoBrillante} />
		</BarChart>
	)
})

BrandChart.displayName = 'BrandChart'
