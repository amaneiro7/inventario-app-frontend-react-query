/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy, memo } from 'react'
import { Checkbox } from '@/shared/ui/Checkbox'

// Types
import {
	type Action,
	type DefaultModel,
	type ModelDisabled,
	type ModelErrors,
	type ModelRequired
} from '@/entities/model/models/infra/reducers/modelFormReducer'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'

const InputTypeCombobox = lazy(() =>
	import('@/entities/model/inputType/infra/ui/InputTypeComboBox').then(m => ({
		default: m.InputTypeCombobox
	}))
)

interface AddModelKeyboardFeaturesProps {
	formData: DefaultModel
	errors: ModelErrors
	required: ModelRequired
	disabled: ModelDisabled
	mode?: FormMode
	handleChange: (name: Action['type'], value: any) => void
	isLoading: boolean
	canEdit: boolean
}

/**
 * `AddModelKeyboardFeatures` is a memoized functional component that renders input fields
 * specific to keyboard models. It includes fields for input type and a checkbox for fingerprint reader.
 */
export const AddModelKeyboardFeatures = memo(
	({
		handleChange,
		disabled,
		errors,
		formData,
		isLoading,
		canEdit,
		required
	}: AddModelKeyboardFeaturesProps) => {
		return (
			<>
				<div className="flex gap-4">
					<InputTypeCombobox
						value={formData.inputTypeId}
						handleChange={(_name, value) => handleChange('inputTypeId', value)}
						name="inputTypeId"
						isLoading={isLoading}
						readonly={!canEdit}
						error={errors.inputTypeId}
						required={required.inputTypeId}
						disabled={disabled.inputTypeId}
					/>

					<Checkbox
						text="¿Tiene lector de huella?"
						value={formData.hasFingerPrintReader}
						name="hasFingerPrintReader"
						onChange={e => {
							handleChange('hasFingerPrintReader', e.target.checked)
						}}
						disabled={disabled.hasFingerPrintReader}
						readOnly={!canEdit}
					/>
				</div>
			</>
		)
	}
)

AddModelKeyboardFeatures.displayName = 'AddModelKeyboardFeatures'
