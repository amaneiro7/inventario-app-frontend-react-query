import { lazy, memo, Suspense, useCallback, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { useEffectAfterMount } from '@/shared/lib/hooks/useEffectAfterMount'
import { Input } from '@/shared/ui/Input/Input'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'

const RegionCombobox = lazy(() =>
	import('@/entities/locations/region/infra/ui/RegionComboBox').then(m => ({
		default: m.RegionCombobox
	}))
)
const StateCombobox = lazy(() =>
	import('@/entities/locations/state/infra/ui/StateComboBox').then(m => ({
		default: m.StateCombobox
	}))
)
const CityCombobox = lazy(() =>
	import('@/entities/locations/city/infra/ui/CityComboBox').then(m => ({
		default: m.CityCombobox
	}))
)

interface EmployeeOtherFilterProps {
	name?: string
	lastName?: string
	email?: string
	cedula?: string
	employeeCode?: string
	regionId?: string
	stateId?: string
	cityId?: string
	handleChange: (name: string, value: string | number) => void
}

export const EmployeeOtherFilter = memo(
	({
		handleChange,
		name,
		employeeCode,
		cedula,
		cityId,
		email,
		lastName,
		regionId,
		stateId
	}: EmployeeOtherFilterProps) => {
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
					id="employeeCode-search"
					value={localEmployeeCode}
					name="employeeCode"
					label="Código de empleado"
					type="number"
					inputMode="numeric"
					onChange={handleEmployeeCode}
				/>
				<Input
					id="name-search"
					value={localName}
					name="name"
					label="Nombre"
					type="search"
					onChange={handleName}
				/>
				<Input
					id="lastName-search"
					value={localLastName}
					name="lastName"
					label="Apellido"
					type="search"
					onChange={handleLastName}
				/>
				<Input
					id="email-search"
					value={localEmail}
					name="email"
					label="Correo electronico"
					type="search"
					onChange={handleEmail}
				/>
				<Input
					id="cedula-search"
					value={localCedula}
					name="cedula"
					label="Cedula"
					type="search"
					onChange={handleCedula}
				/>
				<Suspense fallback={<InputFallback />}>
					<RegionCombobox name="regionId" handleChange={handleChange} value={regionId} />
				</Suspense>
				<Suspense fallback={<InputFallback />}>
					<StateCombobox
						name="stateId"
						handleChange={handleChange}
						value={stateId}
						regionId={regionId}
					/>
				</Suspense>
				<Suspense fallback={<InputFallback />}>
					<CityCombobox
						name="cityId"
						handleChange={handleChange}
						value={cityId}
						regionId={regionId}
						stateId={stateId}
					/>
				</Suspense>
			</>
		)
	}
)
