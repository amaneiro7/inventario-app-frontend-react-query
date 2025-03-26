import { memo } from 'react'
import { EmployeeCombobox } from '@/components/ComboBox/Asincrono/EmployeeComboBox'
import { HistoryActionCombobox } from '@/components/ComboBox/Sincrono/HistoryAction'

export const MainHistoryFilter = memo(function ({
	handleChange,
	employeeId,
	userId,
	action,
	deviceId
}: {
	employeeId?: string
	userId?: string
	action?: string
	deviceId?: string
	handleChange: (name: string, value: string | number) => void
}) {
	return (
		<>
			<EmployeeCombobox name="employeeId" handleChange={handleChange} value={employeeId} />
			<HistoryActionCombobox name="action" handleChange={handleChange} value={action} />
		</>
	)
})
