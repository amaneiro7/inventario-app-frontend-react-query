import { lazy, memo, Suspense, useCallback, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { useEffectAfterMount } from '@/shared/lib/hooks/useEffectAfterMount'
import { Input } from '@/shared/ui/Input/Input'
import { StatusOptions } from '@/entities/status/status/domain/entity/StatusOptions'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'
const IsStillWorkingCombobox = lazy(() =>
	import('@/entities/employee/employee/infra/ui/IsStillWorkinfComboBox').then(m => ({
		default: m.IsStillWorkingCombobox
	}))
)
const DepartamentoCombobox = lazy(() =>
	import('@/entities/employee/departamento/infra/ui/DepartamentoComboBox').then(m => ({
		default: m.DepartamentoCombobox
	}))
)
const EmployeeTypeCombobox = lazy(() =>
	import('@/entities/employee/employee/infra/ui/EmployeeTypeComboBox').then(m => ({
		default: m.EmployeeTypeCombobox
	}))
)
const CargoCombobox = lazy(() =>
	import('@/entities/employee/cargo/infra/ui/CargoComboBox').then(m => ({
		default: m.CargoCombobox
	}))
)
const LocationCombobox = lazy(() =>
	import('@/entities/locations/locations/infra/ui/LocationComboBox').then(m => ({
		default: m.LocationCombobox
	}))
)

interface EmployeePrimaryFilterProps {
	userName?: string
	isStillWorking?: boolean
	departamentoId?: string
	vicepresidenciaId?: string
	locationId?: string
	cargoId?: string
	type?: string
	cityId?: string
	stateId?: string
	regionId?: string
	handleChange: (name: string, value: string | number) => void
}

export const EmployeePrimaryFilter = memo(
	({
		userName,
		departamentoId,
		vicepresidenciaId,
		cargoId,
		locationId,
		type,
		isStillWorking,
		cityId,
		stateId,
		regionId,
		handleChange
	}: EmployeePrimaryFilterProps) => {
		const [localUserName, setLocalUserName] = useState(userName ?? '')
		const [debouncedUserName] = useDebounce(localUserName)

		useEffectAfterMount(() => {
			handleChange('userName', debouncedUserName)
		}, [debouncedUserName])

		useEffectAfterMount(() => {
			if (!userName) {
				setLocalUserName('')
			}
		}, [userName])

		const handleUserName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value.trim().toLowerCase()
			setLocalUserName(value)
		}, [])

		return (
			<>
				<Input
					id="userName-search"
					value={localUserName}
					name="userName"
					label="Nombre de Usuario"
					type="search"
					onChange={handleUserName}
				/>
				<Suspense fallback={<InputFallback />}>
					<IsStillWorkingCombobox
						handleChange={handleChange}
						name="isStillWorking"
						value={
							isStillWorking === undefined || isStillWorking === null
								? 'all'
								: String(isStillWorking)
						}
					/>
				</Suspense>

				<Suspense fallback={<InputFallback />}>
					<EmployeeTypeCombobox
						name="type"
						mode="list"
						handleChange={handleChange}
						value={type}
					/>
				</Suspense>
				<Suspense fallback={<InputFallback />}>
					<DepartamentoCombobox
						name="departamentoId"
						handleChange={handleChange}
						value={departamentoId}
						vicepresidenciaId={vicepresidenciaId}
					/>
				</Suspense>
				<Suspense fallback={<InputFallback />}>
					<CargoCombobox name="cargoId" handleChange={handleChange} value={cargoId} />
				</Suspense>
				<Suspense fallback={<InputFallback />}>
					<LocationCombobox
						method="search"
						name="locationId"
						handleChange={handleChange}
						value={locationId}
						cityId={cityId}
						stateId={stateId}
						regionId={regionId}
						statusId={StatusOptions.INUSE}
					/>
				</Suspense>
			</>
		)
	}
)

EmployeePrimaryFilter.displayName = 'EmployeePrimaryFilter'
