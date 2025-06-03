import { useMemo } from 'react'
import { Combobox } from '@/components/Input/Combobox'

export function DeviceMonitoringStatusCombobox({
	value,
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: {
	value?: string | null
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const options = useMemo(() => {
		return [
			{ id: 'all', name: 'Todos' },
			{ id: 'online', name: 'En línea' },
			{ id: 'offline', name: 'Fuera de línea' }
		]
	}, [])
	return (
		<>
			<Combobox
				id="deviceMonitoringStatus"
				label="Filtrar por estatus"
				value={value ?? 'all'}
				name={name}
				options={options}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				searchField={false}
				onChangeValue={(name, value) => {
					const newValue = value === 'all' ? '' : value
					handleChange(name, newValue)
				}}
				readOnly={readonly}
			/>
		</>
	)
}
