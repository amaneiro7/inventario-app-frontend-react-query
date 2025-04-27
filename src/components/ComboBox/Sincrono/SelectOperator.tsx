import { useId } from 'react'
import { Combobox } from '@/components/Input/Combobox'
import { operatorArray } from '@/core/shared/domain/criteria/FilterOperators'

/**
 * Renders a combobox for selecting filter operators (e.g., equals, greater than, less than).
 *
 * @param {Object} props - The properties object.
 * @param {Operator | null} [props.value] - The currently selected operator value.
 * @param {string} props.name - The name attribute for the combobox input.
 * @param {Function} props.onChange - A callback function that receives the name and the selected operator value.
 */

export function SelectOperatorCombobox({
	value,
	name,
	handleChange
}: {
	value?: string | null
	name: string
	handleChange: (name: string, value: string | number) => void
}) {
	const comboboxId = useId()
	const labelId = useId()
	return (
		<>
			<Combobox
				id={comboboxId}
				aria-labelledby={labelId}
				label="Operador"
				value={value ?? ''}
				name={name}
				options={operatorArray}
				searchField={false}
				onChangeValue={(name, value) => {
					handleChange(name, value)
				}}
			/>
		</>
	)
}
