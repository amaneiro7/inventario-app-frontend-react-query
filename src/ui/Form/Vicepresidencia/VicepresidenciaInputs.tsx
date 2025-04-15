import { memo } from 'react'
import { Input } from '@/components/Input/Input'

import {
	type VicepresidenciaDisabled,
	type Action,
	type DefaultVicepresidencia,
	type VicepresidenciaErrors,
	type VicepresidenciaRequired
} from '@/core/employee/vicepresidencia/infra/reducers/vicepresidenciaFormReducer'
import { type FormMode } from '@/hooks/useGetFormMode'
import { VicepresidenciaEjecutivaCombobox } from '@/components/ComboBox/Sincrono/VicepresidenciaEjecutivaComboBox'
import { CargoTransferList } from '@/components/TranferList/CargoTransferList'
import { DirectivaCombobox } from '@/components/ComboBox/Sincrono/DirectivaComboBox'

interface Props {
	formData: DefaultVicepresidencia
	errors: VicepresidenciaErrors
	required: VicepresidenciaRequired
	disabled: VicepresidenciaDisabled
	mode: FormMode
	handleChange: (name: Action['type'], value: string | number) => void
}

export const VicepresidenciasInputs = memo(function ({
	errors,
	required,
	formData,
	disabled,
	mode,
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
			<VicepresidenciaEjecutivaCombobox
				value={formData.vicepresidenciaEjecutivaId}
				handleChange={(_name, value) => handleChange('vicepresidenciaEjecutivaId', value)}
				name="vicepresidenciaEjecutivaId"
				readonly={mode === 'edit'}
				required={required.vicepresidenciaEjecutivaId}
				directivaId={formData.directivaId}
			/>
			<Input
				value={formData.name}
				name="name"
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
				onAddCargo={handleChange}
				onRemoveCargo={handleChange}
				required={required.cargos}
				disabled={disabled.cargos}
			/>
		</>
	)
})
