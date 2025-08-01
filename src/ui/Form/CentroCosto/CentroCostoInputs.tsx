import { memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import {
	type CentroCostoErrors,
	type DefaultCentroCosto,
	type Action,
	type CentroCostoDisabled,
	type CentroCostoRequired
} from '@/entities/employee/centroCosto/infra/reducers/centroCostoFormReducer'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'

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
		<div className="flex w-full max-w-2xl content-center gap-4 justify-self-center">
			<Input
				id="centro-costo-code"
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
				id="centro-costo-name"
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
