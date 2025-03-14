import { memo } from 'react'
import { Input } from '@/components/Input/Input'
import {
	type Action,
	type CargoErrors,
	type DefaultCargo,
	type CargoRequired,
	type CargoDisabled
} from '@/core/employee/cargo/infra/reducers/cargoFormReducer'

interface Props {
	formData: DefaultCargo
	errors: CargoErrors
	required: CargoRequired
	disabled: CargoDisabled
	handleChange: (name: Action['type'], value: string | number) => void
}

export const CargoInputs = memo(function ({
	errors,
	required,
	disabled,
	formData,
	handleChange
}: Props) {
	return (
		<>
			<Input
				value={formData.name}
				name="name"
				label="Nombre del cargo"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleChange('name', e.target.value)
				}
				error={!!errors?.name}
				errorMessage={errors?.name}
				required={required.name}
				disabled={disabled.name}
			/>
		</>
	)
})
