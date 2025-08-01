/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy, memo, Suspense } from 'react'
import {
	type Action,
	type DefaultModel,
	type ModelDisabled,
	type ModelErrors,
	type ModelRequired
} from '@/entities/model/models/infra/reducers/modelFormReducer'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'
import { Checkbox } from '@/shared/ui/Checkbox/Checbox'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'
const InputTypeCombobox = lazy(() =>
	import('@/entities/model/inputType/infra/ui/InputTypeComboBox').then(m => ({
		default: m.InputTypeCombobox
	}))
)

interface Props {
	formData: DefaultModel
	errors: ModelErrors
	required: ModelDisabled
	disabled: ModelRequired
	mode?: FormMode
	handleChange: (name: Action['type'], value: any) => void
}

export const AddModelKeyboardFeatures = memo(
	({ handleChange, disabled, errors, formData, required }: Props) => {
		return (
			<>
				<div className="flex gap-4">
					<Suspense fallback={<InputFallback />}>
						<InputTypeCombobox
							value={formData.inputTypeId}
							handleChange={(_name, value) => handleChange('inputTypeId', value)}
							name="inputTypeId"
							error={errors.inputTypeId}
							required={required.inputTypeId}
							disabled={disabled.inputTypeId}
						/>
					</Suspense>

					<Checkbox
						label="Tiene lector de huella"
						text="¿Tiene lector de huella?"
						value={formData.hasFingerPrintReader}
						name="hasFingerPrintReader"
						onChange={e => {
							handleChange('hasFingerPrintReader', e.target.checked)
						}}
					/>
				</div>
			</>
		)
	}
)

AddModelKeyboardFeatures.displayName = 'AddModelKeyboardFeatures'
