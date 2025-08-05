/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy, memo, Suspense } from 'react'
import { Checkbox } from '@/shared/ui/Checkbox'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'
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
	/**
	 * The current form data for the model.
	 */
	formData: DefaultModel
	/**
	 * An object containing validation errors for each form field.
	 */
	errors: ModelErrors
	/**
	 * An object indicating which form fields are required.
	 */
	required: ModelRequired
	/**
	 * An object indicating which form fields are disabled.
	 */
	disabled: ModelDisabled
	/**
	 * The current mode of the form (e.g., 'add' or 'edit').
	 */
	mode?: FormMode
	/**
	 * Callback function to handle changes in form input fields.
	 * @param name - The name of the field being changed.
	 * @param value - The new value of the field.
	 */
	handleChange: (name: Action['type'], value: any) => void
}

/**
 * `AddModelKeyboardFeatures` is a memoized functional component that renders input fields
 * specific to keyboard models. It includes fields for input type and a checkbox for fingerprint reader.
 */
export const AddModelKeyboardFeatures = memo(
	({ handleChange, disabled, errors, formData, required }: AddModelKeyboardFeaturesProps) => {
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