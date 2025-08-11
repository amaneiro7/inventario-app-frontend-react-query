import { memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import {
	type Action,
	type DirectivaErrors,
	type DefaultDirectiva,
	type DirectivaRequired
} from '@/entities/employee/directiva/infra/reducers/directivaFormReducer'
import { CargoTransferList } from '@/entities/employee/cargo/infra/ui/CargoTransferList'

interface DirectivaInputsProps {
	/**
	 * The current form data for the directiva.
	 */
	formData: DefaultDirectiva
	/**
	 * An object containing validation errors for each form field.
	 */
	errors: DirectivaErrors
	/**
	 * An object indicating which form fields are required.
	 */
	required: DirectivaRequired

	isLoading: boolean
	/**
	 * Callback function to handle changes in form input fields.
	 * @param name - The name of the field being changed.
	 * @param value - The new value of the field.
	 */
	handleChange: (name: Action['type'], value: string | number) => void
}

/**
 * `DirectivaInputs` is a memoized functional component that renders the input fields
 * for directiva information. It includes a text input for the directiva name and a transfer list for cargos.
 */
export const DirectivaInputs = memo(
	({ errors, required, formData, isLoading, handleChange }: DirectivaInputsProps) => {
		return (
			<>
				<Input
					id="directiva-name"
					value={formData.name}
					name="name"
					label="Nombre de la directiva"
					isLoading={isLoading}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('name', e.target.value)
					}
					error={!!errors?.name}
					errorMessage={errors?.name}
					required={required.name}
				/>
				<CargoTransferList
					value={formData.cargos}
					name="cargos"
					isLoading={isLoading}
					onAddCargo={handleChange}
					onRemoveCargo={handleChange}
					required={required.cargos}
				/>
			</>
		)
	}
)
DirectivaInputs.displayName = 'DirectivaInputs'
