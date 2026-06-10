import { EvaluationHardwareStatus } from '@/entities/devices/deviceEvaluation/domain/dto/EvaluationHardwareDashboard.dto'
import type { BadgeProps } from '@/shared/ui/Badge'
import type { IconName } from '@/shared/ui/icon/Icon'
import type { BackgroundType, ColorType } from '@/shared/ui/Typography/types'

type EvaluationHardwareConfig = Record<
	EvaluationHardwareStatus,
	{
		name: string
		className: string
		icon: IconName
		color: ColorType
		backGroundColor: BackgroundType
		badgeVariant: BadgeProps['variant']
	}
>
export const evaluationHardwareStatusConfig: EvaluationHardwareConfig = {
	[EvaluationHardwareStatus.APTO]: {
		name: 'Apto',
		className: 'ml-4 h-4 w-4 text-center text-verde-500',
		icon: 'checkCircle2',
		color: 'white',
		backGroundColor: 'verde',
		badgeVariant: 'verde'
	},
	[EvaluationHardwareStatus.NOAPTO]: {
		name: 'No Apto',
		className: 'ml-4 h-4 w-4 text-rojo-500',
		icon: 'xCircle',
		color: 'white',
		backGroundColor: 'rojo',
		badgeVariant: 'rojo'
	}
}
