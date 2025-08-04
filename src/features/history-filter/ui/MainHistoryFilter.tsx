import { lazy, memo, Suspense, use, useState } from 'react'
import { useEffectAfterMount } from '@/shared/lib/hooks/useEffectAfterMount'
import { Input } from '@/shared/ui/Input/Input'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'
import { AuthContext } from '@/app/providers/AuthContext'
import { RoleOptions } from '@/entities/role/domain/entity/RoleOptions'

const EmployeeCombobox = lazy(() =>
	import('@/entities/employee/employee/infra/ui/EmployeeComboBox').then(m => ({
		default: m.EmployeeCombobox
	}))
)
const HistoryActionCombobox = lazy(() =>
	import('@/entities/history/infra/ui/HistoryAction').then(m => ({
		default: m.HistoryActionCombobox
	}))
)
const DeviceCombobox = lazy(() =>
	import('@/entities/devices/devices/infra/ui/DeviceComboBox').then(m => ({
		default: m.DeviceCombobox
	}))
)
const UserCombobox = lazy(() =>
	import('@/entities/user/infra/ui/UserComboBox').then(m => ({ default: m.UserCombobox }))
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
	const {
		auth: { user }
	} = use(AuthContext)

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
			{(user?.roleId === RoleOptions.COORDINADOR || user?.roleId === RoleOptions.ADMIN) && (
				<Suspense fallback={<InputFallback />}>
					<UserCombobox name="userId" handleChange={handleChange} value={userId} />
				</Suspense>
			)}
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
