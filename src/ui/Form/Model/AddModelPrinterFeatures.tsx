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
import { Input } from '@/components/Input/Input'

interface Props {
	formData: DefaultModel
	errors: ModelErrors
	required: ModelDisabled
	disabled: ModelRequired
	mode?: FormMode
	handleChange: (name: Action['type'], value: any) => void
}

export const AddModelPrinterFeatures = memo(function ({
	handleChange,
	errors,
	formData,
	disabled,
	required
}: Props) {
	return (
		<>
			<div className="flex gap-4">
				<Input
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
})

AddModelPrinterFeatures.displayName = 'AddModelPrinterFeatures'
