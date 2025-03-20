import { memo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { Input } from '@/components/Input/Input'
import { DepartamentoCombobox } from '@/components/ComboBox/Asincrono/DepartamentoComboBox'
import { EmployeeTypeCombobox } from '@/components/ComboBox/Sincrono/EmployeeTypeComboBox'
import { CargoCombobox } from '@/components/ComboBox/Asincrono/CargoComboBox'
import { LocationCombobox } from '@/components/ComboBox/Asincrono/LocationComboBox'

interface EmployeeMainFilterProps {
	userName?: string
	departamentoId?: string
	locationId?: string
	cargoId?: string
	type?: string
	handleChange: (name: string, value: string | number) => void
}

export const EmployeeMainFilter = memo(
	({
		userName,
		departamentoId,
		cargoId,
		locationId,
		type,
		handleChange
	}: EmployeeMainFilterProps) => {
		const [localUserName, setLocalUserName] = useState(userName ?? '')
		const [debouncedUserName] = useDebounce(localUserName)

		useEffectAfterMount(() => {
			handleChange('userName', debouncedUserName)
		}, [debouncedUserName])

		return (
			<>
				<Input
					value={localUserName}
					name="userName"
					label="Nombre de Usuario"
					type="search"
					onChange={e => {
						setLocalUserName(e.target.value.trim().toLowerCase())
					}}
				/>
				<EmployeeTypeCombobox name="type" handleChange={handleChange} value={type} />
				<DepartamentoCombobox
					name="departamentoId"
					handleChange={handleChange}
					value={departamentoId}
				/>
				<CargoCombobox name="cargoId" handleChange={handleChange} value={cargoId} />
				<LocationCombobox
					method="search"
					name="locationId"
					handleChange={handleChange}
					value={locationId}
				/>
			</>
		)
	}
)
