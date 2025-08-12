import { lazy, memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import {
	type Action,
	type DefaultVicepresidenciaEjecutiva,
	type VicepresidenciaEjecutivaErrors,
	type VicepresidenciaEjecutivaRequired
} from '@/entities/employee/vicepresidenciaEjecutiva/infra/reducers/vicepresidenciaEjecutivaFormReducer'

const CargoTransferList = lazy(() =>
	import('@/entities/employee/cargo/infra/ui/CargoTransferList').then(m => ({
		default: m.CargoTransferList
	}))
)

const DirectivaCombobox = lazy(() =>
	import('@/entities/employee/directiva/infra/ui/DirectivaComboBox').then(m => ({
		default: m.DirectivaCombobox
	}))
)

interface Props {
	/**
	 * The current form data for the executive vicepresidencia.
	 */
	formData: DefaultVicepresidenciaEjecutiva
	/**
	 * An object containing validation errors for each form field.
	 */
	errors: VicepresidenciaEjecutivaErrors
	/**
	 * An object indicating which form fields are required.
	 */
	required: VicepresidenciaEjecutivaRequired
	/**
	 * Callback function to handle changes in form input fields.
	 * @param name - The name of the field being changed.
	 * @param value - The new value of the field.
	 */
	handleChange: (name: Action['type'], value: string | number) => void
	isLoading: boolean
}

/**
 * `VicepresidenciaEjecutivasInputs` is a memoized functional component that renders the input fields
 * for executive vicepresidencia information. It includes a combobox for directiva, a text input for the name,
 * and a transfer list for cargos.
 */
export const VicepresidenciaEjecutivasInputs = memo(function ({
	errors,
	required,
	formData,
	isLoading,
	handleChange
}: Props) {
	return (
		<>
			<DirectivaCombobox
				value={formData.directivaId}
				handleChange={(_name, value) => handleChange('directivaId', value)}
				name="directivaId"
				isLoading={isLoading}
				required={required.directivaId}
			/>
			<Input
				id="vicepresidencia-ejecutiva-search-name"
				value={formData.name}
				name="name"
				isLoading={isLoading}
				label="Nombre de la vicepresidencia ejecutiva"
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
})
