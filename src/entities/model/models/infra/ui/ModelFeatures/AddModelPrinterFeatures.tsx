/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
// Types
import {
	type Action,
	type DefaultModel,
	type ModelDisabled,
	type ModelErrors,
	type ModelRequired
} from '@/entities/model/models/infra/reducers/modelFormReducer'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'

interface AddModelPrinterFeaturesProps {
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
	isLoading: boolean
}

/**
 * `AddModelPrinterFeatures` is a memoized functional component that renders input fields
 * specific to printer models. It includes a field for the cartridge model.
 */
export const AddModelPrinterFeatures = memo(
	({
		handleChange,
		errors,
		formData,
		disabled,
		isLoading,
		required
	}: AddModelPrinterFeaturesProps) => {
		return (
			<>
				<div className="flex gap-4">
					<Input
						id="cartridgeModel"
						value={formData.cartridgeModel}
						name="cartridgeModel"
						isLoading={isLoading}
						label="Número de modelo del cartucho"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('cartridgeModel', e.target.value)
						}
						error={!!errors?.cartridgeModel}
						errorMessage={errors?.cartridgeModel}
						required={required.cartridgeModel}
						disabled={disabled.cartridgeModel}
					/>
				</div>
			</>
		)
	}
)

AddModelPrinterFeatures.displayName = 'AddModelPrinterFeatures'
