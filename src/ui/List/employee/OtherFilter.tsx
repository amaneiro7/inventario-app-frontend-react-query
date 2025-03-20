import { memo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { Input } from '@/components/Input/Input'
import { DirectivaCombobox } from '@/components/ComboBox/Sincrono/DirectivaComboBox'
import { VicepresidenciaEjecutivaCombobox } from '@/components/ComboBox/Sincrono/VicepresidenciaEjecutivaComboBox'
import { RegionCombobox } from '@/components/ComboBox/Sincrono/RegionComboBox'
import { StateCombobox } from '@/components/ComboBox/Sincrono/StateComboBox'
import { CityCombobox } from '@/components/ComboBox/Asincrono/CityComboBox'
import { CentroTrabajoCombobox } from '@/components/ComboBox/Asincrono/CentroTrabajoComboBox'

interface EmployeeOtherilterProps {
	name?: string
	lastName?: string
	email?: string
	cedula?: string
	CentroTrabajoId?: string
	directivaId?: string
	vicepresidenciaEjecutivaId?: string
	regionId?: string
	stateId?: string
	cityId?: string
	handleChange: (name: string, value: string | number) => void
}

export const EmployeeOtherilter = memo(
	({
		handleChange,
		name,
		cedula,
		CentroTrabajoId,
		cityId,
		directivaId,
		email,
		lastName,
		regionId,
		stateId,
		vicepresidenciaEjecutivaId
	}: EmployeeOtherilterProps) => {
		const [localName, setLocalName] = useState(name ?? '')
		const [localLastName, setLocalLastName] = useState(lastName ?? '')
		const [localEmail, setLocalEmail] = useState(email ?? '')
		const [localCedula, setLocalCedula] = useState(cedula ?? '')
		const [debouncedName] = useDebounce(localName)
		const [debouncedLastName] = useDebounce(localLastName)
		const [debouncedEmail] = useDebounce(localEmail)
		const [debouncedCedula] = useDebounce(localCedula)

		useEffectAfterMount(() => {
			handleChange('name', debouncedName)
		}, [debouncedName, handleChange])

		useEffectAfterMount(() => {
			handleChange('lastName', debouncedLastName)
		}, [debouncedLastName, handleChange])

		useEffectAfterMount(() => {
			handleChange('email', debouncedEmail)
		}, [debouncedEmail, handleChange])

		useEffectAfterMount(() => {
			handleChange('cedula', debouncedCedula)
		}, [debouncedCedula, handleChange])

		return (
			<>
				<Input
					value={localName}
					name="name"
					label="Nombre"
					type="search"
					onChange={e => {
						setLocalName(e.target.value.trim().toLowerCase())
					}}
				/>
				<Input
					value={localLastName}
					name="lastName"
					label="Apellido"
					type="search"
					onChange={e => {
						setLocalLastName(e.target.value.trim().toLowerCase())
					}}
				/>
				<Input
					value={localEmail}
					name="email"
					label="Correo electronico"
					type="search"
					onChange={e => {
						setLocalEmail(e.target.value.trim().toLowerCase())
					}}
				/>
				<Input
					value={localCedula}
					name="cedula"
					label="Cedula"
					type="search"
					onChange={e => {
						setLocalCedula(e.target.value.trim().toLowerCase())
					}}
				/>
				<DirectivaCombobox
					name="directivaId"
					handleChange={handleChange}
					value={directivaId}
				/>
				<VicepresidenciaEjecutivaCombobox
					name="vicepresidenciaEjecutivaId"
					handleChange={handleChange}
					value={vicepresidenciaEjecutivaId}
				/>
				<CentroTrabajoCombobox
					name="CentroTrabajoId"
					handleChange={handleChange}
					value={CentroTrabajoId}
				/>
				<RegionCombobox name="regionId" handleChange={handleChange} value={regionId} />
				<StateCombobox
					name="stateId"
					handleChange={handleChange}
					value={stateId}
					regionId={regionId}
				/>
				<CityCombobox
					name="cityId"
					handleChange={handleChange}
					value={cityId}
					regionId={regionId}
					stateId={stateId}
				/>
			</>
		)
	}
)
