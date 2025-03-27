import { memo } from 'react'
import { EmployeeCombobox } from '@/components/ComboBox/Asincrono/EmployeeComboBox'
import { HistoryActionCombobox } from '@/components/ComboBox/Sincrono/HistoryAction'
import { DeviceCombobox } from '@/components/ComboBox/Asincrono/DeviceComboBox'
import { UserCombobox } from '@/components/ComboBox/Sincrono/UserComboBox'

export const MainHistoryFilter = memo(function ({
	handleChange,
	employeeId,
	userId,
	action,
	deviceId,
	startDate,
	endDate
}: {
	employeeId?: string
	userId?: string
	action?: string
	deviceId?: string
	startDate?: string
	endDate?: string
	handleChange: (name: string, value: string | number) => void
}) {
	return (
		<>
			<UserCombobox name="userId" handleChange={handleChange} value={userId} />
			<EmployeeCombobox name="employeeId" handleChange={handleChange} value={employeeId} />
			<HistoryActionCombobox name="action" handleChange={handleChange} value={action} />
			<DeviceCombobox name="deviceId" handleChange={handleChange} value={deviceId} />
			<label htmlFor="startDAte">Fecha de inicio:</label>
			<input
				type="date"
				id="startDate"
				name="startDate"
				value={startDate}
				onChange={e => handleChange('startDate', e.target.value)}
			/>
			<label htmlFor="startDAte">Fecha de fin:</label>
			<input
				type="date"
				id="endDate"
				name="endDate"
				value={endDate}
				onChange={e => handleChange('endDate', e.target.value)}
			/>
		</>
	)
})
