import { useMemo } from 'react'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { DeviceMonitoringStatuses } from '@/entities/devices/deviceMonitoring/domain/value-object/DeviceMonitoringStatus'

export function DeviceMonitoringStatusCombobox({
	value,
	name,
	error = '',
	type,
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: {
	value?: string | null
	name: string
	error?: string
	type?: 'location' | 'device'
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const options: { id: string; name: string }[] = useMemo(() => {
		const optionalStatus = {
			id: DeviceMonitoringStatuses.HOSTNAME_MISMATCH,
			name: 'Nombre de host inconsistente'
		}
		const defaultOptions = [
			{ id: 'all', name: 'Todos' },
			{ id: DeviceMonitoringStatuses.ONLINE, name: 'En línea' },
			{ id: DeviceMonitoringStatuses.OFFLINE, name: 'Fuera de línea' }
		]
		if (type === 'device') {
			return [...defaultOptions, optionalStatus]
		} else {
			return defaultOptions
		}
	}, [type])
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
