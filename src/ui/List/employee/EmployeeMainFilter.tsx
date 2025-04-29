import { lazy, memo, Suspense, useCallback, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { Input } from '@/components/Input/Input'
import { StatusOptions } from '@/core/status/status/domain/entity/StatusOptions'
import { InputFallback } from '@/components/Loading/InputFallback'
const IsStillWorkingCombobox = lazy(() =>
	import('@/components/ComboBox/Sincrono/IsStillWorkinfComboBox').then(m => ({
		default: m.IsStillWorkingCombobox
	}))
)
const DepartamentoCombobox = lazy(() =>
	import('@/components/ComboBox/Asincrono/DepartamentoComboBox').then(m => ({
		default: m.DepartamentoCombobox
	}))
)
const EmployeeTypeCombobox = lazy(() =>
	import('@/components/ComboBox/Sincrono/EmployeeTypeComboBox').then(m => ({
		default: m.EmployeeTypeCombobox
	}))
)
const CargoCombobox = lazy(() =>
	import('@/components/ComboBox/Asincrono/CargoComboBox').then(m => ({
		default: m.CargoCombobox
	}))
)
const LocationCombobox = lazy(() =>
	import('@/components/ComboBox/Asincrono/LocationComboBox').then(m => ({
		default: m.LocationCombobox
	}))
)

interface EmployeeMainFilterProps {
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

export const EmployeeMainFilter = memo(
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
	}: EmployeeMainFilterProps) => {
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
					<EmployeeTypeCombobox name="type" handleChange={handleChange} value={type} />
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
