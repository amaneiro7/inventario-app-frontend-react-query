import { evaluationHardwareStatusConfig } from '../model/evaluationHardwareConfig'
import Typography from '@/shared/ui/Typography'
import { Icon } from '@/shared/ui/icon/Icon'
import { Tag } from '@/shared/ui/Tag'
import type { EvaluationHardwareStatus } from '@/entities/devices/deviceEvaluation/domain/dto/EvaluationHardwareDashboard.dto'

interface EvaluationHardwareModalTitleProps {
	computerName: string
	status: EvaluationHardwareStatus
}

export const EvaluationHardwareModalTitle = ({
	computerName,
	status
}: EvaluationHardwareModalTitleProps) => {
	const { color, backGroundColor, name, icon } = evaluationHardwareStatusConfig[status]
	return (
		<div>
			<Typography variant="h3" className="flex items-center gap-2">
				<Icon name="computer" size={24} />
				{computerName}
			</Typography>
			<div className="mt-2">
				<Tag
					backgroundColor={backGroundColor}
					color={color}
					option="tiny"
					iconText={name}
					icon={<Icon name={icon} className="h-4 w-4" />}
				/>
			</div>
		</div>
	)
}
