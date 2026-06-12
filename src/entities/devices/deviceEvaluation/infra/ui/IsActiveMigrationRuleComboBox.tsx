import { useMemo } from 'react'
import { Combobox } from '@/shared/ui/Input/Combobox'

interface IsActiveMigrationRulesComboboxProps {
	value?: string | null
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	handleChange: (name: string, value: string | number) => void
}

/**
 * `IsActiveMigrationRulesCombobox` is a component that provides a dropdown for filtering employees
 * by their employment status (active, inactive, or all).
 */
export function IsActiveMigrationRulesCombobox({
	value,
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: IsActiveMigrationRulesComboboxProps) {
	const options = useMemo(() => {
		return [
			{ id: 'all', name: 'Todos' },
			{ id: 'true', name: 'Activos' },
			{ id: 'false', name: 'Inactivos' }
		]
	}, [])
	return (
		<>
			<Combobox
				id="is-active.migration-rules"
				label="Filtrar por estado"
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
