import { memo } from 'react'
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { useGetHistoryDashboard } from '@/core/history/infra/hook/useGetGeneralDashboard'

export const InventoryChart = memo(() => {
	const { historyDashboard, isLoading } = useGetHistoryDashboard()
	if (!historyDashboard || isLoading) {
		return <div className="animate-pulse-medium min-h-[560px] w-full bg-gray-200" />
	}
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Modificaciones por mes</CardTitle>
				<CardDescription>Registro de modificaciones de equipos por mes</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="h-[300px] w-full">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							data={historyDashboard.lastThreeMonths}
							margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
						>
							<CartesianGrid strokeDasharray="3 3" opacity={0.2} />
							<XAxis dataKey="name" tick={{ fontSize: 12 }} />
							<YAxis tick={{ fontSize: 12 }} />
							<Tooltip
								contentStyle={{
									backgroundColor: 'white',
									borderRadius: '8px',
									boxShadow:
										'0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
									border: '1px solid #e2e8f0'
								}}
							/>
							<Legend />
							<Bar dataKey="Computadoras" fill="#3B82F6" radius={[4, 4, 0, 0]} />
							<Bar dataKey="Laptops" fill="#10B981" radius={[4, 4, 0, 0]} />
							<Bar dataKey="All in One" fill="#F59E0B" radius={[4, 4, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	)
})

InventoryChart.displayName = 'InventoryChart'
