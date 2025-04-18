import { memo, useCallback, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { Input } from '@/components/Input/Input'
import { DepartamentoCombobox } from '@/components/ComboBox/Asincrono/DepartamentoComboBox'
import { EmployeeTypeCombobox } from '@/components/ComboBox/Sincrono/EmployeeTypeComboBox'
import { CargoCombobox } from '@/components/ComboBox/Asincrono/CargoComboBox'
import { LocationCombobox } from '@/components/ComboBox/Asincrono/LocationComboBox'
import { IsStillWorkingCombobox } from '@/components/ComboBox/Sincrono/IsStillWorkinfComboBox'
import { StatusOptions } from '@/core/status/domain/entity/StatusOptions'

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
					value={localUserName}
					name="userName"
					label="Nombre de Usuario"
					type="search"
					onChange={handleUserName}
				/>
				<IsStillWorkingCombobox
					handleChange={handleChange}
					name="isStillWorking"
					value={
						isStillWorking === undefined || isStillWorking === null
							? 'all'
							: String(isStillWorking)
					}
				/>

				<EmployeeTypeCombobox name="type" handleChange={handleChange} value={type} />
				<DepartamentoCombobox
					name="departamentoId"
					handleChange={handleChange}
					value={departamentoId}
					vicepresidenciaId={vicepresidenciaId}
				/>
				<CargoCombobox name="cargoId" handleChange={handleChange} value={cargoId} />
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
			</>
		)
	}
)
