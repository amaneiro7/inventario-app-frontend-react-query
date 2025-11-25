import { lazy, memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import {
	type Action,
	type DepartamentoErrors,
	type DefaultDepartamento,
	type DepartamentoRequired,
	type DepartamentoDisabled
} from '@/entities/employee/departamento/infra/reducers/departamentoFormReducer'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'

const CargoTransferList = lazy(() =>
	import('@/entities/employee/cargo/infra/ui/CargoTransferList').then(m => ({
		default: m.CargoTransferList
	}))
)
const VicepresidenciaEjecutivaCombobox = lazy(() =>
	import(
		'@/entities/employee/vicepresidenciaEjecutiva/infra/ui/VicepresidenciaEjecutivaComboBox'
	).then(m => ({ default: m.VicepresidenciaEjecutivaCombobox }))
)
const VicepresidenciaCombobox = lazy(() =>
	import('@/entities/employee/vicepresidencia/infra/ui/VicepresidenciaComboBox').then(m => ({
		default: m.VicepresidenciaCombobox
	}))
)
const DirectivaCombobox = lazy(() =>
	import('@/entities/employee/directiva/infra/ui/DirectivaComboBox').then(m => ({
		default: m.DirectivaCombobox
	}))
)

interface DepartamentoInputsProps {
	formData: DefaultDepartamento
	errors: DepartamentoErrors
	required: DepartamentoRequired
	disabled: DepartamentoDisabled
	isLoading: boolean
	canEdit: boolean
	mode: FormMode
	handleChange: (name: Action['type'], value: string | number) => void
}

/**
 * `DepartamentoInputs` is a memoized functional component that renders the input fields
 * for departamento information. It includes comboboxes for directiva, vicepresidencia ejecutiva,
 * and vicepresidencia, a text input for the departamento name, and a transfer list for cargos.
 */
export const DepartamentoInputs = memo(
	({
		errors,
		mode,
		required,
		disabled,
		formData,
		isLoading = false,
		canEdit,
		handleChange
	}: DepartamentoInputsProps) => {
		return (
			<>
				<DirectivaCombobox
					value={formData.directivaId}
					handleChange={(_name, value) => handleChange('directivaId', value)}
					name="directivaId"
					required={required.directivaId}
					disabled={disabled.directivaId}
					readonly={mode === 'edit' || !canEdit}
					isLoading={isLoading}
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
						readonly={mode === 'edit' || !canEdit}
						isLoading={isLoading}
					/>
					<VicepresidenciaCombobox
						value={formData.vicepresidenciaId}
						handleChange={(_name, value) => handleChange('vicepresidenciaId', value)}
						name="vicepresidenciaId"
						vicepresidenciaEjecutivaId={formData.vicepresidenciaEjecutivaId}
						required={required.vicepresidenciaId}
						disabled={disabled.vicepresidenciaId}
						readonly={mode === 'edit' || !canEdit}
						isLoading={isLoading}
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
					readOnly={!canEdit}
					error={!!errors?.name}
					errorMessage={errors?.name}
					required={required.name}
					disabled={disabled.name}
					isLoading={isLoading}
				/>
				<CargoTransferList
					value={formData.cargos}
					name="cargos"
					readonly={!canEdit}
					onAddCargo={handleChange}
					onRemoveCargo={handleChange}
					required={required.cargos}
					disabled={disabled.cargos}
					isLoading={isLoading}
				/>
			</>
		)
	}
)

DepartamentoInputs.displayName = 'DepartamentoInputs'
