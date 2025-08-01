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
import { BASIC_COLORS_MAP } from '@/shared/lib/utils/colores'

import { CustomLabelList } from '../CustomLabelList'
import { MapPin } from 'lucide-react'

/**
 * Props for the OSDistributionByRegionChart component.
 */
interface OSDistributionByRegionChartProps {
	/** The data to be displayed in the bar chart. */
	distributionData: { name: string }[]
	/** An array of unique operating system names to generate bars for. */
	uniqueOperatingSystem: string[]
	/** The height of each bar in the chart. */
	barHeight: number
}

/**
 * Interface for a single data item in the distribution data.
 * It includes a `name` property and can have dynamic keys for operating system counts.
 */
interface DistributionDataItem {
	name: string
	[key: string]: number | string | undefined // Para los SO dinámicos
}

/**
 * OSDistributionByRegionChart Component
 *
 * A memoized React component that renders a horizontal bar chart
 * showing the distribution of operating systems by region.
 * It uses Recharts library for charting and provides a custom tooltip
 * and label list for better data visualization.
 */
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
											<span className="font-medium">
												Ubicación: {dataItem.name}
											</span>
										</div>
										<div className="mt-1 text-sm">
											{Object.keys(dataItem)
												.filter(key => key !== 'name')
												.map((key, index) => (
													<p key={key} className="flex gap-2">
														{/* Use BASIC_COLORS_MAP for consistent coloring with the bars */}
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
					{/* Render a Bar for each unique operating system */}
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
