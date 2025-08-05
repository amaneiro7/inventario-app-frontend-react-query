import { memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import {
	type Action,
	type DepartamentoErrors,
	type DefaultDepartamento,
	type DepartamentoRequired,
	type DepartamentoDisabled
} from '@/entities/employee/departamento/infra/reducers/departamentoFormReducer'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'
import { DirectivaCombobox } from '@/entities/employee/directiva/infra/ui/DirectivaComboBox'
import { CargoTransferList } from '@/entities/employee/cargo/infra/ui/CargoTransferList'
import { VicepresidenciaEjecutivaCombobox } from '@/entities/employee/vicepresidenciaEjecutiva/infra/ui/VicepresidenciaEjecutivaComboBox'
import { VicepresidenciaCombobox } from '@/entities/employee/vicepresidencia/infra/ui/VicepresidenciaComboBox'

interface DepartamentoInputsProps {
	/**
	 * The current form data for the departamento.
	 */
	formData: DefaultDepartamento
	/**
	 * An object containing validation errors for each form field.
	 */
	errors: DepartamentoErrors
	/**
	 * An object indicating which form fields are required.
	 */
	required: DepartamentoRequired
	/**
	 * An object indicating which form fields are disabled.
	 */
	disabled: DepartamentoDisabled
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
}

/**
 * `DepartamentoInputs` is a memoized functional component that renders the input fields
 * for departamento information. It includes comboboxes for directiva, vicepresidencia ejecutiva,
 * and vicepresidencia, a text input for the departamento name, and a transfer list for cargos.
 */
export const DepartamentoInputs = memo(
	({ errors, mode, required, disabled, formData, handleChange }: DepartamentoInputsProps) => {
		return (
			<>
				<DirectivaCombobox
					value={formData.directivaId}
					handleChange={(_name, value) => handleChange('directivaId', value)}
					name="directivaId"
					required={required.directivaId}
					disabled={disabled.directivaId}
					readonly={mode === 'edit'}
				/>
				<div className="flex gap-4">
					<VicepresidenciaEjecutivaCombobox
						value={formData.vicepresidenciaEjecutivaId}
						handleChange={(_name, value) =>
							handleChange('vicepresidenciaEjecutivaId', value)
						}
						name="vicepresidenciaEjecutivaId"
						directivaId={formData.directivaId}
						required={required.vicepresidenciaEjecutivaId}
						disabled={disabled.vicepresidenciaEjecutivaId}
						readonly={mode === 'edit'}
					/>
					<VicepresidenciaCombobox
						value={formData.vicepresidenciaId}
						handleChange={(_name, value) => handleChange('vicepresidenciaId', value)}
						name="vicepresidenciaId"
						vicepresidenciaEjecutivaId={formData.vicepresidenciaEjecutivaId}
						required={required.vicepresidenciaId}
						disabled={disabled.vicepresidenciaId}
						readonly={mode === 'edit'}
					/>
				</div>
				<Input
					id="departamento-name"
					value={formData.name}
					name="name"
					label="name"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('name', e.target.value)
					}
					error={!!errors?.name}
					errorMessage={errors?.name}
					required={required.name}
					disabled={disabled.name}
				/>
				<CargoTransferList
					value={formData.cargos}
					name="cargos"
					onAddCargo={handleChange}
					onRemoveCargo={handleChange}
					required={required.cargos}
					disabled={disabled.cargos}
				/>
			</>
		)
	}
)

DepartamentoInputs.displayName = 'DepartamentoInputs'
