import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from '@/shared/ui/Charts'
import type { EvaluationHardwareDashboardResponse } from '@/entities/devices/deviceEvaluation/domain/dto/EvaluationHardwareDashboard.dto'

interface Props {
	summary?: EvaluationHardwareDashboardResponse['summary']
}

export const EvaluationHardwareComponentChart = ({ summary }: Props) => {
	const data = useMemo(() => {
		if (!summary) return []
		const { total, isRamOk, isProcessorOk, isDiskOk } = summary

		return [
			{
				name: 'Procesador',
				Apto: isProcessorOk,
				'No Apto': total - isProcessorOk
			},
			{
				name: 'Memoria RAM',
				Apto: isRamOk,
				'No Apto': total - isRamOk
			},
			{
				name: 'Disco Duro',
				Apto: isDiskOk,
				'No Apto': total - isDiskOk
			}
		]
	}, [summary])

	return (
		<div className="h-96 w-full">
			<BarChart
				data={data}
				style={{
					flex: '1 1 0%',
					width: '100%',
					maxHeight: '100%',
					minHeight: '0',
					aspectRatio: 1
				}}
				layout="vertical"
				margin={{ left: 30, right: 30, top: 20, bottom: 5 }}
				responsive
			>
				<CartesianGrid strokeDasharray="3 3" horizontal={false} />
				<XAxis type="number" hide />
				<YAxis dataKey="name" type="category" tick={{ fontSize: 12, fontWeight: 500 }} />
				<Tooltip cursor={{ fill: 'transparent' }} />
				<Legend />
				<Bar dataKey="Apto" stackId="a" fill="#09713a" radius={[0, 0, 0, 0]} barSize={40} />
				<Bar
					dataKey="No Apto"
					stackId="a"
					fill="#d52920"
					radius={[0, 4, 4, 0]}
					barSize={40}
				/>
			</BarChart>
		</div>
	)
}
