import { memo } from 'react'
import { Input } from '@/components/Input/Input'
import {
	type Action,
	type DirectivaErrors,
	type DefaultDirectiva,
	type DirectivaRequired
} from '@/core/employee/directiva/infra/reducers/directivaFormReducer'
import { CargoTransferList } from '@/components/TranferList/CargoTransferList'

interface Props {
	formData: DefaultDirectiva
	errors: DirectivaErrors
	required: DirectivaRequired
	handleChange: (name: Action['type'], value: string | number) => void
}

export const DirectivaInputs = memo(function ({ errors, required, formData, handleChange }: Props) {
	return (
		<>
			<Input
				value={formData.name}
				name="name"
				label="Nombre de la directiva"
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
