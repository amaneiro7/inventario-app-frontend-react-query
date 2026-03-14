import Typography from '@/shared/ui/Typography'
import { EmployeeHistoryTimelineOutput } from './EmployeeHistoryTimelineOutput'
import { type EmployeeDto } from '../../../entities/employee/employee/domain/dto/Employee.dto'

interface EmployeeHistoryProps {
	history?: EmployeeDto['history']
	currentDevices?: EmployeeDto['devices']
}

export const EmployeeHistoryTimeline = ({
	history = [],
	currentDevices = []
}: EmployeeHistoryProps) => {
	if (history === null || (history && history.length === 0)) {
		return (
			<div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
				<Typography variant="p" className="text-gray-500">
					No hay historial de asiganciones para este usuario.
				</Typography>
			</div>
		)
	}

	return <EmployeeHistoryTimelineOutput history={history} currentDevices={currentDevices} />
}
