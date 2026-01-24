import Typography from '@/shared/ui/Typography'
import { Icon } from '@/shared/ui/icon/Icon'
import { Tag } from '@/shared/ui/Tag'
import { getHistoryActionColor } from './getHistoryActionColor'
import { getHistoryActionText } from './getHistoryActionText'
import { getHistoryActionsIcon } from './getHistoryActionsIcon'
import { HistoryActionTypes } from '../../domain/value-object/HistoryAction'

interface HistoryModalTitleProps {
	action: HistoryActionTypes
	userName?: string
	deviceIdentifier?: string
}

export const HistoryModalTitle = ({
	action,
	deviceIdentifier,
	userName
}: HistoryModalTitleProps) => {
	const actionText = getHistoryActionText(action)
	return (
		<div>
			<Typography variant="h3" className="flex items-center gap-2">
				{<Icon name="history" size={24} />}
				{actionText}: {deviceIdentifier}
			</Typography>
			<div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
				<Tag
					backgroundColor={getHistoryActionColor(action)}
					iconText={getHistoryActionText(action)}
					color="white"
					icon={getHistoryActionsIcon({ action, className: 'h-4 w-4' })}
				/>

				{userName && (
					<Typography variant="span" option="small" className="font-mono">
						Por: {userName}
					</Typography>
				)}
			</div>
		</div>
	)
}
