import { memo } from 'react'
import { Input } from '@/components/Input/Input'
import {
	type CentroCostoErrors,
	type DefaultCentroCosto,
	type Action,
	type CentroCostoDisabled,
	type CentroCostoRequired
} from '@/core/employee/centroCosto/infra/reducers/centroCostoFormReducer'
import { type FormMode } from '@/hooks/useGetFormMode'

interface Props {
	formData: DefaultCentroCosto
	errors: CentroCostoErrors
	disabled: CentroCostoDisabled
	required: CentroCostoRequired
	mode: FormMode
	handleChange: (name: Action['type'], value: string) => void
}

export const CentroCostoInputs = memo(function ({
	errors,
	disabled,
	required,
	formData,
	mode,
	handleChange
}: Props) {
	return (
		<div className="w-full flex justify-self-center gap-4 content-center max-w-2xl">
			<Input
				value={formData.id}
				name="id"
				type="number"
				max={9999}
				min={1}
				label="Código del Centro de Costo"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleChange('id', e.target.value)
				}
				error={!!errors?.id}
				errorMessage={errors?.id}
				required={required.id}
				disabled={disabled.id}
				readOnly={mode === 'edit'}
			/>
			<Input
				value={formData.name}
				name="name"
				label="Nombre del Centro del Costo"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleChange('name', e.target.value)
				}
				error={!!errors?.name}
				errorMessage={errors?.name}
				required={required.name}
				disabled={disabled.name}
			/>
		</div>
	)
})
