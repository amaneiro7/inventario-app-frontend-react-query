import { Cell, Legend, Pie, PieChart, PieProps, Tooltip } from 'recharts'
import { twMerge } from 'tailwind-merge'
import cn from 'classnames'
import Typography from '@/components/Typography'

interface PieCardProps {
	data: PieProps['data']
	dataKey?: PieProps['dataKey']
	title: string
	total: number
	className?: string
	backgroundColor?: keyof typeof BackgroundColor
}

const COLORS = [
	'#4CAF50', // Verde
	'#2196F3', // Azul
	'#FFC107', // Amarillo
	'#F44336', // Rojo
	'#9C27B0', // Morado
	'#795548', // Marrón
	'#00BCD4', // Cian
	'#FF9800' // Naranja
]

const BackgroundColor = {
	orange: 'naranja',
	blue: 'azul',
	green: 'verder',
	red: 'rojo'
} as const

export const PieCard = ({
	data,
	title,
	total,
	className,
	dataKey = 'value',
	backgroundColor = 'blue'
}: PieCardProps) => {
	const classes = twMerge(
		'w-full rounded-t-lg px-4 py-2',
		cn({
			[`bg-${BackgroundColor[backgroundColor]}`]: backgroundColor
		}),
		className
	)
	return (
		<div className="w-min h-full rounded-lg shadow-lg shadow-slate-400 bg-white">
			<Typography color="white" className={classes}>
				{title}
			</Typography>
			<PieChart width={370} height={200}>
				<Pie
					dataKey={dataKey}
					data={data}
					isAnimationActive={true} // isAnimationActive
					innerRadius={0}
					outerRadius={50}
					label
					cx={90}
				>
					{data?.map((_entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Legend
					wrapperStyle={{
						fontSize: '11px',
						fontWeight: 'bold'
					}}
					layout="vertical"
					verticalAlign="middle"
					align="right"
					formatter={(_value, entry) => {
						const percentahe = ((entry.payload?.value / total) * 100).toFixed(2)
						return `${entry.value} (${percentahe}%)`
					}}
				/>
				<Tooltip
					contentStyle={{
						background: '#f0f0f0',
						padding: '5px',
						borderRadius: '3px'
					}}
					formatter={(value, name) => [`${value} equipos`, name]}
				/>
			</PieChart>
		</div>
	)
}
