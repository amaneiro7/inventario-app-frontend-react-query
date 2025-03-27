import { memo, useState } from 'react'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { EmployeeCombobox } from '@/components/ComboBox/Asincrono/EmployeeComboBox'
import { HistoryActionCombobox } from '@/components/ComboBox/Sincrono/HistoryAction'
import { DeviceCombobox } from '@/components/ComboBox/Asincrono/DeviceComboBox'
import { UserCombobox } from '@/components/ComboBox/Sincrono/UserComboBox'
import { Input } from '@/components/Input/Input'

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
	const [localStartDate, setLocalStartDate] = useState(startDate ?? '')
	const [localEndDate, setLocalEndDate] = useState(endDate ?? '')

	useEffectAfterMount(() => {
		if ((localEndDate && localStartDate) || (!localStartDate && !localEndDate)) {
			handleChange('startDate', localStartDate)
			handleChange('endDate', localEndDate)
		}
	}, [localStartDate, localEndDate])

	useEffectAfterMount(() => {
		if (!startDate) {
			setLocalStartDate('')
		}
	}, [startDate])

	useEffectAfterMount(() => {
		if (!endDate) {
			setLocalEndDate('')
		}
	}, [endDate])
	return (
		<>
			<UserCombobox name="userId" handleChange={handleChange} value={userId} />
			<EmployeeCombobox name="employeeId" handleChange={handleChange} value={employeeId} />
			<HistoryActionCombobox name="action" handleChange={handleChange} value={action} />
			<DeviceCombobox name="deviceId" handleChange={handleChange} value={deviceId} />
			<Input
				label="Fecha de inicio"
				name="startDate"
				value={localStartDate}
				transform
				type="date"
				onChange={e => setLocalStartDate(e.target.value)}
			/>
			<Input
				label="Fecha de fin"
				name="endDate"
				value={localEndDate}
				transform
				type="date"
				onChange={e => setLocalEndDate(e.target.value)}
			/>
		</>
	)
})
