import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { type ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'
export function BrandChart({ data }: { data: ComputerDashboardDto['brand'] }) {
	return (
		<ResponsiveContainer width="100%" height={400}>
			<BarChart data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="count" />
				<YAxis dataKey="name" type="category" />
				<Tooltip />
				<Bar dataKey="count" fill="#8884d8" />
			</BarChart>
		</ResponsiveContainer>
	)
}
