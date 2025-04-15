import { memo, useCallback, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { Input } from '@/components/Input/Input'
import { DirectivaCombobox } from '@/components/ComboBox/Sincrono/DirectivaComboBox'
import { VicepresidenciaEjecutivaCombobox } from '@/components/ComboBox/Sincrono/VicepresidenciaEjecutivaComboBox'
import { RegionCombobox } from '@/components/ComboBox/Sincrono/RegionComboBox'
import { StateCombobox } from '@/components/ComboBox/Sincrono/StateComboBox'
import { CityCombobox } from '@/components/ComboBox/Asincrono/CityComboBox'
import { VicepresidenciaCombobox } from '@/components/ComboBox/Sincrono/VicepresidenciaComboBox'

interface EmployeeOtherilterProps {
	name?: string
	lastName?: string
	email?: string
	cedula?: string
	employeeCode?: string
	directivaId?: string
	vicepresidenciaEjecutivaId?: string
	vicepresidenciaId?: string
	regionId?: string
	stateId?: string
	cityId?: string
	handleChange: (name: string, value: string | number) => void
}

export const EmployeeOtherilter = memo(
	({
		handleChange,
		name,
		employeeCode,
		cedula,
		cityId,
		directivaId,
		email,
		lastName,
		regionId,
		stateId,
		vicepresidenciaEjecutivaId,
		vicepresidenciaId
	}: EmployeeOtherilterProps) => {
		const [localName, setLocalName] = useState(name ?? '')
		const [localLastName, setLocalLastName] = useState(lastName ?? '')
		const [localEmail, setLocalEmail] = useState(email ?? '')
		const [localCedula, setLocalCedula] = useState(cedula ?? '')
		const [localEmployeeCode, setLocalEmployeeCode] = useState(employeeCode ?? '')
		const [debouncedName] = useDebounce(localName)
		const [debouncedLastName] = useDebounce(localLastName)
		const [debouncedEmail] = useDebounce(localEmail)
		const [debouncedCedula] = useDebounce(localCedula)
		const [debouncedEmployeeCode] = useDebounce(localEmployeeCode)

		useEffectAfterMount(() => {
			handleChange('name', debouncedName)
		}, [debouncedName])

		useEffectAfterMount(() => {
			handleChange('lastName', debouncedLastName)
		}, [debouncedLastName])

		useEffectAfterMount(() => {
			handleChange('email', debouncedEmail)
		}, [debouncedEmail])

		useEffectAfterMount(() => {
			handleChange('cedula', debouncedCedula)
		}, [debouncedCedula])
		useEffectAfterMount(() => {
			handleChange('employeeCode', debouncedEmployeeCode)
		}, [debouncedEmployeeCode])

		useEffectAfterMount(() => {
			if (!name) {
				setLocalName('')
			}
		}, [name])
		useEffectAfterMount(() => {
			if (!lastName) {
				setLocalLastName('')
			}
		}, [lastName])
		useEffectAfterMount(() => {
			if (!email) {
				setLocalEmail('')
			}
		}, [email])
		useEffectAfterMount(() => {
			if (!cedula) {
				setLocalCedula('')
			}
		}, [cedula])
		useEffectAfterMount(() => {
			if (!employeeCode) {
				setLocalEmployeeCode('')
			}
		}, [employeeCode])

		const handleName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value.trim().toLowerCase()
			setLocalName(value)
		}, [])
		const handleLastName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value.trim().toLowerCase()
			setLocalLastName(value)
		}, [])
		const handleEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value.trim().toLowerCase()
			setLocalEmail(value)
		}, [])
		const handleCedula = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value
			setLocalCedula(value)
		}, [])
		const handleEmployeeCode = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value
			setLocalEmployeeCode(value)
		}, [])

		return (
			<>
				<Input
					value={localEmployeeCode}
					name="employeeCode"
					label="Código de empleado"
					type="number"
					inputMode="numeric"
					onChange={handleEmployeeCode}
				/>
				<Input
					value={localName}
					name="name"
					label="Nombre"
					type="search"
					onChange={handleName}
				/>
				<Input
					value={localLastName}
					name="lastName"
					label="Apellido"
					type="search"
					onChange={handleLastName}
				/>
				<Input
					value={localEmail}
					name="email"
					label="Correo electronico"
					type="search"
					onChange={handleEmail}
				/>
				<Input
					value={localCedula}
					name="cedula"
					label="Cedula"
					type="search"
					onChange={handleCedula}
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
					directivaId={directivaId}
				/>
				<VicepresidenciaCombobox
					name="vicepresidenciaId"
					handleChange={handleChange}
					value={vicepresidenciaId}
					vicepresidenciaEjecutivaId={vicepresidenciaEjecutivaId}
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
