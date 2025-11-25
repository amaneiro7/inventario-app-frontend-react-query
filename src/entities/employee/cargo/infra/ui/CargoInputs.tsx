import { memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import {
	type Action,
	type CargoErrors,
	type DefaultCargo,
	type CargoRequired,
	type CargoDisabled
} from '@/entities/employee/cargo/infra/reducers/cargoFormReducer'

interface CargoInputsProps {
	formData: DefaultCargo
	isLoading: boolean
	canEdit: boolean
	errors: CargoErrors
	required: CargoRequired
	disabled: CargoDisabled
	handleChange: (name: Action['type'], value: string | number) => void
}

/**
 * `CargoInputs` is a memoized functional component that renders the input fields
 * for cargo information. It receives form data, errors, required/disabled states, and a change handler
 * as props.
 */
export const CargoInputs = memo(
	({
		errors,
		required,
		disabled,
		formData,
		isLoading = false,
		canEdit,
		handleChange
	}: CargoInputsProps) => {
		return (
			<>
				<Input
					id="cargo-name"
					value={formData.name}
					name="name"
					label="Nombre del cargo"
					isLoading={isLoading}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('name', e.target.value)
					}
					error={!!errors?.name}
					errorMessage={errors?.name}
					required={required.name}
					disabled={disabled.name}
					readOnly={!canEdit}
				/>
			</>
		)
	}
)

CargoInputs.displayName = 'CargoInputs'
