import type { EvaluationHardwareDashboardResponse } from '@/entities/devices/deviceEvaluation/domain/dto/EvaluationHardwareDashboard.dto'

export const useEvaluationHardwareChart = ({
	summary
}: {
	summary?: EvaluationHardwareDashboardResponse['summary']
}) => {
	const noApto = summary?.noApto ?? 0
	const apto = summary?.apto ?? 0
	const total = summary?.total ?? 0

	const pieChartData = [
		{ name: 'Apto', count: apto, color: '#09713a' },
		{ name: 'No Apto', count: noApto, color: '#d52920' }
	]

	return {
		noApto,
		apto,
		total,
		pieChartData
	}
}
