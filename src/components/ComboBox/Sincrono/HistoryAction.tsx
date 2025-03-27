import { useMemo } from 'react'
import { Combobox } from '@/components/Input/Combobox'

/**
 * Renders a combobox for filtering history actions.
 *
 * @param {Object} props - The properties object.
 * @param {string|null} [props.value] - The current selected value of the combobox, default is 'all'.
 * @param {string} props.name - The name attribute for the combobox input.
 * @param {Function} props.handleChange - The function to handle changes in combobox selection.
 *
 * This component provides options to filter by different history actions such as 'Todos', 'Modificación', and 'Creación'.
 * When the selected action is 'all', it triggers the `handleChange` with an empty string.
 */

export function HistoryActionCombobox({
	value,
	name,
	handleChange
}: {
	value?: string | null
	name: string

	handleChange: (name: string, value: string | number) => void
}) {
	const options = useMemo(() => {
		return [
			{ id: 'all', name: 'Todos' },
			{ id: 'UPDATE', name: 'Modificación' },
			{ id: 'CREATE', name: 'Creación' }
		]
	}, [])
	return (
		<>
			<Combobox
				id="historyAction"
				label="Filtrar por tipo operación"
				value={value ?? 'all'}
				name={name}
				options={options}
				searchField={false}
				onChangeValue={(name, value) => {
					const newValue = value === 'all' ? '' : value
					handleChange(name, newValue)
				}}
			/>
		</>
	)
}
