import { memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import {
	type Action,
	type CargoErrors,
	type DefaultCargo,
	type CargoRequired,
	type CargoDisabled
} from '@/entities/employee/cargo/infra/reducers/cargoFormReducer'

interface Props {
	/**
	 * The current form data for the cargo.
	 */
	formData: DefaultCargo
	/**
	 * An object containing validation errors for each form field.
	 */
	errors: CargoErrors
	/**
	 * An object indicating which form fields are required.
	 */
	required: CargoRequired
	/**
	 * An object indicating which form fields are disabled.
	 */
	disabled: CargoDisabled
	/**
	 * Callback function to handle changes in form input fields.
	 * @param name - The name of the field being changed.
	 * @param value - The new value of the field.
	 */
	handleChange: (name: Action['type'], value: string | number) => void
}

/**
 * `CargoInputs` is a memoized functional component that renders the input fields
 * for cargo information. It receives form data, errors, required/disabled states, and a change handler
 * as props.
 */
export const CargoInputs = memo(function ({
	errors,
	required,
	disabled,
	formData,
	handleChange
}: Props) {
	return (
		<>
			<Input
				id="cargo-name"
				value={formData.name}
				name="name"
				label="Nombre del cargo"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleChange('name', e.target.value)
				}
				error={!!errors?.name}
				errorMessage={errors?.name}
				required={required.name}
				disabled={disabled.name}
			/>
		</>
	)
})