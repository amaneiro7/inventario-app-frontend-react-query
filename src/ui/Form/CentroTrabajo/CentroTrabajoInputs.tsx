import { memo } from 'react'
import { Input } from '@/components/Input/Input'
import {
	type CentroTrabajoErrors,
	type DefaultCentroTrabajo,
	type Action,
	type CentroTrabajoDisabled,
	type CentroTrabajoRequired
} from '@/core/employee/centroTrabajo/infra/reducers/centroTrabajoFormReducer'
import { type FormMode } from '@/hooks/useGetFormMode'
import { CentroCostoCombobox } from '@/components/ComboBox/Asincrono/CentroCostoComboBox'

interface Props {
	formData: DefaultCentroTrabajo
	errors: CentroTrabajoErrors
	disabled: CentroTrabajoDisabled
	required: CentroTrabajoRequired
	mode: FormMode
	handleChange: (name: Action['type'], value: string | number) => void
}

export const CentroTrabajoInputs = memo(function ({
	errors,
	disabled,
	required,
	formData,
	mode,
	handleChange
}: Props) {
	return (
		<div className=" w-full flex flex-col justify-self-center gap-4 content-center max-w-2xl">
			<CentroCostoCombobox
				value={formData.centroCostoId}
				handleChange={(_name, value) => handleChange('centroCostoId', value)}
				name="centroCostoId"
				required={required.centroCostoId}
				disabled={disabled.centroCostoId}
				readonly={mode === 'edit'}
			/>
			<div className="flex gap-4">
				<Input
					value={formData.id}
					name="id"
					label="Código del Centro de Trabajo"
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
					label="Nombre del Centro del Trabajo"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('name', e.target.value)
					}
					error={!!errors?.name}
					errorMessage={errors?.name}
					required={required.name}
					disabled={disabled.name}
				/>
			</div>
		</div>
	)
})
