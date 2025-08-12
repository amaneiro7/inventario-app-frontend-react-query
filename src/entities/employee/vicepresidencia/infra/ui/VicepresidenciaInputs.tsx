import { lazy, memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import {
	type VicepresidenciaDisabled,
	type Action,
	type DefaultVicepresidencia,
	type VicepresidenciaErrors,
	type VicepresidenciaRequired
} from '@/entities/employee/vicepresidencia/infra/reducers/vicepresidenciaFormReducer'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'

const VicepresidenciaEjecutivaCombobox = lazy(() =>
	import(
		'@/entities/employee/vicepresidenciaEjecutiva/infra/ui/VicepresidenciaEjecutivaComboBox'
	).then(m => ({ default: m.VicepresidenciaEjecutivaCombobox }))
)
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
	 * The current form data for the vicepresidencia.
	 */
	formData: DefaultVicepresidencia
	/**
	 * An object containing validation errors for each form field.
	 */
	errors: VicepresidenciaErrors
	/**
	 * An object indicating which form fields are required.
	 */
	required: VicepresidenciaRequired
	/**
	 * An object indicating which form fields are disabled.
	 */
	disabled: VicepresidenciaDisabled
	/**
	 * The current mode of the form (e.g., 'add' or 'edit').
	 */
	mode: FormMode
	/**
	 * Callback function to handle changes in form input fields.
	 * @param name - The name of the field being changed.
	 * @param value - The new value of the field.
	 */
	handleChange: (name: Action['type'], value: string | number) => void
	isLoading: boolean
}

/**
 * `VicepresidenciasInputs` is a memoized functional component that renders the input fields
 * for vicepresidencia information. It includes comboboxes for directiva and executive vicepresidencia,
 * a text input for the vicepresidencia name, and a transfer list for cargos.
 */
export const VicepresidenciasInputs = memo(function ({
	errors,
	required,
	formData,
	disabled,
	mode,
	isLoading,
	handleChange
}: Props) {
	return (
		<>
			<DirectivaCombobox
				value={formData.directivaId}
				handleChange={(_name, value) => handleChange('directivaId', value)}
				name="directivaId"
				required={required.directivaId}
				disabled={disabled.directivaId}
				readonly={mode === 'edit'}
				isLoading={isLoading}
			/>
			<VicepresidenciaEjecutivaCombobox
				value={formData.vicepresidenciaEjecutivaId}
				handleChange={(_name, value) => handleChange('vicepresidenciaEjecutivaId', value)}
				name="vicepresidenciaEjecutivaId"
				readonly={mode === 'edit'}
				required={required.vicepresidenciaEjecutivaId}
				directivaId={formData.directivaId}
				isLoading={isLoading}
			/>
			<Input
				id="vicepresidencia-name"
				value={formData.name}
				name="name"
				isLoading={isLoading}
				label="Nombre de la vicepresidencia "
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
				disabled={disabled.cargos}
			/>
		</>
	)
})
