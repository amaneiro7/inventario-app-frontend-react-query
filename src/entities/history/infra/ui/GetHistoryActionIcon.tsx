import { historyActionConfig } from './historyActionConfig'
import { Icon, type IconName, type IconProps } from '@/shared/ui/icon/Icon'
import { type HistoryActionTypes } from '../../domain/value-object/HistoryAction'

export const GetHistoryActionIcon = ({
	action,
	...props
}: { action: HistoryActionTypes } & Omit<IconProps, 'name'>) => {
	const iconName: IconName = historyActionConfig[action]?.icon ?? 'helpCircle'
	return <Icon name={iconName} {...props} />
}
