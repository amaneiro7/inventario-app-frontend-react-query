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
	formData: DefaultModel
	errors: ModelErrors
	required: ModelDisabled
	disabled: ModelRequired
	mode?: FormMode
	handleChange: (name: Action['type'], value: any) => void
}

export const AddModelPrinterFeatures = memo(
	({ handleChange, errors, formData, disabled, required }: AddModelPrinterFeaturesProps) => {
		return (
			<>
				<div className="flex gap-4">
					<Input
						id="cartridgeModel"
						value={formData.cartridgeModel}
						name="cartridgeModel"
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
