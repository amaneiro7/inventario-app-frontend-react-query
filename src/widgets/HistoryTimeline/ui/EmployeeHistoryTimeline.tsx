import Typography from '@/shared/ui/Typography'
import { EmployeeHistoryTimelineOutput } from './EmployeeHistoryTimelineOutput'
import type { EmployeeDto } from '../../../entities/employee/employee/domain/dto/Employee.dto'

interface EmployeeHistoryProps {
	history?: EmployeeDto['history']
	currentDevices?: EmployeeDto['devices']
}

const HISTORY_DEFAULT_ITEMS: EmployeeDto['history'] = []
const CURRENT_DEVICES_DEFAULT_ITEMS: EmployeeDto['devices'] = []

export function EmployeeHistoryTimeline({
	history = HISTORY_DEFAULT_ITEMS,
	currentDevices = CURRENT_DEVICES_DEFAULT_ITEMS
}: EmployeeHistoryProps) {
	if (!history || history.length === 0) {
		return (
			<div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
				<Typography variant="p" className="text-gray-500">
					No hay historial de asignaciones para este usuario.
				</Typography>
			</div>
		)
	}

	return <EmployeeHistoryTimelineOutput history={history} currentDevices={currentDevices} />
}
