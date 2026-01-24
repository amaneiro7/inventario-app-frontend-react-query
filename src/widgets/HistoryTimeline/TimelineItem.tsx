import { memo } from 'react'
import { cn } from '@/shared/lib/utils'
import { ASSET_FIELD_LABELS } from '@/entities/devices/devices/domain/constants/assets-labels'
import { HistoryActionTypes } from '@/entities/history/domain/value-object/HistoryAction'
import { getHistoryActionsIcon } from '@/entities/history/infra/ui/getHistoryActionsIcon'
import { getHistoryActionClassName } from '@/entities/history/infra/ui/getHistoryActionClassName'
import { GetDeviceIcon } from '@/entities/category/infra/ui/GetDeviceIcon'
import { getHistoryActionText } from '@/entities/history/infra/ui/getHistoryActionText'
import Typography from '@/shared/ui/Typography'
import { Card, CardContent } from '@/shared/ui/Card'
import { Badge } from '@/shared/ui/Badge'
import { Icon } from '@/shared/ui/icon/Icon'
import { formatDisplayValue } from '@/shared/lib/utils/formatDisplayValue'
import { formatDateMedium } from '@/shared/lib/utils/formatDate'
import { getHistoryActionVariant } from '@/entities/history/infra/ui/getHistoryActionVariant'
import { getHistoryActionTitle } from '@/entities/history/infra/ui/getHistoryActionTitle'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DeviceAssignmentEvent {
	type: HistoryActionTypes
	deviceId: string
	deviceInfo: string
	categoryName: string
	date: string
	timestamp: Date
	changeBy?: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	details?: Record<string, { oldValue: any; newValue: any }>
}

interface TimelineItemProps {
	event: DeviceAssignmentEvent
}

export const TimelineItem = memo(({ event }: TimelineItemProps) => {
	const { type, categoryName, deviceInfo, details, timestamp, changeBy } = event

	return (
		<Card className="relative">
			{/* Timeline dot */}
			<CardContent
				className={cn(
					'absolute -left-8 flex h-7 w-7 items-center justify-center rounded-full p-0',
					getHistoryActionClassName(type)
				)}
			>
				{getHistoryActionsIcon({ action: type, className: 'h-5 w-5' })}
			</CardContent>
			{/* Content */}
			<CardContent className="bg-card rounded-lg border p-4 shadow-sm">
				<div className="flex items-start justify-between gap-4">
					<div className="space-y-2">
						<div className="flex items-center gap-2">
							<Typography variant="p" weight="medium">
								{getHistoryActionTitle(type)}
							</Typography>
							<Badge variant={getHistoryActionVariant(type)} className="text-xs">
								{getHistoryActionText(type)}
							</Badge>
						</div>
						<div className="flex items-center gap-2 text-sm">
							{GetDeviceIcon({
								categoryName: categoryName,
								className: 'h-4 w-4'
							})}
							<Typography>
								{deviceInfo}
								{<span className="text-gray-600"> - {categoryName}</span>}
							</Typography>
						</div>

						{/* Details of changes */}
						{details && (
							<div className="mt-3 space-y-1 border-t pt-3 text-xs">
								{Object.entries(details).map(([key, change]) => (
									<div key={key} className="text-muted-foreground">
										<Typography
											variant="span"
											weight="medium"
											color="gray-600"
											option="tiny"
										>
											{ASSET_FIELD_LABELS[key] ?? key}:
										</Typography>{' '}
										{type !== HistoryActionTypes.CREATE && (
											<>{formatDisplayValue(change.oldValue)} → </>
										)}
										<Typography
											variant="span"
											weight="medium"
											color="foreground"
											option="tiny"
										>
											{formatDisplayValue(change.newValue)}
										</Typography>
									</div>
								))}
							</div>
						)}
					</div>
					<div className="flex flex-col items-end gap-1 text-right">
						<div className="flex items-center gap-1">
							<Icon name="clock" className="h-4 w-4 text-gray-600" />
							<Typography variant="span" color="gray-600">
								{formatDateMedium(timestamp)}
							</Typography>
						</div>
						<Typography variant="span" color="gray-600">
							por {changeBy}
						</Typography>
					</div>
				</div>
			</CardContent>
		</Card>
	)
})

TimelineItem.displayName = 'TimelineItem'
