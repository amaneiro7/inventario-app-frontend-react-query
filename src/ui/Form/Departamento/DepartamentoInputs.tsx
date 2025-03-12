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
import { CentroCostoCombobox } from '@/components/ComboBox/Asincrono/CentroCostoComboBox'
import { CargoCombobox } from '@/components/ComboBox/Asincrono/CargoComboBox'
import CargoChip from '@/components/Chip/CargoChip'

interface Props {
	formData: DefaultDepartamento
	errors: DepartamentoErrors
	required: DepartamentoRequired
	disabled: DepartamentoDisabled
	mode: FormMode
	handleChange: (name: Action['type'], value: string | number) => void
}

export const DepartamentoInputs = memo(function ({
	errors,
	mode,
	required,
	disabled,
	formData,
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
				<CentroCostoCombobox
					value={formData.centroCostoId}
					handleChange={(_name, value) => handleChange('centroCostoId', value)}
					name="centroCostoId"
					required={required.centroCostoId}
					disabled={disabled.centroCostoId}
					readonly={mode === 'edit'}
				/>
			</div>
			<Input
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
			<CargoCombobox
				value={''}
				name="cargos"
				handleChange={(_name, value) => handleChange('addCargo', value)}
				required={required.cargos}
				disabled={disabled.cargos}
			/>
			<CargoChip
				cargos={formData.cargos}
				onDelete={() => {
					return
				}}
			/>
		</>
	)
})
