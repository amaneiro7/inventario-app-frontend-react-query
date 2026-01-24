/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from '@/shared/ui/Typography'
import { History } from '@/entities/history/domain/dto/History.dto'
import { memo } from 'react'
import { cn } from '@/shared/lib/utils'
import { ASSET_FIELD_LABELS } from '@/entities/devices/devices/domain/constants/assets-labels'
import { HistoryActionTypes } from '../../domain/value-object/HistoryAction'
import { formatDisplayValue } from '@/shared/lib/utils/formatDisplayValue'

interface ChangeDisplayProps {
	className?: HTMLElement['className']
	changes: Record<string, { oldValue: Record<string, any>; newValue: Record<string, any> }>

	action: History['action']
}

/**
 * `ChangeDisplay` is a memoized functional component that displays a list of changes
 * from a history record. It iterates over the `changes` object and formats the old and new values
 * for display, using a `ASSET_FIELD_LABELS` to provide user-friendly labels for field names.
 */
export const ChangeDisplay = memo(({ changes, action, className }: ChangeDisplayProps) => {
	return Object.entries(changes).map(([key, { oldValue, newValue }]) => {
		const title = ASSET_FIELD_LABELS[key] ?? key
		const hasChanged = action !== HistoryActionTypes.CREATE
		return (
			<div
				key={key}
				className={cn('flex flex-col items-start justify-start py-1.5', className)}
			>
				<Typography variant="p" option="tiny" weight="semibold" color="azul">
					{title}:
				</Typography>

				<Typography variant="p" color="gris" option="tiny" className="ml-2">
					{hasChanged && (
						<span className="block">
							<strong>Antiguo: </strong>
							{formatDisplayValue(oldValue)}
						</span>
					)}
					<span className="block">
						{hasChanged && <strong>Nuevo: </strong>}
						{formatDisplayValue(newValue)}
					</span>
				</Typography>
			</div>
		)
	})
})
