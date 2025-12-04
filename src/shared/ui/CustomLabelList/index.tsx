import { type LabelListProps } from 'recharts'

interface CustomLabelListProps extends LabelListProps {
	value?: number | string
	x?: number
	y?: number
	width?: number
	height?: number
	dataKey: string
}

export const CustomLabelList: React.FC<CustomLabelListProps> = ({
	value,
	x,
	y,
	width,
	height,
	dataKey
}) => {
	const labelText = `${dataKey}: ${value}` // Usa dataKey para el nombre
	if (!value || !x || !y) return null
	return (
		<text
			x={Number(x) + Number(width) + 5}
			y={Number(y) + Number(height) / 2}
			fill="#666"
			fontSize={10}
			textAnchor="start"
			dominantBaseline="middle"
		>
			{labelText}
		</text>
	)
}
