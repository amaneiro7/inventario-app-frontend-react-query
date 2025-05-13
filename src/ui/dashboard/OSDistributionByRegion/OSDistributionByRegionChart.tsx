import { memo } from 'react'
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	LabelList
} from 'recharts'
import { BASIC_COLORS_MAP } from '@/utils/colores'

import { CustomLabelList } from '../CustomLabelList'
import { MapPin } from 'lucide-react'

interface OSDistributionByRegionChartProps {
	distributionData: { name: string }[]
	uniqueOperatingSystem: string[]
	barHeight: number
}

interface DistributionDataItem {
	name: string
	[key: string]: number | string | undefined // Para los SO dinámicos
}
export const OSDistributionByRegionChart = memo(
	({ distributionData, uniqueOperatingSystem, barHeight }: OSDistributionByRegionChartProps) => {
		return (
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					layout="vertical"
					data={distributionData}
					margin={{ top: 5, right: 100, left: 0, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis type="number" />
					<YAxis
						dataKey="name"
						type="category"
						axisLine={false}
						width={200}
						scale="auto"
						tick={{ fontSize: '0.65rem' }}
					/>
					<Tooltip
						content={({ active, payload }) => {
							if (active && payload && payload.length) {
								const dataItem = payload[0].payload as DistributionDataItem
								return (
									<div className="bg-background rounded-lg border p-2 text-wrap shadow-md">
										<div className="flex items-center gap-2">
											<MapPin className="h-4 w-4" />
											<span className="font-medium">{dataItem.name}</span>
										</div>
										<div className="mt-1 text-sm">
											{Object.keys(dataItem)
												.filter(key => key !== 'name')
												.map((key, index) => (
													<p key={key} className="flex gap-2">
														<span
															className="font-semibold"
															style={{
																color: BASIC_COLORS_MAP[
																	index % BASIC_COLORS_MAP.length
																]
															}}
														>
															{dataItem[key]}
														</span>
														<span className="text-muted-foreground">
															{key}
														</span>
													</p>
												))}
										</div>
									</div>
								)
							}
							return null
						}}
					/>
					<Legend />
					{uniqueOperatingSystem.length > 0 &&
						uniqueOperatingSystem.map((item, index) => (
							<Bar
								key={item}
								dataKey={item}
								name={item}
								fill={BASIC_COLORS_MAP[index % BASIC_COLORS_MAP.length]}
								barSize={barHeight}
							>
								<LabelList
									dataKey={item}
									position="right"
									style={{ fontSize: '0.65rem' }}
									content={<CustomLabelList dataKey={item} />}
								/>
							</Bar>
						))}
				</BarChart>
			</ResponsiveContainer>
		)
	}
)
OSDistributionByRegionChart.displayName = 'OSDistributionByRegionChart'
