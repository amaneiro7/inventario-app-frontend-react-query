import Typography from '@/shared/ui/Typography'
import { Icon } from '@/shared/ui/icon/Icon'
import { Tag } from '@/shared/ui/Tag'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type EmployeeIsStillWorking } from '../../domain/value-object/EmployeeIsStillWorking'
import { type EmployeeUserName } from '../../domain/value-object/EmployeeUsername'
import { BackgroundType } from '@/shared/ui/Typography/types'
import { EmployeeTypes } from '../../domain/value-object/EmployeeType'

interface EmployeeModalTitleProps {
	type: EmployeeTypes
	userName: Primitives<EmployeeUserName>
	isStillWorking: Primitives<EmployeeIsStillWorking>
}

const employeeTypeConfig: Record<EmployeeTypes, { name: string }> = {
	[EmployeeTypes.GENERIC]: {
		name: 'Usuario Genérico'
	},
	[EmployeeTypes.REGULAR]: {
		name: 'Empleado Regular'
	},
	[EmployeeTypes.SERVICE]: {
		name: 'Usuario de Sistema'
	}
}

export const EmployeeModalTitle = ({ type, isStillWorking, userName }: EmployeeModalTitleProps) => {
	const statusColor: BackgroundType = isStillWorking ? 'verde' : 'gris'
	const statusText = isStillWorking ? 'Activo' : 'Inactivo'
	const typeText = employeeTypeConfig[type]?.name ?? 'N/A'
	return (
		<div>
			<Typography variant="h3" className="flex items-center gap-2">
				{<Icon name="user" size={24} />}
				{userName}
			</Typography>
			<div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
				<Tag backgroundColor={statusColor} iconText={statusText} color="white" />

				<Typography variant="span" option="small" className="font-mono">
					Tipo: {typeText}
				</Typography>
			</div>
		</div>
	)
}
