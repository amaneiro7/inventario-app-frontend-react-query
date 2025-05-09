import { memo } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'
import { BASIC_COLORS } from '@/utils/colores'

export const BrandChart = memo(({ data }: { data: ComputerDashboardDto['brand'] }) => {
	return (
		<ResponsiveContainer width="100%" height={400}>
			<BarChart data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="count" />
				<YAxis dataKey="name" type="category" />
				<Tooltip />
				<Bar dataKey="count" fill={BASIC_COLORS.duraznoBrillante} />
			</BarChart>
		</ResponsiveContainer>
	)
})

BrandChart.displayName = 'BrandChart'
