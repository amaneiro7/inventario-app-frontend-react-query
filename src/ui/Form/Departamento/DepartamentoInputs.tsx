import { memo } from 'react'
import { Input } from '@/components/Input/Input'
import {
	type Action,
	type DepartamentoErrors,
	type DefaultDepartamento,
	type DepartamentoRequired,
	type DepartamentoDisabled
} from '@/core/employee/departamento/infra/reducers/departamentoFormReducer'
import { type FormMode } from '@/hooks/useGetFormMode'
import { DirectivaCombobox } from '@/components/ComboBox/Sincrono/DirectivaComboBox'
import { VicepresidenciaEjecutivaCombobox } from '@/components/ComboBox/Sincrono/VicepresidenciaEjecutivaComboBox'
import { CargoTransferList } from '@/components/TranferList/CargoTransferList'
import { VicepresidenciaCombobox } from '@/components/ComboBox/Asincrono/VicepresidenciaComboBox'

interface DepartamentoInputsProps {
	formData: DefaultDepartamento
	errors: DepartamentoErrors
	required: DepartamentoRequired
	disabled: DepartamentoDisabled
	mode: FormMode
	handleChange: (name: Action['type'], value: string | number) => void
}

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
