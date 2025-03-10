/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from 'react'
import {
	type Action,
	type DefaultModel,
	type ModelDisabled,
	type ModelErrors,
	type ModelRequired
} from '@/core/model/models/infra/reducers/modelFormReducer'
import { type FormMode } from '@/hooks/useGetFormMode'
import { Checkbox } from '@/components/Checkbox/Checbox'
import { InputTypeCombobox } from '@/components/ComboBox/Sincrono/InputTypeComboBox'

interface Props {
	formData: DefaultModel
	errors: ModelErrors
	required: ModelDisabled
	disabled: ModelRequired
	mode?: FormMode
	handleChange: (name: Action['type'], value: any) => void
}

export const AddModelKeyboardFeatures = memo(function ({
	handleChange,
	disabled,
	errors,
	formData,
	required
}: Props) {
	return (
		<>
			<div className="flex gap-4">
				<InputTypeCombobox
					value={formData.inputTypeId}
					handleChange={(_name, value) => handleChange('inputTypeId', value)}
					name="inputTypeId"
					error={errors.inputTypeId}
					required={required.inputTypeId}
					disabled={disabled.inputTypeId}
				/>

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
})
