import { lazy, memo, Suspense, useState } from 'react'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { Input } from '@/components/Input/Input'
import { InputFallback } from '@/components/Loading/InputFallback'

const EmployeeCombobox = lazy(() =>
	import('@/components/ComboBox/Asincrono/EmployeeComboBox').then(m => ({
		default: m.EmployeeCombobox
	}))
)
const HistoryActionCombobox = lazy(() =>
	import('@/components/ComboBox/Sincrono/HistoryAction').then(m => ({
		default: m.HistoryActionCombobox
	}))
)
const DeviceCombobox = lazy(() =>
	import('@/components/ComboBox/Asincrono/DeviceComboBox').then(m => ({
		default: m.DeviceCombobox
	}))
)
const UserCombobox = lazy(() =>
	import('@/components/ComboBox/Sincrono/UserComboBox').then(m => ({ default: m.UserCombobox }))
)

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
			<Suspense fallback={<InputFallback />}>
				<UserCombobox name="userId" handleChange={handleChange} value={userId} />
			</Suspense>
			<Suspense fallback={<InputFallback />}>
				<EmployeeCombobox
					name="employeeId"
					handleChange={handleChange}
					value={employeeId}
				/>
			</Suspense>
			<Suspense fallback={<InputFallback />}>
				<HistoryActionCombobox name="action" handleChange={handleChange} value={action} />
			</Suspense>
			<Suspense fallback={<InputFallback />}>
				<DeviceCombobox name="deviceId" handleChange={handleChange} value={deviceId} />
			</Suspense>
			<Input
				id="startDate"
				label="Fecha de inicio"
				name="startDate"
				value={localStartDate}
				transform
				type="date"
				onChange={e => setLocalStartDate(e.target.value)}
			/>
			<Input
				id="endDate"
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
