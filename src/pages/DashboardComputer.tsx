import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts'

const data01 = [
	{ name: 'En Uso', value: 400 },
	{ name: 'Group B', value: 300 },
	{ name: 'Group C', value: 300 },
	{ name: 'Group D', value: 200 },
	{ name: 'Group E', value: 278 },
	{ name: 'Group F', value: 189 }
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
export default function DashboardComputer() {
	return (
		<PieChart width={1000} height={400}>
			<Pie
				dataKey="value"
				data={data01}
				cx={500}
				cy={200}
				isAnimationActive
				innerRadius={40}
				outerRadius={80}
				fill="#82ca9d"
				label
			>
				{data01.map((_entry, index) => (
					<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
				))}
			</Pie>
			<Legend verticalAlign="bottom" align="left" />
			<Tooltip />
		</PieChart>
	)
}
