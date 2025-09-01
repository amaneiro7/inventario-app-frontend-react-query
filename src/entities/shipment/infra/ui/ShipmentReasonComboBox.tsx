import { useMemo } from 'react'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { ReasonEnum } from '../../domain/value-object/ShipmentReason'

interface ShipmentReasonComboboxProps {
	value?: string
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	handleChange: (name: string, value: string | number) => void
}

/**
 * `ShipmentReasonCombobox` is a component that provides a dropdown for filtering employees
 * by their employment Reason (active, inactive, or all).
 */
export function ShipmentReasonCombobox({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: ShipmentReasonComboboxProps) {
	const options = useMemo(() => {
		return Object.values(ReasonEnum).map(stat => {
			const id = stat as string
			const name = id
				.split('_')
				.map(word => word.charAt(0).toUpperCase() + word.slice(1))
				.join(' ')

			return {
				id,
				name
			}
		})
	}, [])
	return (
		<>
			<Combobox
				id="shipmentReason"
				label="Motivo"
				value={value}
				name={name}
				options={options}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				searchField={false}
				onChangeValue={(name, value) => {
					handleChange(name, value)
				}}
				readOnly={readonly}
			/>
		</>
	)
}
