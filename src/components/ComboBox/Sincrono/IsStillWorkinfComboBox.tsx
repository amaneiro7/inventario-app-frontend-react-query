import { useMemo } from 'react'
import { Combobox } from '@/components/Input/Combobox'

export function IsStillWorkingCombobox({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: {
	value?: string
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
			{ id: 'true', name: 'Activos' },
			{ id: 'false', name: 'inactivos' }
		]
	}, [])
	return (
		<>
			<Combobox
				id="isStillWorking"
				label="Filtrar por estado"
				value={value}
				name={name}
				options={options}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				searchField={false}
				onChangeValue={handleChange}
				readOnly={readonly}
			/>
		</>
	)
}
