import { useMemo } from 'react'
import { Combobox } from '@/shared/ui/Input/Combobox'

interface HistoryActionComboboxProps {
	/**
	 * The currently selected value of the combobox. Can be 'all', 'UPDATE', 'CREATE', or null.
	 */
	value?: string | null
	/**
	 * The name attribute for the combobox input.
	 */
	name: string
	/**
	 * The function to handle changes in combobox selection.
	 * @param name - The name of the input field.
	 * @param value - The new selected value ('UPDATE', 'CREATE', or '').
	 */
	handleChange: (name: string, value: string | number) => void
}

/**
 * `HistoryActionCombobox` is a functional component that provides a dropdown for filtering history actions.
 * It allows users to select between 'Todos' (All), 'Modificación' (Update), and 'Creación' (Create).
 * When 'Todos' is selected, it translates to an empty string for filtering purposes.
 */
export function HistoryActionCombobox({
	value,
	name,
	handleChange
}: HistoryActionComboboxProps) {
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