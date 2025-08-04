import { memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'

import { DirectivaCombobox } from '@/entities/employee/directiva/infra/ui/DirectivaComboBox'
import {
	type Action,
	type DefaultVicepresidenciaEjecutiva,
	type VicepresidenciaEjecutivaErrors,
	type VicepresidenciaEjecutivaRequired
} from '@/entities/employee/vicepresidenciaEjecutiva/infra/reducers/vicepresidenciaEjecutivaFormReducer'
import { CargoTransferList } from '@/entities/employee/cargo/infra/ui/CargoTransferList'

interface Props {
	formData: DefaultVicepresidenciaEjecutiva
	errors: VicepresidenciaEjecutivaErrors
	required: VicepresidenciaEjecutivaRequired
	handleChange: (name: Action['type'], value: string | number) => void
}

export const VicepresidenciaEjecutivasInputs = memo(function ({
	errors,
	required,
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
			/>
			<Input
				id="vicepresidencia-ejecutiva-search-name"
				value={formData.name}
				name="name"
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
				onAddCargo={handleChange}
				onRemoveCargo={handleChange}
				required={required.cargos}
			/>
		</>
	)
})
