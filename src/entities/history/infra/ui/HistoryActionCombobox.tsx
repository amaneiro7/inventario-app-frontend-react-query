import { useMemo } from 'react'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { getHistoryActionOptions } from './getHistoryActionOptions'

interface HistoryActionComboboxProps {
	value?: string | null
	name: string
	handleChange: (name: string, value: string | number) => void
}

/**
 * `HistoryActionCombobox` is a functional component that provides a dropdown for filtering history actions.
 * It allows users to select between 'Todos' (All), 'Modificación' (Update), and 'Creación' (Create).
 * When 'Todos' is selected, it translates to an empty string for filtering purposes.
 */
export function HistoryActionCombobox({ value, name, handleChange }: HistoryActionComboboxProps) {
	const options = useMemo(() => {
		const options = getHistoryActionOptions()
		options.push({ id: 'all', name: 'Todos' })
		options.sort((a, b) => a.name.localeCompare(b.name))
		return options
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
